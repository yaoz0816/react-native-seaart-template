/**
 * @author 曼巴
 * @date 2023-09-15 Friday
 * @function 全局路由记录器
 * @description 记录应用导航状态，提供当前和上一个路由信息
 */

// 定义路由信息类型
type RouteInfo = {
  current: string
  previous: string
}

/**
 * 全局路由记录对象
 * 负责存储和管理应用的导航路由状态
 */
class RouteRecorderClass {
  // 私有变量存储路由信息
  private currentRouteName: string = ''
  private previousRouteName: string = ''

  /**
   * 更新路由信息
   * @param newRouteName 新的当前路由名称
   */
  updateRoutes(newRouteName: string): void {
    // 如果新路由与当前路由相同，不进行更新
    if (this.currentRouteName === newRouteName) {
      return
    }

    // 当前路由变为上一个路由
    this.previousRouteName = this.currentRouteName
    // 更新当前路由
    this.currentRouteName = newRouteName

    // 打印更新后的路由信息（开发调试用）
    if (__DEV__) {
      console.log('%c [RouteRecorder]:', 'color:#2196F3;', {
        current: this.currentRouteName,
        previous: this.previousRouteName,
      })
    }
  }

  /**
   * 初始化路由信息
   * @param initialRoute 初始路由名称
   */
  initialize(initialRoute: string): void {
    this.currentRouteName = initialRoute
    this.previousRouteName = ''
  }

  /**
   * 获取路由信息
   * @returns 当前路由和上一个路由的对象
   */
  getRoutes(): RouteInfo {
    return {
      current: this.currentRouteName,
      previous: this.previousRouteName,
    }
  }

  /**
   * 获取当前路由名称
   * @returns 当前路由名称
   */
  getCurrentRoute(): string {
    return this.currentRouteName
  }

  /**
   * 获取上一个路由名称
   * @returns 上一个路由名称
   */
  getPreviousRoute(): string {
    return this.previousRouteName
  }

  /**
   * 检查是否是特定路由
   * @param routeName 要检查的路由名称
   * @returns 当前路由是否匹配
   */
  isCurrentRoute(routeName: string): boolean {
    return this.currentRouteName === routeName
  }

  /**
   * 检查是否从特定路由导航而来
   * @param routeName 要检查的上一个路由名称
   * @returns 上一个路由是否匹配
   */
  isFromRoute(routeName: string): boolean {
    return this.previousRouteName === routeName
  }
}

// 创建单例实例
export const RouteRecorder = new RouteRecorderClass()

// 导出默认实例以符合项目规范
export default RouteRecorder
