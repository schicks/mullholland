type Scalar = string | number | boolean | undefined | null

type ScalarsOf<T> = {[Key in keyof T]: T[Key] extends Scalar ? Key : never}[keyof T]
type ObjectsOf<T> = {[Key in keyof T]: T[Key] extends Scalar ? never : Key}[keyof T]

type Simplify<T> = T extends Function ? T : {[K in keyof T]: Simplify<T[K]>};