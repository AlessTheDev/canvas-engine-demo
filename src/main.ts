import Scene from "./engine/Scene";
import SceneManager from "./engine/SceneManager";
import Background from "./engine/default_gameobjects/Background";
import { randomIntFromRange } from "./engine/utils";
import FloatingObject from "./objects/FloatingObject";
import Wave from "./objects/Wave";

// Mouse
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

// Scene
const objectImages = [
    "/objects/particle1.png",
    "/objects/particle2.png",
    "/objects/particle3.png",
    "/objects/particle4.png",
    "/objects/particle5.png",
]

const sceneManager = new SceneManager();

const scene = new Scene(0, 0, sceneInit, true);
sceneManager.assignScene(scene);

let lastClick = Date.now();

function sceneInit() {
    // Background
    const background = new Background(
        "/background.png",
        true
    );
    scene.add(background);

    // Wave
    const halfHeight = scene.getCanvasHeight() / 2;
    const wave = new Wave(halfHeight + halfHeight / 2, 5, 20, 251);
    scene.add(wave);

    //Spawn Initial Objects
    const objectsToSpawn = 5;
    for (let i = 0; i < objectsToSpawn; i++) {
        const obj = new FloatingObject((i + 1) * (scene.getCanvasWidth() - 20) / (objectsToSpawn + 1), 50, objectImages[randomIntFromRange(0, objectImages.length)], 50, 4);
        scene.add(obj)
    }

    addEventListener("resize", () => {
        wave.updateColliders();
    })
}

//Adds an object every time you click on the screen
addEventListener('click', () => {
    if (Date.now() - lastClick > 100) {
        addFloatingObject(mouse.x, mouse.y);
    }
})

function addFloatingObject(x: number, y: number) {
    const r = randomIntFromRange(50, 80);
    const obj = new FloatingObject(x, y, objectImages[randomIntFromRange(0, objectImages.length)], r, r / 10 + 1);
    scene.add(obj);
}






