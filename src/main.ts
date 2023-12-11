import Scene from "./engine/Scene";
import SceneManager from "./engine/SceneManager";
import Background from "./engine/default_gameobjects/Background";
import FloatingObject from "./objects/FloatingObject";
import Wave from "./objects/Wave";

const sceneManager = new SceneManager();

const scene = new Scene(0, 0, sceneInit, true);
sceneManager.assignScene(scene);

function sceneInit() {
    // Background
    const background = new Background(
        "https://cdn.discordapp.com/attachments/1006500665842995261/1166077693993963550/9F20EFCD-6B39-4F27-92B5-C3084B026FA0.png?ex=65808c7a&is=656e177a&hm=fd42e6f01ace510e59d46a16fefbdba32b200ffc309ede220872f9f852a2d214&",
        true
    );
    scene.add(background);

    // Wave
    const halfHeight = scene.getCanvasHeight() / 2;
    const wave = new Wave(halfHeight + halfHeight / 2, 5, 25, 283);
    scene.add(wave);

    //Object test
    for (let i = 0; i < 100; i++) {
        const obj = new FloatingObject(i * 100, 200, "https://cdn.discordapp.com/emojis/1019330059263299715.webp?size=96&quality=lossless", 50, 10);
        scene.add(obj)
    }
}


