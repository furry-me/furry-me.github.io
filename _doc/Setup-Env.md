# 本地环境搭建

本地预览需要安装 **Node.js** 和 **Ruby** 两个运行时，然后装项目依赖并启动 Jekyll 服务器。

---

## 1. 安装 Node.js

Node.js 用于 CSS/JS 构建工具。

下载并安装 [LTS 版本](https://nodejs.org/)（推荐 18.x 或以上）。

安装完成后验证：

```bash
node -v
```

---

## 2. 安装 Ruby

### macOS

macOS 自带 Ruby，如果版本 ≥ 2.7 可以直接用。

```bash
ruby -v
```

如果提示找不到或版本过低，用 Homebrew 安装：

```bash
brew install ruby
```

### Ubuntu / Debian

```bash
sudo apt update
sudo apt install ruby-full build-essential
```

### Windows

使用 [RubyInstaller](https://rubyinstaller.org/) 下载安装，选择与系统位数对应的版本（32-bit / 64-bit）。安装时勾选 **MSYS2 开发工具**。

安装完成后验证：

```bash
ruby -v
```

---

## 3. 安装项目依赖

在终端中进入项目目录，依次执行：

```bash
# 安装 Ruby 依赖（Gemfile）
bundle install

# 安装 Node.js 依赖（package.json）
npm install
```

---

## 4. 启动预览

```bash
npm run dev
```

启动后访问 `http://127.0.0.1:4000`。

文件修改后页面会自动刷新，无需重启。

---

## 5. 常见问题

**`bundle install` 权限报错** — 不要加 `sudo`，用 rbenv 或 rvm 管理 Ruby 版本，或把 gems 装到用户目录。

**`npm run dev` 端口被占用** — 换一个端口：

```bash
bundle exec jekyll serve --port 4001
```

**Windows 下 `grunt watch & npm run start` 报错** — Windows 的 cmd 不支持 `&` 后台运行。可以分开两个终端窗口：

- 窗口 A：`grunt watch`
- 窗口 B：`bundle exec jekyll serve`

或者用 `concurrently`：

```bash
npm install --save-dev concurrently
npm run start  # 先手动跑 grunt watch 再开这个窗口
```

**Jekyll 启动后 404** — 刚启动需要几秒钟生成页面，等终端出现 `done` 后再刷新浏览器。
