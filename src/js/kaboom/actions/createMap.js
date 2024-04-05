import { scaleFactor } from "../../constants";
import { player } from "../actors/Player";
import { displayDialogue } from "../../utils";
import { dialogueData } from "../../constants";

//handle all layers created by Tiled
export const createMap = async (k) => {
  const mapData = await (await fetch("./assets/map.json")).json();
  const layers = mapData.layers;
  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;
            displayDialogue(
              dialogueData[boundary.name],
              () => (player.isInDialogue = false)
            );
          });
        }
      }
      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }
}
