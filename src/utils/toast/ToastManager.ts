/**
 * @author 曼巴
 * @filename ToastManager.ts
 * @date 2024-12-29
 * @description 全局Toast管理器，确保同时只显示一个toast
 */

class ToastManager {
  private static instance: ToastManager
  private currentToast: any = null
  private toastHook: any = null

  private constructor() {}

  static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager()
    }

    return ToastManager.instance
  }

  // 设置toast hook引用
  setToastHook(toast: any) {
    this.toastHook = toast
  }

  // 隐藏当前显示的toast
  private hideCurrentToast() {
    if (this.currentToast && this.toastHook) {
      this.toastHook.hideAll()
      this.currentToast = null
    }
  }

  // 显示普通toast
  showNormal(message: string, duration = 1500, placement = 'center') {
    this.hideCurrentToast()

    if (this.toastHook) {
      this.currentToast = this.toastHook.show(message, {
        type: 'normal',
        duration,
        placement,
      })
    }
  }

  // 显示成功toast
  showSuccess(message: string, duration = 1500) {
    this.hideCurrentToast()

    if (this.toastHook) {
      this.currentToast = this.toastHook.show(message, {
        type: 'success',
        duration,
      })
    }
  }

  // 显示失败toast
  showFailure(message: string, duration = 1500) {
    this.hideCurrentToast()

    if (this.toastHook) {
      this.currentToast = this.toastHook.show(message, {
        type: 'failure',
        duration,
      })
    }
  }

  // 显示加载toast
  showLoading(message = '加载中...') {
    this.hideCurrentToast()

    if (this.toastHook) {
      this.currentToast = this.toastHook.show(message, {
        type: 'loading',
        duration: 0, // 加载toast不自动消失
      })
    }
  }

  // 隐藏加载toast
  hideLoading() {
    this.hideCurrentToast()
  }

  // 隐藏所有toast
  hideAll() {
    this.hideCurrentToast()
  }
}

// 导出单例实例
export const toastManager = ToastManager.getInstance()

// 便捷的静态方法
export const Toast = {
  show: (
    message: string,
    duration?: number,
    placement?: 'center' | 'bottom' | 'top',
  ) => toastManager.showNormal(message, duration, placement),
  success: (message: string, duration?: number) =>
    toastManager.showSuccess(message, duration),
  error: (message: string, duration?: number) =>
    toastManager.showFailure(message, duration),
  loading: (message?: string) => toastManager.showLoading(message),
  hide: () => toastManager.hideLoading(),
  hideAll: () => toastManager.hideAll(),
}
