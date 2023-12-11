function getPluralForm(count, forms) {
  // первая форма (например, "одно сообщение") используется, когда число оканчивается на 1, но не оканчивается на 11
  if (count % 10 == 1 && count % 100 != 11) {
    return forms[0];
  }
  // вторая форма (например, "два сообщения") когда число оканчивается на 2, 3, 4, но не оканчивается на число от 10 до 19
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    return forms[1];
  }
  // третья форма (например, "пятнадцать сообщений") используется, во всех остальных случаях
  return forms[2];
}

console.log(getPluralForm(15, ["сообщение", "сообщения", "сообщений"]));