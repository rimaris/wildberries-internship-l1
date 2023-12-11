function getImageData(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = function () {
      // При успешной загрузке изображения, разрешаем промис данными об изображении.
      resolve(image);
    };

    image.onerror = function () {
      // В случае ошибки загрузки, отклоняем промис с сообщением об ошибке.
      reject(new Error(`Ошибка загрузки изображения по URL: ${url}`));
    };

    image.src = url;
  });
}

// Пример использования:
const imageUrl = 'https://example.com/image.jpg';

loadImage(imageUrl)
  .then((image) => {
    console.log('Изображение успешно загружено:', image);
    // Теперь у вас есть доступ к изображению, и вы можете использовать его.
  })
  .catch((error) => {
    console.error('Ошибка загрузки изображения:', error);
  });
