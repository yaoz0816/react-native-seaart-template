/**
 * @author 曼巴
 * @filename enum.ts
 * @date 2025-05-29 星期四
 * @description 全局枚举汇总
 */
export enum MsgType {
  /**  * 系统消息 */
  System = 'int#sys',
  /**  * 评论消息 */
  Comment = 'int#com',
  /**  * 点赞收藏 */
  Like = 'int#like&col',
  /**  * 关注 */
  Follow = 'int#fol',
}

// 推送类型
export enum PUSH_TYPE_ENUM {
  评论提醒 = 1,
  点赞提醒 = 2,
  关注提醒 = 3,
  收藏提醒 = 4,
  系统消息 = 7,
  数字人消息 = 9,
  数字人聊天 = 75,
  过期提醒 = 101,
  体力推送 = 10000,
}

// 推送事件
export enum PUSH_EVENT_ENUM {
  每日免费体力提醒 = 1,
  热门数字人推荐 = 2,
  互动消息推送 = 3,
}

// 业务类型
export enum BUSINESS_TYPE_ENUM {
  一次性商品 = 1,
  月卡 = 2,
  年卡 = 3,
  周卡 = 4,
  日卡 = 5,
  钻石包 = 6,
  算力包 = 7,
}

export enum TabKey {
  None = 'None',
  Recommend = 'Recommend',
  Artwork = 'Artwork',
  Post = 'Post',
  QuickApp = 'QuickApp',
  CyberPub = 'CyberPub',
  Model = 'Model',
  Filter = 'Filter',
  // 新增收藏和我的选项
  Favorite = 'Favorite',
  Mine = 'Mine',
  ImageModel = 'ImageModel',
  VideoModel = 'VideoModel',
  Follow = 'Follow',
  Activity = 'Activity',
  //玩一玩相关模块
  AiImageApp = 'AiImageApp',
  AiVideoApp = 'AiVideoApp',
  StCharacter = 'StCharacter',
}

///GPT类型
export enum GPT_MODEL {
  GPT3 = 'GPT-35-Turbo-1106',
  GPT4 = 'GPT-4-Turbo-1106',
  Normal = 'Normal',
}

export enum UserType {
  核心目标用户 = 1,
  高活跃高创作用户 = 2,
  高活跃低创作用户 = 3,
  低活跃高创作用户 = 4,
  新手尝鲜用户 = 5,
  流失风险用户 = 6,
}

// 游客标识
export enum GuestType {
  游客标识 = 16,
}

// 登录类型
export enum LOGIN_TYPE {
  UNKNOWN = 0,
  EMAIL = 1,
  GOOGLE,
  FACEBOOK,
  TOKEN,
  DiscordToken = 6,
  PHONE = 9,
  APPLE = 15,
  TOURIST = 16,
}

// 弹窗类型 -1-不再弹出 0-无 1-唤醒去新付费用户 2-未付过费的老用户破冰 3-月升年用户 4-年升年用户
export enum PopUpType {
  不再弹出 = -1,
  无 = 0,
  唤醒去新付费用户 = 1,
  未付过费的老用户破冰 = 2,
  月升年用户 = 3,
  年升年用户 = 4,
}

/**
 * @用途 设置按钮状态枚举
 */
export enum SettingButtonStatus {
  None = 0,
  On = 1,
  Off = 2,
}

/**
 * 元素NSFW等级(用于接口返回数据)
 * @enum Default 默认值(某些没有数据的会是这个)
 * @enum Explicit = 色情内容
 * @enum Safe 健康内容
 */
export enum NSFW {
  /** * 默认值(某些没有数据的会是这个) */
  Default = 0,
  /** * 色情内容 */
  Explicit = 1,
  /** * 健康内容 */
  Safe = 2,
}

/**
 * NSFW评级
 */
export enum NSFWRating {
  /** * 健康内容 */
  Safe = 0,
  /** * 擦边内容 */
  Questionable = 1,
  /** * 色情内容 */
  Explicit = 2,
}

/**
 * 元素绿色等级
 */
export enum Green {
  /** * 默认值(某些没有数据的会是这个) */
  Default = -1,
  // 非绿色内容，不能查看
  NotGreen = 2,
}

/**
 * 任务类型，通常出现在返回的数据里
 */
export enum TaskType {
  /**
   * 站外数据，没有类型，默认为文生图 */
  Extra = 0,
  /**
   * 文生图 */
  TextToImage = 1,
  /**
   * 超分(创意超分) */
  Upscale = 2,
  /**
   * 变体 */
  Variations = 3,
  /**
   * 站外超分(用户上传图片的高清修复) */
  ExtraUpscale = 4,
  /**
   * 移除背景 */
  RemoveBackground = 5,
  /**
   * 图生文(图像描述) */
  ImageToText = 6,
  /**
   * 图生图 */
  ImageToImage = 7,
  /**
   * 条件生图 */
  ConditionToImage = 8,
  /**
   * 自动图生文 */
  AutoImageToText = 9,
  /**
   * ControlNet预览图 */
  ControlNetPreviewImage = 10,
  /**
   * 智能补图 */
  Expansion = 11,
  /**
   * 13=>Extra图片超分(站内)(来自作品的高清修复) */
  HDRepair = 13,
  /**
   * 17=>AI图像增强 */
  AIImageEnhancement = 17,
  /**
   * 18=>工具集背景移除 */
  RemoveBgTool = 18,
  /**
   * 19=草稿成图 */
  DraftToImage = 19,
  /**
   * 20=>AI滤镜 */
  Filter = 20,
  /**
   * 23=>面部替换 */
  FaceChange = 23,
  /**
   * 24=>动画生成 */
  CreateAnimation = 24,
  /**
   * 25=>人物修复 */
  RepairCharacter = 25,
  /**
   * 26=>面部替换 */
  FaceChangeVideo = 26,
  /**
   * 28=>智能擦除 */
  IntelligentEraser = 28,
  /**
   * 29=>ComfyUIApp创作结果 */
  ComfyUIAppWorks = 29,
  /**
   * 33=>图生视频 */
  ImageToVideo = 33,
  /**
   * 34=>视频超分 */
  VideoUpscale = 34,
  /**
   * 36=>文生视频 */
  TextToVideo = 36,
  /**
   * 37=>视频延长 */
  VideoExtend = 37,
}

/**
 * 瀑布流元素类型
 */
export enum ObjType {
  /** * -10000.未知，不知道是什么玩意的东西会被赋值为这个 */
  Unknown = -10000,
  /**
   * 1.作品 */
  Artwork = 1,
  /**
   * 2.模型 */
  Model = 2,
  /**
   * 3.换脸 */
  ChangeFace = 3,
  /**
   * 4.投稿/作品集 */
  Posts = 4,
  /**
   * 5.视频 */
  Video = 5,
  /**
   * 6.标签(只会在搜索中出现) */
  Tag = 6,
  /**
   * 8.账户(只会在搜索中出现) */
  User = 8,
  /**
   * 9.酒馆数字人 */
  Character = 9,
  /**
   * 11.画板模版 */
  ArtboardTemplates = 11,
  /**
   * 13.快应用 */
  QuickApp = 13,
  /**
   * 14.快应用(服务端异常数据) */
  BadQuickApp = 14,
  /**
   * 16.音频 */
  Audio = 16,
  /**
   * 20.滤镜 */
  Filter = 20,
  /**
   * 60.功能 */
  Function = 60,
  /**
   * -11000.新版视频 */
  NewVideo = -11000,
  // 创作流-跳转
  CreateFlow = -11001,
}
