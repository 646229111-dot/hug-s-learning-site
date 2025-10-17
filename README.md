# 我的学习资料库（静态网站模板）

这是一个 **零后端、零数据库** 的静态网站模板，用来 **存放与分享你的学习文件**（PDF、PPT、代码示例等）。
它支持：
- 🔎 关键词搜索（标题/描述/标签）
- 🏷️ 按标签筛选
- 🌓 深/浅色主题切换
- 📱 移动端友好

## 目录结构
```
learning_site_template/
├─ index.html          # 首页（无需改动样式/脚本即可使用）
├─ files.json          # 文件清单（改这里即可上架/下架文件）
├─ assets/
│  ├─ style.css        # 样式
│  └─ script.js        # 逻辑（加载 files.json 并渲染）
└─ files/              # 你的学习文件都放在这里（PDF/PPT/图片/代码等）
```

## 如何添加文件
1. 将你的文件（如 `xxx.pdf`）放进 `files/` 目录。
2. 编辑 `files.json`，按如下格式添加一个条目：
```jsonc
{
  "title": "文件标题",
  "desc": "一句话描述内容要点",
  "tags": ["标签1","标签2"],
  "href": "files/xxx.pdf",     // 指向 files/ 目录里的文件
  "type": "application/pdf"    // 可选，用于展示小图标
}
```
3. 保存后，提交并发布即可。页面会自动读取 `files.json` 并显示。

> 提示：静态托管无法自动“列目录”，所以我们用 `files.json` 作为文件清单。

## 一键发布到 GitHub Pages（推荐，免费）
1. 打开 GitHub，新建一个仓库（例如 `my-learning-site`）。
2. 把本模板里的所有文件上传到仓库根目录（包含 `index.html`、`files.json`、`assets/`、`files/`）。
3. 在仓库的 **Settings → Pages**：
   - Source 选择 **Deploy from a branch**
   - Branch 选择 **main / root**
   - 保存后等几分钟，你会得到一个公开网址，例如：`https://你的用户名.github.io/my-learning-site/`
4. 访问这个网址即可看到你的资料库。

## 发布到 Vercel（亦推荐）
1. 打开 <https://vercel.com>，用 GitHub 登录。
2. **New Project** → 选择你的仓库 → Framework 选 **Other**（这是纯静态站）。
3. 一路 Next，完成后即可获得你的链接（如 `https://my-learning-site.vercel.app/`）。

## 给简历加二维码（可选）
- 用任意二维码工具把网站链接生成二维码。
- 建议在二维码旁写一个短网址作备用（防扫码失败）。

## 常见问题
- **能否分文件夹分类？** 可以，`tags` 就是分类；或者在 `files.json` 里加上自定义 `category` 字段并在 `script.js` 里扩展渲染逻辑。
- **能否私密访问？** GitHub Pages 默认公开。如果需要私密，可用 Netlify Password Protect 或把敏感文件放到私有存储，页面只放可公开的摘要与跳转。
- **能否显示文件大小/更新日期？** 可以在 `files.json` 的条目里加 `size`、`updated` 字段，然后在 `script.js` 里补充渲染。

—— 祝你学习顺利！
