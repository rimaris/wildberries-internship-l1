function outerFunction() {
    const outerVariable = 42;
  
    function innerFunction() {
      console.log(outerVariable); // Внутренняя функция имеет доступ к outerVariable
    }
  
    return innerFunction;
  }
  
  const closure = outerFunction(); // Внешняя функция вызывается и возвращает innerFunction
  closure(); // Вызываем внутреннюю функцию, которая имеет доступ к outerVariable

  
  