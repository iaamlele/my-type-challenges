/*
  8 - 对象部分属性只读
  -------
  by Anthony Fu (@antfu) #中等 #readonly #object-keys

  ### 题目

  实现一个泛型`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

  类型 `K` 指定 `T` 中要被设置为只读 (readonly) 的属性。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

  例如

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > 在 Github 上查看：https://tsch.js.org/8/zh-CN
*/

/* _____________ 你的代码 _____________ */
// = never 是默认值，表示如果调用时没有传递 K 的值，K 会被推断为 never

// 错解1:
// type MyReadonly2<T, K extends keyof T = never> = {
//   [P in keyof T] : P extends K 
//     ? Readonly<T[P]>
//     : T[P]
// }

// 错解2: 解决不了Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>
// 如果提供`K`，提供的属性变为只读
// 如果未提供`K`，则应使所有属性都变为只读
// 因为第二个参数可能为空，所以需要通过 = 来赋默认值
// type MyExclude<T, K> = T extends K ? never : T;
// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   readonly [k in K] : T[k]
// } & {
//   [k in MyExclude<keyof T, K>] : T[k]
// }

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [p in K] : T[p]
} & {
  [p in keyof T as p extends K ? never : p] : T[p]
}

/* _____________ 测试用例 _____________ */
import type { Alike, Expect } from '@type-challenges/utils'
import path from 'path'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/8/answer/zh-CN
  > 查看解答：https://tsch.js.org/8/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
