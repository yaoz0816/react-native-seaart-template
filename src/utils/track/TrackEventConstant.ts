/**
 * @author 曼巴
 * @filename TrackEventConstant.ts
 * @date 2025-04-23 星期三
 * @description 全局埋点常量汇总
 */

export type TrackEventOptions = {
  entityType: (typeof EntityType)[keyof typeof EntityType]
  entityName?: (typeof EntityName)[keyof typeof EntityName]
  pageId?: string
  objId?: string
  entityPath?: string
  objType?: number
  objPt?: string // 瀑布流作品pt
  refPageLocation?: string
  position?: string
  entityLocation?: string
  frontOperation?: string
  sessionId?: string //搜索模块需要
  requestId?: string //搜索模块需要
  searchKeywored?: string //搜索模块需要
  enSearchKeywored?: string //搜索模块需要
  obj_info?: {
    [key: string]: string | number
  } //附加参数需要
}
// entityType: string        // 实体类型，如 USER_ACTION, DIGITAL, HOME 等
// entityName: string        // 具体事件名称
// objId?: string            // 可选，对象ID
// objType?: number          // 可选，对象类型
// position?: string         // 可选，位置信息
// entityLocation?: string   // 可选，实体位置
// [key: string]: any        // 其他属性-需平台保持一致性
/**
 * 操作类型枚举
 */
export const OperationType = {
  CLICK: 'click',
  EXPOSURE: 'exposure',
}

/*** 功能位置枚举*/
export const EntityLocation = {
  HOME_LEFT_MENU: 'home, left_menu', // 首页左侧菜单
  MINE_LEFT_MENU: 'mine, left_menu', // 我的左侧菜单
  ACCOUNT_MINE_BUTTON: 'mine, account_button', // 我的账户按钮
  ACCOUNT_SETTINGS_BUTTON: 'settings, account_button', // 设置账户按钮
  HOME_SEARCH_BAR: 'homeB, search_bar', // 首页搜索栏
  MALL_BUTTON: 'homeB, mall_button', // 商城按钮
}

/** 功能模块类型枚举*/
export const EntityType = {
  HOME: 'home_module', // 首页
  MINE: 'mine_module', // 个人中心
  CREATION: 'creation_module', // 创作
  SETTINGS: 'settings_module', // 设置
  DIGITAL: 'digital_module', // 数字人
  MESSAGE: 'message_module', // 消息
  MALL: 'mall_module', // 商城
  ACCOUNT: 'account_module', // 账户
  DRAWER: 'drawer_module', // 抽屉
  ACTIVITY: 'activity_module', // 活动
  BOTTOM_TABS: 'bottom_tabs_module', // 底部tab
  COMPONENT: 'component_module', // 三合一组件配置
  USER_ACTION: 'user_action_module', // 用户行为
  WATERFALL_FLOW: 'waterfall_flow_module', // 瀑布流曝光
  SEARCH: 'search_module', // 搜索
  LOGIN_REGISTER: 'login_register_module', // 登录注册
  MALL_MODAL: 'mall_modal_module', // 商城弹窗
  APP_EXPOSURE: 'app_exposure_module', // 应用曝光
  DETAIL: 'detail_module', // 详情
  PLAY_IT: 'play_it_module', // 玩一玩
  AUDIO: 'audio_module', // 音频
  PUSH: 'push_module', // 推送
}

/** 功能名称枚举 - 按模块分组 */
export const EntityName = {
  // 首页相关
  HOME_TOP_TAB_A: 'HOME_TOP_TAB_A', // 首页顶部tab-A灰度
  HOME_TOP_TAB_B: 'HOME_TOP_TAB_B', // 首页顶部tab-B灰度
  HOME_TOP_TAB_C: 'HOME_TOP_TAB_C', // 首页顶部tab-C灰度
  HOME_SEARCH_BUTTON: 'HOME_SEARCH_BUTTON', // 首页搜索按钮
  HOME_FILTER_BUTTON: 'HOME_FILTER_BUTTON', // 筛选按钮
  HOME_AI_GENERATE: 'HOME_AI_GENERATE', // AI生成
  HOME_AI_VIDEO: 'HOME_AI_VIDEO', // AI视频
  HOME_AI_EFFECT: 'HOME_AI_EFFECT', // AI特效
  HOME_TAVERN: 'HOME_TAVERN', // 酒馆数字人
  HOME_FILTER_CONFIRM_BUTTON: 'HOME_FILTER_CONFIRM_BUTTON', // 筛选确认按钮
  HOME_FILTER_RESET_BUTTON: 'HOME_FILTER_RESET_BUTTON', // 筛选重置按钮
  HOME_QUICKLY_UPDATE_BUTTON: 'HOME_QUICKLY_UPDATE_BUTTON', // 快速更新按钮
  HOME_QUICKLY_UPDATE_CANCEL_BUTTON: 'HOME_QUICKLY_UPDATE_CANCEL_BUTTON', // 快速更新取消按钮
  HOME_WATERFALL_FLOW: 'HOME_WATERFALL_FLOW', // 瀑布流
  HOME_HORIZONTAL_LIST: 'HOME_HORIZONTAL_LIST', // 水平列表
  HOME_BANNER: 'HOME_BANNER', // 轮播图
  HOME_POST_ENTRANCE: 'HOME_POST_ENTRANCE', // 首页投稿入口

  // 底部Tab相关
  TAB_HOME_BUTTON: 'TAB_HOME_BUTTON', // 首页
  TAB_TAVERN_BUTTON: 'TAB_TAVERN_BUTTON', // 酒馆
  TAB_CREATE_BUTTON: 'TAB_CREATE_BUTTON', // 创作
  TAB_MESSAGE_BUTTON: 'TAB_MESSAGE_BUTTON', // 消息
  TAB_MINE_BUTTON: 'TAB_MINE_BUTTON', // 我的

  // 数字人相关
  DIGITAL_SEARCH: 'DIGITAL_SEARCH', // 数字人搜索
  DIGITAL_DISCOVER: 'DIGITAL_DISCOVER', // 数字人发现
  DIGITAL_MENU: 'DIGITAL_MENU', // 数字人菜单
  DIGITAL_SETTING: 'DIGITAL_SETTING', // 数字人设置
  DIGITAL_COMMENT: 'DIGITAL_COMMENT', // 数字人评论
  DIGITAL_SAME_CREATE: 'DIGITAL_SAME_CREATE', // 数字人同款创作
  DIGITAL_CREATE: 'DIGITAL_CREATE', // 数字人创作
  DIGITAL_AUTHOR: 'DIGITAL_AUTHOR', // 数字人作者
  DIGITAL_DETAIL_SHARE: 'DIGITAL_DETAIL_SHARE', // 数字人详情分享
  DIGITAL_DETAIL_REPORT: 'DIGITAL_DETAIL_REPORT', // 数字人详情举报
  DIGITAL_DETAIL_DELETE: 'DIGITAL_DETAIL_DELETE', // 数字人详情删除
  DIGITAL_DETAIL_CANCEL: 'DIGITAL_DETAIL_CANCEL', // 数字人详情取消
  DIGITAL_CHAT_TOP_NAV: 'DIGITAL_CHAT_TOP_NAV', // 数字人聊天顶部导航
  DIGITAL_CHAT_THINKING_SWITCH: 'DIGITAL_CHAT_THINKING_SWITCH', // 数字人聊天联想切换
  DIGITAL_CHAT_THINKING_EDIT: 'DIGITAL_CHAT_THINKING_EDIT', // 数字人聊天联想编辑
  DIGITAL_CHAT_REPORT: 'DIGITAL_CHAT_REPORT', // 数字人聊天举报
  DIGITAL_CHAT_SHARE: 'DIGITAL_CHAT_SHARE', // 数字人聊天分享
  DIGITAL_CHAT_FILE: 'DIGITAL_CHAT_FILE', // 数字人聊天文件
  DIGITAL_CHAT_RESET: 'DIGITAL_CHAT_RESET', // 数字人聊天重置
  DIGITAL_CHAT_INPUT_THINKING_CLICK: 'DIGITAL_CHAT_INPUT_THINKING_CLICK', // 数字人聊天输入框联想点击
  DIGITAL_CHAT_INPUT_ADD_CLICK: 'DIGITAL_CHAT_INPUT_ADD_CLICK', // 数字人聊天输入框添加按钮点击
  DIGITAL_CHAT_INPUT_SEND_CLICK: 'DIGITAL_CHAT_INPUT_SEND_CLICK', // 数字人聊天输入框发送按钮点击
  DIGITAL_CHAT_BACK: 'DIGITAL_CHAT_BACK', // 数字人聊天返回按钮
  DIGITAL_CHAT_EDIT: 'DIGITAL_CHAT_EDIT', // 数字人聊天编辑按钮
  DIGITAL_DRAWER_AUTO_REPLY: 'DIGITAL_DRAWER_AUTO_REPLY', // 数字人聊天自动回复
  DIGITAL_DRAWER_NICKNAME: 'DIGITAL_DRAWER_NICKNAME', // 数字人聊天昵称
  DIGITAL_DRAWER_GENDER: 'DIGITAL_DRAWER_GENDER', // 数字人聊天性别
  DIGITAL_DRAWER_PERSONA: 'DIGITAL_DRAWER_PERSONA', // 数字人聊天个性
  DIGITAL_DRAWER_START_NEW_CHAT: 'DIGITAL_DRAWER_START_NEW_CHAT', // 数字人聊天开始新对话
  DIGITAL_DRAWER_CONTINUE_CHAT: 'DIGITAL_DRAWER_CONTINUE_CHAT', // 数字人聊天继续对话
  DIGITAL_DRAWER_FULL_SCREEN: 'DIGITAL_DRAWER_FULL_SCREEN', // 数字人聊天全屏
  DIGITAL_DRAWER_VOICE_OPENER: 'DIGITAL_DRAWER_VOICE_OPENER', // 数字人聊天语音开启
  DIGITAL_DRAWER_STREAM_CHAT: 'DIGITAL_DRAWER_STREAM_CHAT', // 数字人聊天流式对话
  DIGITAL_DRAWER_MEMORY: 'DIGITAL_DRAWER_MEMORY', // 数字人聊天记忆
  DIGITAL_DRAWER_HIDE_BG: 'DIGITAL_DRAWER_HIDE_BG', // 数字人聊天隐藏背景
  DIGITAL_DRAWER_ALL_CHAT: 'DIGITAL_DRAWER_ALL_CHAT', // 数字人聊天全部对话
  DIGITAL_DRAWER_MODEL: 'DIGITAL_DRAWER_MODEL', // 数字人聊天模型
  DIGITAL_DRAWER_TIMBRE: 'DIGITAL_DRAWER_TIMBRE', // 数字人聊天音色
  DIGITAL_DRAWER_CONVERSATION: 'DIGITAL_DRAWER_CONVERSATION', // 数字人聊天对话
  DIGITAL_DRAWER_LENGTH: 'DIGITAL_DRAWER_LENGTH', // 数字人聊天长度
  DIGITAL_DRAWER_TEMPERATURE: 'DIGITAL_DRAWER_TEMPERATURE', // 数字人聊天温度
  DIGITAL_DRAWER_DIVERSE: 'DIGITAL_DRAWER_DIVERSE', // 数字人聊天多样性
  DIGITAL_DRAWER_CONVERSATION_MODEL: 'DIGITAL_DRAWER_CONVERSATION_MODEL', // 数字人聊天对话模型
  DIGITAL_CHAT_FIND: 'DIGITAL_CHAT_FIND', // 数字人聊天发现
  DIGITAL_CHAT: 'DIGITAL_CHAT', // 数字人聊天
  DIGITAL_ADD_CHARACTER: 'DIGITAL_ADD_CHARACTER', // 数字人添加数字
  DIGITAL_PUBLISH: 'DIGITAL_PUBLISH', // 数字人发布
  DIGITAL_RESET: 'DIGITAL_RESET', // 数字人重置
  DIGITAL_ALLOW_REMIX: 'DIGITAL_ALLOW_REMIX', // 数字人允许 remix
  DIGITAL_AI_QUICK_GENERATE: 'DIGITAL_AI_QUICK_GENERATE', // AI 快速生成
  DIGITAL_MODEL_SELECTED_SAVE: 'DIGITAL_MODEL_SELECTED_SAVE', // 数字人模型选择保存
  DIGITAL_MODEL_SELECTED_CANCEL: 'DIGITAL_MODEL_SELECTED_CANCEL', // 数字人模型选择取消
  DIGITAL_MODEL_SWITCH: 'DIGITAL_MODEL_SWITCH', // 数字人模型切换
  DIGITAL_CHAT_MODEL_SWITCH: 'DIGITAL_CHAT_MODEL_SWITCH', // 数字人聊天模型切换
  DIGITAL_CHAT_MODEL_SWITCH_SAVE: 'DIGITAL_CHAT_MODEL_SWITCH_SAVE', // 数字人聊天模型切换保存
  DIGITAL_CHAT_MODEL_SWITCH_CANCEL: 'DIGITAL_CHAT_MODEL_SWITCH_CANCEL', // 数字人聊天模型切换取消
  DIGITAL_MODEL_SELECTED: 'DIGITAL_MODEL_SELECTED', // 数字人模型选择
  DIGITAL_CHAT_MODEL_SELECTED: 'DIGITAL_CHAT_MODEL_SELECTED', // 数字人聊天模型选择
  DIGITAL_CHAT_MODEL_HIGH_RECOMMENDED_USED:
    'DIGITAL_CHAT_MODEL_HIGH_RECOMMENDED_USED', // 数字人特别推荐模型的使用
  DIGITAL_CHAT_OPEN_QUESTIONNAIRE: 'DIGITAL_CHAT_OPEN_QUESTIONNAIRE', // 数字人开启聊天问卷
  DIGITAL_CHAT_QUESTIONNAIRE_SUBMIT: 'DIGITAL_CHAT_QUESTIONNAIRE_SUBMIT', // 数字人聊天问卷提交
  DIGITAL_CHAT_QUESTIONNAIRE_CLOSE: 'DIGITAL_CHAT_QUESTIONNAIRE_CLOSE', // 数字人聊天问卷关闭
  DIGITAL_CHAT_MESSAGE_RECREATE: 'DIGITAL_CHAT_MESSAGE_RECREATE', // 数字人聊天重新生成
  DIGITAL_CHAT_MESSAGE_CONTINUE_TO_CHAT:
    'DIGITAL_CHAT_MESSAGE_CONTINUE_TO_CHAT', // 数字人聊天消息继续说
  DIGITAL_CHAT_MESSAGE_EDIT: 'DIGITAL_CHAT_MESSAGE_EDIT', // 数字人聊天消息编辑
  // 创作模块相关
  CREATE_LEFT_MENU_DETAIL_BUTTON: 'CREATE_LEFT_MENU_DETAIL_BUTTON', // 左侧菜单详情按钮
  CREATE_LEFT_MENU_SWITCH_BUTTON: 'CREATE_LEFT_MENU_SWITCH_BUTTON', // 左侧菜单切换按钮
  CREATE_RIGHT_MENU_EYE_BUTTON: 'CREATE_RIGHT_MENU_EYE_BUTTON', // 右侧菜单眼睛按钮
  CREATE_RIGHT_MENU_FILTER_BUTTON: 'CREATE_RIGHT_MENU_FILTER_BUTTON', // 右侧菜单筛选按钮
  CREATE_RIGHT_MENU_BATCH_OPERATION_BUTTON:
    'CREATE_RIGHT_MENU_BATCH_OPERATION_BUTTON', // 右侧菜单批量操作按钮
  CENTER_IMAGE_VIEW: 'CENTER_IMAGE_VIEW', // 创作流中心图片视图眼睛
  CENTER_TOP_SUB_CARD_BUTTON: 'CENTER_TOP_SUB_CARD_BUTTON', // 创作流顶部横幅按钮
  CENTER_TOP_SUB_CARD_CLOSE_BUTTON: 'CENTER_TOP_SUB_CARD_CLOSE_BUTTON', // 创作流顶部横幅关闭按钮
  CENTER_EXPERIENCE_FAST_QUEUE: 'CENTER_EXPERIENCE_FAST_QUEUE', // 创作流顶部横幅体验快速队列
  CREATE_NOT_TASK_BUTTON: 'CREATE_NOT_TASK_BUTTON', // 创作流为空创建任务按钮
  CREATE_IMAGE: 'CREATE_IMAGE', // 创作流创建图片
  CREATE_VIDEO: 'CREATE_VIDEO', // 创作流创建视频
  CREATE_AI_EFFECT_BUTTON: 'CREATE_AI_EFFECT_BUTTON', // AI创建特效按钮
  CREATE_AI_APP_BUTTON: 'CREATE_AI_APP_BUTTON', // AI应用创建
  CREATE_MAGIC_BUTTON: 'CREATE_MAGIC_BUTTON', // 创作流快捷创建魔法棒
  CREATE_CLOSE_BUTTON: 'CREATE_CLOSE_BUTTON', // 创作关闭
  CREATE_APPLICATION: 'CREATE_APPLICATION', // 创作流创建应用
  CREATE_REGENERATE: 'CREATE_REGENERATE', // 创作流重新生成
  CREATE_REPORT: 'CREATE_REPORT', // 创作流举报
  CREATE_DELETE: 'CREATE_DELETE', // 创作流删除
  CREATE_AI_CREATE_SEARCH: 'CREATE_AI_CREATE_SEARCH', // AI创建搜索
  CREATE_FREE_GENERATE: 'CREATE_FREE_GENERATE', // 创作流免费生成开关
  DETAIL_PLAY_IT_ENTRANCE: 'DETAIL_PLAY_IT_ENTRANCE', // 详情页玩一玩入口
  PLAY_IT_SEARCH_QUICK_APP: 'PLAY_IT_SEARCH_QUICK_APP', // 玩一玩搜索快捷应用
  PLAY_IT_IMAGE_GENERATE_VIDEO: 'PLAY_IT_IMAGE_GENERATE_VIDEO', // 玩一玩图生视频
  PLAY_IT_GENERATE_DIGITAL_HUMAN: 'PLAY_IT_GENERATE_DIGITAL_HUMAN', // 玩一玩生成数字人
  PLAY_IT_CREATE_RANDOM_PROMPT_CLICK: 'PLAY_IT_CREATE_RANDOM_PROMPT_CLICK', // 创作随机提示词点击
  PLAY_IT_CREATE_PROMPT_POLISH_CLICK: 'PLAY_IT_CREATE_PROMPT_POLISH_CLICK', // 创作提示词润色点击
  QUICK_APP_CREATE_TO_PROMPT_INPUT_PAGE:
    'QUICK_APP_CREATE_TO_PROMPT_INPUT_PAGE', // 快应用创作 跳转 提示词输入页
  PLAY_IT_ENTER_QUICK_APP_IMAGE_UP_SCALE:
    'PLAY_IT_ENTER_QUICK_APP_IMAGE_UP_SCALE', // 玩一玩进入高清修复
  PLAY_IT_ENTER_QUICK_APP_REMOVE_BACKGROUND:
    'PLAY_IT_ENTER_QUICK_APP_REMOVE_BACKGROUND', // 玩一玩进入去除背景
  PLAY_IT_ENTER_QUICK_APP_VARIATION: 'PLAY_IT_ENTER_QUICK_APP_VARIATION', // 玩一玩进入变体
  PLAY_IT_ENTER_QUICK_APP_IMAGE_UPSCALE:
    'PLAY_IT_ENTER_QUICK_APP_IMAGE_UPSCALE', // 玩一玩进入创意超分
  CREATE_COIN_PRESS: 'CREATE_COIN_PRESS', // 创作流权益按钮
  CREATE_RESET: 'CREATE_RESET', // 创作流重置
  CREATE_SUBMIT: 'CREATE_SUBMIT', // 创作流提交
  CREATE_ADVANCED: 'CREATE_ADVANCED', // 创作流高级
  CREATE_SUBMIT_MODAL_BUTTON: 'CREATE_SUBMIT_MODAL_BUTTON', // 创作流提交弹窗按钮
  CREATE_MODEL_PRESS: 'CREATE_MODEL_PRESS', // 创作流顶部模型选择按钮
  CREATE_SIZE_PRESS: 'CREATE_SIZE_PRESS', // 创作流尺寸选择按钮
  CREATE_COUNT_PRESS: 'CREATE_COUNT_PRESS', // 创作流数量选择按钮
  CREATE_PRIVACY_PRESS: 'CREATE_PRIVACY_PRESS', // 创作流隐私选择按钮
  CREATE_MODEL_VERSION_PRESS: 'CREATE_MODEL_VERSION_PRESS', // 创作流模型版本选择按钮
  CREATE_GENERATE_MODE_STANDARD: 'CREATE_GENERATE_MODE_STANDARD', // 创作流生成模式-标准
  CREATE_GENERATE_MODE_QUALITY: 'CREATE_GENERATE_MODE_QUALITY', // 创作流生成模式-质量
  CREATE_VIDEO_DURATION_PRESS_5s: 'CREATE_VIDEO_DURATION_PRESS_5s', // 创作流视频时长选择按钮-5s
  CREATE_VIDEO_DURATION_PRESS_10s: 'CREATE_VIDEO_DURATION_PRESS_10s', // 创作流视频时长选择按钮-8s
  CREATE_COUNT_PRESS_1: 'CREATE_COUNT_PRESS_1', // 创作流数量选择按钮-1
  CREATE_COUNT_PRESS_2: 'CREATE_COUNT_PRESS_2', // 创作流数量选择按钮-2
  CREATE_DETAIL_INFO: 'CREATE_DETAIL_INFO', // 创作流信息
  CREATE_DETAIL_SEND: 'CREATE_DETAIL_SEND', // 创作流详情发送
  CREATE_DETAIL_MORE: 'CREATE_DETAIL_MORE', // 创作流详情省略号
  CREATE_DETAIL_REPORT: 'CREATE_DETAIL_REPORT', // 创作流详情举报
  CREATE_DETAIL_DELETE: 'CREATE_DETAIL_DELETE', // 创作流详情删除
  CREATE_DETAIL_DOWNLOAD: 'CREATE_DETAIL_DOWNLOAD', // 创作流详情下载
  CREATE_DETAIL_SHARE: 'CREATE_DETAIL_SHARE', // 创作流详情分享
  CREATE_DETAIL_SAVE: 'CREATE_DETAIL_SAVE', // 创作流详情保存
  CREATE_QUICK_CREATE_CHARACTER: 'CREATE_QUICK_CREATE_CHARACTER', // 创作流快捷创建数字人
  CREATE_RETRY: 'CREATE_RETRY', // 创作流重试
  CREATE_VARIATIONS: 'CREATE_VARIATIONS', // 创作流变体
  CREATE_PLAYAROUND: 'CREATE_PLAYAROUND', // 创作流玩一玩
  CREATE_UPSCALE: 'CREATE_UPSCALE', // 创作流超分
  CREATE_HDREPAIR: 'CREATE_HDREPAIR', // 创作流高清修复
  CREATE_VIDEO_UPSCALE: 'CREATE_VIDEO_UPSCALE', // 创作流视频超分
  CREATE_REMOVE_BG: 'CREATE_REMOVE_BG', // 创作流去背景
  CREATE_IMAGE_SUPER_DIVIDER: 'CREATE_IMAGE_SUPER_DIVIDER', // 创作流图像增强
  CREATE_TASK_FILTER: 'CREATE_TASK_FILTER', // 创作流筛选
  CREATE_MODEL_SELECT_TAG: 'CREATE_MODEL_SELECT_TAG', // 创作流模型选择标签
  CREATE_RESET_BUTTON: 'CREATE_RESET_BUTTON', // 创作流重置按钮
  CREATE_CONFIRM_BUTTON: 'CREATE_CONFIRM_BUTTON', // 创作流确认按钮
  CREATE_MODEL_BASE: 'CREATE_MODEL_BASE', // 创作流模型基础
  CREATE_MODEL_TYPE: 'CREATE_MODEL_TYPE', // 创作流模型类型
  CREATE_ADD_IMAGE: 'CREATE_ADD_IMAGE', // 添加图片加号按钮
  CREATE_MODEL_VERSION_SELECT: 'CREATE_MODEL_VERSION_SELECT', // 创作流模型版本选择
  CREATE_NEW_RANDOM_PROMPT_PRESS: 'CREATE_NEW_RANDOM_PROMPT_PRESS', // 创作流随机提示词
  CREATE_RANDOM_COLOR_PRESS: 'CREATE_RANDOM_COLOR_PRESS', // 创作流随机润色
  CREATE_AI_EFFECT: 'CREATE_AI_EFFECT', // 创作流AI特效
  //暂定带修改
  CREATE_MODEL_SEARCH_ACTION: 'search_query', // 创作流模型搜索
  CREATE_MODEL_SEARCH_TAG_ACTION: 'search_tag_query', // 创作流模型点击标签搜索
  CREATE_MODEL_DETAIL_ACTION: 'model_info_click', // 创作流模型点击进入详情页
  CREATE_MODEL_ITEM_CLICK: 'model_click', // 创作流模型列表点击使用
  CREATE_MODEL_SEARCH_TAG_CLICK: 'search_tag_query', // 创作流模分类触发搜索
  CREATE_MODEL_SEARCH_WIN_CLOSE: 'model_win_close', // 关闭搜索
  CREATE_MODEL_FILTER_RESULT: 'model_filter_result', // 创作流模型筛选结果
  CREATE_MODEL_SORT_RESULT: 'model_sort', // 创作流模型排序结果
  CREATE_MODEL_FILTER_CLICK: 'model_filter_click', // 创作流模型筛选点击
  // 创作笔记
  CREATE_EDIT_NOTE_SAVE_BUTTON: 'CREATE_EDIT_NOTE_SAVE_BUTTON', // 创作笔记保存按钮
  CREATE_NOTE_LIST_SAVE_BUTTON: 'CREATE_NOTE_LIST_SAVE_BUTTON', // 创作笔记列表保存按钮
  CREATE_NOTE_LIST_APPLY_BUTTON: 'CREATE_NOTE_LIST_APPLY_BUTTON', // 创作笔记列表应用按钮

  // 消息中心相关
  MESSAGE_TOP: 'MESSAGE_TOP', // 消息中心顶部
  MESSAGE_SYSTEM: 'MESSAGE_SYSTEM', // 消息中心系统消息
  MESSAGE_ACTIVITY: 'MESSAGE_ACTIVITY', // 消息中心活动消息

  // 活动相关
  ACTIVITY_WATERFALL_FLOW: 'ACTIVITY_WATERFALL_FLOW', // 活动瀑布流

  // 音频相关
  AUDIO_PREVIEW: 'AUDIO_PREVIEW', // 音频试听

  // 商城相关
  MALL_SUBSCRIPTION_BUTTON: 'MALL_SUBSCRIPTION_BUTTON', // 商城订阅按钮
  MALL_BUY_RECORD_BUTTON: 'MALL_BUY_RECORD_BUTTON', // 商城购买记录按钮
  MALL_RESUME_PURCHASE_BUTTON: 'MALL_RESUME_PURCHASE_BUTTON', // 商城恢复购买按钮
  MALL_BUY_RECORD_PAGE: 'MALL_BUY_RECORD_PAGE', // 商城购买记录页面
  MALL_BUY_LIMITED_BUTTON: 'MALL_BUY_LIMITED_BUTTON', // 商城限时优惠按钮
  MALL_BUY_PRODUCT_BUTTON: 'MALL_BUY_PRODUCT_BUTTON', // 商城购买产品按钮
  MALL_BUY_SUBSCRIPTION_BUTTON: 'MALL_BUY_SUBSCRIPTION_BUTTON', // 商城订阅按钮
  MALL_MODAL_FREE_TRIAL_BUTTON: 'MALL_MODAL_FREE_TRIAL_BUTTON', // 商城免费试用按钮
  MALL_QUICKLY_20OFF_SUB_BUTTON: 'MALL_QUICKLY_20OFF_SUB_BUTTON', // 商城快速订阅20%折扣按钮
  MALL_QUICKLY_YEARLY_SUB_BUTTON: 'MALL_QUICKLY_YEARLY_SUB_BUTTON', // 商城快速订阅年付按钮
  MALL_QUICKLY_MONTHLY_SUB_BUTTON: 'MALL_QUICKLY_MONTHLY_SUB_BUTTON', // 商城快速订阅月付按钮
  MALL_QUICKLY_BUY_BUTTON: 'MALL_QUICKLY_BUY_BUTTON', // 商城快速订阅按钮
  MALL_BEGINNER_PLAN: 'MALL_BEGINNER_PLAN', // 商城基础订阅卡
  MALL_STANDARD_PLAN: 'MALL_STANDARD_PLAN', // 商城标准订阅卡
  MALL_PRO_PLAN: 'MALL_PRO_PLAN', // 商城专业订阅卡
  MALL_MASTER_PLAN: 'MALL_MASTER_PLAN', // 商城大师订阅卡
  MALL_PRIVACY_POLICY_VIEW_BUTTON: 'MALL_PRIVACY_POLICY_VIEW_BUTTON', // 商城隐私政策按钮
  MALL_TASK_TOP_BANNER: 'MALL_TASK_TOP_BANNER', // 商城创作流顶部横幅
  MALL_TASK_TOP_BANNER_CLOSE_BUTTON: 'MALL_TASK_TOP_BANNER_CLOSE_BUTTON', // 商城创作流顶部横幅关闭按钮
  MALL_PAYMENT_POPUP_EXPOSURE: 'MALL_PAYMENT_POPUP_EXPOSURE', // 商城收银台曝光
  MALL_VIP_POWER_INSUFFICIENT_EXPOSURE: 'MALL_VIP_POWER_INSUFFICIENT_EXPOSURE', // vip算力不足弹窗曝光
  MALL_VIP_POWER_INSUFFICIENT_RETAIN_EXPOSURE:
    'MALL_VIP_POWER_INSUFFICIENT_RETAIN_EXPOSURE', // vip算力不足挽留弹窗曝光
  MALL_PAYMENT_POPUP_BUTTON: 'MALL_PAYMENT_POPUP_BUTTON', // 弹窗支付按钮
  MALL_PAYMENT_POPUP_BEGINNER_PLAN: 'MALL_PAYMENT_POPUP_BEGINNER_PLAN', // 支付弹窗基础订阅卡
  MALL_PAYMENT_POPUP_STANDARD_PLAN: 'MALL_PAYMENT_POPUP_STANDARD_PLAN', // 支付弹窗标准订阅卡
  MALL_PAYMENT_POPUP_PRO_PLAN: 'MALL_PAYMENT_POPUP_PRO_PLAN', // 支付弹窗专业订阅卡
  MALL_PAYMENT_POPUP_MASTER_PLAN: 'MALL_PAYMENT_POPUP_MASTER_PLAN', // 支付弹窗大师订阅卡
  MALL_LOCAL_PRICES_BEEN_OBTAINED: 'MALL_LOCAL_PRICES_BEEN_OBTAINED', // 是否获取到本地价格
  MALL_ALL_BENEFITS_REVEAL: 'MALL_ALL_BENEFITS_REVEAL', // 全部权益揭晓
  MALL_PAYMENT_PERIOD_SELECT_YEAR: 'MALL_PAYMENT_PERIOD_SELECT_YEAR', // 年付选择
  MALL_PAYMENT_PERIOD_SELECT_MONTH: 'MALL_PAYMENT_PERIOD_SELECT_MONTH', // 月付选择
  MALL_CREATE_PRIVATE_MODE: 'MALL_CREATE_PRIVATE_MODE', // 创作流私密模式
  MALL_CREATE_FREE_GENERATE: 'MALL_CREATE_FREE_GENERATE', // 创作流免费生成
  MALL_DIGITAL_MODEL_SELECTED: 'MALL_DIGITAL_MODEL_SELECTED', // 数字人模型选择
  MALL_DIGITAL_CREATE_PUBLIC: 'MALL_DIGITAL_CREATE_PUBLIC', // 数字人创作流公有模式
  MALL_DIGITAL_CREATE_PRIVATE: 'MALL_DIGITAL_CREATE_PRIVATE', // 数字人创作流私密模式
  MALL_NEW_50_OFF_POPUP_EXPOSURE: 'MALL_NEW_50_OFF_POPUP_EXPOSURE', // 新五折弹窗曝光
  MALL_NEW_LIMITED_TIME_50_PERCENT_OFF_POPUP:
    'new_limited_time_50_percent_off_popup', // 新五折支付按钮
  MALL_OLD_LIMITED_TIME_50_PERCENT_OFF_POPUP:
    'old_limited_time_50_percent_off_popup', // 原五折支付按钮

  // 个人中心相关
  MINE_LOGIN: 'MINE_LOGIN', // 登录
  MINE_SHARE_BUTTON: 'MINE_SHARE_BUTTON', // 分享按钮
  MINE_OPEN_DRAWER: ' MINE_OPEN_DRAWER', // 打开抽屉
  MINE_COLLECTED: 'MINE_COLLECTED', // 被收藏
  MINE_FOLLOWED: 'MINE_FOLLOWED', // 已关注
  MINE_FOLLOWERS: 'MINE_FOLLOWERS', // 粉丝
  MINE_GENERATE: 'MINE_GENERATE', // 创作
  MINE_FAVORITES: 'MINE_FAVORITES', // 收藏
  MINE_POST: 'MINE_POST', // 投稿
  MINE_CREATE_WORK: 'MINE_CREATE_WORK', // 创作作品
  MINE_CREATE_CHARACTER: 'MINE_CREATE_CHARACTER', // 创作数字人
  MINE_COLLECT_WORK: 'MINE_COLLECT_WORK', // 收藏作品
  MINE_COLLECT_MODEL: 'MINE_COLLECT_MODEL', // 收藏模型
  MINE_COLLECT_POST: 'MINE_COLLECT_POST', // 收藏投稿
  MINE_COLLECT_AI_FILTER: 'MINE_COLLECT_AI_FILTER', // 收藏AI滤镜
  MINE_COLLECT_AI_APP: 'MINE_COLLECT_AI_APP', // 收藏AI应用
  MINE_COLLECT_CHARACTER: 'MINE_COLLECT_CHARACTER', // 收藏数字人
  MINE_FILE_ADD: 'MINE_FILE_ADD', // 文件夹添加
  MINE_FILE_ALL: 'MINE_FILE_ALL', // 文件夹全部
  MINE_FILE_CLICK: 'MINE_FILE_CLICK', // 文件夹点击
  MINE_UNORGANIZED_WORKS: 'MINE_UNORGANIZED_WORKS', // 未整理
  MINE_HEADER_IMAGE: 'MINE_HEADER_IMAGE', // 我的头像
  MINE_SHARE: 'MINE_SHARE', // 我的分享
  MINE_GO_SHOP: 'MINE_GO_SHOP', // 去商城
  MINE_LEFT_MENU: 'MINE_LEFT_MENU', // 我的左侧菜单
  MINE_CREATE_POST: 'MINE_CREATE_POST', // 我的创作投稿
  MINE_EDIT_POST: 'MINE_EDIT_POST', // 我的编辑投稿
  MINE_WORKS_POST: 'MINE_WORKS_POST', // 我的作品投稿
  MINE_VIDEO_POST: 'MINE_VIDEO_POST', // 我的视频投稿
  MINE_ARTICLE_POST: 'MINE_ARTICLE_POST', // 我的文章投稿
  MINE_POST_UPLOAD_BUTTON: 'MINE_POST_UPLOAD_BUTTON', // 我的投稿上传图片按钮
  MINE_POST_IMAGE_ITEM: 'MINE_POST_IMAGE_ITEM', // 我的投稿图片item
  MINE_IMAGE_GENERATION_POST_BUTTON: 'MINE_IMAGE_GENERATION_POST_BUTTON', // 我的创作图片生成按钮
  MINE_VIDEO_GENERATION_POST_BUTTON: 'MINE_VIDEO_GENERATION_POST_BUTTON', // 我的创作视频生成按钮
  MINE_SUBMIT_NOW_POST: 'MINE_SUBMIT_NOW_POST', // 立即投稿提交按钮
  MINE_SUBMIT_NOW_POST_BUTTON: 'MINE_SUBMIT_NOW_POST_BUTTON', // 立即投稿提交按钮

  // 三合一组件配置
  COMPONENT_GROUP_TITLE: 'COMPONENT_GROUP_TITLE', // 组标题
  COMPONENT_BANNER: 'COMPONENT_BANNER', // 轮播图
  COMPONENT_HISTORY: 'COMPONENT_HISTORY', // 历史
  COMPONENT_LINK: 'COMPONENT_LINK', // 链接
  COMPONENT_TEMPLATE: 'COMPONENT_TEMPLATE', // 模板
  COMPONENT_OUTER: 'COMPONENT_OUTER', // 外层
  COMPONENT_INNER: 'COMPONENT_INNER', // 内层
  COMPONENT_TAG_LIST: 'COMPONENT_TAG_LIST', // 标签列表
  COMPONENT_AI_APP_HISTORY: 'COMPONENT_AI_APP_HISTORY', // AI应用历史

  // 用户行为相关
  USER_ACTION_ZAN: 'USER_ACTION_ZAN', // 点赞
  USER_ACTION_UNZAN: 'USER_ACTION_UNZAN', // 取消点赞
  USER_ACTION_COLLECTION: 'USER_ACTION_COLLECTION', // 收藏
  USER_ACTION_UNCOLLECTION: 'USER_ACTION_UNCOLLECTION', // 取消收藏
  USER_ACTION_FOLLOW: 'USER_ACTION_FOLLOW', // 关注
  USER_ACTION_UNFOLLOW: 'USER_ACTION_UNFOLLOW', // 取消关注
  USER_ACTION_USER_INFO: 'USER_ACTION_USER_INFO', // 用户头像点击
  USER_ACTION_COMMENT_REPLY: 'USER_ACTION_COMMENT_REPLY', // 评论回复
  USER_ACTION_COMMENT_LOAD_MORE: 'USER_ACTION_COMMENT_LOAD_MORE', // 评论加载更多
  USER_ACTION_FACEBOOK_SHARE_BUTTON: 'USER_ACTION_FACEBOOK_SHARE_BUTTON', // 分享按钮-Facebook
  USER_ACTION_INSTAGRAM_SHARE_BUTTON: 'USER_ACTION_INSTAGRAM_SHARE_BUTTON', // 分享按钮-Instagram
  USER_ACTION_WHATSAPP_SHARE_BUTTON: 'USER_ACTION_WHATSAPP_SHARE_BUTTON', // 分享按钮-WhatsApp
  USER_ACTION_SHARE_CHAT_BUTTON: 'USER_ACTION_SHARE_CHAT_BUTTON', // 分享按钮-分享对话
  USER_ACTION_SHARE_IMAGE_BUTTON: 'USER_ACTION_SHARE_IMAGE_BUTTON', // 分享按钮-分享图片
  USER_ACTION_COPY_LINK_BUTTON: 'USER_ACTION_COPY_LINK_BUTTON', // 分享按钮-复制链接
  USER_ACTION_DOWNLOAD_BUTTON: 'USER_ACTION_DOWNLOAD_BUTTON', // 分享按钮-下载
  USER_ACTION_MORE_SHARE_BUTTON: 'USER_ACTION_MORE_SHARE_BUTTON', // 分享按钮-更多分享
  USER_ACTION_EDIT_USER_BUTTON: 'USER_ACTION_EDIT_USER_BUTTON', // 分享按钮-编辑用户
  USER_ACTION_EDIT_POST_BUTTON: 'USER_ACTION_EDIT_POST_BUTTON', // 分享按钮-编辑投稿
  USER_ACTION_DISABLE_EDIT_POST_BUTTON: 'USER_ACTION_DISABLE_EDIT_POST_BUTTON', // 分享按钮-禁用编辑投稿
  USER_INFO_HEAD_QR_CODE: 'USER_INFO_HEAD_QR_CODE', // 用户二维码
  USER_ACTION_EDIT_DIGITAL_BUTTON: 'USER_ACTION_EDIT_DIGITAL_BUTTON', // 分享按钮-编辑数字人
  USER_ACTION_DELETE_BUTTON: 'USER_ACTION_DELETE_BUTTON', // 分享按钮-删除
  USER_ACTION_DELETE_DIGITAL_BUTTON: 'USER_ACTION_DELETE_DIGITAL_BUTTON', // 分享按钮-删除数字人
  USER_ACTION_DISLIKE_BUTTON: 'USER_ACTION_DISLIKE_BUTTON', // 分享按钮-不感兴趣
  USER_ACTION_DISLIKE_AUTHOR_BUTTON: 'USER_ACTION_DISLIKE_AUTHOR_BUTTON', // 分享按钮-不感兴趣作者
  USER_ACTION_REPORT_BUTTON: 'USER_ACTION_REPORT_BUTTON', // 分享按钮-举报
  USER_ACTION_REPORT_DIGITAL_BUTTON: 'USER_ACTION_REPORT_DIGITAL_BUTTON', // 分享按钮-举报数字人
  USER_ACTION_CREATE: 'USER_ACTION_CREATE', // 创作同款
  USER_ACTION_PLAY_IT: 'USER_ACTION_PLAY_IT', // 玩一玩
  USER_ACTION_PLAY_COUNT: 'USER_ACTION_PLAY_COUNT', // 播放次数
  USER_ACTION_DOWNLOAD: 'USER_ACTION_DOWNLOAD', // 下载
  USER_ACTION_AI_VIDEO: 'USER_ACTION_AI_VIDEO', // AI视频
  USER_ACTION_AI_IMAGE_ENHANCED: 'USER_ACTION_AI_IMAGE_ENHANCED', // AI高清修复
  USER_ACTION_VARIATIONS: 'USER_ACTION_VARIATIONS', // AI变体
  USER_ACTION_CREATE_ANIMATION: 'USER_ACTION_CREATE_ANIMATION', // AI动画
  USER_ACTION_CHAT: 'USER_ACTION_CHAT', // 聊天
  USER_ACTION_REMOVE_BACKGROUND: 'USER_ACTION_REMOVE_BACKGROUND', // 去背景
  USER_ACTION_CANCEL: 'USER_ACTION_CANCEL', // 取消
  USER_ACTION_CONFIRM: 'USER_ACTION_CONFIRM', // 确认
  USER_ACTION_RATING_VIEW: 'USER_ACTION_RATING_VIEW', // 评分视图
  USER_ACTION_COMMENT_REVERT: 'USER_ACTION_COMMENT_REVERT', // 评论回复
  USER_ACTION_COMMENT_TRANSLATE: 'USER_ACTION_COMMENT_TRANSLATE', // 评论翻译
  USER_ACTION_COMMENT_AUTHOR_HEADER: 'USER_ACTION_COMMENT_AUTHOR_HEADER', // 评论作者头像
  USER_ACTION_COMMENT_ZAN: 'USER_ACTION_COMMENT_ZAN', // 评论点赞
  USER_ACTION_COMMENT_CHILD_RIGHT_OPERATION:
    'USER_ACTION_COMMENT_CHILD_RIGHT_OPERATION', // 评论子评论右上角操作
  USER_ACTION_COMMENT_CHILD_CHAT: 'USER_ACTION_COMMENT_CHILD_CHAT', // 评论子评论聊天
  USER_ACTION_COMMENT_CHAT: 'USER_ACTION_COMMENT_CHAT', // 评论聊天
  USER_ACTION_COMMENT_BLOCK_AUTHOR: 'USER_ACTION_COMMENT_BLOCK_AUTHOR', // 评论作者
  USER_ACTION_COMMENT_REPORT: 'USER_ACTION_COMMENT_REPORT', // 评论举报
  USER_ACTION_COMMENT_DELETE: 'USER_ACTION_COMMENT_DELETE', // 评论删除
  USER_ACTION_DETAIL_DESCRIPTION: 'USER_ACTION_DETAIL_DESCRIPTION', // 详情页描述
  USER_ACTION_DETAIL_COPY_PROMPT: 'USER_ACTION_DETAIL_COPY_PROMPT', // 详情页复制提示词
  USER_ACTION_DETAIL_MORE_PROMPT: 'USER_ACTION_DETAIL_MORE_PROMPT', // 详情页更多提示词
  USER_ACTION_DETAIL_EXTEND_PROMPT: 'USER_ACTION_DETAIL_EXTEND_PROMPT', // 详情页扩展提示词
  USER_ACTION_DETAIL_TRANSLATE_PROMPT: 'USER_ACTION_DETAIL_TRANSLATE_PROMPT', // 详情页翻译提示词
  USER_ACTION_GO_TO_STORE: 'USER_ACTION_GO_TO_STORE', // 去商店评价
  USER_ACTION_NOT_SATISFIED: 'USER_ACTION_NOT_SATISFIED', // 不满意
  USER_ACTION_NEXT_TO_TIME: 'USER_ACTION_NEXT_TO_TIME', // 下次再说
  USER_ACTION_EVALUATE_SUBMIT: 'USER_ACTION_EVALUATE_SUBMIT', // 评价提交
  USER_ACTION_18_SENSITIVE_WORDS: 'USER_ACTION_18_SENSITIVE_WORDS', // 18+敏感词

  // 抽屉相关
  DRAWER_ACTIVITY_CENTER: 'DRAWER_ACTIVITY_CENTER', // 活动中心
  DRAWER_FAVORITE_TAGS: 'DRAWER_FAVORITE_TAGS', // 收藏标签
  DRAWER_LANGUAGE_SETTING: 'DRAWER_LANGUAGE_SETTING', // 语言设置
  DRAWER_JOIN_GROUP: 'DRAWER_JOIN_GROUP', // 加入群聊
  DRAWER_GUIDE: 'DRAWER_GUIDE', // 引导
  DRAWER_ABOUT_US: 'DRAWER_ABOUT_US', // 关于我们
  DRAWER_FEEDBACK: 'DRAWER_FEEDBACK', // 反馈
  DRAWER_SETTING_CELL: 'DRAWER_SETTING_CELL', // 设置cell
  DRAWER_NOTIFICATION_CENTER: 'DRAWER_NOTIFICATION_CENTER', // 通知中心
  DRAWER_PRIVACY_POLICY: 'DRAWER_PRIVACY_POLICY', // 隐私政策
  DRAWER_USER_AGREEMENT: 'DRAWER_USER_AGREEMENT', // 用户协议
  DRAWER_CUSTOMER_SERVICE: 'DRAWER_CUSTOMER_SERVICE', // 客服
  DRAWER_CONTACT_US: 'DRAWER_CONTACT_US', // 联系我们
  DRAWER_QUESTION: 'DRAWER_QUESTION', // 问卷
  DRAWER_QUESTION_PREVIOUS: 'DRAWER_QUESTION_PREVIOUS', // 问卷上一题
  DRAWER_QUESTION_NEXT: 'DRAWER_QUESTION_NEXT', // 问卷下一题
  DRAWER_SYSTEM_PUSH: 'DRAWER_SYSTEM_PUSH', // 系统消息推送
  DRAWER_COMMENT_PUSH: 'DRAWER_COMMENT_PUSH', // 评论消息推送
  DRAWER_LIKE_FAVORITE_PUSH: 'DRAWER_LIKE_FAVORITE_PUSH', // 赞藏消息推送
  DRAWER_FOLLOW_PUSH: 'DRAWER_FOLLOW_PUSH', // 关注消息推送
  DRAWER_CHARACTER_PUSH: 'DRAWER_CHARACTER_PUSH', // 数字人消息推送
  DRAWER_ACCOUNT_SWITCH: 'DRAWER_ACCOUNT_SWITCH', // 账号切换
  DRAWER_SHOW_SEXY_CONTENT: 'DRAWER_SHOW_SEXY_CONTENT', // 显示成人内容
  DRAWER_BLUR_MATURITY_CONTENT: 'DRAWER_BLUR_MATURITY_CONTENT', // 模糊成人内容
  DRAWER_DISABLE_AUTOMATIC: 'DRAWER_DISABLE_AUTOMATIC', // 关闭自动保存
  DRAWER_AUTO_SAVE_ARTWORK: 'DRAWER_AUTO_SAVE_ARTWORK', // 自动保存作品
  DRAWER_CONTENT_PREFERENCE: 'DRAWER_CONTENT_PREFERENCE', // 内容偏好
  DRAWER_DELETE_ACCOUNT: 'DRAWER_DELETE_ACCOUNT', // 删除账号
  DRAWER_LOGOUT: 'DRAWER_LOGOUT', // 退出登录

  // 登录注册相关
  LOGIN_GOOGLE: 'LOGIN_GOOGLE', // google
  LOGIN_APPLE: 'LOGIN_APPLE', // apple
  LOGIN_EMAIL: 'LOGIN_EMAIL', // email
  LOGIN_DISCORD: 'LOGIN_DISCORD', // discord
  LOGIN_FACEBOOK: 'LOGIN_FACEBOOK', // facebook
  LOGIN_CHECKED: 'LOGIN_CHECKED', // 勾选
  LOGIN_SERVICE_TERMS: 'LOGIN_SERVICE_TERMS', // 服务条款
  LOGIN_PRIVACY_AGREEMENT: 'LOGIN_PRIVACY_AGREEMENT', // 隐私政策
  LOGIN_FORGET_PASSWORD: 'LOGIN_FORGET_PASSWORD', // 忘记密码
  LOGIN_EMAIL_LOGIN: 'LOGIN_EMAIL_LOGIN', // 邮箱登录
  LOGIN_ACTIVATE_START: 'LOGIN_ACTIVATE_START', // 激活开始
  LOGIN_ACTIVATE_SKIP: 'LOGIN_ACTIVATE_SKIP', // 激活跳过
  LOGIN_SEX_MAN: 'LOGIN_SEX_MAN', // 性别男
  LOGIN_SEX_WOMAN: 'LOGIN_SEX_WOMAN', // 性别女
  LOGIN_SEX_NON_BINARY: 'LOGIN_SEX_NON_BINARY', // 性别非二元
  LOGIN_AI_GENERATE_IMAGE: 'LOGIN_AI_GENERATE_IMAGE', // AI生成图片
  LOGIN_AI_CHARACTER: 'LOGIN_AI_CHARACTER', // AI数字人
  LOGIN_AI_APP_TAG: 'LOGIN_AI_APP_TAG', // AI应用
  LOGIN_REGISTER_POPUP_1: 'LOGIN_REGISTER_POPUP_1', // 注册弹窗1
  LOGIN_REGISTER_POPUP_2: 'LOGIN_REGISTER_POPUP_2', // 注册弹窗2
  LOGIN_REGISTER_POPUP_3: 'LOGIN_REGISTER_POPUP_3', // 注册弹窗3
  LOGIN_CLICK_FINISH_BUTTON: 'LOGIN_CLICK_FINISH_BUTTON', // 点击完成按钮
  LOGIN_CLICK_RETURN_BUTTON: 'LOGIN_CLICK_RETURN_BUTTON', // 点击返回按钮
  LOGIN_CLICK_NEXT_BUTTON_1: 'LOGIN_CLICK_NEXT_BUTTON_1', // 点击下一步按钮1
  LOGIN_CLICK_NEXT_BUTTON_2: 'LOGIN_CLICK_NEXT_BUTTON_2', // 点击下一步按钮2
  LOGIN_INVOKE_THIRD_PARTY_SUCCESS: 'LOGIN_INVOKE_THIRD_PARTY_SUCCESS', // 第三方授权成功
  LOGIN_PRIVACY_POLICY_VIEW_BUTTON: 'LOGIN_PRIVACY_POLICY_VIEW_BUTTON', // 隐私政策按钮
  LOGIN_AGREE_CONTINUE: 'LOGIN_AGREE_CONTINUE', // 同意继续
  LOGIN_PRIVACY_AGREEMENT_CLOSE: 'LOGIN_PRIVACY_AGREEMENT_CLOSE', // 隐私政策关闭
  LOGIN_BACK_TO_LOGIN: 'LOGIN_BACK_TO_LOGIN', // 返回登录
  LOGIN_RESEND_EMAIL: 'LOGIN_RESEND_EMAIL', // 重新发送邮箱
  LOGIN_PHONE_LOGIN: 'LOGIN_PHONE_LOGIN', // 手机号登录
  LOGIN_CONTINUE: 'LOGIN_CONTINUE', // 登录继续

  //全局曝光打点
  BLACK_FRIDAY_ACTIVITY_BUTTON: 'BLACK_FRIDAY_ACTIVITY_BUTTON', // 黑色星期五活动按钮
  BLACK_FRIDAY_ACTIVITY: 'BLACK_FRIDAY_ACTIVITY', // 黑色星期五活动曝光
  RENEW_FREE_TRY_SUB_BUTTON: 'RENEW_FREE_TRY_SUB_BUTTON', // 过期3天续费按钮
  RENEW_FREE_TRY_SUB: 'RENEW_FREE_TRY_SUB', // 过期3天续费弹窗
  LIMITED_TIME_DISCOUNT_BUTTON: 'LIMITED_TIME_DISCOUNT_BUTTON', // 限时折扣弹框按钮
  LIMITED_TIME_DISCOUNT: 'LIMITED_TIME_DISCOUNT', // 限时折扣弹框曝光
  MALL_ACTIVITY_REWARD_BUTTON: 'MALL_ACTIVITY_REWARD_BUTTON', // 商城活动激励弹框按钮
  MALL_ACTIVITY_REWARD: 'MALL_ACTIVITY_REWARD', // 商城活动激励弹框曝光
  NEW_USER_48_HOURS_BUTTON: 'NEW_USER_48_HOURS_BUTTON', // 48小时后新用户按钮
  NEW_USER_48_HOURS: 'NEW_USER_48_HOURS', // 48小时后新用户曝光
  NEW_USER_SCREEN_BACK_BUTTON: 'NEW_USER_SCREEN_BACK_BUTTON', // 新用户全屏页面返回按钮
  NEW_USER_SCREEN_PAGE: 'NEW_USER_SCREEN_PAGE', // 新用户全屏页面
  NEW_USER_SCREEN_PAGE_BUTTON: 'NEW_USER_SCREEN_PAGE_BUTTON', // 新用户全屏页面按钮
  NOT_VIP_POWER_INSUFFICIENT_BUTTON: 'NOT_VIP_POWER_INSUFFICIENT_BUTTON', // 非VIP算力不足弹框按钮
  NOT_VIP_POWER_INSUFFICIENT: 'NOT_VIP_POWER_INSUFFICIENT', // 非VIP算力不足弹框曝光
  FAST_SUBSCRIPTION_PURCHASE_BUTTON: 'FAST_SUBSCRIPTION_PURCHASE_BUTTON', // 快速订阅购买弹框按钮
  FAST_SUBSCRIPTION_PURCHASE: 'FAST_SUBSCRIPTION_PURCHASE', // 快速订阅购买弹框曝光
  UNLIMITED_QUEUE_MODAL_BUTTON: 'UNLIMITED_QUEUE_MODAL_BUTTON', // 无限队列弹框按钮
  UNLIMITED_QUEUE_MODAL: 'UNLIMITED_QUEUE_MODAL', // 无限队列弹框曝光
  VERSION_UPDATE_VIEW_BUTTON: 'VERSION_UPDATE_VIEW_BUTTON', // 版本更新弹框按钮
  VERSION_UPDATE_VIEW: 'VERSION_UPDATE_VIEW', // 版本更新弹框曝光
  VERSION_UPDATE_VIEW_CANCEL_BUTTON: 'VERSION_UPDATE_VIEW_CANCEL_BUTTON', // 版本更新弹框取消按钮
  VERSION_UPDATE_VIEW_UPDATE_BUTTON: 'VERSION_UPDATE_VIEW_UPDATE_BUTTON', // 版本更新弹框更新按钮
  VIP_POWER_INSUFFICIENT_BUTTON: 'VIP_POWER_INSUFFICIENT_BUTTON', // VIP算力不足弹框按钮
  VIP_POWER_INSUFFICIENT: 'VIP_POWER_INSUFFICIENT', // VIP算力不足弹框曝光
  VIP_GET_MORE_CREDITS_BUTTON: 'VIP_GET_MORE_CREDITS_BUTTON', // VIP算力不足弹框更多算力按钮
  VIP_GET_MORE_CREDITS: 'VIP_GET_MORE_CREDITS', // VIP算力不足弹框更多算力曝光
  VIP_PAY_CANCEL_BUTTON: 'VIP_PAY_CANCEL_BUTTON', // VIP算力不足弹框取消按钮
  VIP_PAY_CANCEL: 'VIP_PAY_CANCEL', // VIP算力不足弹框取消曝光
  VIP_PAY_CONTINUE_BUTTON: 'VIP_PAY_CONTINUE_BUTTON', // VIP算力不足弹框继续按钮

  //其他
  USER_INFO_HEAD: 'USER_INFO_HEAD', // 用户头像
  USER_INFO_HEAD_SHARE: 'USER_INFO_HEAD_SHARE', // 用户头像分享
  USER_INFO_PROFILE: 'USER_INFO_PROFILE', // 用户信息
  USER_ASSETS_VIEW: 'USER_ASSETS_VIEW', // 用户算力视图
  VIP_VIEW: 'VIP_VIEW', // 会员视图
  APP_START_TRACK: 'APP_START_TRACK', // 应用启动打点
  APP_ENTER_HOME: 'APP_ENTER_HOME', // 应用进入首页
  APP_EXPOSURE: 'APP_EXPOSURE', // 应用曝光
  BASE_MODEL_CHANGE: 'BASE_MODEL_CHANGE', // 基础模型切换
  ADVANCED_MODEL_CHANGE: 'ADVANCED_MODEL_CHANGE', // 高级模型切换
  CLICK_MESSAGE_PUSH: 'CLICK_MESSAGE_PUSH', // 点击推送
  CLICK_STRATEGY_PUSH: 'CLICK_STRATEGY_PUSH', // 点击策略推送
}

/**
 * 商业化产品卡类型
 * 产品ID类型映射 - 将产品类型映射到实际的产品ID字符串
 * 这是 ProductIdMap 的反向映射，方便根据产品类型获取对应的产品ID
 */
export enum ProductIDEnum {
  // ===== 基础订阅卡 - 月卡 =====
  初级会员月卡 = 'ai.seaart.app.sub.beginner.monthly',
  初级会员月卡IOS = 'ai.seaart.app.ios.sub.beginner.monthly',
  标准会员月卡 = 'ai.seaart.app.sub.standard.monthly',
  标准会员月卡IOS = 'ai.seaart.app.ios.sub.standard.monthly',
  专业会员月卡 = 'ai.seaart.app.sub.professional.monthly',
  专业会员月卡IOS = 'ai.seaart.app.ios.sub.professional.monthly',
  大师会员月卡 = 'ai.seaart.app.sub.master.monthly',
  大师会员月卡IOS = 'ai.seaart.app.ios.sub.master.monthly',

  // ===== 基础订阅卡 - 年卡/半年卡 =====
  初级会员年卡 = 'ai.seaart.app.sub.beginner.yearly',
  初级会员年卡IOS = 'ai.seaart.app.ios.sub.beginner.yearly',
  标准会员年卡 = 'ai.seaart.app.sub.standard.yearly',
  标准会员年卡IOS = 'ai.seaart.app.ios.sub.standard.yearly',
  专业会员半年卡 = 'ai.seaart.app.sub.professional.hfyearly',
  专业会员半年卡IOS = 'ai.seaart.app.ios.sub.professional.hfyearly',
  大师会员半年卡 = 'ai.seaart.app.sub.master.hfyearly',
  大师会员半年卡IOS = 'ai.seaart.app.ios.sub.master.hfyearly',

  // ===== 黑五打折订阅卡 =====
  黑五标准年卡 = 'sa.bf.sub.standard.yearlyoff',
  黑五标准年卡IOS = 'sa.bf.ios.sub.standard.yearlyoff',
  黑五专业半年卡 = 'sa.bf.sub.prof.hfyearlyoff',
  黑五专业半年卡IOS = 'sa.bf.ios.sub.pro.hfyearlyoff',
  黑五大师半年卡 = 'sa.bf.sub.master.hfyearlyoff',
  黑五大师半年卡IOS = 'sa.bf.ios.sub.master.hfyearlyoff',

  // ===== 七折打折订阅卡 =====
  七折标准年卡 = 'sa.vd.sub.standard.yearlyoff',
  七折标准年卡IOS = 'sa.vd.ios.sub.standard.yearlyoff',
  七折专业半年卡 = 'sa.vd.sub.prof.hfyearlyoff',
  七折专业半年卡IOS = 'sa.vd.ios.sub.pro.hfyearlyoff',
  七折大师半年卡 = 'sa.vd.sub.master.hfyearlyoff',
  七折大师半年卡IOS = 'sa.vd.ios.sub.master.hfyearlyoff',

  // ===== 单次购买卡 - 月卡 =====
  单次购买初级会员月卡 = 'sa.beginner.monthly',
  单次购买初级会员月卡IOS = 'sa.ios.beginner.monthly',
  单次购买标准会员月卡 = 'sa.standard.monthly',
  单次购买标准会员月卡IOS = 'sa.ios.standard.monthly',
  单次购买专业会员月卡 = 'sa.pro.monthly',
  单次购买专业会员月卡IOS = 'sa.ios.pro.monthly',
  单次购买大师会员月卡 = 'sa.master.monthly',
  单次购买大师会员月卡IOS = 'sa.ios.master.monthly',

  // ===== 单次购买卡 - 年卡/半年卡 =====
  单次购买初级会员年卡 = 'sa.beginner.yearly',
  单次购买初级会员年卡IOS = 'sa.ios.beginner.yearly',
  单次购买标准年卡 = 'sa.standard.yearly',
  单次购买标准年卡IOS = 'sa.ios.standard.yearly',
  单次购买专业半年卡 = 'sa.pro.hfyearly',
  单次购买专业半年卡IOS = 'sa.ios.pro.hfyearly',
  单次购买大师半年卡 = 'sa.master.hfyearly',
  单次购买大师半年卡IOS = 'sa.ios.master.hfyearly',

  // ===== 黑五打折单次卡 =====
  黑五打折标准年卡 = 'sa.bf.standard.yearly',
  黑五打折标准年卡IOS = 'sa.bf.ios.standard.yearly',
  黑五打折专业半年卡 = 'sa.bf.pro.hfyearly',
  黑五打折专业半年卡IOS = 'sa.bf.ios.pro.hfyearly',
  黑五打折大师半年卡 = 'sa.bf.master.hfyearly',
  黑五打折大师半年卡IOS = 'sa.bf.ios.master.hfyearly',

  // ===== 七折打折单次卡 =====
  七折打折标准年卡 = 'sa.vd.standard.yearly',
  七折打折标准年卡IOS = 'sa.vd.ios.standard.yearly',
  七折打折专业半年卡 = 'sa.vd.pro.hfyearly',
  七折打折专业半年卡IOS = 'sa.vd.ios.pro.hfyearly',
  七折打折大师半年卡 = 'sa.vd.master.hfyearly',
  七折打折大师半年卡IOS = 'sa.vd.ios.master.hfyearly',

  // ===== 备用订阅卡 - 月卡 =====
  备用订阅卡初级会员月卡 = 'sa.bei.sub.beginner.monthly',
  备用订阅卡初级会员月卡IOS = 'sa.bei.ios.sub.beginner.monthly',
  备用订阅卡标准会员月卡 = 'sa.bei.sub.standard.monthly',
  备用订阅卡标准会员月卡IOS = 'sa.bei.ios.sub.standard.monthly',
  备用订阅卡专业会员月卡 = 'sa.bei.sub.pro.monthly',
  备用订阅卡专业会员月卡IOS = 'sa.bei.ios.sub.pro.monthly',
  备用订阅卡大师会员月卡 = 'sa.bei.sub.master.monthly',
  备用订阅卡大师会员月卡IOS = 'sa.bei.ios.sub.master.monthly',

  // ===== 备用订阅卡 - 年卡/半年卡 =====
  备用订阅卡初级会员年卡 = 'sa.bei.sub.beginner.yearlyoff',
  备用订阅卡初级会员年卡IOS = 'sa.bei.ios.sub.beginner.yearlyoff',
  备用订阅卡标准年卡 = 'sa.bei.sub.standard1.yearlyoff',
  备用订阅卡标准年卡IOS = 'sa.bei.ios.sub.standard1.yearlyoff',
  备用订阅卡专业半年卡 = 'sa.bei.sub.pro1.hfyearlyoff',
  备用订阅卡专业半年卡IOS = 'sa.bei.ios.sub.pro1.hfyearlyoff',
  备用订阅卡大师半年卡 = 'sa.bei.sub.master1.hfyearlyoff',
  备用订阅卡大师半年卡IOS = 'sa.bei.ios.sub.master1.hfyearlyoff',

  // ===== 其他特殊卡 =====
  /** 隐藏福利卡 - Android */
  隐藏福利卡 = 'ai.seaart.app.sub.beginner.monthly',
  /** 隐藏福利卡 - iOS */
  隐藏福利卡IOS = 'ai.seaart.app.ios.sub.beginner.monthly',

  // ===== 一次性商品 =====
  一次性商品1 = 'ai.seaart.app.global.calculate1',
  一次性商品4 = 'ai.seaart.app.global.calculate4',
  一次性商品5 = 'ai.seaart.app.global.calculate5',
  一次性商品7 = 'ai.seaart.app.global.calculate7',
  一次性商品10 = 'ai.seaart.app.global.calculate10',
  一次性商品11 = 'ai.seaart.app.global.calculate11',
  一次性商品15 = 'ai.seaart.app.global.calculate15',
  一次性商品16 = 'ai.seaart.app.global.calculate16',
  一次性商品17 = 'ai.seaart.app.global.calculate17',
  一次性商品18 = 'ai.seaart.app.global.calculate18',

  // ===== 一次性商品 - iOS =====
  一次性商品1IOS = 'ai.seaart.app.ios.global.calculate1',
  一次性商品4IOS = 'ai.seaart.app.ios.global.calculate4',
  一次性商品5IOS = 'ai.seaart.app.ios.global.calculate5',
  一次性商品7IOS = 'ai.seaart.app.ios.global.calculate7',
  一次性商品10IOS = 'ai.seaart.app.ios.global.calculate10',
  一次性商品11IOS = 'ai.seaart.app.ios.global.calculate11',
  一次性商品15IOS = 'ai.seaart.app.ios.global.calculate15',
  一次性商品16IOS = 'ai.seaart.app.ios.global.calculate16',
  一次性商品17IOS = 'ai.seaart.app.ios.global.calculate17',
  一次性商品18IOS = 'ai.seaart.app.ios.global.calculate18',

  ///单次一次性商品卡
  单次一次性商品1 = 'sa.beginner.monthly',
  单次一次性商品2 = 'sa.standard.monthly',
  单次一次性商品3 = 'sa.pro.monthly',
  单次一次性商品4 = 'sa.master.monthly',
  单次一次性商品5 = 'sa.beginner.yearly',
  单次一次性商品6 = 'sa.standard.yearly',
  单次一次性商品7 = 'sa.pro.hfyearly',
  单次一次性商品8 = 'sa.master.hfyearly',
  单次一次性商品9 = 'sa.bf.standard.yearly',
  单次一次性商品10 = 'sa.bf.pro.hfyearly',
  单次一次性商品11 = 'sa.bf.master.hfyearly',
  单次一次性商品12 = 'sa.vd.standard.yearly',
  单次一次性商品13 = 'sa.vd.pro.hfyearly',
  单次一次性商品14 = 'sa.vd.master.hfyearly',

  // ===== 单次一次性商品 - iOS =====
  单次一次性商品1IOS = 'sa.ios.beginner.monthly',
  单次一次性商品2IOS = 'sa.ios.standard.monthly',
  单次一次性商品3IOS = 'sa.ios.pro.monthly',
  单次一次性商品4IOS = 'sa.ios.master.monthly',
  单次一次性商品5IOS = 'sa.ios.beginner.yearly',
  单次一次性商品6IOS = 'sa.ios.standard.yearly',
  单次一次性商品7IOS = 'sa.ios.pro.hfyearly',
  单次一次性商品8IOS = 'sa.ios.master.hfyearly',
  单次一次性商品9IOS = 'sa.ios.bf.standard.yearly',
  单次一次性商品10IOS = 'sa.ios.bf.pro.hfyearly',
  单次一次性商品11IOS = 'sa.ios.bf.master.hfyearly',
  单次一次性商品12IOS = 'sa.vd.ios.standard.yearly',
  单次一次性商品13IOS = 'sa.vd.ios.pro.hfyearly',
  单次一次性商品14IOS = 'sa.vd.ios.master.hfyearly',
}

/**
 * 收银台曝光来源
 */
export enum CashierExposureSourceEnum {
  余额不足 = 'balance',
  校验VIP = 'check_vip',
  搜索页面 = 'search',
  首页SVIP入口 = 'home_svip',
  非vip算力不足 = 'non_vip',
  Vip算力不足 = 'insufficient_cal',
  普通权益 = 'SpecificPop_normal',
  无限队列 = 'SpecificPop_queue',
  我的页面 = 'mine',
  创作流顶部 = 'task_flow_banner',
  首页广告SVIP = 'home_ad_svip',
  活动详情SVIP = 'active_detail',
  侧边栏 = 'on_sidebar',
  创作页面 = 'create',
  数字人 = 'digital',
  免广告权益 = 'free_ad',
  算力商城 = 'cal_mall',
  限时折扣 = 'limitedTime',
  个人中心 = 'on_personal',
  任务中心 = 'task_center',
  算力购买界面vip引导 = 'on_calculatepage_vip',
  黑五首页活动 = 'black_sale_button',
  黑五弹框活动 = 'black_sale_modal',
  活动弹框24小时 = 'sale_modal_24',
  体力恢复触达 = 'physical_touch',
  质量模式缺少权限 = 'quality_mode_lack_permission',
  LoRA数量超出 = 'lora_quantity_exceed',
  免费创作缺少权限 = 'free_create_lack_permission',
  视频质量模式缺少权限 = 'video_quality_mode_lack_permission',
  Magic生成模式标准模式缺少权限 = 'magic_generate_mode_standard_lack_permission',
  Magic生成模式高清模式缺少权限 = 'magic_generate_mode_hd_lack_permission',
  Magic生成模式质量模式缺少权限 = 'magic_generate_mode_quality_lack_permission',
  视频数量超出 = 'video_count_exceed',
  私密创作缺少权限 = 'private_create_lack_permission',
  未开通VIP并且超过48小时 = 'not_vip_and_over_48_hours',
  创作流顶部横幅 = 'task_flow_banner',
}
