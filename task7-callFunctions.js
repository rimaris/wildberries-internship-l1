function callFunctions(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(`calling function №${i + 1}`);
    arr[i]();
  }
}
