// Базовый класс Shape (фигура)
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("Abstract class Shape cannot be instantiated.");
    }
  }

  // Метод для расчета площади (абстрактный метод)
  getArea() {
    throw new Error("Method getArea() must be implemented in derived classes.");
  }

  // Метод для расчета периметра (абстрактный метод)
  getPerimeter() {
    throw new Error(
      "Method getPerimeter() must be implemented in derived classes."
    );
  }
}

// Подкласс Rectangle (прямоугольник)
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  // Метод для расчета площади прямоугольника
  getArea() {
    return this.width * this.height;
  }

  // Метод для расчета периметра прямоугольника
  getPerimeter() {
    return 2 * (this.width + this.height);
  }
}

// Подкласс Circle (круг)
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  // Метод для расчета площади круга
  getArea() {
    return Math.PI * this.radius * this.radius;
  }

  // Метод для расчета длины окружности (периметра круга)
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }
}

// Подкласс Triangle (треугольник)
class Triangle extends Shape {
  constructor(side1, side2, side3) {
    super();
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  // Метод для расчета площади треугольника по формуле Герона
  getArea() {
    const s = (this.side1 + this.side2 + this.side3) / 2;
    return Math.sqrt(
      s * (s - this.side1) * (s - this.side2) * (s - this.side3)
    );
  }

  // Метод для расчета периметра треугольника
  getPerimeter() {
    return this.side1 + this.side2 + this.side3;
  }
}

// Пример использования классов:
const rectangle = new Rectangle(4, 5);
console.log("Прямоугольник:");
console.log("Площадь:", rectangle.getArea());
console.log("Периметр:", rectangle.getPerimeter());

const circle = new Circle(3);
console.log("Круг:");
console.log("Площадь:", circle.getArea());
console.log("Периметр:", circle.getPerimeter());

const triangle = new Triangle(3, 4, 5);
console.log("Треугольник:");
console.log("Площадь:", triangle.getArea());
console.log("Периметр:", triangle.getPerimeter());
