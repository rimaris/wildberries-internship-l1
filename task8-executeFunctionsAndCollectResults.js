function executeFunctionsAndCollectResults(functions) {
  return function () {
    const results = [];

    // обходим функции из замыкания и сохраняем результат в массив
    for (let i = 0; i < functions.length; i++) {
      const result = functions[i]();
      results.push(result);
    }
    return results;
  };
}

