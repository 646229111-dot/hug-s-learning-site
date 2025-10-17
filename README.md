# 首页直出版（无搜索/无标签，按更新时间排序）

这个版本一进首页就展示所有文件卡片（最新更新的在最前面）。
- 移除了搜索框与标签筛选
- 保留深/浅色切换
- 数据来自 `files.json`，按 `updated` 字段倒序排列

## 怎么用
1. 将你的文件放在 `files/` 目录。
2. 在 `files.json` 的 `items` 里添加/修改条目，并给每个条目加上 `updated`（例如 `2025-10-01`）。
3. 上传到 GitHub 仓库或直接在 Vercel 上更新，部署完成即生效。

## `files.json` 示例
```json
{
  "updated": "2025-10-17",
  "items": [
    {
      "title": "项目标题",
      "desc": "一句话介绍",
      "tags": ["标签1","标签2"],
      "href": "files/xxx.pdf",
      "type": "application/pdf",
      "updated": "2025-10-01"
    }
  ]
}
```
