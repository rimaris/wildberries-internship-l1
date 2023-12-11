function JSONToString(obj) {
  if (typeof obj !== "object" || obj === null) {
    // Если obj не является объектом, просто вернуть его в виде строки
    if (typeof obj === "string") {
      return `"${obj}"`;
    }
    return String(obj);
  } else if (Array.isArray(obj)) {
    // Если obj - массив, обработать его элементы
    const arrayString = obj.map((item) => JSONToString(item)).join(",");
    return `[${arrayString}]`;
  } else {
    // Если obj - объект, обработать его свойства
    const objectString = Object.keys(obj)
      .map((key) => `"${key}":${JSONToString(obj[key])}`)
      .join(",");
    return `{${objectString}}`;
  }
}
