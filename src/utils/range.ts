/**
 * Ascending inclusive range generator
 * 
 * @param   {Integer}  min    the min value in the range
 * @param   {Integer}  max    the max value in the range
 * @returns {Array}           the range
 */
export default function range (min: number, max: number): number[] {
  return Array(max + 1 - min).fill(0).map( (_, i)=> i + min )
}