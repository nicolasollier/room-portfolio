import { k } from './kaboom/kaboomCtx'
import { createMap } from './kaboom/actions/createMap';
import { player } from './kaboom/actors/Player';
import { setCamScale } from './utils'
import { createControls } from './kaboom/actions/createControls';

k.loadSprite("spritesheet", "./assets/spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});

k.loadSprite("map", "./assets/map.png");
k.setBackground(k.Color.fromHex("#000000"));

k.scene("main", async () => {
  createMap(k);

  setCamScale(k);
  k.onResize(() => setCamScale(k));

  k.onUpdate(() => {
    k.camPos(player.worldPos().x, player.worldPos().y - 100);
  });

  createControls(k);
});

k.go("main");
