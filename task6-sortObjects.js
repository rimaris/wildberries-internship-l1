function sortObjects(objects) {
  objects.sort((a, b) => {
    // Если у объектов не совпадают возраста, то сортируем по ним
    if (a.age !== b.age) {
      return a.age - b.age;
    }
    // Если имя по алфавиту находится меньше, чем у второго, то первый меньше
    if (a.name < b.name) {
      return -1;
    }
    // Если имена совпадают, то объекты равны
    if (a.name === b.name) {
      return 0;
    }
    // Иначе второй больше
    return 1;
  });
}
