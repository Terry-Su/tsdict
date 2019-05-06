import cloneDeep from 'lodash/cloneDeep'
import debounce from 'lodash/debounce'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import includes from 'lodash/includes'
import intersection from 'lodash/intersection'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isDate from 'lodash/isDate'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import isNull from 'lodash/isNull'
import isNumber from 'lodash/isNumber'
import isObject from 'lodash/isObject'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import mapValues from 'lodash/mapValues'
import pick from 'lodash/pick'
import uniq from 'lodash/uniq'
import uniqWith from 'lodash/uniqWith'
import values from 'lodash/values'

export {
  isNil,
  isNull,
  isUndefined,
  isArray,
  isObject,
  isEqual,
  
	cloneDeep,
	includes,
  uniq,
  uniqWith,
	intersection,
  mapValues,
  values,
	isPlainObject,
	isNumber,
	isBoolean,
	isString,
	isDate,
  find,
  pick,
  findIndex,

  debounce
}

export const isIndexFound = ( index: number ) => index !== -1

export const notIndexFound = ( index: number ) => isIndexFound( index )

export const notNil = ( value: any ) => !isNil( value )
export const notUndefined = ( value: any ) => !isUndefined( value )
