/**
 * @author 曼巴
 * @filename AppsflyerEnumEventName.ts
 * @date 2025-03-11 星期二
 * @description AF打点枚举
 */

export enum AppsflyerEnumEventName {
  ///Appsflyer标准事件
  登录 = 'af_login',
  付费 = 'af_purchase',
  完成注册 = 'af_complete_registration',

  ///留存相关
  次日留存 = 'retention_2day',
  三日留存 = 'retention_3day',
  七日留存 = 'retention_7day',
  十四日留存 = 'retention_14day',
  三十日留存 = 'retention_30day',

  ///流程点位
  ///登录注册SDK初始化
  登陆失败 = 'loginfailed',
  登陆成功 = 'loginsuccess',
  验单失败 = 'orderverify_failed',
  取消付费 = 'paycancel',
  支付失败 = 'payfailed',
  支付成功 = 'paysuccess',
  切换账号 = 'switch_account', //退出登录
  sdk开始登录 = 'star_login_start',
  sdk登录成功 = 'star_login_success',
  sdk登录失败 = 'star_login_failed',
  登录sdk开始 = 'login_sdk_begin',
  注册账号 = 'create_account',
  登录sdk结束 = 'login_sdk_end',
  进入工具场景 = 'enter_tool_scene',

  ///端内基础事件
  谷歌登录 = 'login_google',
  谷歌注册成功 = 'registration_google_sussce',
  谷歌注册失败 = 'registration_google_failed',
  facebook登录 = 'login_facebook',
  facebook注册成功 = 'registration_facebook_sussce',
  facebook注册失败 = 'registration_facebook_failed',
  discord登录 = 'login_discord',
  discord注册成功 = 'registration_discord_sussce',
  discord注册失败 = 'registration_discord_failed',
  邮箱登录 = 'login_email',
  邮箱注册成功 = 'registration_email_sussce',
  邮箱注册失败 = 'registration_email_failed',

  切换语言 = 'change_language',
  点击邀请新人按钮 = 'invite_click',
  关注 = 'activ_follow',
  点赞 = 'activ_like',
  评论 = 'activ_comment',
  分享 = 'activ_share',
  收藏 = 'activ_collect',
  ai生图创作 = 'generate_image',
  ai快应用创作 = 'generate_apps',
  ai视频创作 = 'generate_video',
  ai数字人 = 'generate_character',

  ///付费相关
  购买初级会员一月 = 'purchase_beginner_month',
  购买初级会员一年 = 'purchase_beginner_year',
  购买标准会员一月 = 'purchase_standard_month',
  购买标准会员一年 = 'purchase_standard_year',
  购买专业版一月 = 'purchase_pro_month',
  购买专业版一年 = 'purchase_pro_year',
  购买大师版一月 = 'purchase_master_month',
  购买大师版一年 = 'purchase_master_year',

  购买1_99美金算力 = 'purchase_1_99_credits',
  购买3_99美金算力 = 'purchase_3_99_credits',
  购买9_99美金算力 = 'purchase_9_99_credits',
  购买19_99美金算力 = 'purchase_19_99_credits',
  购买39_99美金算力 = 'purchase_39_99_credits',
  购买99_99美金算力 = 'purchase_99_99_credits',
}
