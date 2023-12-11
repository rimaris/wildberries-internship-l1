function sortObjects(objects) {
  objects.sort((a, b) => {
    if (a.age !== b.age) {
      return a.age - b.age;
    }
    if (a.name < b.name) {
      return -1;
    }
    if (a.name === b.name) {
      return 0;
    }
    return 1;
  });
}
