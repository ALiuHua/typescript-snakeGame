import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
class GameController {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  //存储按键方向
  direction: string = "";
  //记录游戏是否结束
  isLive = true;
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 1);
    this.init();
  }
  //游戏初始化，调用后游戏即开始
  init() {
    //绑定keyboard事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    // 第一个this指向对象， 因为时this.init()方法调用，
    // this.keydownHandler 函数里的this指向document，即event Listener的添加对象
    //可以使用bind绑定this，或者使用箭头函数
    this.run();
  }
  //创建keydown handler
  keydownHandler(event: KeyboardEvent) {
    // console.log(event.key);  // event.key return ArrowUp ArrowDown ArrowRight ArrowLeft
    //检查按键是否合法

    //修改key direction属性
    this.direction = event.key;
  }
  // 创建蛇移动的方法
  run() {
    //up
    //down
    //left
    //right
    //获取蛇的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.direction) {
      case "ArrowUp":
        Y -= 10;
        break;
      case "ArrowDown":
        Y += 10;
        break;
      case "ArrowLeft":
        X -= 10;
        break;
      case "ArrowRight":
        X += 10;
        break;
    }
    //检查是否吃到食物
    this.checkEat(X, Y);
    //修改蛇的坐标值
    try {
      //this is the way how we call setter in typescript
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      // 说明游戏进入异常
      alert((e as Error).message + "Game over!");
      //游戏结束了
      this.isLive = false;
    }

    //开启一个定时调用
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  //定义一个方法，用来检查蛇是否吃到了食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      console.log("吃到食物了");
      //食物位置重置
      this.food.changeLocation();
      //分数增加
      this.scorePanel.addScore();
      //蛇要增加一节
      this.snake.addBody();
    }
  }
}
export default GameController;
