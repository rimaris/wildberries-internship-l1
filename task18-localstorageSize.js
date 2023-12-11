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

function binarySearch(func, val, l=-1, r=1000000) {
    while (l < r - 1) {
        let x = Math.floor((l+r)/2);
        if (func(x) < val) {
            l = x;
        } else {
            r = x;
        }
    }
    return r;
}

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
        for (let i = 1; i < MAX_SIZE_KILOBYTES; i += 100) {
            if (tryWrite(i)) {
                minMaxSize = i - 100;
                break;
            }
        }
        if (minMaxSize === null) {
            return null;
        }
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