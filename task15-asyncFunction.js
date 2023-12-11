async function fetchData() {
    try {
      // Имитируем асинхронный запрос, например, к серверу
      const response = await fetch('https://dummyjson.com/products/1');
      
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
  
      // Распарсим полученные данные в формат JSON
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Произошла ошибка:', error);
      throw error; // Можно передать ошибку дальше
    }
  }
  
  // Используем функцию
  fetchData()
    .then(result => {
      console.log('Данные получены:', result);
    })
    .catch(error => {
      console.error('Что-то пошло не так:', error);
    });
  