import "./style/index.less";
import GameController from "./modules/GameController";
const gameControll = new GameController();

setInterval(() => {
  console.log(gameControll.direction);
}, 1000);
