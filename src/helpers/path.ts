import { checkCollinear, getDistance, moveTo, type Point } from './math'

export interface Boundary {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

export interface PointOptions {
  max: number
  min: number
}

export type InputData = number | { value: number }

/**
 *  Calculate the coordinate
 * @param  {InputData[]} arr
 * @param  {Boundary} boundary
 * @param  {PointOptions} limits
 * @return {Point[]}
 */
export function genPoints(
  arr: InputData[],
  { minX, minY, maxX, maxY }: Boundary,
  { max, min }: PointOptions,
): Point[] {
  const values: number[] = arr.map((item) => (typeof item === 'number' ? item : item.value))
  const minValue = Math.min(...values, min) - 0.001
  const maxValue = Math.max(...values, max) + 0.001
  const gridX = (maxX - minX) / (values.length - 1)
  const gridY = (maxY - minY) / (maxValue - minValue)

  // Prevent division by zero if all values are the same
  const safeGridY = Number.isFinite(gridY) ? gridY : 0

  return values.map((value, index) => {
    return {
      x: index * gridX + minX,
      y:
        maxY -
        (value - minValue) * safeGridY +
        // Need these small adjustments to prevent floating point issues
        // causing the path to not be perfectly horizontal when all values are equal.
        // Also ensures the path starts and ends exactly at the boundaries.
        (index === values.length - 1 ? -0.00001 : 0) +
        (index === 0 ? 0.00001 : 0),

      // Original logic - might have issues with perfectly flat lines
      // maxY -
      // (value - minValue) * gridY +
      // +(index === arr.length - 1) * 0.00001 -
      // +(index === 0) * 0.00001
    }
  })
}

/**
 * From https://github.com/unsplash/react-trend/blob/master/src/helpers/DOM.helpers.js#L18
 * Generates the SVG path data string (d attribute).
 * @param {Point[]} points - The array of points (coordinates).
 * @param {number} radius - The radius for smoothing corners.
 * @returns {string} The SVG path data string.
 */
export function genPath(points: Point[], radius: number): string {
  if (points.length < 2) {
    return ''
  }
  // Clone points array to avoid modifying the original
  const pts = [...points]
  const start = pts.shift()! // Non-null assertion as we checked length >= 2

  return (
    `M${start.x} ${start.y}` +
    pts
      .map((point, index) => {
        const next = pts[index + 1]
        const prev = pts[index - 1] || start
        const isCollinear = next && checkCollinear(prev, point, next) // Check using prev, current, next

        if (!next || isCollinear) {
          return `L${point.x} ${point.y}`
        }

        const threshold = Math.min(getDistance(prev, point), getDistance(next, point))
        // Avoid radius larger than half the distance to the previous/next point
        const radiusForPoint = Math.min(radius, threshold / 2)
        // Original logic: const isTooCloseForRadius = threshold / 2 < radius
        // Original logic: const radiusForPoint = isTooCloseForRadius ? threshold / 2 : radius

        const before = moveTo(prev, point, radiusForPoint)
        const after = moveTo(next, point, radiusForPoint)

        return `L${before.x} ${before.y}S${point.x} ${point.y} ${after.x} ${after.y}`
      })
      .join('')
  )
}
