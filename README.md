# 张轶隽 - 个人简历作品集网站

## 项目概述
多岗位适配的个人简历作品集网站，支持数据分析、IT专员、新媒体运营等方向的岗位切换展示。

## 设计风格
- **配色方案**：低饱和度白色 + 淡绿色系（森林风）
- **布局参考**：左侧箭头式经历描述 + 右侧作品截图展示
- **数据可视化**：数字动态展示（如 7000+、137K 等）
- **代表作品**：卡片式排版展示

## 技术栈
- HTML5 + CSS3 + JavaScript
- 响应式设计（适配移动端）
- 平滑滚动 + 动画效果

## 文件结构
```
NecoWeb/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # 交互逻辑
├── images/             # 图片资源
│   ├── ref1.jpg        # 参考设计1
│   ├── ref2.jpg        # 参考设计2
│   └── resume_preview.png  # 简历预览
└── README.md           # 项目说明
```

## 页面结构
1. **导航栏**：岗位类型切换（数据分析 | IT专员 | 新媒体运营）
2. **Hero区域**：个人简介 + 核心数据可视化
3. **经历时间线**：左侧箭头标注 + 右侧作品展示
4. **技能矩阵**：各岗位技能进度条
5. **项目经历**：卡片式项目展示
6. **校园经历**：校园活动展示
7. **联系方式**：底部联系信息

## 配色参考
- 主背景：#FAFAF8（米白色）
- 主色调：#7BAE7F（森林绿）
- 辅助色：#A8C5A9（淡绿）
- 强调色：#5A8F5C（深绿）
- 文字：#2C3E2D（深墨绿）
- 次要文字：#6B7B6C（灰绿）

## 字体方案
参考 [ricocc/public-portfolio-site](https://github.com/ricocc/public-portfolio-site/)：
- **中文正文**：思源黑体 (Noto Sans SC) - Google Fonts
- **英文/数字/标签**：Special Elite - Google Fonts（打字机风格）
- **中文标题**：汇文明朝体（如需可后续添加）

## 本地预览
```bash
cd ~/CodeStudy/NecoWeb
python3 -m http.server 3000
# 访问 http://localhost:3000
```

## 社媒采集与分析
项目内新增了一个基于 Playwright 的“小红书 / 抖音关键词采集 + 自动分析”工具，适合抓取某个关键词在当前网页搜索结果里可见的公开内容，并输出内容分析报告与商业模式拆解。

### 安装依赖
```bash
cd ~/CodeStudy/NecoWeb
npm install
```

### 一键跑通
```bash
npm run social:pipeline -- --keyword "鹰村田园综合体"
```

运行时会打开浏览器。你需要在浏览器里手动完成登录、验证码与搜索结果加载，然后回终端按回车，脚本会继续自动滚动采集。

默认优先复用本机已安装的 `Google Chrome`。只有你本机没有可用 Chrome 时，才需要执行：

```bash
npx playwright install chromium
```

### 仅采集
```bash
npm run social:collect -- --keyword "鹰村田园综合体" --platforms xiaohongshu,douyin
```

### 按账号主页采集
```bash
npm run social:collect -- \
  --mode profile \
  --platforms xiaohongshu,douyin \
  --target-url xiaohongshu=https://www.xiaohongshu.com/user/profile/<user-id> \
  --target-url douyin=https://www.douyin.com/user/<sec_uid>
```

这会抓“账号主页里展示出来的作品流”，适合做账号内容盘点，而不是全平台关键词提及分析。

### 仅分析
```bash
npm run social:analyze -- --input ./data/social/<session-dir>
```

### 输出位置
- 采集数据：`data/social/<session-dir>/`
- 分析报告：`reports/social/<session-dir>/report.md`
- 结构化摘要：`reports/social/<session-dir>/summary.json`

### 边界说明
- 该工具抓取的是“登录后的网页端当前可见搜索结果与接口响应”，不是平台内部不可见数据。
- 如果平台触发验证码、风控、内容折叠、历史下架或私密内容限制，脚本不会绕过这些限制。
- “全量”是否成立，取决于平台网页端是否继续暴露更多分页/滚动结果。

## 已完成功能
- [x] 基础HTML结构
- [x] CSS样式（森林风配色）
- [x] 岗位切换交互
- [x] 数据可视化组件
- [x] 响应式适配
- [x] 字体方案（Special Elite + Noto Sans SC）

## 待补充素材
- [ ] 个人照片
- [ ] 作品截图（BI看板、数据分析报告等）
- [ ] 摄影作品展示
- [ ] 项目截图
