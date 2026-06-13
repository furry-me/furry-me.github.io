# Gallery Workflow

这个站点已经改成了"系列优先"的画廊结构。以后新增作品时，推荐按下面的方式维护：

## 页面结构

- `/` 文章首页（博客列表）
- `/series/` 系列目录页（瀑布流卡片 + 标签筛选 + 分页）
- `/series/系列名/` 单个系列详情页（全宽沉浸式瀑布流）

## 1. 新建素材目录

把图片和视频放进统一目录，例如：

```text
img/my-paint/新系列名/
```

## 2. 复制一份系列文件

在 `_series/` 里新建一个英文文件名，例如：

```text
_series/new-series.md
```

推荐先用"简易模式"。只有当你真的想给单张图片写标题、备注，或者想手工控制媒体墙节奏时，再用"精细模式"。

### 简易模式：只写系列信息 + 一个文件夹

```yaml
---
title: "新系列"
subtitle: "一句短描述。"
date: 2026-06-11 00:00:00
author: "me"
summary: "Gallery 页面和系列目录会读取这段简介。"
home_style: "wide"
home_badge: "角色系列"
tags:
  - SFW
  - 角色
media_dir: "img/my-paint/新系列名"
---

### 创作说明
这里可以写系列背景、角色设定、Prompt 备注，或者留空。
```

这时候页面会自动扫描 `media_dir` 对应目录里的文件，并自动生成系列页内容。

- 图片支持：`.jpg` `.jpeg` `.png` `.webp` `.gif` `.avif`
- 视频支持：`.mp4` `.webm` `.mov` `.m4v`

现成的真实例子：

- [_series/sunshine.md](../_series/sunshine.md)
- [_series/wolf.md](../_series/wolf.md)

### 精细模式：逐张写媒体信息

```yaml
---
title: "新系列"
subtitle: "一句短描述。"
date: 2026-06-11 00:00:00
author: "me"
header-img: "img/my-paint/新系列名/cover.jpg"
cover: "img/my-paint/新系列名/cover.jpg"
summary: "Gallery 页面和系列目录会读取这段简介。"
home_style: "wide"
home_badge: "角色系列"
tags:
  - SFW
  - 角色
media:
  - type: image
    src: "img/my-paint/新系列名/cover.jpg"
    title: "封面"
    note: "系列入口图。"
    card: "wide"
  - type: video
    src: "img/my-paint/新系列名/demo.mp4"
    title: "动作测试"
    note: "视频说明。"
---

### 创作说明
这里可以写系列背景、角色设定、Prompt 备注，或者留空。
```

## 3. 理解 src

`src` 是媒体文件本体的地址。图片会从 `src` 读取图片文件，视频会从 `src` 读取视频文件。

```yaml
- type: image
  src: "img/my-paint/新系列名/cover.jpg"
```

上面这个例子里，`src` 指向的就是要展示的图片。

```yaml
- type: video
  src: "img/my-paint/新系列名/demo.mp4"
```

上面这个例子里，`src` 指向真正播放的视频。

> **视频不再使用 `poster` 属性。** 视频封面建议在导出视频时直接压入视频文件内（很多视频导出工具支持设置首帧或指定封面帧）。这样视频自身的尺寸和封面完全一致，不会出现封面和视频尺寸不匹配导致的布局跳变。

## 4. 不写元数据时会发生什么

简易模式下：

- 如果只写了 `media_dir`，不写 `media`，页面会自动把文件夹里的图片和视频排出来。
- 如果不写 `cover` 和 `header-img`，页面会自动把系列里的第一张图片当封面。
- 如果不写 `summary`，Gallery 页面和系列目录会优先退回用 `subtitle`。

精细模式下：

- 如果你同时写了 `media` 和 `media_dir`，会优先使用 `media`。
- 如果你不想一张张写 `title`、`note`、`card`，就不要写 `media`，直接改用 `media_dir`。

最推荐的理解方式是：

- `media_dir` 适合"我只想把这一整个文件夹发出来"
- `media` 适合"我想精细控制每张图的文案和排版"

## 5. 选择 Gallery 封面尺寸

> 已弃用该页面

`home_style` 控制 Gallery 展墙里的排布方式：

- `hero`：最大，适合重点系列
- `wide`：横向大封面
- `tall`：竖向大封面
- `standard`：标准尺寸

## 6. 选择媒体卡片尺寸

`media` 里的 `card` 用来控制系列页内媒体墙的节奏：

- `wide`：横向大卡片
- `tall`：纵向卡片
- `standard`：标准卡片

简易模式不会用到这些字段，因为它会自动排图。

## 7. NSFW 标记

在 frontmatter 里加上 `nsfw: true`，该系列在目录页会被标记为 18+，安全浏览模式下封面会被模糊处理：

```yaml
---
title: "新系列"
nsfw: true
...
---
```

## 8. 系列详情页布局

系列详情页采用全宽沉浸式瀑布流：

- **顶部信息条**：标题、副标题、标签、图/视频数量、日期
- **全宽瀑布流**：封面图作为第一张大图，其余媒体全部自适应排列（>1100px 三列，>550px 两列，≤550px 单列）
- **底部返回按钮**：居中

瀑布流布局由 `js/masonry.js` 统一管理，目录页和详情页共享同一套逻辑。

## 9. GitHub Pages 兼容原则

这个站点现在尽量只依赖 GitHub Pages 友好的能力：

- 纯 Jekyll collection
- 静态 CSS / JS
- 不依赖额外 Ruby 插件
- 不要求 push 后再跑 Node 构建

也就是说，后续新增系列时，通常只需要：

1. 放素材
2. 写一份 `_series/*.md`
3. 提交并 push

## 10. 本地调试说明

站点保留了线上 PWA / Service Worker 能力，但本地 `localhost` / `127.0.0.1` 预览时会自动跳过并清理 Service Worker，避免旧缓存把调试页面"卡住"。

如果你本地刚好已经打开过旧版本页面，刷新一次即可。
