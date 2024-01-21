import { lerp } from "./utils";


/**
 * Vector Class
 * 
 * The `Vector` class represents a 2D vector and provides methods for vector operations.
 */
export default class Vector {
    //#region General vectors
    /**
     * The zero vector (0, 0).
     */
    static get zero(): Vector {
        return new Vector();
    }

    /**
     * The vector with components (1, 1).
     */
    static get one(): Vector {
        return new Vector(1, 1);
    }

    /**
     * The unit vector pointing upward (0, 1).
     */
    static get up(): Vector {
        return new Vector(0, 1);
    }

    /**
     * The unit vector pointing downward (0, -1).
     */
    static get down(): Vector {
        return new Vector(0, -1);
    }

    /**
     * The unit vector pointing leftward (-1, 0).
     */
    static get left(): Vector {
        return new Vector(-1, 0);
    }

    /**
     * The unit vector pointing rightward (1, 0).
     */
    static get right(): Vector {
        return new Vector(1, 0);
    }
    //#endregion

    private _x: number = 0;
    private _y: number = 0;

    /**
     * Constructor for the Vector class.
     * @param x - The x of the vector (default is 0).
     * @param y - The y of the vector (default is 0).
     */
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

    //#region Operation methods
    /**
     * Adds two vectors.
     * @param v1 - The first vector.
     * @param v2 - The second vector.
     * @returns A new vector representing the sum of the input vectors.
     */
    static add(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    /**
     * Subtracts the second vector from the first vector.
     * @param v1 - The first vector.
     * @param v2 - The second vector.
     * @returns A new vector representing the result of the subtraction.
     */
    static subtract(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    /**
     * Multiplies a vector by a scalar.
     * @param v - The vector.
     * @param scalar - The scalar value.
     * @returns A new vector representing the result of the multiplication.
     */
    static multiply(v: Vector, scalar: number): Vector {
        return new Vector(v.x * scalar, v.y * scalar);
    }

    /**
     * Divides a vector by a scalar.
     * @param v - The vector.
     * @param scalar - The scalar value.
     * @returns A new vector representing the result of the division.
     */
    static divide(v: Vector, scalar: number): Vector {
        return new Vector(v.x / scalar, v.y / scalar);
    }

    /**
     * Divides one vector by another vector component-wise.
     * @param v1 - The numerator vector.
     * @param v2 - The denominator vector.
     * @returns A new vector representing the result of the component-wise division.
     */
    static divideVec(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x / v2.x, v1.y / v2.y);
    }

    /**
     * Multiplies one vector by another vector component-wise.
     * @param v1 - The first vector.
     * @param v2 - The second vector.
     * @returns A new vector representing the result of the component-wise multiplication.
     */
    static multiplyVec(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x * v2.x, v1.y * v2.y);
    }
    //#endregion

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

    /**
     * Calculates the distance between two vectors.
     * @param v1 - The first vector.
     * @param v2 - The second vector.
     * @returns The distance between the two vectors.
     */
    static distance(v1: Vector, v2: Vector) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2))
    }

}

