declare namespace Common {
  type ObjType = '文章' | '图片' | '视频' | '其他'

  interface ImageInfo {
    url: string
    width: number
    height: number
  }

  interface ListItem {
    id: string
    title: string
    description?: string
    objType: ObjType
    cover?: ImageInfo
    author?: { name: string }
  }
}
