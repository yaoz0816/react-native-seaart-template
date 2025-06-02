/**
 * @作者 东昊
 * @日期 2024/9/13
 * @用途 带有null的类型
 */

/**
 * 自动添加 null 和 undefined 定义
 */
declare type WillNull<T> = T | null | undefined
