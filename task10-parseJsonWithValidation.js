const skipCharacters = ["\n", " ", "\r", "\t"];
function parseJsonWithValidation(jsonString) {
  let index = 0;

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

  function parseObject() {
    if (jsonString[index] !== "{") {
      throw new SyntaxError(`Expected '{' at position ${index}`);
    }
    index++;
    const obj = {};
    while (jsonString[index] !== "}") {
      skipSpaces();
      const key = parseString();
      skipSpaces();
      if (jsonString[index] !== ":") {
        throw new SyntaxError(`Expected ':' at position ${index}`);
      }
      index++;
      const value = parseValue();
      obj[key] = value;
      skipSpaces();
      if (jsonString[index] === ",") {
        index++;
      }
    }

    if (jsonString[index] !== "}") {
      throw new SyntaxError(`Expected '}' at position ${index}`);
    }
    index++;
    return obj;
  }

  function parseArray() {
    if (jsonString[index] !== "[") {
      throw new SyntaxError(`Expected '[' at position ${index}`);
    }
    index++;
    const arr = [];

    while (jsonString[index] !== "]") {
      const value = parseValue();
      arr.push(value);
      skipSpaces();
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
    if (jsonString[index] !== '"') {
      throw new SyntaxError(`Expected '"' at position ${index}`);
    }
    index++;
    let value = "";
    while (jsonString[index] !== '"') {
      value += jsonString[index];
      index++;
    }
    index++;
    return value;
  }

  function parseBoolean() {
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
    while (
      (jsonString[index] >= "0" && jsonString[index] <= "9") ||
      jsonString[index] === "-" ||
      jsonString[index] === "." ||
      jsonString[index] === "e" ||
      jsonString[index] === "E"
    ) {
      index++;
    }
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
