export interface Point {
  x: number
  y: number
}

// Using parseInt for checking collinearity might lead to precision issues
// with floating-point numbers. Comparing floating points directly for equality
// is generally discouraged. Using a small tolerance (epsilon) is better,
// or checking if the slope is the same. However, the original logic used parseInt.
// Let's keep the core logic but acknowledge this potential issue.
function int(value: number): number {
  // Original used parseInt, which truncates. Math.round might be slightly better
  // if the intention was to compare visually close points on a pixel grid.
  // Let's stick to parseInt to maintain original behavior.
  return parseInt(value.toString(), 10)
}

/**
 * Checks if three points are collinear (lie on the same straight line).
 * https://en.wikipedia.org/wiki/Collinearity
 * It checks if the midpoint of p0 and p2 is approximately equal to p1.
 * Note: Uses integer comparison, which might have precision issues.
 * @param {Point} p0 - The first point.
 * @param {Point} p1 - The second point (middle).
 * @param {Point} p2 - The third point.
 * @returns {boolean} True if the points are collinear, false otherwise.
 */
export function checkCollinear(p0: Point, p1: Point, p2: Point): boolean {
  // Avoid division by zero if points are identical
  if ((p0.x === p1.x && p0.y === p1.y) || (p1.x === p2.x && p1.y === p2.y)) {
    return true
  }
  // Original check using integer comparison
  return int(p0.x + p2.x) === int(2 * p1.x) && int(p0.y + p2.y) === int(2 * p1.y)
  // Alternative check using slope (more robust for floats, handles vertical lines):
  // const slope1 = (p1.y - p0.y) * (p2.x - p1.x);
  // const slope2 = (p2.y - p1.y) * (p1.x - p0.x);
  // return Math.abs(slope1 - slope2) < 1e-9; // Using a small epsilon
}

/**
 * Calculates the Euclidean distance between two points.
 * @param {Point} p1 - The first point.
 * @param {Point} p2 - The second point.
 * @returns {number} The distance between the two points.
 */
export function getDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

/**
 * Calculates a point on the line segment between 'from' and 'to',
 * at a specified distance ('radius') from the 'from' point.
 * @param {Point} to - The target point.
 * @param {Point} from - The starting point.
 * @param {number} radius - The distance from the 'from' point.
 * @returns {Point} The calculated point.
 */
export function moveTo(to: Point, from: Point, radius: number): Point {
  const vector = { x: to.x - from.x, y: to.y - from.y }
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

  // Handle case where points are identical to avoid division by zero
  if (length === 0) {
    return { ...from } // Return the starting point
  }

  const unitVector = { x: vector.x / length, y: vector.y / length }

  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius,
  }
}
