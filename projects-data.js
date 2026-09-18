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
        "video",
        "background",
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
