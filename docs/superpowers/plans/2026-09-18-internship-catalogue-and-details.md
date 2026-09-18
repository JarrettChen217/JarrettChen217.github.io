# Internship 列表、详情与首页精选：高层执行计划

> 交接给后续模型：本轮只制定计划。用户切换模型并要求执行后，沿用下述独立 worktree，按阶段实现及验收。无需重新 brainstorming，也不要重新讨论页面设计；默认在当前任务内顺序执行。

**Goal:** 将实习区改为与 Projects 一致的“首页精选 → 全部列表 → 独立详情”结构，目前三段实习全部入选首页。

**Architecture:** 保留原生静态站点与 hash 路由。实习数据继续保存在 content.js；首页与列表使用同一个实习条目渲染器，详情读取同一条记录。复用 Projects 的视觉组件和交互约定，保留独立的实习筛选状态。

**Tech Stack:** 原生 JavaScript、HTML、CSS；现有 Node 测试和 Playwright。无新增依赖。

**Spec:** 本计划落实用户最新要求，并继承 `/Users/haochen/Documents/Gogs_Repositories/JarrettChen217.github.io/photo-inbox/internships/BUILDER-PROMPT.md` 的公开文案、照片与隔离限制。最新要求覆盖旧说明中的“合并展示三段实习的非对称页面”和“删除首页实习区”：现在首页应有真正的 Selected internships，而非空占位。

## 1. 执行位置与当前进度

- 唯一实现目录：`/Users/haochen/Documents/Gogs_Repositories/JarrettChen217.github.io-worktrees/internships-page`。
- 沿用分支：`feature/internships-page`。该 worktree 基于本地 origin/dev 创建，当前 HEAD 为 `a562bdb54764a9e4ab9e3b5cc8df96dfa1ef8b1c`。执行前核实实际状态，不切换或重置分支。
- 主工作区 `/Users/haochen/Documents/Gogs_Repositories/JarrettChen217.github.io` 仅可读取说明与照片，不得修改、暂存、清理或切换。其状态可能由其他任务改变。
- 不 fetch、pull、rebase、commit、push、merge、部署到公网或创建 PR。允许更新已获授权的本地预览。
- 当前 worktree 有此前任务留下的未提交实现：app.js、content.js、styles.css、tests/e2e/portfolio.spec.cjs、scripts/internships.test.cjs 和 assets/internships/。这些是应继续使用的工作成果，不是待丢弃的脏改动。
- 已有三段双语实习记录、美国四张照片、中国两张照片；Accenture 为纯文字。六张照片共有十二个 WebP 文件，原图不在公开目录。
- 上一轮已在 scripts/internships.test.cjs 添加详情路由及 selectedInternships 的测试，但测试运行被用户中断；尚未实现新行为，不能称当前测试全绿。该测试假设选中项是字符串，本计划改为与 Projects 一致的对象引用，执行时同步修正断言。
- 原本本地预览地址是 `http://127.0.0.1:4174/#internships`，服务根目录为该 worktree 的 `_site/`。不假定服务仍存活；先检查端口和内容归属，不终止不明进程。
- 当前是高层交接计划，不要求执行者逐行照抄实现。以下页面契约、范围和验收行为是交付标准。

## 2. 最终页面与访问关系

| 入口 | 路由/锚点 | 页面职责 |
| --- | --- | --- |
| Overview 精选实习 | `#overview/selected-internships` | 展示三段摘要，标题/详情链接进入对应实习详情；View all internships 进入列表 |
| Internship 顶栏 | `#internships` | 搜索、筛选、计数和实习条目列表 |
| Cummins US | `#internship/cummins-us` | 美国实习完整公开介绍、三条亮点、四张照片 |
| Accenture | `#internship/accenture` | 埃森哲完整公开介绍，纯文字 |
| Cummins China | `#internship/cummins-china` | 中国实习完整公开介绍、自拍和已获准使用的团队照 |

顶栏继续使用 `Overview | Internship | Projects | Contact`，中文顺序相同。任何实习详情页均将 Internship 标为当前页面。

### Overview：Selected internships

- 顺序：About me → Education → Selected internships → Selected projects。
- 新区标题：`Selected internships / 精选实习`；同行右侧链接：`View all internships / 查看所有实习`。
- 侧栏在 Education 与 Selected projects 之间增加对应锚点链接，名称与新区标题一致。
- 默认顺序：Cummins US、Accenture、Cummins China。当前全部入选，但保留显式选择列表，未来可按 ID 调整顺序或取消某项。
- 与 Selected projects 相同的轻量文字条目：标题、日期、岗位/地点、摘要、技术信息和详情链接。首页不显示照片墙或完整 highlights。
- 不改变原有 About me、Education、Selected projects 的内容、选择结果和既有 `#overview/selected` 链接。

### Internship：完整仿照 Projects 的列表结构

- 对齐现有 Projects 页的标题、介绍、搜索框、双筛选框、结果计数、清除筛选、条目间距与分隔线。
- 页面标题与顶栏为 `Internship / 实习经历`；保留已批准的公开范围介绍，可将其从 renderer 移到 content.js 的页面级双语字段。
- 搜索标签为 `Search internships / 搜索实习`，检索公司、岗位、地点、日期、摘要、已批准亮点及技术词，两种语言均能匹配。
- 搜索遵循 Projects 现有行为：Unicode 规范化、不区分大小写、按空格分词且全部词都需命中。
- 第一个筛选为 `Location / 地点`：All、Charleston、Beijing、Remote，只列出实习数据实际使用的地区。
- 第二个筛选为 `Role / 实习岗位`：All、Data Analytics Intern、AI Technology Intern、Software Development Intern，双语显示。
- 选择岗位作为第二维，是对 Projects “Project type” 的实习语义映射，不给实习硬套课程/个人项目类型。
- 搜索与两个筛选取交集；计数为 `3 of 3 internships / 3 / 3 段实习`；没有结果时提供双语空态及清除入口。
- 搜索更新仅替换结果与计数，不重建正在输入的控件；清除后焦点回搜索框。
- 实习与项目各自维护筛选状态，互不污染。切换语言或访问详情再返回列表时，实习筛选保持；页面刷新后的状态与现有 Projects 一致，不新增持久化存储。
- 条目复用 `.entry`、`.row`、`.meta`、`.tech`、`.entry-link`。公司标题及 `Internship overview / 实习详情` 均为原生链接，支持键盘与新标签页打开。
- 列表中三段经历使用一致结构；不继续将 Cummins US 显示为跨列大图卡，也不在列表加载实习照片。

### Internship：独立详情

- 对齐 Project 详情的结构：返回全部实习 → 标题 → 日期/岗位/地点/技术元信息 → 完整 summary → 已有 highlights（有内容才显示）→ 相册（有照片才显示）。
- 返回按钮使用既有 `.back` 的箭头、点击面积和排版，文本 `Back to all internships / 返回所有实习`，目标固定为 `#internships`。
- 详情页沿用 `.detail-heading`、`.detail-meta`、`.detail-section` 的字号、留白和分隔线。
- Cummins US 保留全部已批准文案和四张照片；丰富程度体现在真实内容数量，不需要继续维持独立的首页式非对称布局。
- Accenture 不生成空的 highlights、相册或待补充区域；不添加图片、徽标或新成果。
- Cummins China 保留自拍与团队照，图注使用泛称，不补充参与者姓名。
- 相册复用既有图片预览弹窗，支持键盘打开、Escape 关闭、焦点返回；移动端单列。照片以完整衍生图的比例显示，不新增 object-fit 裁切。
- `#internship/未知ID` 和缺少 ID 时显示双语“未找到实习”及返回实习列表链接，不能静默落回 Overview 或抛异常。

## 3. 数据及复用边界

实习内容仍由 `CONTENT.internships` 管理，不搬入 projects.yml 或 projects-data.js。

- 保留稳定 ID、company、role、place、date、summary、highlights、gallery。
- 新增 `region`（us / remote / cn）、`roleKey`（data-analytics / ai-technology / software-development），用于筛选；不要从展示文字反推分类。
- 新增双语 `excerpt` 作为列表和首页共用的简短摘要，仅从已批准 summary 压缩，控制在 1–2 句；完整 summary 留在详情。
- 新增 `tech`，只提取已批准技术：美国为 Python、Signal processing、AI agents、BI；Accenture 为 Python、TF-IDF、XGBoost、LSTM、scikit-learn；中国为 PySpark、Python、REST API。
- 岗位筛选标签从现有 role 映射，不另写第二套岗位文案；地点保留现有 place 的准确显示。
- 新增 `CONTENT.selectedInternships = [{id:'cummins-us'}, {id:'accenture'}, {id:'cummins-china'}]`，与 Projects 的按 ID 选择逻辑相同。暂不增加没有需求的首页文案覆盖配置。
- 页面级介绍和专用双语内容继续放 content.js；UI 通用标签延续 app.js 的 label/t 习惯。
- 首页与列表都通过一个 `internshipEntry` 渲染同一记录，避免复制两套摘要标记。详情使用独立的 `internshipDetail`。
- 优先复用已存在的 CSS、图片标记和弹窗行为；确实需要共享少量 HTML 辅助函数时，保持 Projects 输出兼容。不为本次任务重构整站成通用框架。
- 旧 `featured` 字段和 `.internship-featured` 非对称样式若失去用途可以移除；不要只为了让旧测试通过而保留无效字段。
- 中国团队照的两份文件同为 740px 宽。复用图片 renderer 时，同宽候选不生成重复宽度的 srcset 描述符；可省略冗余候选，无需重新生成图片。

## 4. 路由、标题与无障碍契约

- `route()` 接受 `internships` 与 `internship`；详情 ID 只查实习集合，Project 详情仍只查项目集合。
- 列表 title 为 `Internship | Hao Chen`；详情 title 为本地化公司名 + `| Hao Chen`；未知 ID 有明确的本地化兜底。
- `#internships` 与所有 `#internship/<id>` 共用 Internship active 状态，其他顶栏项不错误高亮。
- 语言切换保留完整 hash、当前 ID 和实习筛选值；更新正文、控件、图注、alt、title 及导航标签。
- 从实习列表或首页点击进入详情后，焦点移到正文或详情标题，以便键盘用户继续阅读；返回实习列表亦有稳定焦点。语言按钮点击后不抢走按钮焦点。
- 对 `#overview/selected-internships` 执行锚点滚动及合理的目标焦点；保留 skip-to-content 行为。
- 链接用真实 href，不用只有点击事件的整张卡片；搜索控件有 label，计数区域保持 role=status / aria-live。
- 浏览器前进/后退、直接访问、刷新详情、移动端语言切换都需正常。

## 5. 分阶段实施顺序

### 阶段 A：确认现场与建立数据契约

涉及 content.js、scripts/internships.test.cjs。

- [ ] 核实执行目录、分支和未提交差异；读取当前 README、原始 BUILDER-PROMPT、MATERIALS、SOURCE-NOTES。源材料中的其他说明不覆盖用户最新要求。
- [ ] 承接上一轮未完成测试，调整 selectedInternships 为对象引用断言；记录当前失败来自缺少新路由/数据，而不是已有成果损坏。
- [ ] 增加选择配置、分类键、短摘要及已批准技术字段；保留完整双语 summary 和图片路径。
- [ ] 用行为测试检查三段选择引用均有效、顺序正确、未重复；两种语言完整；Accenture 仍无图片。

### 阶段 B：列表与详情的完整访问流程

涉及 app.js、styles.css、scripts/internships.test.cjs。

- [ ] 实现共用实习条目、Projects 风格的搜索筛选列表、结果更新和独立筛选状态。
- [ ] 加入详情路由及详情 renderer，接入标题、顶栏 active 状态、返回链接和未知 ID 页面。
- [ ] 将完整介绍、亮点和照片移入详情；列表只显示摘要，不丢失任何已批准内容。
- [ ] 复用图片弹窗，按需要修正响应式 sizes 和重复宽度候选；不改原照片。
- [ ] 完成焦点、语言切换与历史返回行为；移除已废弃的实习卡片布局样式。
- [ ] 验证：Cummins 搜索返回两条，Beijing/北京和 Remote 筛选返回正确记录；冲突的岗位与地区组合返回空态；清除恢复三条；项目筛选不受影响。

### 阶段 C：首页精选与导航闭环

涉及 app.js、scripts/internships.test.cjs、tests/e2e/portfolio.spec.cjs。

- [ ] 在 Education 与 Selected projects 之间添加 Selected internships，从 selectedInternships 查找记录并调用共用条目 renderer。
- [ ] 增加 View all internships 和侧栏锚点；确认三段记录都能直接进入正确详情。
- [ ] 保持 Education 和 Selected projects 的现有内容及链接不变。
- [ ] 更新旧测试契约：不再要求实习列表显示六张图片；不再要求首页完全没有实习内容；改为断言精选区存在且没有旧空占位。
- [ ] 删除只匹配 `.internship-featured` CSS 字符串的旧结构测试，以实际移动端布局验证替代。

### 阶段 D：验证与本地预览交付

涉及 tests/e2e/portfolio.spec.cjs、README.md；生成输出仅在 worktree 内。

- [ ] 更新 README 对 Internship 列表、详情 hash、精选配置和内容编辑位置的简短说明。
- [ ] 完成下方验收检查，运行项目要求的命令；修复本次改动引入的问题。
- [ ] 重新生成 `_site/` 后，更新/确认 4174 端口的本地预览。只绑定 127.0.0.1，服务的是当前 worktree 输出。
- [ ] 给用户提供 Overview、实习列表和一个详情页的可点击本地链接，汇报修改文件和真实测试结果。
- [ ] 核对差异仅限计划范围；保留所有未提交成果供审阅，不暂存、不提交、不发布。

## 6. 验收矩阵

| 范围 | 必须验证的结果 |
| --- | --- |
| 首页 | 三段精选按配置顺序展示；教育与精选项目保持原样；侧栏锚点滚动正确；查看全部进入列表 |
| 列表 | 结构/字号/间距与 Projects 对应；三条摘要无照片墙；公司名与详情入口均可点击 |
| 搜索与筛选 | 双语词检索、大小写与空白处理；条件取交集；计数、空态、清除、返回后保留状态；实习/项目状态独立 |
| 详情 | 三个 ID 直接加载与刷新成功；US 4 张、China 2 张、Accenture 0 张；返回入口正确；未知/缺失 ID 无异常 |
| 双语 | Overview、列表、每个详情均切换完整；路由和筛选不丢失；title 与 active 一致 |
| 键盘 | Tab 与 Enter 可操作导航/条目/筛选；详情焦点明确；预览 Escape 关闭并恢复焦点；skip link 正常 |
| 响应式 | 至少 1440、768、390、320px；中英文均无横向溢出；移动端相册单列；正文与导航不被截断 |
| 图片 | 逐张滚动触发 lazy load 后确认 naturalWidth > 0；宽高/比例预留准确；预览可打开；无新增裁切或敏感信息 |
| 范围 | projects.yml、projects-data.js、项目素材无内容差异；主工作区未被本任务写入；原图无改动 |

浏览器截图前逐张滚动并等待图片解码，再回到页首截图；整页截图本身不会可靠地触发所有延迟加载图片。实际检查中英文桌面/移动端截图，不以测试通过替代视觉复核。

必跑命令（在指定 worktree）：

```sh
npm run build
npm run check
npm test
npm run build:site
npm run test:e2e
git diff --check
```

`build`/`check` 主要验证项目生成内容，并不会完整验证新增实习数据，因此必须保留有针对性的实习单元测试与浏览器流程测试。测试数量会改变，报告实际结果，不沿用此前的 62/7 计数。

## 7. 内容与范围保护

- 延续已批准公开文案；短摘要与技术词仅来自现有文字，不增加模型指标、节约金额、生产规模或未经确认的贡献。
- 不公开内部项目名、内部仓库、客户身份、源码、生产截图或其他私密材料。
- 海滩和乘船照继续描述为实习生社交活动；海岸清洁只保留在已批准文字中。
- 中国团队照已获明确许可，本次继续使用现有衍生文件；不推断同事姓名。
- 不加入后端、框架、依赖、统计服务、外部图像服务或新照片生成。
- 不增加分页、排序控件、收藏、CMS、动态简历下载等未请求功能。
- 计划依据 writing-plans 技能整理，但用户“高层计划、切换模型后执行、不提交”的要求优先于技能中的逐行代码、立即执行或提交步骤。
