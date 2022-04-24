export type ValueType = number

export type ImplementType = 'multiply' | 'subtract' | 'addition' | 'divide'

/** 乘法 */
export function multiply(multiplier: ValueType, multiplicand: ValueType): number

/** 减法 */
export function subtract(minuend: ValueType, subtrahend: ValueType): number

/** 加法 */
export function addition(augend: ValueType, addend: ValueType): number

/** 除法 */
export function divide(dividend: ValueType, divisor: ValueType): number

/** 链式运算 */
export function chain(numb?: ValueType | ValueType[], type?: ImplementType): {
  /** 累计值, 可以通过索引获取 */
  value: number
  /** 乘法 */
  multiply(multiplicand: ValueType): ReturnType<typeof chain>
  /** 减法 */
  subtract(subtract): ReturnType<typeof chain>
  /** 加法 */
  addition(addend: ValueType): ReturnType<typeof chain>
  /** 除法 */
  divide(divisor: ValueType): ReturnType<typeof chain>
  /** 结果值 */
  getValue(): number
}

/** 当前版本 */
export type VERSION = string