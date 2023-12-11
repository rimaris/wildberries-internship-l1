// решение с помощью цикла
function strangeNumber(num) {
  let sum = 0;

  // проходимся по всем возможным делителям числа и проверяем их
  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      sum += i;
    }
  }
  return sum === num;
}

// Использование рекурсии для вычисления суммы делителей
function sumOfDivisors(num, divisor = 1, sum = 0) {
  // базовый случай
  if (divisor === num) {
    return sum;
  }

  if (num % divisor === 0) {
    sum += divisor;
  }

  return sumOfDivisors(num, divisor + 1, sum);
}

function strangeNumber(num) {
  const divisorsSum = sumOfDivisors(num);
  return divisorsSum === num;
}

