const MathX = (function () {
  const cache = {}; // Кеш для хранения результатов
  const primeNumbersCache = {};

  // Функция для вычисления N-го числа в ряду Фибоначи
  function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 0) return 1;

    if (cache[n]) {
      return cache[n];
    } else {
      const result = fibonacci(n - 1) + fibonacci(n - 2);
      cache[n] = result;
      return result;
    }
  }

  // Функция для вычисления всех чисел в ряду Фибоначчи до чисел N
  function fibonacciSeries(n) {
    const series = [];

    for (let i = 0; i <= n; i++) {
      series.push(fibonacci(i));
    }

    return series;
  }

  // Функция для проверки, является ли число простым
  function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num in primeNumbersCache) {
      return primeNumbersCache[num];
    } else {
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          primeNumbersCache[num] = false;
          return false;
        }
      }
      primeNumbersCache[num] = true;
      return true;
    }
  }

  // Функция для вычисления N-го простого числа, отсчет начинается с нуля
  function nthPrime(n) {
    if (n <= 0) return undefined;
    let count = 0;
    let num = 2;

    while (true) {
      if (isPrime(num)) {
        count++;
        if (count-1 === n) {
          return num;
        }
      }
      num++;
    }
  }

  // Функция для вычисления всех простых чисел до числа N

  function primeSeries(n) {
    const series = [];
    for (let i = 2; i <= n; i++) {
      if (isPrime(i)) {
        series.push(i);
      }
    }
    return series;
  }

  return {
    fibonacci,
    fibonacciSeries,
    nthPrime,
    primeSeries,
  };
})();
