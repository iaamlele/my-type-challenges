/*
  3 - 实现 Omit
  -------
  by Anthony Fu (@antfu) #中等 #union #built-in

  ### 题目

  不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

  `Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

  例如：

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > 在 Github 上查看：https://tsch.js.org/3/zh-CN
*/

/* _____________ 你的代码 _____________ */
// keyof T : T 类型中所有键的集合，形成一个联合类型, "title" | "description" | "completed"
// P in keyof T: 遍历 T 的键, P 依次取 "title", "description", "completed"
// as 是用来修改键名的，它允许你在映射过程中根据条件来排除某些键
// as P extends K ? never : P 的作用是将需要排除的键映射为 never，从而从结果类型中移除这些键

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P] : T[P];
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

interface Expected3 {
  readonly title: string
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/3/answer/zh-CN
  > 查看解答：https://tsch.js.org/3/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
