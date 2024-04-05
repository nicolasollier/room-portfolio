import { scaleFactor } from "../../constants";
import { k } from "../kaboomCtx";

//create the player entity
export const player = k.make([
  k.sprite("spritesheet", { anim: "idle-down" }),
  k.area({
    shape: new k.Rect(k.vec2(0, 3), 10, 10),
  }),
  k.body(),
  k.anchor("center"),
  k.pos(),
  k.scale(scaleFactor),
  {
    speed: 250,
    direction: "down",
    isInDialogue: false,
  },
  "player",
]);
