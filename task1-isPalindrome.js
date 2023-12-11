
function isPalindrome(string) {
    // удаляем пробелы и переводим строку в нижний регистр 
    string = string.replace(/ /g, '').toLowerCase();

    // сравниваем строку с перевернутой строкой
    return string === string.split('').reverse().join('');
}

// решение с помощью цикла
function isPalindromeLoop(string) {
    // удаляем пробелы и переводим строку в нижний регистр
    string = string.replace(/ /g, '').toLowerCase();

    const strLength = string.length;

    for (let i = 0; i < strLength / 2; i++) {
        // сравниваем символ с сответствующим символом с конца строки
        if (string[i] !== string[strLength - 1 - i]) {
            return false;
        }
    }
    return true;
}

// рекурсивное решение 
function isPalindrome(string) {
    // удаляем пробелы и переводим строку в нижний регистр
    string = string.replace(/ /g, '').toLowerCase();

    // базовый случай рекурсии
    if (string.length <= 1) {
        return true;
    }

    // если начало и конец строки не совпадают, то возвращаем false
    if (string[0] !== string[string.length - 1]) {
        return false;
    }
    // при равенстве крайних символов переходим на следующий шаг рекурсии с крайними символами
    return isPalindrome(string.slice(1, -1));
}


