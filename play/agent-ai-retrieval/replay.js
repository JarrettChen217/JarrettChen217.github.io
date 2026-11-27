const labels = {
  en: {
    title: 'Retrieval replay',
    intro: 'Explore a local MiniLM run on twelve physics questions. Each question has a recorded ranking and passages marked relevant before the run.',
    source: 'Read the twelve-page physics notes (PDF)',
    choose: 'Choose a question',
    gold: 'Human-labeled relevant passages',
    none: 'No passage in the notes answers this question.',
    ranked: 'Four passages returned',
    hint: 'Listed in retrieval order. Expand a passage to read the source text.',
    hit: 'Relevant', other: 'Outside the relevant set',
    topics: ['Position graph', 'Displacement and impulse', 'Balanced forces', 'Friction limit', 'Perpendicular push', 'Cart collision', 'Impulse duration', 'Pendulum and spring', 'Capacitor energy', 'Series resistance', 'Refraction', 'Copper and temperature']
  },
  zh: {
    title: '逐题查看检索试跑',
    intro: '这次本地试跑使用 MiniLM 检索十二道物理题。选一道题，就能对照实际返回的段落顺序和试跑前的人工标注。',
    source: '阅读十二页物理笔记（PDF）',
    choose: '选择题目',
    gold: '人工标注的相关段落',
    none: '笔记中没有能回答这道题的段落。',
    ranked: '实际返回的四个段落',
    hint: '按检索顺序排列。展开任意段落可阅读英文原文。',
    hit: '命中标注', other: '未标为相关',
    topics: ['位置图像', '位移与冲量', '受力平衡', '摩擦力上限', '垂直推力', '小车碰撞', '冲量与作用时间', '单摆与弹簧', '电容储能', '串联电阻', '光的折射', '铜线与温度']
  }
};

let language;
try { language = localStorage.getItem('hao-language'); } catch {}
if (!Object.hasOwn(labels, language)) language = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';

const byId = id => document.getElementById(id);
const choose = byId('choose');
const { questions, passages } = recordedRun;
let questionId = questions[7].id;

function renderQuestion() {
  const q = questions.find(row => row.id === questionId);
  const words = labels[language];
  byId('question').textContent = q.question;
  const gold = byId('gold');
  gold.textContent = q.gold.length ? q.gold.map(id => id + ' · ' + passages[id].title).join(' / ') : words.none;
  gold.lang = q.gold.length ? 'en' : language;
  const ranked = byId('ranked');
  ranked.replaceChildren();
  for (const [index, id] of q.ranked.entries()) {
    const passage = passages[id];
    const row = document.createElement('li');
    const detail = document.createElement('details');
    detail.open = index === 0;
    const summary = document.createElement('summary');
    const title = document.createElement('span');
    title.lang = 'en';
    title.textContent = id + ' · ' + passage.title;
    const relevant = q.gold.includes(id);
    const status = document.createElement('span');
    status.className = relevant ? 'status hit' : 'status';
    status.textContent = relevant ? words.hit : words.other;
    const text = document.createElement('p');
    text.lang = 'en';
    text.textContent = passage.text;
    summary.append(title, ' ', status);
    detail.append(summary, text);
    row.append(detail);
    ranked.append(row);
  }
}

function render() {
  const words = labels[language];
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = words.title + ' · Agent AI';
  byId('title').textContent = words.title;
  byId('intro').textContent = words.intro;
  byId('source').textContent = words.source;
  byId('choose-label').textContent = words.choose;
  byId('gold-title').textContent = words.gold;
  byId('rank-title').textContent = words.ranked;
  byId('hint').textContent = words.hint;
  choose.replaceChildren(...questions.map((q, i) => new Option(q.id + ' · ' + words.topics[i], q.id)));
  choose.value = questionId;
  document.querySelectorAll('[data-lang]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === language));
  });
  renderQuestion();
}

choose.addEventListener('change', () => {
  questionId = choose.value;
  renderQuestion();
});
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => {
  language = button.dataset.lang;
  try { localStorage.setItem('hao-language', language); } catch {}
  render();
}));
render();
