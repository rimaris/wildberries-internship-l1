function getLocalStoargeUsage() {
    let result = 0;
    for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const size = new Blob([value]).size;
        result += size;
    }
    return result / 1024;
}