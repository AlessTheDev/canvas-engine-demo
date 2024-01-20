import { lerp } from "./utils";

export default class Vector {
    //#region General vectors
    static get zero(): Vector {
        return new Vector();
    }

    static get one(): Vector {
        return new Vector(1, 1);
    }

    static get up(): Vector {
        return new Vector(0, 1);
    }

    static get down(): Vector {
        return new Vector(0, -1);
    }

    static get left(): Vector {
        return new Vector(-1, 0);
    }

    static get right(): Vector {
        return new Vector(1, 0);
    }
    //#endregion

    private _x: number = 0;
    private _y: number = 0;

    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    static add(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static subtract(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static multiply(v: Vector, scalar: number): Vector {
        return new Vector(v.x * scalar, v.y * scalar);
    }

    static divide(v: Vector, scalar: number): Vector {
        return new Vector(v.x / scalar, v.y / scalar);
    }

    /**
     * Linearly interpolates between two vectors.
     *
     * @param v1 - The starting vector.
     * @param v2 - The ending vector.
     * @param t - The interpolation factor. Should be a value between 0 and 1.
     * @returns A new vector representing the result of the linear interpolation.
     *
     * @example
     * // Usage:
     * const startVector = new Vector(0, 0);
     * const endVector = new Vector(10, 20);
     * const interpolatedVector = lerp(startVector, endVector, 0.5);
     * console.log(interpolatedVector); // Outputs: Vector { x: 5, y: 10 }
     */
    static lerp(v1: Vector, v2: Vector, t: number): Vector {
        return new Vector(
            lerp(v1.x, v2.x, t),    // Interpolate x component
            lerp(v1.y, v2.y, t)     // Interpolate y component
        );
    }

    static distance(v1: Vector, v2: Vector) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2))
    }

}

