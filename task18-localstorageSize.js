const KEY = 'tst';
const MAX_SIZE_KILOBYTES = 1000000;

function backupLocalStorage(localStorageBackup) {
    for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        localStorageBackup[key] = value;
    }
    localStorage.clear();
}

function restoreLocalStorage(localStorageBackup) {
    for (const [key, value] of Object.entries(localStorageBackup)) {
        localStorage.setItem(key, value);
    }
}

function binarySearch(func, val, l=-1, r=MAX_SIZE_KILOBYTES) {
    // продолжаем пока между левым и правым индексом есть хоть один элемент
    while (l < r - 1) {
        // берем элемент посередине
        let x = Math.floor((l+r)/2);
        // если значение функции меньше, ищем в правой части
        if (func(x) < val) {
            l = x;
        } else {
            // иначе ищем в левой части
            r = x;
        }
    }
    return r;
}

// функция возвращает 1, если удалось записать нужный объем килобайт в localStorage
function tryWrite(kilobytes) {
    try {
        localStorage.setItem(KEY, 'a'.repeat(1024*kilobytes));
    } catch {
        return 1;
    }
    return 0;
}

function getMaxLocalStorageSizeWithBinarySearch() {
    const localStorageBackup = {};
    try {
        backupLocalStorage(localStorageBackup);
        // бинарный поиск найдет первое значение, равное 1
        result = binarySearch(tryWrite, 1) - 1;
        return result;
    } finally {
        localStorage.removeItem(KEY);
        restoreLocalStorage(localStorageBackup);
    }
}

function getMaxLocalStorageSizeWithCycle() {
    const localStorageBackup = {};
    try {
        backupLocalStorage(localStorageBackup);
        var minMaxSize = null;
        // сначала пытаемся найти с большим шагом
        for (let i = 1; i < MAX_SIZE_KILOBYTES; i += 100) {
            if (tryWrite(i)) {
                minMaxSize = i - 100;
                break;
            }
        }
        if (minMaxSize === null) {
            return null;
        }
        // если нашли с большим шагом, пытаемся найти с маленьким шагом
        for (let i = minMaxSize; i < minMaxSize + 100; i++) {
            if (tryWrite(i)) {
                return i - 1;
            }
        }
        return null;
    } finally {
        localStorage.removeItem(KEY);
        restoreLocalStorage(localStorageBackup);
    }
}