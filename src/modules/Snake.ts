class Snake {
  //表示蛇头的元素
  head: HTMLElement;
  body: HTMLCollection; // 包含蛇头（里面的元素会随着变化实时更新）,里面的内型element
  //蛇的容器
  element: HTMLElement;
  constructor() {
    //querySelector 只会获取满足条件的第一个元素
    // querySelectorAll 会返回一个node list， 不会实时更新，其值保持为获取时的值
    //https://www.w3schools.com/js/js_htmldom_nodelist.asp
    this.head = document.querySelector("#snake > div") as HTMLElement;
    // this.body = document.querySelectorAll("#snake > div")!;
    this.element = document.getElementById("snake")!;
    this.body = this.element.getElementsByTagName("div");
  }

  //获取蛇头的坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  //设置头的坐标
  set X(value: number) {
    if (this.X === value) return;

    //修改x时是在修改水平坐标，蛇在往左走时，不能向右掉头
    if (this.body[1] && (this.body[1] as HTMLElement).offsetLeft === value) {
      console.log("蛇掉头了");

      if (this.X < value) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    //是否撞墙（0-290）
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了");
    }
    //移动身体
    this.moveBody();
    this.head.style.left = value + "px";
    this.checkHeadBody();
  }
  set Y(value: number) {
    if (this.Y === value) return;

    if (this.body[1] && (this.body[1] as HTMLElement).offsetTop === value) {
      console.log("蛇掉头了");

      if (this.Y < value) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    //是否撞墙（0-290）
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了");
    }
    //移动身体
    this.moveBody();
    this.head.style.top = value + "px";
    this.checkHeadBody();
  }

  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  //身体移动
  moveBody() {
    // 将后边身体设置为前面身体的位置
    //遍历获取所有的身体
    for (let i = this.body.length - 1; i > 0; i--) {
      //获取前边身体位置
      let X = (this.body[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.body[i - 1] as HTMLElement).offsetTop;

      //将值设置到当前身体上
      (this.body[i] as HTMLElement).style.left = X + "px";
      (this.body[i] as HTMLElement).style.top = Y + "px";
    }
  }
  checkHeadBody() {
    //获取所有身体，检查是否和蛇头坐标发生重叠
    for (let i = 1; i < this.body.length; i++) {
      let bd = this.body[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        //蛇头撞到身体
        throw new Error("撞到身体了");
      }
    }
  }
}
export default Snake;
