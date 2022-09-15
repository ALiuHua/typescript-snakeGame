// Food class

class Food {
  element: HTMLElement;
  constructor() {
    //
    this.element = document.getElementById("food")!;
  }

  // 获取食物坐标x轴的方法
  get X() {
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物位置
  changeLocation() {
    // random generator
    //食物x轴  最小0 最大290  （坐标10的倍数，因为蛇移动一次是10px 一格）
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;

    this.element.style.left = left + "px";
    this.element.style.top = top + "px";
  }
}
const food = new Food();
console.log(food.X, food.Y);

export default Food;
