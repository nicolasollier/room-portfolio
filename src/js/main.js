import { scaleFactor } from './constants'
import { k } from './kaboom/kaboomCtx'

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
})

k.loadSprite("map", "./assets/map.png")
k.setBackground(k.color(0, 0, 0))

//Define the scene elements
k.scene("main", async () => {
  const mapData = await (await fetch("./assets/map.json")).json()
  const layers = mapData.layers

  const map = k.make([
    k.sprite("map"),
    k.pos(0),
    k.scale(scaleFactor),
  ])

  const player = k.make([
    k.sprite("spritesheet", { anim: "" }),
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
      isInDialog: false,
    },
    "player",
  ])

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: k.vec2(k.vect2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name
        ])

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialog = true
            // TODO: Show dialog
          })
        }
      }
    }
  }
})

//Run the scene
k.go("main")
