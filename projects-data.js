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
      "id": "midas-curse-unity"
    },
    {
      "id": "mur-simulation"
    },
    {
      "id": "dance-xr",
      "description": [
        "An immersive Meta Quest 3 dance-practice prototype combining floor guidance, rhythm feedback and optional Vive Tracker ankle tracking.",
        "面向 Meta Quest 3 的沉浸式舞蹈练习原型，结合地面引导、节奏反馈与可选的 Vive Tracker 脚踝追踪。"
      ]
    }
  ],
  "projects": [
    {
      "id": "dance-xr",
      "name": [
        "Dance XR — VR Dance Practice System",
        "Dance XR（VR 舞蹈练习系统）"
      ],
      "date": [
        "Apr 2026 – May 2026 · Columbia University team project · COMS W4172",
        "2026年4月 – 2026年5月 · 哥伦比亚大学团队项目 · COMS W4172"
      ],
      "region": "ny",
      "type": "team",
      "tech": "Unity 6.3.6f1, C#, Meta XR SDK, OpenXR, Meta Quest 3, SteamVR, HTC Vive Tracker, UDP, JSON, RenderTexture",
      "summary": [
        "An immersive dance-practice prototype for Meta Quest 3 that combines floor-based step guidance, rhythm scoring, a configurable minimap, and optional Vive Tracker ankle tracking.",
        "面向 Meta Quest 3 的沉浸式舞蹈练习原型，通过地面脚步引导、节奏评分、可配置小地图与可选的 Vive Tracker 脚踝追踪帮助用户按自己的节奏练习。"
      ],
      "background": [
        "Dance XR explores how a standalone VR experience can provide spatial step guidance and playback control without requiring learners to keep watching an instructor. Users choose a style, difficulty and song, then follow virtual footprints while viewing score and position feedback. A floating control panel provides playback, discrete speed changes, footprint scaling, and minimap or camera options.",
        "Dance XR 探索如何让一套独立运行的 VR 体验在不要求用户持续注视真人教练的情况下，提供空间脚步引导与练习节奏控制。用户可选择舞种、难度与歌曲，再跟随虚拟脚印练习，并查看得分与位置反馈。悬浮控制面板提供播放控制、离散倍速调整、脚印大小设置，以及小地图与相机模式切换。"
      ],
      "work": [
        [
          "Led the initial project architecture and Unity 6.3 / Meta XR scaffolding, then maintained core application state and integration work.",
          "主导项目初期架构与 Unity 6.3 / Meta XR 工程搭建，并持续维护核心应用状态与系统集成。"
        ],
        [
          "Implemented the floating interaction menu and minimap system, including top-down rendering, drag and two-hand scaling, foot markers, follow/orientation modes, and camera controls.",
          "实现悬浮交互菜单与小地图系统，包括俯视渲染、拖动与双手缩放、双脚标记、跟随/朝向模式和相机控制。"
        ],
        [
          "Built the Quest-side Vive Tracker receiver and calibration pipeline: packet decoding, receiver states, two-point yaw-and-translation calibration, foot binding, telemetry, and lost-tracking warnings.",
          "实现 Quest 端 Vive Tracker 接收与校准管线，包括数据包解析、接收状态机、双点偏航角与平移校准、左右脚绑定、遥测及丢失追踪提示。"
        ],
        [
          "Supported repeated merges, device builds, and integration fixes as the prototype iterated toward the final demonstration.",
          "在原型迭代至最终演示的过程中承担多次合并、设备构建与集成修复。"
        ]
      ],
      "workHeading": [
        "My contribution",
        "我的贡献"
      ],
      "journey": [
        {
          "title": [
            "A practice flow that stays in the learner’s space",
            "让练习始终发生在用户的空间中"
          ],
          "body": [
            "The session starts with a choice of dance style, difficulty and song. During practice, floor footprints provide the next spatial cue while score and position feedback remain available without asking the learner to follow a continuously visible instructor.",
            "练习从选择舞种、难度与歌曲开始。过程中，地面虚拟脚印提供下一步的空间提示，得分与位置反馈也始终可见，用户无需持续注视真人教练。"
          ]
        },
        {
          "title": [
            "Controls that adapt the routine to the learner",
            "让用户按自己的节奏调整练习"
          ],
          "body": [
            "The floating panel brings playback controls, discrete speed choices, footprint scaling, and minimap or camera modes into reach. The minimap adds a top-down view of the practice space and foot positions without displacing the primary guidance.",
            "悬浮面板将播放控制、离散倍速选择、脚印缩放，以及小地图或相机模式集中在可触及的位置。小地图以俯视图呈现练习空间与双脚位置，同时不干扰主要引导。"
          ]
        },
        {
          "title": [
            "AI-assisted development",
            "大量使用 AI 工具，但核心仍是设备集成"
          ],
          "body": [
            "This was a project where I used AI tools extensively for Unity experimentation and presentation work. The essential work remained adapting suggestions to the existing project, connecting unfamiliar VR packages and hardware, and iterating on real devices until the demonstration worked.",
            "这是我首次在 Unity 实验与演示材料制作中大量使用 AI 工具的项目。关键工作仍然是将建议适配到已有工程，连接陌生的 VR 软件包与硬件，并在真实设备上持续迭代直至完成演示。"
          ]
        }
      ],
      "architecture": [
        {
          "title": [
            "Vive ankle trackers",
            "Vive 脚踝追踪器"
          ],
          "body": [
            "HTC Vive Trackers mounted at the ankles provide the optional foot-pose input for the practice experience.",
            "佩戴在脚踝上的 HTC Vive Tracker 为练习体验提供可选的脚部姿态输入。"
          ]
        },
        {
          "title": [
            "Windows companion to local network packets",
            "Windows 伴随应用到局域网数据包"
          ],
          "body": [
            "A companion Unity application on Windows reads tracker poses through SteamVR and sends them over the local network as UDP/JSON packets.",
            "Windows 上运行的伴随 Unity 应用通过 SteamVR 读取追踪器姿态，并以 UDP/JSON 数据包通过局域网发送。"
          ]
        },
        {
          "title": [
            "Quest receiver",
            "Quest 接收、校准与脚部锚点"
          ],
          "body": [
            "The Quest Unity application receives packets, calibrates the two coordinate spaces, binds left and right foot anchors, and handles stale or lost tracking states.",
            "Quest Unity 应用接收数据包、校准两个坐标空间、绑定左右脚锚点，并处理追踪过期或丢失状态。"
          ]
        }
      ],
      "gallery": [
        {
          "src": "assets/projects/dance-xr/dance-xr-minimap-controls-1600.webp",
          "thumbnail": "assets/projects/dance-xr/dance-xr-minimap-controls-800.webp",
          "width": 1600,
          "height": 900,
          "thumbnailWidth": 800,
          "group": "product",
          "alt": [
            "In-headset minimap with score",
            "头显内的小地图、得分、音乐速度与脚印大小控制"
          ],
          "caption": [
            "The in-headset view combines a configurable minimap and score feedback with controls for music speed and footprint size.",
            "头显内视图将可配置小地图与得分反馈结合，并提供音乐速度和脚印大小控制。"
          ]
        },
        {
          "src": "assets/projects/dance-xr/dance-xr-session-menu-1600.webp",
          "thumbnail": "assets/projects/dance-xr/dance-xr-session-menu-800.webp",
          "width": 1600,
          "height": 900,
          "thumbnailWidth": 800,
          "group": "product",
          "alt": [
            "Dance XR session menu for style",
            "用于选择舞种、难度、歌曲与校准的 Dance XR 练习菜单"
          ],
          "caption": [
            "The session menu gathers style, difficulty, song and calibration choices before a practice run begins.",
            "练习开始前，菜单集中呈现舞种、难度、歌曲与校准选项。"
          ]
        },
        {
          "src": "assets/projects/dance-xr/dance-xr-vive-trackers-1600.webp",
          "thumbnail": "assets/projects/dance-xr/dance-xr-vive-trackers-800.webp",
          "width": 1600,
          "height": 1200,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Two HTC Vive Trackers with ankle straps",
            "两个配有脚踝绑带的 HTC Vive Tracker"
          ],
          "caption": [
            "Optional ankle-mounted Vive Trackers supplied the foot-pose input carried through the companion and Quest applications.",
            "可选的脚踝 Vive Tracker 提供脚部姿态输入，并由伴随应用传递至 Quest 应用。"
          ]
        },
        {
          "src": "assets/projects/dance-xr/dance-xr-minimap-sketch-1600.webp",
          "thumbnail": "assets/projects/dance-xr/dance-xr-minimap-sketch-800.webp",
          "width": 1600,
          "height": 963,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Team design sketch for a minimap and floating control panel",
            "团队为小地图与悬浮控制面板绘制的设计草图"
          ],
          "caption": [
            "A team design sketch exploring the relationship between the minimap and floating controls.",
            "一张团队设计草图，探索小地图与悬浮控制面板之间的关系。"
          ]
        }
      ],
      "youtubeDemo": {
        "videoId": "eip1ze0U0Ns",
        "embedUrl": "https://www.youtube.com/embed/eip1ze0U0Ns?si=-dlLqAk-GLLG2Q_H",
        "url": "https://youtu.be/eip1ze0U0Ns",
        "title": [
          "Dance XR five-minute demo",
          "Dance XR 五分钟演示"
        ],
        "linkLabel": [
          "Watch on YouTube",
          "在 YouTube 观看"
        ]
      },
      "boundary": [
        "Educational prototype. Current public build availability was not verified; this page does not present hand tracking, an instructor avatar, multiplayer, or a downloadable Quest build as completed features.",
        "教学原型。当前公开构建的可用性尚未核实；本页不将手部追踪、教练虚拟形象、多人功能或可下载的 Quest 构建描述为已完成特性。"
      ],
      "members": [
        {
          "name": [
            "Yihe An",
            "Yihe An"
          ],
          "url": "https://github.com/YihAn011"
        },
        {
          "name": [
            "Hao Chen",
            "Hao Chen"
          ],
          "url": "https://github.com/JarrettChen217"
        },
        {
          "name": [
            "Hiroyuki Akiyama",
            "Hiroyuki Akiyama"
          ],
          "url": "https://github.com/Hi-ak"
        },
        {
          "name": [
            "John Mitnik",
            "John Mitnik"
          ],
          "url": "https://github.com/johnmitnik2"
        }
      ],
      "keywords": [
        "VR",
        "Unity",
        "Meta Quest 3",
        "Vive Tracker",
        "UDP",
        "C#",
        "virtual reality",
        "虚拟现实",
        "舞蹈"
      ]
    },
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
        "This university–client collaboration was grounded in Trauma-Informed Positive Education (TIPE), a strengths-based approach that supports students’ regulation, relationships, wellbeing and engagement with learning. Students affected by stress or adversity may find it difficult to identify or communicate how they feel and whether they are ready to learn. Our project therefore explored a simple, non-judgemental digital check-in through which students could express their current readiness, while giving teachers a clearer view of the support their class might need.",
        "这是一个以 Trauma-Informed Positive Education（TIPE，创伤知情积极教育）为背景的大学客户合作项目。TIPE 是一种以优势为基础的教育方法，关注学生的情绪调节、人际关系、身心健康与学习参与。受到压力或不利经历影响的学生，有时难以及时识别和表达自己的感受，以及自己是否已经准备好进入学习状态。因此，本项目探索了一种简单且非评判性的数字签到方式，让学生表达当下的学习准备度，同时帮助教师更清楚地了解班级可能需要的支持。"
      ],
      "work": [],
      "logo": {
        "src": "assets/projects/berry-street/wombat-mark.webp",
        "width": 380,
        "height": 236,
        "alt": [
          "Wombat team mark",
          "Wombat 团队标识"
        ]
      },
      "backgroundLink": {
        "label": [
          "Learn about the TIPE approach",
          "了解 TIPE 教育方法"
        ],
        "url": "https://pursuit.unimelb.edu.au/articles/Trauma-follows-children-into-the-classroom.-A-new-teaching-model-is-changing-that"
      },
      "process": {
        "heading": [
          "From discovery to validation",
          "从需求发现到方案验证"
        ],
        "intro": [
          "The project moved through five connected stages. Each stage turned client context and user feedback into a more focused, testable design decision.",
          "项目沿着五个彼此衔接的阶段推进；每一阶段都把客户背景与用户反馈进一步转化为更聚焦、可验证的设计决策。"
        ],
        "stages": [
          {
            "id": "discover",
            "label": [
              "Discover",
              "探索"
            ],
            "title": [
              "Start with the classroom need",
              "从真实课堂需求出发"
            ],
            "body": [
              "Early client conversations established the central need: a private, low-pressure way for students to communicate readiness to learn, paired with a teacher view that reveals class-level patterns without making the interaction difficult to use.",
              "前期客户交流明确了核心需求：学生需要一种私密、低压力的方式表达自己的学习准备度；教师则需要看到班级层面的趋势，同时整个交互必须保持简单易用。"
            ],
            "contribution": [
              "As Scrum Master, I coordinated discussions and sprint activities and helped turn client priorities into requirements the team could track.",
              "作为 Scrum Master，我协调讨论与冲刺活动，并协助把客户重点转化为团队可持续跟踪的需求。"
            ],
            "findings": [
              [
                "Student check-ins should feel private and non-judgemental.",
                "学生签到应当保持私密且不带评判。"
              ],
              [
                "The interface needed to work for teachers with different levels of technical confidence.",
                "界面需要适应不同技术熟练度的教师。"
              ],
              [
                "Teachers needed both individual signals and class-level trends.",
                "教师既需要个体提示，也需要班级整体趋势。"
              ]
            ],
            "gallery": [
              {
                "src": "assets/projects/berry-street/goal-model-1600.webp",
                "thumbnail": "assets/projects/berry-street/goal-model-800.webp",
                "width": 1600,
                "height": 368,
                "thumbnailWidth": 800,
                "alt": [
                  "Goal model connecting stakeholder roles with functional and emotional goals",
                  "关联利益相关方角色、功能目标与情感目标的目标模型"
                ],
                "caption": [
                  "The goal model connects students, teachers, school administrators and support teams with the functions and experiences the product should support.",
                  "目标模型将学生、教师、学校管理者与支持团队关联到产品应支持的功能与体验目标。"
                ]
              }
            ]
          },
          {
            "id": "define",
            "label": [
              "Define",
              "定义"
            ],
            "title": [
              "Translate needs into roles and stories",
              "将需求整理为角色与用户故事"
            ],
            "body": [
              "The team organised the problem around student, teacher and administrator roles, then connected their desired actions and feelings to epics, user stories and sprint tasks. This kept the design grounded in what each person needed to do and experience.",
              "团队围绕学生、教师与管理者三类角色梳理问题，再把他们期望完成的行为与获得的感受对应到 Epic、用户故事和冲刺任务，使设计始终围绕各角色真实的使用目标展开。"
            ],
            "contribution": [
              "I helped organise user stories, acceptance criteria, personas and journey materials so requirements could guide prototype and testing work.",
              "我参与整理用户故事、验收标准、用户画像与旅程材料，使需求能够持续指导原型和测试工作。"
            ],
            "gallery": [
              {
                "src": "assets/projects/berry-street/role-do-be-feel-1600.webp",
                "thumbnail": "assets/projects/berry-street/role-do-be-feel-800.webp",
                "width": 1530,
                "height": 1980,
                "thumbnailWidth": 765,
                "alt": [
                  "Role–Do–Be–Feel model for the student",
                  "面向学生、教师与管理者体验的 Role–Do–Be–Feel 模型"
                ],
                "caption": [
                  "Role–Do–Be–Feel connected stakeholder actions with the qualities and feelings the interface should support.",
                  "Role–Do–Be–Feel 模型将不同角色的行为，与界面应传达的特质和感受联系起来。"
                ]
              },
              {
                "src": "assets/projects/berry-street/user-story-map-1600.webp",
                "thumbnail": "assets/projects/berry-street/user-story-map-800.webp",
                "width": 1600,
                "height": 1132,
                "thumbnailWidth": 800,
                "alt": [
                  "User story map arranging epics",
                  "按 Epic、用户故事与冲刺任务组织的用户故事地图"
                ],
                "caption": [
                  "The story map traces broad activities into prioritised work across three sprints.",
                  "用户故事地图把整体活动拆解为跨三个冲刺逐步推进的优先任务。"
                ]
              }
            ]
          },
          {
            "id": "prototype",
            "label": [
              "Prototype",
              "原型"
            ],
            "title": [
              "Make the core flows tangible",
              "把核心流程变成可讨论的原型"
            ],
            "body": [
              "Low-fidelity screens made the student check-in and teacher dashboard concrete enough to review. The deliberately rough presentation kept attention on navigation, wording and information hierarchy before visual polish.",
              "低保真页面把学生签到与教师仪表盘转化为可直接评审的流程。刻意保留的粗略视觉，让讨论先集中在导航、文案与信息层级，而不是过早进入视觉润色。"
            ],
            "contribution": [
              "I contributed to prototype direction and privacy-related design discussions, helping prepare the student and teacher flows for usability testing.",
              "我参与原型方向与隐私相关的设计讨论，并协助准备学生端和教师端流程进入可用性测试。"
            ],
            "gallery": [
              {
                "src": "assets/projects/berry-street/lofi-check-in-1600.webp",
                "thumbnail": "assets/projects/berry-street/lofi-check-in-800.webp",
                "width": 1600,
                "height": 1104,
                "thumbnailWidth": 800,
                "alt": [
                  "Low-fidelity student readiness check-in screen",
                  "学生学习准备度签到的低保真页面"
                ],
                "caption": [
                  "An early check-in explored how a primary-school student could report readiness with a single selection.",
                  "早期签到页面探索了小学生通过一次选择表达学习准备度的方式。"
                ]
              },
              {
                "src": "assets/projects/berry-street/lofi-dashboard-1600.webp",
                "thumbnail": "assets/projects/berry-street/lofi-dashboard-800.webp",
                "width": 1600,
                "height": 1104,
                "thumbnailWidth": 800,
                "alt": [
                  "Low-fidelity teacher classroom readiness dashboard",
                  "教师班级学习准备度仪表盘的低保真页面"
                ],
                "caption": [
                  "The initial dashboard brought response counts, a chart, trend history and a notice area into one teacher view.",
                  "初版仪表盘将回答数量、图表、历史趋势与提示区域整合到同一个教师视图中。"
                ]
              }
            ]
          },
          {
            "id": "test-and-learn",
            "label": [
              "Test & learn",
              "测试与学习"
            ],
            "title": [
              "Observe where the design caused hesitation",
              "观察设计中引发犹豫的地方"
            ],
            "body": [
              "During the 7 May usability session, the client worked through student and teacher tasks while the team recorded points of confidence and confusion. The session exposed which parts of the dashboard needed clearer visual and verbal cues.",
              "在 5 月 7 日的可用性测试中，客户依次完成学生端与教师端任务，团队记录顺畅之处及产生困惑的环节。这次测试明确指出了仪表盘在视觉和文字提示上需要改进的部分。"
            ],
            "contribution": [
              "I facilitated the low-fidelity usability session and helped connect the observations to the next iteration.",
              "我主持了这次低保真可用性测试，并协助把观察结果衔接到下一轮迭代。"
            ],
            "findings": [
              [
                "The dashboard contained too much competing information at once.",
                "仪表盘同时呈现的信息过多，视觉焦点不够清晰。"
              ],
              [
                "Readiness scales and response counts were easy to confuse.",
                "学习准备度等级与回答数量容易产生混淆。"
              ],
              [
                "Trend labels needed clearer wording and context.",
                "趋势图标签需要更明确的文案和语境。"
              ]
            ],
            "gallery": [
              {
                "src": "assets/projects/berry-street/usability-dashboard-test-1600.webp",
                "thumbnail": "assets/projects/berry-street/usability-dashboard-test-800.webp",
                "width": 1600,
                "height": 1280,
                "thumbnailWidth": 800,
                "alt": [
                  "Privacy-cropped frame from the teacher dashboard usability task",
                  "隐私裁切后的教师仪表盘可用性测试画面"
                ],
                "caption": [
                  "A privacy-cropped session frame retains the tested dashboard and task context while excluding participant video feeds.",
                  "经过隐私裁切的测试画面保留了被测试的仪表盘与任务场景，并移除了参与者的视频画面。"
                ]
              },
              {
                "src": "assets/projects/berry-street/usability-planning-1600.webp",
                "thumbnail": "assets/projects/berry-street/usability-planning-800.webp",
                "width": 1600,
                "height": 1200,
                "thumbnailWidth": 800,
                "alt": [
                  "Whiteboard mapping student and teacher usability tasks to prototype refinements",
                  "梳理学生及教师可用性任务与原型改进的白板"
                ],
                "caption": [
                  "The team linked student and teacher usability tasks to action items for the next prototype iteration.",
                  "团队把学生端与教师端的测试任务衔接到下一轮原型的行动项。"
                ]
              }
            ]
          },
          {
            "id": "refine-and-validate",
            "label": [
              "Refine & validate",
              "改进与验证"
            ],
            "title": [
              "Turn feedback into a clearer handover",
              "将反馈转化为更清晰的交付方案"
            ],
            "body": [
              "The revised dashboard removed the wellbeing score, clarified labels and added a bar-chart option alongside the doughnut view. In the final client walkthrough, the histogram was considered easier to read, the three-option student scale suited primary users, and the central workflow was accepted for handover.",
              "改进后的仪表盘移除了 wellbeing score，明确了标签，并在环形图之外增加柱状图选项。最终客户演示中，柱状图被认为更易阅读，三个选项的学生签到方式也更适合小学生，核心流程获得认可并进入交接。"
            ],
            "contribution": [
              "I helped carry usability findings into the refinement work and, as Scrum Master, coordinated requirements, testing and handover activities across the sprint.",
              "我协助把可用性测试结论落实到改进工作中，并以 Scrum Master 身份协调冲刺中的需求、测试与交接活动。"
            ],
            "findings": [
              [
                "A simpler three-option check-in better matched primary-school use.",
                "更简洁的三个选项更符合小学阶段的使用场景。"
              ],
              [
                "The bar chart made the response distribution easier to compare.",
                "柱状图让回答分布更容易比较。"
              ],
              [
                "Further reduction of visual clutter remained an accessibility opportunity.",
                "继续减少视觉干扰仍是后续无障碍优化方向。"
              ]
            ],
            "gallery": [
              {
                "src": "assets/projects/berry-street/hifi-dashboard-1600.webp",
                "thumbnail": "assets/projects/berry-street/hifi-dashboard-800.webp",
                "width": 1600,
                "height": 1104,
                "thumbnailWidth": 800,
                "alt": [
                  "Refined high-fidelity classroom readiness dashboard",
                  "改进后的高保真班级学习准备度仪表盘"
                ],
                "caption": [
                  "The high-fidelity dashboard uses clearer labels, a reduced readiness scale and a more approachable visual system.",
                  "高保真仪表盘采用更明确的标签、更精简的准备度等级与更亲和的视觉系统。"
                ]
              },
              {
                "src": "assets/projects/berry-street/team-with-max-1600.webp",
                "thumbnail": "assets/projects/berry-street/team-with-max-800.webp",
                "width": 1600,
                "height": 1067,
                "thumbnailWidth": 800,
                "alt": [
                  "Berry Street project team with supervisor Max",
                  "Berry Street 项目团队与导师 Max 的合照"
                ],
                "caption": [
                  "The Wombat team with our supervisor Max.",
                  "Wombat 团队与导师 Max 合影。"
                ]
              }
            ],
            "demo": {
              "src": "assets/projects/berry-street/dashboard-demo.mp4",
              "poster": "assets/projects/berry-street/dashboard-poster.webp",
              "width": 1440,
              "height": 1044,
              "caption": [
                "The refined prototype switches between doughnut and bar charts within an enlarged classroom readiness view.",
                "改进后的交互原型可在放大的班级学习准备度视图中切换环形图与柱状图。"
              ]
            }
          }
        ]
      },
      "team": [
        "Team025 Wombat",
        "Team025 Wombat"
      ],
      "members": [
        {
          "name": [
            "Ziyu Wang",
            "Ziyu Wang"
          ],
          "url": "https://github.com/Lafinoon"
        },
        {
          "name": [
            "Hao Chen",
            "Hao Chen"
          ],
          "url": "https://github.com/JarrettChen217"
        },
        {
          "name": [
            "Zikun Qiu",
            "Zikun Qiu"
          ]
        },
        {
          "name": [
            "Gaoyongle Zhang",
            "Gaoyongle Zhang"
          ],
          "url": "https://github.com/XinMoZ"
        },
        {
          "name": [
            "Junhao Zhu",
            "Junhao Zhu"
          ],
          "url": "https://github.com/junhaozhu1"
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
      "logo": {
        "src": "assets/projects/avl-visualisation/aia-mark.webp",
        "width": 300,
        "height": 300,
        "alt": [
          "Algorithms in Action project mark",
          "Algorithms in Action 项目标识"
        ]
      },
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
      "team": [
        "Static Sound",
        "Static Sound"
      ],
      "keywords": [
        "algorithms",
        "animation",
        "education",
        "算法",
        "可视化"
      ]
    },
    {
      "id": "midas-curse-unity",
      "name": [
        "Midas Curse — Unity Survival Game",
        "Midas Curse（Unity 生存游戏）"
      ],
      "date": [
        "Aug 2023 – early Nov 2023",
        "2023年8月 – 2023年11月初"
      ],
      "region": "au",
      "type": "team",
      "tech": "Unity, C#, ShaderLab, Git",
      "summary": [
        "A third-person maze, combat, and survival game built around a Midas-inspired golden-path mechanic.",
        "以 Midas 神话为灵感、围绕黄金路径机制展开的第三人称迷宫战斗与生存游戏。"
      ],
      "background": [
        "Project 1 established the concept and an initial playable prototype; Project 2 developed the same game into a fuller two-stage experience with a maze, enemies, skills, a shop, visual effects, and a boss encounter. This was my first experience with Unity and the starting point for systematically learning Unity, shader concepts, and game development through practice.",
        "Project 1 建立游戏概念与初步可玩原型，Project 2 则在同一作品上继续开发，形成包含迷宫、敌人、技能、商店、视觉效果与 Boss 战的两阶段体验。这是我第一次接触 Unity，也是我通过实践系统学习 Unity、Shader 概念与游戏开发的起点。"
      ],
      "work": [
        [
          "Implemented and refined player movement and animation integration, including running states and Blend Tree adjustments.",
          "实现并完善玩家移动与动画集成，包括跑步状态及 Blend Tree 调整。"
        ],
        [
          "Worked on player-facing feedback and interaction flows, including health awareness, pause and shop controls, camera sensitivity, and audio behaviour.",
          "参与玩家反馈与交互流程开发，包括生命值提示、暂停与商店控制、镜头灵敏度及音频行为。"
        ],
        [
          "Contributed enemy spawning and animation adjustments, scene integration, and implementation debugging across the later development stage.",
          "在后续开发阶段参与敌人生成与动画调整、场景集成及实现调试。"
        ]
      ],
      "mechanics": {
        "heading": [
          "How the game works",
          "游戏机制"
        ],
        "intro": [
          "Every movement rewrites the arena: the golden path left behind can defeat enemies, but stepping onto it again also brings the curse closer to completion.",
          "玩家每一次移动都会重塑战场：身后留下的黄金路径能够击败敌人，但自己再次踏上它，也会让诅咒更接近完成。"
        ],
        "steps": [
          {
            "id": "create-path",
            "title": [
              "Leave a golden path",
              "留下黄金路径"
            ],
            "body": [
              "As the Mage moves through the maze, traversed floor tiles turn into gold. Route choice therefore keeps changing the available safe space and the positions from which later encounters can be approached.",
              "法师在迷宫中移动时，走过的地面会逐格转化为黄金。路线选择因此会持续改变可用的安全空间，以及后续战斗可以展开的位置。"
            ]
          },
          {
            "id": "manage-curse",
            "title": [
              "Manage the curse",
              "控制黄金化风险"
            ],
            "body": [
              "Both the player and enemies are slowed on active gold while their Goldenate meter—the game's measure of the curse—continues to rise. If the player's meter fills, the Mage turns completely to gold and the run ends.",
              "玩家与敌人站在已激活的黄金地面上都会减速，并持续累积 Goldenate（黄金化）数值。玩家的计量条满后，法师会完全黄金化，本局游戏随之结束。"
            ]
          },
          {
            "id": "turn-danger",
            "title": [
              "Turn danger into offence",
              "化陷阱为攻击"
            ],
            "body": [
              "Careful routing can lure enemies onto the same trail. Filling an enemy's Goldenate meter defeats it and awards coins, while crystals gathered in the maze provide another resource for later upgrades.",
              "玩家可以规划路线，将敌人引到同一条黄金路径上；敌人的 Goldenate 条满后即被击败并掉落金币，迷宫中收集的水晶也能为后续升级提供资源。"
            ]
          },
          {
            "id": "reshape-field",
            "title": [
              "Reshape the battlefield",
              "用神器重塑战场"
            ],
            "body": [
              "Two artifact loadouts provide skills that create, remove, or chain-react with golden ground, including area-clearing ultimate abilities. Shop upgrades improve armour, movement speed, skill damage, cooldown, range, and ultimate charging.",
              "两套神器技能可以生成、移除或连锁引爆黄金地面，并通过范围型终极技能清出空间；商店升级涵盖护甲、移动速度、技能伤害、冷却、作用范围与终极技能充能。"
            ]
          }
        ]
      },
      "process": {
        "heading": [
          "Engineering the Midas Curse",
          "构建 Midas Curse 核心机制"
        ],
        "intro": [
          "In 2023, before generative-AI coding assistants were part of our workflow, Cosmic Creators learned through Unity documentation, tutorials, prototypes, code review, and manual debugging. The result was not a single shader trick, but a connected system in which movement, ground state, combat, skills, and visual feedback all respond to the same golden-path mechanic.",
          "2023 年，生成式 AI 编程助手尚未进入我们的开发流程。Cosmic Creators 通过阅读 Unity 文档、研究教程、制作原型、相互审阅代码并手动调试推进开发。最终成果并非单一的 Shader 技巧，而是一套将移动、地面状态、战斗、技能与视觉反馈连接到同一黄金路径机制的系统。"
        ],
        "stages": [
          {
            "id": "concept",
            "label": [
              "Concept",
              "概念"
            ],
            "title": [
              "Turn a myth into a playable rule",
              "把神话转化为可玩的规则"
            ],
            "body": [
              "The team translated the Midas myth into a rule the player could feel: movement turns traversed ground into gold, while that same path becomes a resource, a combat surface, and a growing survival constraint. Project 1 proved the rule in a playable prototype; Project 2 built the wider maze, skill, shop, enemy, and boss loop around it.",
              "团队将 Midas 神话转化为玩家能够直接感受到的规则：移动会把经过的地面变成黄金，而同一条路径既是资源与战斗区域，也会逐渐成为生存限制。Project 1 先以可玩原型验证规则，Project 2 再围绕它扩展迷宫、技能、商店、敌人与 Boss 战循环。"
            ],
            "contribution": [
              "I contributed to early concept and prototype documentation, then worked on player movement, animation integration, interaction feedback, and later scene debugging.",
              "我参与早期概念与原型文档，并在后续开发中负责或参与玩家移动、动画集成、交互反馈及场景调试。"
            ]
          },
          {
            "id": "system-model",
            "label": [
              "System model",
              "系统建模"
            ],
            "title": [
              "Represent the floor as an interactive grid",
              "将地面表示为可交互网格"
            ],
            "body": [
              "The golden ground is a gameplay system rather than a painted trail. GoldManager maps world positions into a two-dimensional grid and uses raycasts to create cells only where valid floor geometry exists. As the player moves, GoldWalk identifies the corresponding cell and activates the tile, giving the rest of the game one consistent spatial model.",
              "黄金地面并不是一条简单绘制的轨迹，而是一套玩法系统。GoldManager 将世界坐标映射到二维网格，并通过射线检测只在有效地面上创建单元格；玩家移动时，GoldWalk 找到对应单元并激活地块，让游戏中的其他机制共享同一套空间模型。"
            ],
            "findings": [
              [
                "World coordinates resolve to stable grid cells.",
                "世界坐标被映射为稳定的网格单元。"
              ],
              [
                "Raycasts prevent gold from appearing off the walkable floor.",
                "射线检测避免黄金出现在不可行走区域。"
              ],
              [
                "Movement becomes the shared input for path",
                "移动成为路径、战斗与技能系统的共同输入。"
              ]
            ]
          },
          {
            "id": "state-logic",
            "label": [
              "State logic",
              "状态逻辑"
            ],
            "title": [
              "Give every gold tile a lifecycle",
              "为每块黄金地面建立生命周期"
            ],
            "body": [
              "Each GoldInfo cell progresses through inactive, expanding, active, and dissolving states. Timers distinguish natural expiry from forced removal, material changes expose the transition visually, and nearby systems can query or remove gold for attacks, particles, and ultimate-charge behaviour. This lifecycle turns a visual trail into reusable game state.",
              "每个 GoldInfo 地块都会依次经历未激活、扩张、激活与消散状态。计时逻辑区分自然到期与强制移除，材质切换把状态变化呈现出来；周边系统还能查询或移除黄金地块，用于攻击、粒子效果与终极技能充能。由此，视觉轨迹被转化为可复用的游戏状态。"
            ],
            "findings": [
              [
                "One tile state drives both rules and visual feedback.",
                "同一地块状态同时驱动玩法规则与视觉反馈。"
              ],
              [
                "Natural and forced dissolves support different interactions.",
                "自然消散与强制移除支持不同交互。"
              ],
              [
                "Range queries connect the path to skills and combat.",
                "范围查询把黄金路径连接到技能与战斗。"
              ]
            ]
          },
          {
            "id": "shader-feedback",
            "label": [
              "Shader feedback",
              "Shader 反馈"
            ],
            "title": [
              "Make system state readable in motion",
              "用 Shader 呈现系统状态"
            ],
            "body": [
              "The team studied documented examples and tutorials, then adapted them to the game's state model. GoldExpanding receives a world-space start point, current time, and expansion speed; comparing travelled distance with elapsed time reveals the gold effect outward from its origin. A separate dissolve treatment and material switching communicate when transformed ground or affected objects leave the active state.",
              "团队先研究文档示例与教程，再把方法适配到游戏的状态模型中。GoldExpanding 接收世界空间起点、当前时间与扩张速度，并比较传播距离和经过时间，让黄金效果从起点向外展开；另一套消散效果与材质切换，则用来表达已转化地面或受影响物体离开激活状态的过程。"
            ],
            "findings": [
              [
                "_StartPos anchors the effect in world space.",
                "_StartPos 将效果锚定在世界空间。"
              ],
              [
                "Time and speed control the visible expansion boundary.",
                "时间与速度共同控制可见的扩张边界。"
              ],
              [
                "Material transitions keep gameplay state legible while moving.",
                "材质过渡让玩家在移动中仍能读懂玩法状态。"
              ]
            ]
          },
          {
            "id": "browser-delivery",
            "label": [
              "Browser delivery",
              "浏览器交付"
            ],
            "title": [
              "Adapt the effect for WebGL",
              "为 WebGL 调整视觉实现"
            ],
            "body": [
              "A geometry-shader experiment produced a stronger local death effect, but the browser target required a WebGL-compatible path. The team therefore retained the underlying dissolve idea while adapting the implementation for the final build, then verified the complete game loop in the exported browser version. The decision kept the visual intent while making the project directly playable online.",
              "几何 Shader 实验在本地实现了更强的死亡效果，但浏览器目标需要兼容 WebGL 的实现路径。团队因此保留消散效果的核心思路，同时为最终构建调整实现，并在导出的浏览器版本中验证完整游戏循环，在保留视觉意图的同时让作品能够直接在线试玩。"
            ],
            "contribution": [
              "I prototyped the geometry-shader enemy-death effect and contributed to later integration and debugging as the team prepared the browser build.",
              "我制作了敌人死亡的几何 Shader 原型，并在团队准备浏览器构建时参与后续集成与调试。"
            ]
          }
        ],
        "badge": {
          "src": "assets/projects/midas-curse-unity/built-by-hand-2023.webp",
          "width": 760,
          "height": 240,
          "alt": [
            "Built by hand in 2023",
            "2023 年手工构建"
          ]
        }
      },
      "journey": [
        {
          "title": [
            "Two stages of one game",
            "同一游戏的两个开发阶段"
          ],
          "body": [
            "Project 1 moved from the Midas-inspired premise to a playable prototype of movement, the golden path, the maze, and survival feedback. Project 2 carried the same foundation into a broader game loop with staged progression, combat, enemies, item upgrades, and a boss encounter.",
            "Project 1 将 Midas 灵感推进为包含移动、黄金路径、迷宫与生存反馈的可玩原型；Project 2 延续同一基础，进一步形成带有阶段推进、战斗、敌人、道具升级与 Boss 战的完整玩法循环。"
          ]
        },
        {
          "title": [
            "Refining feedback through playtesting",
            "通过试玩反馈完善视觉提示"
          ],
          "body": [
            "The team used face-to-face playtesting and a survey to guide the later iteration. One visible refinement made the affected ground easier to distinguish through stronger colour contrast and particle feedback, helping players read the golden-path state while moving.",
            "团队通过面对面试玩与问卷反馈指导后续迭代。其中一项可见改进通过更鲜明的颜色对比与粒子反馈区分受影响地面，帮助玩家在移动过程中判断黄金路径状态。"
          ]
        }
      ],
      "gallery": [
        {
          "src": "assets/projects/midas-curse-unity/maze-model-1280.webp",
          "thumbnail": "assets/projects/midas-curse-unity/maze-model-800.webp",
          "width": 1280,
          "height": 720,
          "thumbnailWidth": 800,
          "group": "product",
          "alt": [
            "Three-dimensional maze model in the Unity editor",
            "Unity 编辑器中的三维迷宫模型"
          ],
          "caption": [
            "The maze translated the level plan into a navigable Unity environment for exploration, item collection, and encounters.",
            "团队将关卡平面设计转化为可在 Unity 中探索、收集道具并触发战斗的三维迷宫环境。"
          ]
        },
        {
          "src": "assets/projects/midas-curse-unity/maze-plan-1400.webp",
          "thumbnail": "assets/projects/midas-curse-unity/maze-plan-800.webp",
          "width": 1400,
          "height": 1413,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Final two-dimensional maze plan",
            "最终二维迷宫平面设计"
          ],
          "caption": [
            "The final maze plan reduced unnecessary dead ends and established a clear route toward its central objective.",
            "最终迷宫方案减少不必要的死路，并围绕中央目标形成更清晰的探索路线。"
          ]
        },
        {
          "src": "assets/projects/midas-curse-unity/visual-feedback-before-1400.webp",
          "thumbnail": "assets/projects/midas-curse-unity/visual-feedback-before-800.webp",
          "width": 1400,
          "height": 1297,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Earlier golden-path visual feedback during playtesting",
            "试玩阶段较早版本的黄金路径视觉反馈"
          ],
          "caption": [
            "Earlier visual treatment used during the team's playtesting comparison.",
            "团队在试玩对比中使用的较早版本视觉表现。"
          ]
        },
        {
          "src": "assets/projects/midas-curse-unity/visual-feedback-after-1182.webp",
          "thumbnail": "assets/projects/midas-curse-unity/visual-feedback-after-800.webp",
          "width": 1182,
          "height": 1155,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Refined golden-path feedback with stronger colour and particles",
            "使用更鲜明颜色与粒子效果完善后的黄金路径反馈"
          ],
          "caption": [
            "The refined result gives the affected path stronger contrast and particle feedback so its state is easier to read in motion.",
            "改进结果通过更强的颜色对比与粒子反馈突出受影响路径，使玩家在移动中更容易判断其状态。"
          ]
        }
      ],
      "demo": {
        "src": "assets/projects/midas-curse-unity/gold-path-demo.mp4",
        "poster": "assets/projects/midas-curse-unity/gold-path-800.webp",
        "width": 960,
        "height": 540,
        "caption": [
          "An early Unity prototype of the golden-path mechanic: movement leaves transformed ground that becomes both a resource and a hazard.",
          "黄金路径机制的早期 Unity 原型：移动会在身后留下被转化的地面，使路径同时成为资源与风险。"
        ]
      },
      "team": [
        "Cosmic Creators",
        "Cosmic Creators"
      ],
      "members": [
        {
          "name": "Hao Chen",
          "github": "https://github.com/JarrettChen217"
        },
        {
          "name": "Chao Ma",
          "github": "https://github.com/cmcbrm"
        },
        {
          "name": "Gaoyongle Zhang",
          "github": "https://github.com/XinMoZ"
        },
        {
          "name": "Jiayi Sun",
          "github": "https://github.com/JiayiSun666"
        }
      ],
      "featuredVideo": {
        "youtubeId": "_KGzpyql4ps",
        "watchUrl": "https://www.youtube.com/watch?v=_KGzpyql4ps",
        "poster": "assets/projects/midas-curse-unity/demo-poster-1280.webp",
        "width": 1280,
        "height": 720,
        "caption": [
          "Midas Curse gameplay demo by Cosmic Creators.",
          "Cosmic Creators 的 Midas Curse 游戏演示。"
        ]
      },
      "play": {
        "url": "play/midas-curse/index.html",
        "label": [
          "Play Game",
          "在线试玩"
        ]
      },
      "sectionOrder": [
        "background",
        "mechanics",
        "process",
        "video",
        "demo",
        "product",
        "contributions",
        "journey",
        "engineering",
        "team",
        "credits"
      ],
      "credits": [
        {
          "title": [
            "Team production",
            "团队制作"
          ],
          "body": [
            "Game concept, systems integration, evaluation, and project presentation were completed collaboratively by Cosmic Creators.",
            "游戏概念、系统集成、试玩评估与项目展示由 Cosmic Creators 团队协作完成。"
          ]
        },
        {
          "title": [
            "Models",
            "模型、场景、图标与特效"
          ],
          "body": [
            "The compiled game uses credited third-party assets from the Unity Asset Store and other sources documented by the team; these assets are not presented as original personal artwork.",
            "游戏构建使用来自 Unity Asset Store 及团队文档所列其他来源的第三方素材；这些素材不作为个人原创美术成果展示。"
          ],
          "url": "https://assetstore.unity.com/"
        },
        {
          "title": [
            "Character animation",
            "角色动画"
          ],
          "body": [
            "Character and creature animation sources include Mixamo, integrated and adjusted within the Unity project.",
            "角色与生物动画素材包括 Mixamo 资源，并在 Unity 项目中进行集成与调整。"
          ],
          "url": "https://www.mixamo.com/"
        },
        {
          "title": [
            "Shader learning reference",
            "Shader 学习参考"
          ],
          "body": [
            "The team's dissolve-effect study referenced a tutorial and then adapted the approach for the game's visual direction.",
            "团队的溶解效果学习参考了教程，并在此基础上结合游戏视觉方向进行调整。"
          ],
          "url": "https://www.youtube.com/watch?v=LIuLeCq5-qs"
        },
        {
          "title": [
            "Sound effects",
            "音效素材"
          ],
          "body": [
            "Sound-effect sources include Pixabay and remain subject to their respective source terms.",
            "音效素材来源包括 Pixabay，并遵循相应来源的使用条款。"
          ],
          "url": "https://pixabay.com/sound-effects/"
        }
      ],
      "keywords": [
        "Unity",
        "game development",
        "survival game",
        "shaders",
        "animation",
        "Blend Tree",
        "游戏开发",
        "生存游戏",
        "动画"
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
      "team": [
        "Melbourne University Racing",
        "Melbourne University Racing"
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
        "DaisyWorld — Exploring Emergence",
        "DaisyWorld（探索涌现与环境反馈）"
      ],
      "date": [
        "May 2025",
        "2025年5月"
      ],
      "region": "au",
      "type": "academic",
      "tech": "Python, Pygame, Jupyter Notebook, pandas",
      "summary": [
        "A two-person Python reimplementation and extension of NetLogo's DaisyWorld for SWEN90004 Modelling Complex Software Systems, exploring how simple local rules can accumulate into system-level environmental feedback.",
        "墨尔本大学 SWEN90004“复杂软件系统建模”课程中的两人合作项目：用 Python 复现并扩展 NetLogo 的 DaisyWorld，探索简单的局部规则如何累积为系统层面的环境反馈。"
      ],
      "background": [
        "SWEN90004 framed the assignment as a modelling exercise: teams reimplemented a selected NetLogo grid model, investigated its behaviour, and proposed an extension. Our Python version separates parameter configuration, simulation control, Pygame rendering, and notebook-based data inspection; black and white daisies, bare soil, local temperature, reproduction, ageing, and heat diffusion interact on a toroidal grid. Ant-colony shortest-path examples offer a useful analogy for the course's complex-systems lens: simple local pheromone feedback can accumulate into a collective route. DaisyWorld does not simulate ants or route finding; its system-level patterns arise instead from vegetation, albedo, and temperature feedback. The extension adds pollution zones and spread, pollution-dependent behaviour and visual overlays, plus a Lucky Clover mutation and pollution-mitigation pathway. These are implemented mechanisms, not reported experimental results.",
        "SWEN90004 将作业设为一次建模练习：团队复现一个指定的 NetLogo 网格模型，考察其行为，并提出扩展。我们的 Python 版本分离了参数配置、仿真控制、Pygame 渲染与基于 notebook 的数据检查；黑、白雏菊、裸地、局部温度、繁殖、衰老与热扩散在环形网格中通过局部规则互动。蚂蚁群体寻找最短路径是理解这门课复杂系统视角的一个类比：简单的局部信息素反馈能够累积成群体路线。DaisyWorld 不模拟蚂蚁或路径寻优；它的系统层面模式来自植被、反照率与温度之间的反馈。扩展代码加入污染区域及其传播、受污染影响的行为与可视化覆盖层，以及 Lucky Clover 的变异和污染缓解路径。这些是已实现的机制，不是实验结果报告。"
      ],
      "work": [
        [
          "Built and refined core Python model infrastructure, including parameter configuration, the grid-patch abstraction, toroidal-neighbour handling, and temperature diffusion.",
          "搭建并完善 Python 模型的核心基础，包括参数配置、网格单元抽象、环形邻域处理和温度扩散。"
        ],
        [
          "Added the notebook-based data-inspection workflow and implemented substantial parts of the pollution/Lucky Clover extension, including pollution zones and spread, visual overlays, and pollution-dependent mutation and ageing behaviour.",
          "加入基于 notebook 的数据检查流程，并实现污染/Lucky Clover 扩展的重要部分，包括污染区域与传播、可视化覆盖层，以及受污染程度影响的变异和衰老逻辑。"
        ]
      ],
      "demo": {
        "src": "assets/projects/daisyworld/daisyworld-extension-local-demo.mp4",
        "poster": "assets/projects/daisyworld/daisyworld-extension-local-poster.webp",
        "width": 720,
        "height": 760,
        "caption": [
          "A fixed-seed local macOS/Pygame capture of the extension model's grid renderer. It is a functional demonstration, not an experimental result.",
          "使用固定随机种子录制的扩展模型本机 macOS/Pygame 网格渲染画面。该画面仅用于功能演示，不代表实验结果。"
        ]
      },
      "members": [
        {
          "name": [
            "Hao Chen",
            "Hao Chen"
          ],
          "url": "https://github.com/JarrettChen217"
        },
        {
          "name": [
            "Junhao Zhu",
            "Junhao Zhu"
          ],
          "url": "https://github.com/junhaozhu1"
        }
      ],
      "keywords": [
        "agent-based modelling",
        "complex systems",
        "emergence",
        "environmental feedback",
        "多智能体建模",
        "复杂系统",
        "涌现",
        "环境反馈"
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
        "Mine Automation Verification — Java Concurrency",
        "矿山自动化验证 — Java 并发、JBMC 与 Jazzer"
      ],
      "date": [
        "Nov 2025 – Dec 2025",
        "2025年11月 – 2025年12月"
      ],
      "region": "ny",
      "type": "academic",
      "tech": "Java 17, Maven, JUnit 5, JBMC, Jazzer, JaCoCo",
      "summary": [
        "A two-person formal-verification project that extended an existing Java mine automation simulation with bounded safety checks, coverage-guided fuzzing, and token-controlled scheduling to investigate concurrency bugs and improve the reproducibility of selected thread interleavings.",
        "一个两人合作的形式化验证项目：在既有 Java 矿山自动化并发模拟上，引入有界安全性检查、覆盖率引导模糊测试和 token 控制的线程调度，用于研究并发缺陷，并提升特定线程交错的可复现性。"
      ],
      "background": [
        "For Columbia CSEE W6863 in Fall 2025, the team extended an existing mine simulation in which carts move through an elevator and single-capacity stations. Under contention, carts and engines can enter circular-wait states; the project added verification and testing capability rather than rebuilding the simulator from scratch.",
        "在 Columbia CSEE W6863（2025年秋季）中，团队扩展了一个既有矿山模拟系统：矿车经过电梯和单容量站点。在资源竞争下，矿车与运输线程可能形成循环等待；项目重点是新增验证与测试能力，而非从零重建模拟器。"
      ],
      "work": [
        [
          "Brought and adapted the mine simulation used as the verification subject from an earlier undergraduate course project.",
          "提供并改造此前本科课程项目中的矿山模拟系统，作为本项目的验证对象。"
        ],
        [
          "Led the core implementation and iterative debugging of the token-controlled scheduling extension.",
          "主导 token-controlled scheduling 扩展的核心实现与迭代调试。"
        ],
        [
          "Implemented or refined the injectable pause strategy, fuzz entry points, progress/deadlock monitoring, engine step granularity, and selected synchronization fixes.",
          "实现或完善可注入暂停策略、fuzz 入口、进度与死锁监测、引擎步骤粒度及部分同步修复。"
        ],
        [
          "Organized the repository and finalized architecture, fuzzing, and JBMC documentation.",
          "整理仓库结构，并完成架构、fuzzing 与 JBMC 文档。"
        ]
      ],
      "journey": [
        {
          "title": [
            "From timing to explicit scheduling",
            "从时序依赖到显式调度"
          ],
          "body": [
            "The fuzz input selects which thread role may advance by one logical step. This made selected interleavings explicit and replayable instead of relying only on JVM timing.",
            "fuzz 输入决定哪个线程角色可以推进一个逻辑步骤，使特定线程交错能够被明确控制与回放，而不只依赖 JVM 的时序随机性。"
          ]
        },
        {
          "title": [
            "Reach the missing intermediate states",
            "到达此前遗漏的中间状态"
          ],
          "body": [
            "Iteration hooks, a progress/deadlock watcher, and splitting the Engine receive/deliver transition into two controllable steps let the harness exercise states a coarser model missed.",
            "通过迭代 hook、进度与死锁监测，以及把 Engine 的 receive/deliver 转换拆成两个可控制步骤，测试框架能够覆盖较粗粒度模型遗漏的状态。"
          ]
        },
        {
          "title": [
            "Evaluate with bounded checks and concurrent exploration",
            "结合有界检查与并发探索进行评估"
          ],
          "body": [
            "JBMC harnesses checked bounded safety properties of deterministic components, while Jazzer explored liveness failures in the concurrent composition with a progress/deadlock oracle.",
            "JBMC harness 检查确定性组件在有限边界内的安全性质；Jazzer 则结合进度与死锁 oracle 探索完整并发组合中的活性问题。"
          ]
        }
      ],
      "architecture": [
        {
          "title": [
            "JBMC bounded safety checks",
            "JBMC 有界安全性检查"
          ],
          "body": [
            "Harnesses target deterministic components and selected safety properties within explicit bounds.",
            "Harness 针对确定性组件与选定安全性质进行有限边界内的检查。"
          ]
        },
        {
          "title": [
            "Jazzer concurrency exploration",
            "Jazzer 并发探索"
          ],
          "body": [
            "Coverage-guided inputs drive the concurrent composition and expose selected liveness failures.",
            "覆盖率引导输入驱动完整并发组合，并暴露选定的活性故障。"
          ]
        },
        {
          "title": [
            "Token-controlled scheduling",
            "Token 控制调度"
          ],
          "body": [
            "A gated controller releases a chosen thread role for one logical step while monitoring progress.",
            "gated controller 每次释放指定线程角色推进一个逻辑步骤，并持续监测进度。"
          ]
        }
      ],
      "gallery": [
        {
          "src": "assets/projects/java-concurrency/java-concurrency-token-controller-1600.webp",
          "thumbnail": "assets/projects/java-concurrency/java-concurrency-token-controller-800.webp",
          "width": 1600,
          "height": 900,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Fuzz input selects a thread token, and the controller opens one matching thread lane for a single iteration while other lanes wait.",
            "fuzz 输入选择线程 token；控制器只为匹配的线程通道开放一次迭代，其他通道保持等待。"
          ],
          "caption": [
            "Token-controlled scheduling made selected interleavings explicit and replayable.",
            "Token 控制调度让特定线程交错能够被明确控制与回放。"
          ]
        },
        {
          "src": "assets/projects/java-concurrency/java-concurrency-system-model-1600.webp",
          "thumbnail": "assets/projects/java-concurrency/java-concurrency-system-model-800.webp",
          "width": 1600,
          "height": 976,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "Mine carts travel from an elevator through single-capacity stations connected by engine threads, then return to the elevator.",
            "矿车从电梯出发，经过由运输线程连接的单容量站点后返回电梯。"
          ],
          "caption": [
            "Mine workflow context for investigating circular-wait states under contention.",
            "用于研究资源竞争下循环等待状态的矿山工作流背景。"
          ]
        },
        {
          "src": "assets/projects/java-concurrency/java-concurrency-coverage-summary-1600.webp",
          "thumbnail": "assets/projects/java-concurrency/java-concurrency-coverage-summary-800.webp",
          "width": 1600,
          "height": 341,
          "thumbnailWidth": 800,
          "group": "engineering",
          "alt": [
            "JaCoCo summary reporting 66 percent instruction coverage and 65 percent branch coverage for the final project configuration.",
            "JaCoCo 汇总显示最终项目配置的 66% 指令覆盖率与 65% 分支覆盖率。"
          ],
          "caption": [
            "Final-report JaCoCo result: 66% instruction and 65% branch coverage; this portfolio pass did not rerun the experiment.",
            "最终报告记录的 JaCoCo 结果：66% 指令覆盖率、65% 分支覆盖率；本次作品集整理未重新运行实验。"
          ]
        }
      ],
      "boundary": [
        "The final report recorded 66% instruction coverage and 65% branch coverage across the project. These results describe structural reachability in that reported experiment, not a proof of whole-system deadlock freedom or exhaustive schedule exploration.",
        "最终报告记录了项目整体 66% 的指令覆盖率和 65% 的分支覆盖率。这些结果描述的是该次实验中的结构可达性，不代表已证明整个系统无死锁，也不代表穷尽了所有调度交错。"
      ],
      "members": [
        {
          "name": [
            "Hao Chen",
            "Hao Chen"
          ],
          "url": "https://github.com/JarrettChen217"
        },
        {
          "name": [
            "Yinfeng Chai",
            "Yinfeng Chai"
          ],
          "url": "https://github.com/chai-yinfeng"
        }
      ],
      "keywords": [
        "verification",
        "testing",
        "deadlock",
        "token-controlled scheduling",
        "Java concurrency",
        "并发",
        "死锁",
        "测试",
        "形式化验证"
      ],
      "links": [
        {
          "label": [
            "Code",
            "代码"
          ],
          "url": "https://github.com/chai-yinfeng/Mine-Automation-System"
        }
      ]
    }
  ]
};
