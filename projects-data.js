// Generated from projects.yml. Do not edit; run npm run build.
const PROJECTS = {
  "selected": [
    {
      "id": "agent-ai",
      "description": [
        "Document Q&A with retrieval, voice interaction, and MCP-based web search.",
        "结合文档检索、语音交互与 MCP 网络搜索的问答应用。"
      ]
    },
    {
      "id": "social-ai"
    },
    {
      "id": "online-ordering"
    },
    {
      "id": "vitalguard"
    },
    {
      "id": "avl-visualisation"
    },
    {
      "id": "mur-simulation"
    }
  ],
  "projects": [
    {
      "id": "agent-ai",
      "name": [
        "Agent AI",
        "Agent AI（文档问答助手）"
      ],
      "date": [
        "2026 — ongoing",
        "2026年 — 持续开发"
      ],
      "region": "ny",
      "type": "personal",
      "tech": "React, Node.js, LangChain, MCP, SerpAPI",
      "summary": [
        "A conversational application presenting document-based answers alongside answers informed by web search.",
        "分别展示基于文档及网络搜索回答的对话应用。"
      ],
      "background": [
        "The project explores two information sources in one interface. Uploaded PDFs provide local context, while a separate MCP search tool retrieves current web information. The two answer streams remain visible separately.",
        "项目在同一界面中探索两类信息来源：上传 PDF 提供本地上下文，独立 MCP 搜索工具获取网络信息，两种回答分别展示。"
      ],
      "work": [
        [
          "Built the React interface and Express endpoints for PDF uploads and questions.",
          "构建 React 界面及处理 PDF 上传与问题的 Express 接口。"
        ],
        [
          "Loaded and split PDF text, embedded the chunks into an in-memory vector store, and used retrieved text as context for answering.",
          "加载并切分 PDF 文本，将文本块嵌入内存向量存储，使用检索文本作为回答上下文。"
        ],
        [
          "Connected a reusable MCP client to a SerpAPI search server and added speech recognition and text-to-speech interaction.",
          "将可复用 MCP 客户端连接到 SerpAPI 搜索服务，并加入语音识别与文字转语音交互。"
        ]
      ],
      "boundary": [
        "The current prototype uses a shared uploaded-file path and rebuilds its document embeddings during a question request. Public multi-user access and source citations are not yet implemented.",
        "当前原型共享上传文件路径，并在问答请求中重新构建文档嵌入，尚未实现公共多用户访问及来源引用展示。"
      ],
      "keywords": [
        "RAG",
        "AI agent",
        "文档问答",
        "语音",
        "retrieval"
      ]
    },
    {
      "id": "social-ai",
      "name": [
        "SocialAI",
        "SocialAI（AI 社交平台）"
      ],
      "date": [
        "Dec 2025 – Mar 2026; subsequent maintenance",
        "2025年12月 – 2026年3月；后续持续维护"
      ],
      "region": "ny",
      "type": "personal",
      "tech": "React, Go, Elasticsearch, Google Cloud, Docker",
      "summary": [
        "A full-stack social application combining searchable posts with AI-assisted image creation.",
        "将帖子搜索与 AI 辅助图像创作结合的全栈社交应用。"
      ],
      "background": [
        "SocialAI brings content creation and discovery together. Its React interface connects to a Go service, with Elasticsearch for search and cloud storage for uploaded media.",
        "SocialAI 将内容创作与发现结合起来。React 界面连接 Go 服务，使用 Elasticsearch 搜索及云存储保存媒体。"
      ],
      "work": [
        [
          "Implemented frontend and backend flows for users, posts, and content search.",
          "实现用户、帖子与内容搜索相关的前后端流程。"
        ],
        [
          "Integrated image generation behind provider interfaces; the current repository includes OpenAI and Gemini implementations and related tests.",
          "通过服务接口接入图像生成；当前仓库包含 OpenAI、Gemini 实现及相关测试。"
        ],
        [
          "Maintained a Docker Compose development stack and Google Cloud deployment configuration.",
          "维护 Docker Compose 开发环境与 Google Cloud 部署配置。"
        ]
      ],
      "keywords": [
        "search",
        "full-stack",
        "image generation",
        "搜索",
        "图像生成"
      ]
    },
    {
      "id": "online-ordering",
      "name": [
        "Online Food Ordering",
        "Online Food Ordering（在线订餐系统）"
      ],
      "date": [
        "Dec 2025 – Feb 2026",
        "2025年12月 – 2026年2月"
      ],
      "region": "ny",
      "type": "personal",
      "tech": "Java, Spring Boot, React, PostgreSQL, Spring Security, Docker",
      "summary": [
        "A restaurant and ordering application with a React client and a layered Java backend.",
        "使用 React 客户端与分层 Java 后端的餐厅浏览及订餐应用。"
      ],
      "background": [
        "The application connects restaurant and menu browsing to customer and cart services. The backend separates controllers, services, and data access around a PostgreSQL database.",
        "应用将餐厅、菜单浏览与客户及购物车服务连接起来。后端围绕 PostgreSQL 数据库分离控制器、服务与数据访问。"
      ],
      "work": [
        [
          "Implemented Spring Boot endpoints for customer, restaurant, menu, and cart workflows.",
          "使用 Spring Boot 实现客户、餐厅、菜单与购物车流程接口。"
        ],
        [
          "Used Spring Data JDBC for persistence and Spring Security for session-based authentication.",
          "使用 Spring Data JDBC 实现持久化，以 Spring Security 实现会话认证。"
        ],
        [
          "Integrated the React interface and prepared Docker application configuration.",
          "集成 React 界面并配置应用 Docker 环境。"
        ]
      ],
      "keywords": [
        "backend",
        "REST",
        "SQL",
        "订餐",
        "后端"
      ]
    },
    {
      "id": "vitalguard",
      "name": [
        "VitalGuard AI",
        "VitalGuard AI（可穿戴传感系统）"
      ],
      "date": [
        "Sep 2025 – Dec 2025",
        "2025年9月 – 2025年12月"
      ],
      "region": "ny",
      "type": "academic",
      "tech": "ESP32, MicroPython, Python, Flask, Google Cloud, Gunicorn",
      "summary": [
        "A university AIoT prototype connecting wearable sensor readings to a cloud service and web dashboard.",
        "将可穿戴传感器读数连接到云服务与 Web 仪表板的大学 AIoT 原型项目。"
      ],
      "background": [
        "The team project investigates a device-to-cloud workflow for sensor collection, processing, visualisation, and generated reports. Its repository separates embedded firmware, the Flask service, and the project website.",
        "团队项目探索设备到云端的传感采集、处理、可视化及报告生成流程，仓库分别组织嵌入式固件、Flask 服务与项目网站。"
      ],
      "work": [
        [
          "Worked on the ESP32-to-Flask data pipeline and cloud backend.",
          "参与 ESP32 到 Flask 的数据管道与云端后端工作。"
        ],
        [
          "Configured backend serving and process management with Gunicorn and systemd.",
          "使用 Gunicorn 与 systemd 配置后端服务及进程管理。"
        ]
      ],
      "boundary": [
        "An educational engineering prototype; no clinical validation or medical-device capability is claimed.",
        "本项目为教学工程原型，不主张临床验证结果或医疗器械能力。"
      ],
      "keywords": [
        "IoT",
        "wearable",
        "hardware",
        "物联网",
        "可穿戴"
      ]
    },
    {
      "id": "berry-street",
      "name": [
        "Berry Street Teachers App",
        "Berry Street Teachers App（教师应用设计）"
      ],
      "date": [
        "Feb 2025 – Aug 2025",
        "2025年2月 – 2025年8月"
      ],
      "region": "au",
      "type": "team",
      "tech": "Requirements engineering, Agile/Scrum, Figma",
      "summary": [
        "Requirements and interaction design for an iPad-oriented education application.",
        "面向 iPad 教育应用的需求分析与交互设计。"
      ],
      "background": [
        "A university client collaboration exploring digital support for trauma-informed education. The work focused on understanding stakeholders and turning needs into testable design requirements.",
        "大学客户合作项目，探索支持创伤知情教育的数字工具，重点是理解利益相关方并将需求转化为可验证的设计要求。"
      ],
      "work": [
        [
          "Served as Scrum Master, coordinating discussions and sprint activities.",
          "担任 Scrum Master，协调讨论与冲刺活动。"
        ],
        [
          "Organised user stories, acceptance criteria, personas, and journey maps.",
          "整理用户故事、验收标准、用户画像与旅程图。"
        ],
        [
          "Contributed to prototype direction and privacy-related design discussions.",
          "参与原型设计方向及隐私相关设计讨论。"
        ]
      ],
      "journey": [
        {
          "title": [
            "A clearer teacher dashboard",
            "更清晰的教师仪表盘"
          ],
          "body": [
            "The team refined the readiness dashboard from a pie chart to a histogram, making the distribution easier to compare. The later client walkthrough confirmed that the revised chart was easier to read. I facilitated the low-fidelity usability session that informed this refinement, helping connect user feedback with the next design iteration.",
            "团队将学习准备度仪表盘的饼图改为柱状图，让分布更便于比较；后续客户演示反馈确认，新图表更容易阅读。我主持了为这次改版提供依据的低保真可用性测试，帮助将用户反馈衔接到下一轮设计。"
          ]
        },
        {
          "title": [
            "From requirements to a high-fidelity prototype",
            "从需求梳理到高保真原型"
          ],
          "body": [
            "Across the sprints, the team brought together user stories, acceptance criteria and an iPad-oriented high-fidelity prototype for handover. The student check-in was refined to a three-option design for primary-school users, which received positive feedback in the final walkthrough. My Scrum Master role supported coordination across requirements, testing and prototype refinement.",
            "在多轮冲刺中，团队将用户故事、验收标准与面向 iPad 的高保真原型整理为交接成果。学生签到流程调整为适合小学生的三个选项，并在最终演示中获得积极反馈。我作为 Scrum Master，协助衔接需求、测试与原型改进工作。"
          ]
        }
      ],
      "keywords": [
        "leadership",
        "design",
        "UX",
        "需求",
        "团队协作"
      ]
    },
    {
      "id": "avl-visualisation",
      "name": [
        "Algorithms in Action — AVL Trees",
        "Algorithms in Action（AVL 树可视化）"
      ],
      "date": [
        "Aug 2024 – Oct 2024",
        "2024年8月 – 2024年10月"
      ],
      "region": "au",
      "type": "team",
      "tech": "React, JavaScript, AVL trees",
      "summary": [
        "Visualising AVL insertion and rebalancing in an algorithm teaching platform.",
        "在算法教学平台中可视化 AVL 插入与平衡调整。"
      ],
      "background": [
        "The project extends an existing binary-search-tree teaching module with AVL behaviour, animated rotations, and step-by-step pseudocode playback.",
        "项目在已有二叉搜索树教学模块上扩展 AVL 行为、旋转动画及分步伪代码回放。"
      ],
      "work": [
        [
          "Contributed to the AVL insertion controller and recursive pseudocode as part of the algorithm programming pair.",
          "作为算法编程结对成员，参与 AVL 插入控制器与递归伪代码开发。"
        ],
        [
          "Collaborated on step-by-step rotation animations and the integration between algorithm logic and the visual interface.",
          "协作实现分步旋转动画，衔接算法逻辑与可视化界面。"
        ],
        [
          "Served as Scrum Master and corrected recursive playback navigation behaviour.",
          "担任 Scrum Master，并修复递归回放导航行为。"
        ]
      ],
      "journey": [
        {
          "title": [
            "Bringing AVL rotations into view",
            "让 AVL 旋转过程可见"
          ],
          "body": [
            "Working with a teammate, I implemented intermediate rotation steps in the controller so learners could follow how nodes move during rebalancing. We traced the algorithm and visual state together to connect the rotation sequence with the teaching interface. This contributed to the team's AVL extension of the existing binary-search-tree module.",
            "我与队友一起在控制器中实现旋转的中间步骤，让学习者能够跟随节点移动，理解重新平衡的过程。我们共同梳理算法与图形状态，将旋转流程连接到教学界面，完成团队在原有二叉搜索树模块上的一部分 AVL 扩展。"
          ]
        },
        {
          "title": [
            "Supporting recursive step-by-step playback",
            "完善递归算法的分步回放"
          ],
          "body": [
            "I resolved a chunk-depth navigation issue introduced when the algorithm was adapted to recursive pseudocode, supporting step-by-step exploration of the algorithm. The work involved tracing recursion depth and checking navigation through folded code. Alongside implementation, I coordinated weekly progress as Scrum Master and helped turn client feedback into team tasks.",
            "在算法适配递归伪代码的过程中，我解决了 chunk 深度导致的导航问题，支持算法的分步探索。实现时追踪递归层级，并检查折叠代码中的导航行为。同时，我作为 Scrum Master 协调每周进展，协助将客户反馈转化为团队任务。"
          ]
        },
        {
          "title": [
            "A traceable route from tasks to delivery",
            "从任务到交付的可追踪流程"
          ],
          "body": [
            "The team used Confluence for requirements, sprint reports and handover notes, while Jira linked implementation tasks to commits and deployment status. Separate stable and development previews supported client reviews. Controller tests checked tree outputs across rotation cases, and the handover documented the interfaces needed for continued development.",
            "团队使用 Confluence 整理需求、冲刺报告和交接说明，通过 Jira 将实现任务关联到提交与部署状态；稳定版和开发版预览支持客户评审。控制器测试检查不同旋转场景下的树输出，交接文档则记录后续开发所需的接口。"
          ]
        }
      ],
      "architecture": [
        {
          "title": [
            "Controller & pseudocode",
            "控制器与伪代码"
          ],
          "body": [
            "The insertion controller expresses the algorithm as an ordered sequence, with bookmarks linking execution to the displayed recursive pseudocode.",
            "插入控制器将算法组织成有序步骤，通过书签将执行过程关联到界面中的递归伪代码。"
          ]
        },
        {
          "title": [
            "Chunker playback",
            "Chunker 分步播放"
          ],
          "body": [
            "Each playback step triggers its scheduled actions, coordinating code highlighting with changes to the tree state.",
            "每个播放步骤触发对应动作，将代码高亮与树状态变化协调起来。"
          ]
        },
        {
          "title": [
            "GraphTracer & renderer",
            "GraphTracer 与图形渲染"
          ],
          "body": [
            "Extensions to the existing visual framework present node positions, heights, balance information and intermediate rotation states.",
            "在已有可视化框架上扩展节点位置、高度、平衡信息与旋转中间状态的呈现。"
          ]
        }
      ],
      "gallery": [
        {
          "src": "assets/projects/avl-visualisation/jira-algorithm-tasks-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/jira-algorithm-tasks-800.webp",
          "width": 778,
          "height": 472,
          "thumbnailWidth": 778,
          "group": "engineering",
          "alt": [
            "Jira task list for AVL algorithm and pseudocode development",
            "AVL 算法与伪代码开发的 Jira 任务列表"
          ],
          "caption": [
            "Jira records connect algorithm and pseudocode work to task ownership and status, including code folding, rotation updates and integration refinements.",
            "Jira 记录将算法与伪代码开发关联到负责人和任务状态，涵盖代码折叠、旋转更新与集成完善。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/avl-interface-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/avl-interface-800.webp",
          "width": 1600,
          "height": 793,
          "thumbnailWidth": 800,
          "group": "product",
          "alt": [
            "AVL insertion interface with tree, controls and pseudocode",
            "AVL 插入界面：树图、播放控制与伪代码"
          ],
          "caption": [
            "The delivered AVL module brings the input sequence, tree state and recursive pseudocode into one interactive view.",
            "交付的 AVL 模块在同一交互界面中呈现输入序列、树状态与递归伪代码。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/avl-visual-design-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/avl-visual-design-800.webp",
          "width": 1600,
          "height": 625,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Annotated AVL visual design",
            "带标注的 AVL 可视化设计"
          ],
          "caption": [
            "Design annotations from the final report: node heights, rotation labels, balance information and the active subtree.",
            "最终报告中的设计标注：节点高度、旋转标签、平衡信息与当前子树。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/issue-deployment-tracking-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/issue-deployment-tracking-800.webp",
          "width": 1022,
          "height": 570,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Jira issue and deployment tracking",
            "Jira 任务与部署跟踪"
          ],
          "caption": [
            "A project tracking snapshot linking an algorithm task to its deployment status.",
            "项目跟踪记录：将算法任务与对应部署状态关联。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/team-presentation-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/team-presentation-800.webp",
          "width": 1600,
          "height": 1200,
          "thumbnailWidth": 800,
          "group": "team",
          "alt": [
            "Static Sound group photo at the AVL presentation",
            "AVL 展示现场的 Static Sound 合照"
          ],
          "caption": [
            "Static Sound at the AVL project presentation.",
            "Static Sound 团队的 AVL 项目展示合照。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/collaborative-workshop-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/collaborative-workshop-800.webp",
          "width": 1600,
          "height": 1067,
          "thumbnailWidth": 800,
          "group": "team",
          "alt": [
            "IT Project workshop around a laptop",
            "IT Project 课程中围绕电脑协作的场景"
          ],
          "caption": [
            "Working together during IT Project.",
            "IT Project 课程中的协作记录。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/static-sound-team-shirt-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/static-sound-team-shirt-800.webp",
          "width": 1067,
          "height": 1600,
          "thumbnailWidth": 534,
          "group": "team",
          "alt": [
            "Static Sound project T-shirt",
            "Static Sound 项目队服"
          ],
          "caption": [
            "The team's Static Sound identity, beyond the code.",
            "代码之外的团队印记：Static Sound 队服。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/workshop-discussion-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/workshop-discussion-800.webp",
          "width": 1600,
          "height": 1067,
          "thumbnailWidth": 800,
          "group": "team",
          "alt": [
            "Discussion during an IT Project workshop",
            "IT Project 课程讨论现场"
          ],
          "caption": [
            "A moment from the project workshop.",
            "项目课程中的一个讨论瞬间。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/workshop-workstation-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/workshop-workstation-800.webp",
          "width": 1600,
          "height": 1067,
          "thumbnailWidth": 800,
          "group": "team",
          "alt": [
            "IT Project workstation",
            "IT Project 项目工作台"
          ],
          "caption": [
            "At the project workstation.",
            "项目工作台前的记录。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/avl-module-whiteboard-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/avl-module-whiteboard-800.webp",
          "width": 1600,
          "height": 1200,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Whiteboard mapping AVL controller, animation and pseudocode",
            "AVL 控制器、动画与伪代码的白板拆解"
          ],
          "caption": [
            "A working sketch connects recursive depth, rotation animation, node height and function information to the main AVL modules.",
            "白板草图将递归深度、旋转动画、节点高度与函数信息关联到 AVL 的主要模块。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/sprint-presentation-whiteboard-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/sprint-presentation-whiteboard-800.webp",
          "width": 1600,
          "height": 1200,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Whiteboard plan for sprint reviews and the project presentation",
            "冲刺回顾与项目演示规划白板"
          ],
          "caption": [
            "Planning the project story across three sprints, with collaboration tools, implementation work and presentation responsibilities.",
            "围绕三轮冲刺梳理项目展示，组织协作工具、实现工作与演示分工。"
          ]
        },
        {
          "src": "assets/projects/avl-visualisation/team-dinner-1600.webp",
          "thumbnail": "assets/projects/avl-visualisation/team-dinner-800.webp",
          "width": 1600,
          "height": 1200,
          "thumbnailWidth": 800,
          "group": "team",
          "alt": [
            "Project team sharing a meal",
            "项目团队聚餐合照"
          ],
          "caption": [
            "Time together beyond the project workspace.",
            "项目工作之外的团队相聚。"
          ]
        }
      ],
      "demo": {
        "src": "assets/projects/avl-visualisation/avl-insertion-demo.mp4",
        "poster": "assets/projects/avl-visualisation/avl-insertion-poster.webp",
        "width": 1440,
        "height": 1022,
        "caption": [
          "Watch AVL insertion and rebalancing, with tree rotations and step-by-step pseudocode highlighting.",
          "演示 AVL 节点插入与重新平衡，结合树旋转动画和逐步高亮的伪代码。"
        ]
      },
      "keywords": [
        "algorithms",
        "animation",
        "education",
        "算法",
        "可视化"
      ]
    },
    {
      "id": "mur-simulation",
      "name": [
        "Melbourne University Racing — Simulation",
        "Melbourne University Racing（机器人仿真）"
      ],
      "date": [
        "Sep 2024 – Nov 2024",
        "2024年9月 – 2024年11月"
      ],
      "region": "au",
      "type": "team",
      "tech": "ROS2, NVIDIA Isaac Sim, Python, OpenCV",
      "summary": [
        "Simulation infrastructure and sensor interfaces for an autonomous track-following robot.",
        "自主循迹机器人的仿真环境与传感器接口。"
      ],
      "background": [
        "The racing-team project uses Isaac Sim and ROS2 to connect a simulated robot with sensor streams and movement commands.",
        "赛车队项目使用 Isaac Sim 与 ROS2，将仿真机器人连接到传感器数据流与运动指令。"
      ],
      "work": [
        [
          "Built the simulation environment and enabled the ROS2 bridge.",
          "构建仿真环境并启用 ROS2 bridge。"
        ],
        [
          "Developed Python subscriber and publisher nodes for camera, LiDAR, odometry, and velocity control.",
          "开发相机、激光雷达、里程计与速度控制的 Python 订阅及发布节点。"
        ]
      ],
      "boundary": [
        "This case study focuses on simulation infrastructure, not ownership of the team's machine-learning models.",
        "本案例聚焦仿真基础设施，不将团队机器学习模型作为个人独立成果。"
      ],
      "keywords": [
        "robotics",
        "simulation",
        "sensors",
        "机器人",
        "仿真"
      ]
    },
    {
      "id": "tetress",
      "name": [
        "Tetress — Search & Game Agents",
        "Tetress（搜索与博弈智能体）"
      ],
      "date": [
        "Mar 2024 – May 2024",
        "2024年3月 – 2024年5月"
      ],
      "region": "au",
      "type": "academic",
      "tech": "Python, A*, Monte Carlo Tree Search",
      "summary": [
        "Heuristic search and game-playing agents for single-player and two-player Tetress.",
        "面向单人及双人 Tetress 的启发式搜索与博弈智能体。"
      ],
      "background": [
        "A two-part AI coursework project covering search-space exploration and decisions under adversarial play.",
        "两阶段 AI 课程项目，涵盖搜索空间探索与对抗博弈决策。"
      ],
      "work": [
        [
          "Implemented an A* solver and iterated on heuristic estimates.",
          "实现 A* 求解器并迭代启发式估计。"
        ],
        [
          "Built MCTS selection, backpropagation, time allocation, and tree-root reuse.",
          "实现 MCTS 选择、回传、时间分配与树根复用。"
        ]
      ],
      "keywords": [
        "AI",
        "game",
        "heuristic",
        "搜索",
        "博弈"
      ]
    },
    {
      "id": "dictionary-server",
      "name": [
        "Distributed Dictionary Server",
        "Distributed Dictionary Server（分布式字典服务器）"
      ],
      "date": [
        "Aug 2025",
        "2025年8月"
      ],
      "region": "au",
      "type": "academic",
      "tech": "Java, TCP sockets, ThreadPoolExecutor, Swing, JSON",
      "summary": [
        "A multi-threaded dictionary service with a desktop client and persistent storage.",
        "包含桌面客户端与持久化存储的多线程字典服务。"
      ],
      "background": [
        "A solo coursework project exploring client-server communication, concurrent request handling, and separation of application layers.",
        "独立课程项目，探索客户端—服务器通信、并发请求处理与应用分层。"
      ],
      "work": [
        [
          "Built a TCP server using a thread pool and a Swing client for searching and editing entries.",
          "使用线程池构建 TCP 服务器，并开发用于查询和编辑词条的 Swing 客户端。"
        ],
        [
          "Separated connection tasks, service logic, and JSON-backed persistence.",
          "分离连接任务、服务逻辑与基于 JSON 的持久化。"
        ]
      ],
      "keywords": [
        "distributed systems",
        "concurrency",
        "分布式",
        "并发"
      ]
    },
    {
      "id": "daisyworld",
      "name": [
        "DaisyWorld — Agent-Based Simulation",
        "DaisyWorld（基于智能体的仿真）"
      ],
      "date": [
        "May 2025",
        "2025年5月"
      ],
      "region": "au",
      "type": "academic",
      "tech": "Python, Pygame, NetLogo, Jupyter",
      "summary": [
        "A Python climate simulation extending DaisyWorld with environmental effects.",
        "使用环境影响机制扩展 DaisyWorld 的 Python 气候仿真。"
      ],
      "background": [
        "The model explores feedback between organisms and their environment in a grid world. Separate original and extended models support comparison.",
        "模型在网格世界中探索生物与环境之间的反馈，原始模型与扩展模型分别实现以支持对比。"
      ],
      "work": [
        [
          "Reimplemented the daisy albedo-feedback model in Python.",
          "使用 Python 重新实现雏菊反照率反馈模型。"
        ],
        [
          "Added pollution diffusion, mutation behaviour, and an additional species.",
          "加入污染扩散、变异行为与新增物种。"
        ],
        [
          "Visualised model states with Pygame and analysed simulation output in notebooks.",
          "使用 Pygame 可视化模型状态，在 notebook 中分析仿真输出。"
        ]
      ],
      "keywords": [
        "simulation",
        "climate",
        "visualisation",
        "仿真",
        "气候"
      ]
    },
    {
      "id": "mini-spotify",
      "name": [
        "Mini Spotify",
        "Mini Spotify（Android 音乐客户端）"
      ],
      "date": [
        "Mar 2026 – Present",
        "2026年3月 – 至今"
      ],
      "region": "ny",
      "type": "academic",
      "tech": "Kotlin, Jetpack Compose, Room, Retrofit, ExoPlayer",
      "summary": [
        "An Android music client exploring MVVM, local storage, and background playback.",
        "探索 MVVM、本地存储与后台播放的 Android 音乐客户端。"
      ],
      "background": [
        "A learning project connecting a mock media-catalogue API to a native mobile interface and playback components.",
        "将模拟媒体目录 API 连接到原生移动界面与播放组件的学习项目。"
      ],
      "work": [
        [
          "Used Kotlin, Compose, and MVVM to organise the interface and application state.",
          "使用 Kotlin、Compose 与 MVVM 组织界面及应用状态。"
        ],
        [
          "Integrated Room storage, Retrofit network access, and ExoPlayer playback.",
          "集成 Room 存储、Retrofit 网络访问与 ExoPlayer 播放。"
        ]
      ],
      "keywords": [
        "Android",
        "mobile",
        "MVVM",
        "音乐",
        "移动端"
      ]
    },
    {
      "id": "java-concurrency",
      "name": [
        "Java Concurrency & Formal Verification",
        "Java Concurrency & Formal Verification（并发与形式化验证）"
      ],
      "date": [
        "Oct 2025 – Dec 2025",
        "2025年10月 – 2025年12月"
      ],
      "region": "ny",
      "type": "academic",
      "tech": "Java, Jazzer, JBMC",
      "summary": [
        "Investigating Java concurrency failures through fuzz testing and model checking.",
        "通过模糊测试与模型检查研究 Java 并发故障。"
      ],
      "background": [
        "The coursework examines how thread interleavings and circular lock dependencies can lead to deadlocks.",
        "课程项目研究线程交错与循环锁依赖如何导致死锁。"
      ],
      "work": [
        [
          "Analysed lock contention and thread-safety behaviour.",
          "分析锁竞争与线程安全行为。"
        ],
        [
          "Used Jazzer and JBMC to investigate failing execution paths.",
          "使用 Jazzer 与 JBMC 研究失败执行路径。"
        ]
      ],
      "keywords": [
        "verification",
        "testing",
        "deadlock",
        "并发",
        "死锁",
        "测试"
      ]
    }
  ]
};
