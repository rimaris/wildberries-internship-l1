const URL =
  "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true";
const PAGE_SIZE = 50;
const SORT_ORDER_ASC = 1;
const SORT_ORDER_DESC = 2;

const tableBody = document.querySelector(".table tbody");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const sortLinks = document.querySelectorAll(".sort-link");

let sortBy = null;
let sortOrder = null;
let data = [];
let offset = 0;

async function fetchData() {
  try {
    const response = await fetch(URL);
    data = await response.json();
  } catch (err) {
    console.error(err);
  }
}

function sortFunc(a, b) {
    let result = 0;
    if (a[sortBy] < b[sortBy]) {
        result = -1;
    } else if (a[sortBy] > b[sortBy]) {
        result = 1;
    }
    if (sortOrder === SORT_ORDER_DESC) {
        result = -result;
    }
    return result;
}

function updateTable() {
  const sortedData = [...data];
  if (sortBy !== null && sortOrder !== null) {
    sortedData.sort(sortFunc);
  }
  const rows = sortedData.slice(offset, offset + PAGE_SIZE);
  tableBody.innerHTML = "";
  rows.forEach((row) => {
    const rowEl = document.createElement("tr");
    rowEl.insertAdjacentHTML(
      "afterbegin",
      `
        <td>${row.fname}</td>
        <td>${row.lname}</td>
        <td class="tel-cell">${row.tel}</td>
        <td class="address-cell">${row.address}</td>
        <td class="city-cell">${row.city}</td>
        <td class="state-cell">${row.state}</td>
        <td class="zip-cell">${row.zip}</td>
        `
    );
    tableBody.appendChild(rowEl);
  });
}

function fillTable() {
  fetchData().then(() => {
    updateTable();
  });
}

function getSortCol(sortLink) {
  for (cls of sortLink.classList) {
    if (cls.startsWith("sort-link_")) {
      return cls.split("_")[1];
    }
  }
  return null;
}

nextBtn.addEventListener("click", () => {
  if (offset + PAGE_SIZE < data.length) {
    offset += PAGE_SIZE;
    updateTable();
  }
});

prevBtn.addEventListener("click", () => {
  if (offset - PAGE_SIZE >= 0) {
    offset -= PAGE_SIZE;
    updateTable();
  }
});

sortLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const newSortBy = getSortCol(e.currentTarget);
    if (newSortBy === null) {
      return;
    }
    if (newSortBy === sortBy) {
        if (sortOrder === SORT_ORDER_ASC) {
            sortOrder = SORT_ORDER_DESC;
        } else if (sortOrder === SORT_ORDER_DESC) {
            sortBy = null;
            sortOrder = null;
        }
    } else {
        sortBy = newSortBy;
        sortOrder = SORT_ORDER_ASC;
    }
    updateTable();
    sortLinks.forEach((l) => {
        l.querySelector('img').src = 'icons/sort.svg';
    });
    const img = e.currentTarget.querySelector('img');
    if (sortOrder === SORT_ORDER_ASC) {
        img.src = 'icons/sort-up.svg';
    } else if (sortOrder === SORT_ORDER_DESC) {
        img.src = 'icons/sort-down.svg';
    }
  });
});

fillTable();
