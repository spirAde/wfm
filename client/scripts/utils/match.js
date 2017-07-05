/**
 * Find target by key in variants.
 * If function founded, call it and result which returns
 * If not founded return def (`null` if not defined)
 *
 * @param  {Any} target        Value of any type to match
 * @param  {Object} variants   Hash of values with match by key
 * @param  {*} def           Value return by default if no one key is matched
 * @return {Any}               Matched value or default
 */
export function match(target, variants = {}, def = null) {
  function callOrReturn(value) {
    return typeof value === 'function'
      ? value()
      : value;
  }

  return callOrReturn(
    Object.prototype.hasOwnProperty.call(variants, target)
      ? variants[target]
      : def,
  );
}

/**
 * Get `typeof` target and find `number`, `string`, `boolean` etc. in variants
 * If function founded call it and return it's result
 * If no founded return def (`null` if not defined)
 *
 * @param  {Any} target        Value of any type to match
 * @param  {Object} variants   Hash of values with match by key
 * @param  {Any} def           Value return by default if no one key is matched
 * @return {Any}               Matched value or default
 */
export function matchType(target, variants = {}, def = null) {
  let type = typeof target;
  if (Array.isArray(target)) {
    type = 'array';
  }

  return match(type, variants, def);
}

/**
 * Find target in variants by key and return it
 * Not call if function founded
 * If no founded return def (`null` if not defined)
 *
 * @param  {Any} target        Value of any type to match
 * @param  {Object} variants   Hash of values with match by key
 * @param  {Any} def           Value return by default if no one key is matched
 * @return {*} Matched value or default
 */
export function matchStrict(target, variants, def) {
  if (typeof variants !== 'object') throw new Error('Variants must be object');
  if (typeof def === 'undefined') throw new Error('Default value cannot be undefined');

  return Object.prototype.hasOwnProperty.call(variants, target)
    ? variants[target]
    : def;
}

export default match;
