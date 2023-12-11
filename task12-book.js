const book = {
    title: 'Поющие в терновнике',
    author: 'Колин Маккалоу',
    year: 1977,
  
    // Метод для получения названия книги
    getTitle: function () {
      return this.title;
    },
  
    // Метод для изменения названия книги
    setTitle: function (newTitle) {
      this.title = newTitle;
    },
  
    // Метод для получения автора книги
    getAuthor: function () {
      return this.author;
    },
  
    // Метод для изменения автора книги
    setAuthor: function (newAuthor) {
      this.author = newAuthor;
    },
  
    // Метод для получения года издания книги
    getYear: function () {
      return this.year;
    },
  
    // Метод для изменения года издания книги
    setYear: function (newYear) {
      this.year = newYear;
    },
  };
  
  // Пример использования методов:
  console.log('Название книги:', book.getTitle());
  console.log('Автор книги:', book.getAuthor());
  console.log('Год издания книги:', book.getYear());
  
  book.setTitle('Война и мир');
  book.setAuthor('Лев Толстой');
  book.setYear(1867);
  
  console.log('Название книги после изменения:', book.getTitle());
  console.log('Автор книги после изменения:', book.getAuthor());
  console.log('Год издания книги после изменения:', book.getYear());
  