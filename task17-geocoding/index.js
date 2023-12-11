let apiKey = "420ddce3-0e36-4c53-8aff-2ffbc17ceffe";

const searchInput = document.querySelector("#search");
const select = document.getElementById("suggestions-select");

function debounceAndThrottle(func, debounceDelay, throttleDelay) {
  let timeoutId;
  let throttled = false;

  return function () {
    const context = this;
    const args = arguments;

    // отменяем предыдущий таймаут дебаунсинга
    clearTimeout(timeoutId);

    // если нет троттлинга, запускаем функцию и включаем троттлинг
    if (!throttled) {
      func.apply(context, args);
      throttled = true;

      // по прошествии throttleDelay секунд выключаем троттлинг
      setTimeout(function () {
        throttled = false;
      }, throttleDelay);
    }

    // через debonceDelay секунд запускаем функцию
    timeoutId = setTimeout(function () {
      throttled = false;
      func.apply(context, args);
    }, debounceDelay);
  };
}

async function fetchSuggestions(userInput) {
  const inputEncoded = encodeURIComponent(userInput);
  const requestURL = `https://geocode-maps.yandex.ru/1.x?apikey=${apiKey}&geocode=${inputEncoded}&format=json`;

  try {
    const response = await fetch(requestURL);
    const data = await response.json();
    return data.response.GeoObjectCollection.featureMember;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function updateOptions(data) {
  Array.from(select.options).forEach((opt) => {
    if (opt.value !== "none") {
      opt.remove();
    }
  });

  data.forEach((address) => {
    const option = document.createElement("option");
    const value = `${address.GeoObject.name} ${address.GeoObject.description}`;
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

const updateWithDebouncingAndThrottling = debounceAndThrottle(
  function () {
    const value = searchInput.value;
    if (value) {
      fetchSuggestions(value).then((addresses) => {
        updateOptions(addresses);
      });
    }
  },
  500,
  750
);

searchInput.addEventListener("input", updateWithDebouncingAndThrottling);
