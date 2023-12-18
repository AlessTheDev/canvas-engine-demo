# Canvas Engine
![Canvas engine](https://repository-images.githubusercontent.com/729637256/47d7f992-6fe0-45ca-968a-bb49dd246bc7)
## What's this?

Initially designed as a header for a website, this project evolved into a small engine for those who prefer full control without relying on special libraries. The result is a customizable engine that performs well.

## How to Try the Demo

1. Clone the repository.
2. Open the cloned folder in a terminal and run `npm install`.
3. Execute `npm run dev` and open the provided link.

> If you encounter any issues, ensure that TypeScript is installed.

## Can I Use it for a Personal Project?

Absolutely! Download the source code or fork the project. Inside the "engine" folder, you'll find the main engine classes. The "objects" folder contains files used in the demo. Describe your scenes' behavior in the main file.

## Tutorial

### Scene Manager

To use the engine, let's start by creating a SceneManager in the `main.ts` file:

```tsx
const sceneManager = new SceneManager();
```

This automatically displays a DefaultScene.

### Create a Scene

Create a new Scene:

```tsx
const scene = new Scene(0, 0, sceneInit, true);
```

The boolean value sets the flex property to automatically resize the canvas based on the parent element of the `<canvas>` HTML tag.

> To set a scene with predefined width and height, use: new Scene(w, h, initFn).
> 

Now, let's explore the `sceneInit` function to add objects to the scene.

### Add an Object to a Scene

Add a background to the scene:

```ts
function sceneInit() {
    // Background
    const background = new Background("/background.png", true);
    scene.add(background);
}
```

### Display a Scene

Assign the scene to the scene manager:

```ts
sceneManager.assignScene(scene);
```

### Create GameObjects

Creating your GameObjects is essential. For instance, let's create a circle object:

```ts
export default class Circle extends GameObject {
    constructor(spawnX: number, spawnY: number, radius: number) {
        super(spawnX, spawnY, radius, radius);
    }

    draw(scene: Scene): void {
        const c = scene.context;
        c.beginPath();
        c.arc(this.x, this.y, this.width, 0, Math.PI * 2, false);
        c.fillStyle = "white";
        c.fill();
        c.closePath();
    }

    private n: number;

    update(scene: Scene): void {
        this.x += Math.sin(this.n) * 5;
        this.n += 1;
    }
}
```

### Components

Components are stored in an array in the GameObject class. Here's an example of the CenterObjectComponent:

```ts
export default class CenterObjectComponent extends Component<GameObject> {
    update(object: GameObject): void {
        const scene = SceneManager.instance.activeScene;
        object.x = scene.getCanvasWidth() / 2 - (object.width / 2);
        object.y = scene.getCanvasHeight() / 2 - (object.height / 2);
    }
}
```

To add a component to your object, use the `useComponent` method:

```ts
const text = new SimpleText(10, 50, "Default Scene");
text.useComponent(new CenterObjectComponent());
```

Keep in mind that the component's update methods get called after the object's update method:

```ts
// Update scene objects
this.objects.forEach((object: GameObject) => {
    object.update(this);
    object.runComponents();
    object.draw(this);
})
```
