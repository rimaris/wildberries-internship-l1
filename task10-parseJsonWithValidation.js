const skipCharacters = ["\n", " ", "\r", "\t"];
function parseJsonWithValidation(jsonString) {
  let index = 0;

  // парсим все возможные значения
  function parseValue() {
    const char = jsonString[index];

    if (char === "{") {
      return parseObject();
    } else if (char === "[") {
      return parseArray();
    } else if (char === '"') {
      return parseString();
    } else if (char === "t" || char === "f") {
      return parseBoolean();
    } else if (char === "n") {
      return parseNull();
    } else if ((char >= "0" && char <= "9") || char === "-") {
      return parseNumber();
    } else if (skipCharacters.includes(char)) {
      index++;
    } else {
      throw new SyntaxError(`Unexpected character at position ${index}`);
    }
  }

  // парсим json-объект
  function parseObject() {
    // объект всегда начинается с символа '{'
    if (jsonString[index] !== "{") {
      throw new SyntaxError(`Expected '{' at position ${index}`);
    }
    index++;
    const obj = {};
    while (jsonString[index] !== "}") {
      // пропускаем пробелы перед ключом
      skipSpaces();
      const key = parseString();
      // пропускаем пробелы между ключом и двоеточием
      skipSpaces();
      // после ключа должно быть двоеточие
      if (jsonString[index] !== ":") {
        throw new SyntaxError(`Expected ':' at position ${index}`);
      }
      index++;
      // парсим то, что после двоеточия. Это может быть любое значение
      const value = parseValue();
      obj[key] = value;
      // пропускаем пробелы после значения
      skipSpaces();
      if (jsonString[index] === ",") {
        index++;
      }
    }

    // в конце объекта должен быть символ '}'
    if (jsonString[index] !== "}") {
      throw new SyntaxError(`Expected '}' at position ${index}`);
    }
    index++;
    return obj;
  }

  // парсим json-массив
  function parseArray() {
    // в начале массива должен быть символ '['
    if (jsonString[index] !== "[") {
      throw new SyntaxError(`Expected '[' at position ${index}`);
    }
    index++;
    const arr = [];

    // парсим символы, пока массив не закончится
    while (jsonString[index] !== "]") {
      // парсим очередное значение массива
      const value = parseValue();
      arr.push(value);
      // пропускаем пробелы между значением и запятой
      skipSpaces();
      // после значения должна быть запятая
      if (jsonString[index] === ",") {
        index++;
      }
    }

    if (jsonString[index] !== "]") {
      throw new SyntaxError(`Expected ']' at position ${index}`);
    }
    index++;
    return arr;
  }

  function parseString() {
    // в начале строки должна быть кавычка
    if (jsonString[index] !== '"') {
      throw new SyntaxError(`Expected '"' at position ${index}`);
    }
    index++;
    let value = "";
    // добавляем символы в value, пока не встретим закрывающуюся кавычку
    while (jsonString[index] !== '"') {
      value += jsonString[index];
      index++;
    }
    index++;
    return value;
  }

  function parseBoolean() {
    // если первый символ t, значит должно быть true
    if (jsonString[index] === "t") {
      if (jsonString.slice(index, index + 4) === "true") {
        index += 4;
        return true;
      }
    } else if (jsonString[index] === "f") {
      if (jsonString.slice(index, index + 5) === "false") {
        index += 5;
        return false;
      }
    }
    throw new SyntaxError(`Expected 'true' or 'false' at position ${index}`);
  }

  function parseNull() {
    if (jsonString.slice(index, index + 4) === "null") {
      index += 4;
      return null;
    }
    throw new SyntaxError(`Expected 'null' at position ${index}`);
  }

  function parseNumber() {
    let start = index;
    // ищем конец числа
    while (
      (jsonString[index] >= "0" && jsonString[index] <= "9") ||
      jsonString[index] === "-" ||
      jsonString[index] === "." ||
      jsonString[index] === "e" ||
      jsonString[index] === "E"
    ) {
      index++;
    }
    // берем подстроку с числом и пытаемся ее парсить
    const numStr = jsonString.slice(start, index);
    const num = parseFloat(numStr);
    if (isNaN(num)) {
      throw new SyntaxError(`Invalid number at position ${start}`);
    }
    return num;
  }

  function skipSpaces() {
    while (skipCharacters.includes(jsonString[index])) {
      index += 1;
    }
  }

  return parseValue();
}
