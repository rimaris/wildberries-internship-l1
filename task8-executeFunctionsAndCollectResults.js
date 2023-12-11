function executeFunctionsAndCollectResults(functions) {
  return function () {
    const results = [];

    for (let i = 0; i < functions.length; i++) {
      const result = functions[i]();
      results.push(result);
    }
    return results;
  };
}

