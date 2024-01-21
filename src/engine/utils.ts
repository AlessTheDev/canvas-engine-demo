import GameObject from "./GameObject";
import Vector from "./Vector";
import PhysicsObject from "./default_gameobjects/PhysicsObject";

/**
 * Removes an object from an array (error free)
 * @param array the array
 * @param obj the object to remove
 */
function removeFromArray<T>(array: Array<T>, obj: T) {
    const index = array.indexOf(obj);

    if (index != -1) {
        array.splice(index, 1);
    }
}

/**
 * Calculate the distance between 2 GameObjects
 * @param a The first GameObject
 * @param b The second GameObject
 * @returns 
 */
function distance(a: GameObject, b: GameObject) {
    return Vector.distance(a.position, b.position);
}

/**
 * Random int between min inclusive and max exclusive
 * @param min the min number of the range
 * @param max the max number of the range
 * @returns 
 */
function randomIntFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}

function lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
}

//#region Object utils
/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity: { x: number, y: number }, angle: number) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
* Swaps out two colliding particles' x and y velocities after running through
* an elastic collision reaction equation
*
* @param  Object | particle      | A particle object with x and y coordinates, plus velocity
* @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
* @return Null | Does not return a value
*/

function resolveCollision(particle: PhysicsObject, otherParticle: PhysicsObject) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.position.x - particle.position.x;
    const yDist = otherParticle.position.y - particle.position.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(xDist, yDist);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}
//#endregion

function drawCircle(ctx: CanvasRenderingContext2D, pos: Vector, radius: number, color: string = "black") {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}
function drawImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement, pos: Vector, scale: Vector) {
    ctx.drawImage(image, pos.x - scale.x / 2, pos.y - scale.y / 2, scale.x, scale.y);
}




export { removeFromArray, distance, resolveCollision, rotate, randomIntFromRange, lerp, drawCircle, drawImage }