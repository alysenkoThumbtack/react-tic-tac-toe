/**
 * Encapsulate the idea of passing a new object as the first parameter
 * to Object.assign to ensure we correctly copy data instead of mutating
 */
export function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues)
}
