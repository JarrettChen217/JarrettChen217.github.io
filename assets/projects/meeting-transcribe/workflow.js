// Animation progress lasts for this visit, including language changes and back navigation.
const transcriptionVisit = { seen: new Set(), skip: false };
function mountTranscriptionWorkflow(root, language, projectVisit) {
  root.innerHTML = `<style>
  :host {
    display: block;
    color-scheme: light;
    --paper: #f5f8fa;
    --panel: #fff;
    --ink: #303b42;
    --muted: #566973;
    --line: #d6e0e6;
    --accent: #375d73;
    --mark: #e7f1f7;
    --spark: #56519a;
    font: 15px/1.7 -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  * { box-sizing: border-box }
  header { padding-block-end: 2rem; border-block-end: 1px solid var(--line) }
  button { color: var(--accent) }
  button {
    min-height: 44px; padding: .3rem .7rem; border: 1px solid var(--line);
    border-radius: .375rem; background: var(--panel); cursor: pointer; font: inherit;
  }
  button[aria-disabled="true"] { color: var(--muted); cursor: default }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 4px }
  h1, h2, h3, p, figure, dl, dd { margin: 0 }
  #intro { margin-block-start: .75rem; max-width: 62ch; color: var(--muted) }
  section { margin-inline-start: .35rem; padding: 2rem 0 1rem clamp(1.15rem, 3vw, 2rem); border-inline-start: 1px solid var(--line); position: relative }
  section::before {
    content: ""; position: absolute; inline-size: .6rem; block-size: .6rem;
    inset-block-start: 2.55rem; inset-inline-start: -.345rem; border-radius: 50%;
    border: 1px solid var(--accent); background: var(--paper);
  }
  section[data-phase="playing"]::before { background: var(--accent) }
  section:last-child { padding-block-end: 0 }
  h2 { font-size: clamp(1.15rem, 3vw, 1.42rem); line-height: 1.35 }
  h3 { font-size: 1rem; line-height: 1.35 }
  .summary { color: var(--muted); max-width: 65ch; margin-block: .38rem .85rem }
  .scene { padding: clamp(.8rem, 3vw, 1.2rem); border: 1px solid var(--line); border-radius: .62rem; background: var(--panel); overflow: clip }
  .audio-file, .time, .chunk-key { font: 650 .82rem/1.5 ui-monospace, monospace }
  .waveform { display: block; color: var(--accent); width: 100%; max-height: 3rem; margin-block: .55rem 1rem }
  .trace { stroke-dasharray: 1; stroke-dashoffset: 0 }
  .dialogue { display: grid; gap: .5rem }
  .speaker { color: var(--accent); font-weight: 700 }
  .utterance { overflow-wrap: anywhere }
  .reader-text {
    position: absolute; clip-path: inset(50%); height: 1px; width: 1px; overflow: hidden;
    white-space: nowrap; user-select: none;
  }
  .agent-window { border: 1px solid var(--line); border-radius: .44rem; background: var(--paper); overflow: hidden }
  .agent-title { padding: .45rem .85rem; border-block-end: 1px solid var(--line); color: var(--accent); font-weight: 700 }
  .request { padding: .7rem .85rem; background: var(--panel) }
  .request code { display: block; overflow-wrap: anywhere; color: var(--muted) }
  .request p { margin-block-start: .32rem }
  .approval { display: flex; gap: .4rem .75rem; flex-wrap: wrap; padding: .65rem .85rem; border-block-start: 1px solid var(--line); color: var(--accent); font-weight: 650 }
  .scale-note { margin-inline-start: .5rem; color: var(--muted); font-weight: 400 }
  .overlap-label { color: var(--accent); font-weight: 700 }
  .timeline { margin-block: .65rem 1rem }
  .tracks { display: grid; grid-template-columns: 44% 12% 44%; gap: .28rem 0; margin-block-start: .5rem }
  .overlap-band { grid-area: 1 / 2 / 3 / 3; background: var(--mark); border-inline: 1px dashed var(--accent) }
  .track { height: .45rem; border-radius: .25rem; background: var(--accent); z-index: 1 }
  .track-a { grid-area: 1 / 1 / 2 / 3 }
  .track-b { grid-area: 2 / 2 / 3 / 4 }
  .chunk-pair { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: .7rem }
  .chunk { padding: .7rem; border: 1px solid var(--line); border-radius: .4rem; min-width: 0 }
  .chunk-heading { display: flex; align-items: baseline; flex-wrap: wrap; gap: .25rem .6rem }
  .time { color: var(--muted) }
  .ellipsis { color: var(--muted); line-height: 1.2; margin-block: .4rem }
  .match {
    padding: .55rem .65rem; border-inline-start: 2px solid var(--accent);
    background: var(--mark); color: var(--ink); border-radius: 0 .28rem .28rem 0;
  }
  .chunk .match, .chunk-text { margin-block: .5rem }
  .model { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; margin-block-end: .75rem }
  .spark { color: var(--spark); font-size: 1.45rem; line-height: 1 }
  .model-status { color: var(--muted); font-size: .9rem }
  .merge { position: relative; margin-block-end: .85rem; padding-block-end: 1.8rem }
  .merge-echo { position: absolute; top: 1.85rem; inset-inline: .55rem 0; opacity: 0; pointer-events: none }
  .merge-text { color: var(--accent); font-weight: 700 }
  .merge .chunk-key { margin-inline-end: .4rem }
  .minutes { display: grid; gap: .52rem; padding: 0; list-style: none; margin: 0 }
  .minutes li { display: grid; grid-template-columns: minmax(7rem, 25%) minmax(0,1fr); gap: .25rem .75rem; padding-block-start: .5rem; border-block-start: 1px solid var(--line) }
  .minutes strong { color: var(--accent) }
  header {
    display: flex; align-items: flex-start; flex-wrap: wrap; gap: .5rem 1rem;
    padding-block-end: .85rem;
  }
  #intro { flex: 1 1 16rem; margin-block: .15rem 0 }
  section { padding-block-start: 1.15rem }
  section::before { inset-block-start: 1.64rem; background: var(--panel) }
  section[data-phase="playing"]::before { background: var(--accent) }
  section:last-child { padding-block-end: 0 }
  @media (max-width: 37rem) {
    .chunk-pair { grid-template-columns: 1fr }
    .minutes li { grid-template-columns: 1fr }
  }
  @media (forced-colors: active) {
    .trace { stroke: CanvasText }
    .track { background: Highlight; forced-color-adjust: none }
    .overlap-band, .match { border-color: Highlight }
  }
</style>
    <header><p id="intro"></p><button id="skip" type="button"></button></header>
    <div id="flow"></div>`;

  const english = {
    back: 'Back to Meeting Transcribe', language: '中文',
    showNow: 'Show text immediately', motionSkipped: 'Animations skipped',
    intro: 'A fictional campus tour illustrates the workflow from a recording to a transcript and minutes. Scroll to see each step.',
    recording: ['A sample recording', 'Maya and Leo are planning a Saturday campus tour. The waveform and dialogue are illustrative.'],
    request: ['Give the agent the task', 'The agent proposes a chunking plan and budget. The user approves both once.'],
    chunks: ['Preview and split the recording', 'A low-cost preview identifies languages and terms before dividing the recording into chunks of about 12–15 minutes. Here two 15-minute chunks share 20 seconds. Ellipses mark omitted audio.'],
    transcription: ['Transcribe each chunk', 'Gemini produces text from each chunk. Structural checks look for empty, truncated, or looping output.'],
    stitch: ['Stitch the transcript', 'Speaker labels are aligned, and the shared words appear once in the assembled transcript.'],
    minutes: ['Write the minutes', 'The transcript preserves the conversation. The minutes capture the arrangements and follow-up actions.'],
    prompt: 'Use Meeting Transcribe to produce a transcript in the original language and write minutes.',
    plan: 'Chunk plan and budget', confirmation: 'User confirms once',
    overlap: '20-second overlap', scale: 'Overlap enlarged for clarity', chunkA: 'Chunk A', chunkB: 'Chunk B',
    ready: 'Transcription illustration', working: 'Transcription in progress', done: 'Transcription complete',
    match: 'meet at the east gate at ten',
    speakers: ['Maya', 'Leo'],
    turns: [
      'I’m setting up Saturday’s campus tour. Can everyone bring water?',
      'Yes. I’ll print copies of the route map.',
      'Let’s meet at the east gate at ten on Saturday. It’s closest to the courtyard, and we can get everyone checked in before we start.',
      'That works. I’ll bring the printed maps and make an extra copy for the welcome desk.',
      'If it rains, we’ll meet in the library lobby. I’ll message everyone on Friday.',
      'I’ll add the library to the map as the rain location.'
    ],
    decisions: [
      ['Time', 'Saturday at 10:00 a.m.'],
      ['Meeting point', 'East gate. Use the library lobby if it rains.'],
      ['Maya', 'Message the group on Friday.'],
      ['Leo', 'Mark the backup location and print route maps, with an extra copy for the welcome desk.']
    ]
  };

  const chinese = {
    back: '返回 Meeting Transcribe 项目页', language: 'English',
    showNow: '立即显示文字', motionSkipped: '已跳过动画',
    intro: '用一段虚构的校园参观筹备对话演示如何从录音得到转录稿和纪要。向下滚动查看每一步。',
    recording: ['一段示例录音', 'Maya 和 Leo 在筹备周六的校园参观。波形和对话均为示意。'],
    request: ['向 Agent 交代任务', 'Agent 提出分段方案和预算，由用户一次确认。'],
    chunks: ['预转录并分段', '先用低成本预转录识别语言和术语，再把录音切成约 12–15 分钟一段。示例中的两段各 15 分钟，重叠 20 秒。省略号表示未列出的音频。'],
    transcription: ['逐段转录', 'Gemini 逐段生成文字。结构检查会检查空输出、截断和循环重复。'],
    stitch: ['拼接转录稿', '对齐说话人标记后，拼接稿中只保留一份重叠内容。'],
    minutes: ['整理纪要', '转录稿保留原话，纪要记录已定事项和待办。'],
    prompt: '请用 Meeting Transcribe 保留原语言，生成转录稿和纪要。',
    plan: '分段方案和预算', confirmation: '用户一次确认',
    overlap: '重叠 20 秒', scale: '重叠部分已放大', chunkA: '片段 A', chunkB: '片段 B',
    ready: '转录过程示意', working: '转录中', done: '转录完成',
    match: '十点在东门集合',
    speakers: ['Maya', 'Leo'],
    turns: [
      '我在安排周六的校园参观。大家可以自己带水吗？',
      '可以。我来打印几份路线图。',
      '周六我们十点在东门集合吧。那里离庭院最近，出发前可以让大家先签到。',
      '好。我带上打印好的路线图，再给接待台多准备一份。',
      '如果下雨，就改到图书馆大厅集合。我周五会发消息告诉大家。',
      '我会在路线图上标出图书馆，作为雨天集合点。'
    ],
    decisions: [
      ['时间', '周六上午 10:00'],
      ['集合点', '东门。下雨则改为图书馆大厅。'],
      ['Maya', '周五发消息通知大家。'],
      ['Leo', '标出雨天集合点并打印路线图，给接待台多留一份。']
    ]
  };

  const ids = ['recording', 'request', 'chunks', 'transcription', 'stitch', 'minutes'];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const byId = id => root.getElementById(id);
  const elSkip = byId('skip');
  let skipMotion = projectVisit.skip;
  const views = Object.fromEntries(ids.map(id => {
    const section = document.createElement('section');
    section.dataset.scene = id;
    section.dataset.phase = 'pending';
    section.setAttribute('aria-labelledby', id + '-title');
    section.innerHTML = '<h2 id="' + id + '-title"></h2><p class="summary"></p><div class="scene"></div>';
    byId('flow').append(section);
    return [id, section];
  }));

  const chineseWords = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('zh', { granularity: 'word' }) : null;

  function streamText(value) {
    const words = language === 'zh'
      ? chineseWords ? Array.from(chineseWords.segment(value), item => item.segment) : Array.from(value)
      : value.match(/\S+|\s+/gu);
    const visual = words.map(word => word.trim() ? '<span class="stream-part">' + word + '</span>' : word).join('');
    return '<span class="reader-text">' + value + '</span><span aria-hidden="true">' + visual + '</span>';
  }

  function dialogue(copy, indices, streaming = false) {
    return '<div class="dialogue">' + indices.map(i =>
      '<p class="turn"><strong class="speaker">' + copy.speakers[i % 2] +
      '</strong> <span class="utterance">' +
      (streaming ? streamText(copy.turns[i]) : copy.turns[i]) + '</span></p>'
    ).join('') + '</div>';
  }

  function chunks(copy, transcribing = false) {
    const excerpt = indices => dialogue(copy, indices, transcribing);
    const marker = transcribing ? 'chunk-text' : 'match';
    const shared = '<div class="' + marker + '">' + excerpt([2, 3]) + '</div>';
    const ellipsis = '<p class="ellipsis" aria-hidden="true">…</p>';
    const cards = [
      [copy.chunkA, '00:00–15:00', excerpt([0, 1]) + shared],
      [copy.chunkB, '14:40–29:40', shared + excerpt([4, 5])]
    ];
    return '<div class="chunk-pair">' + cards.map(([title, time, body]) =>
      '<article class="chunk"><div class="chunk-heading"><h3>' + title + '</h3>' +
      '<span class="time">' + time + '</span></div>' + ellipsis + body + ellipsis + '</article>'
    ).join('') + '</div>';
  }

  function renderMotionControl(copy) {
    elSkip.hidden = motion.matches && !skipMotion;
    elSkip.textContent = skipMotion ? copy.motionSkipped : copy.showNow;
    elSkip.setAttribute('aria-disabled', String(skipMotion));
  }

  function render() {
    const copy = language === 'zh' ? chinese : english;
    byId('intro').textContent = copy.intro;
    renderMotionControl(copy);

    const wave = '<svg class="waveform" viewBox="0 0 400 35" aria-hidden="true" preserveAspectRatio="none">' +
      '<path class="trace" pathLength="1" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'd="M0 17h20l4-3 4 6 3-9 5 13 4-7h8l3-9 5 18 6-22 6 25 4-12h14l4-3 4 6 4-9 5 12 5-6h14l3-11 4 23 5-28 5 30 5-14h14l3-5 6 10 5-8 4 3h24l4-6 3 14 5-20 6 25 4-13h16l5-4 3 8 5-14 5 19 4-9h14l3-6 5 13 6-20 5 25 4-12h25l4-4 3 7 6-6 5 3h42"/>' +
      '</svg>';
    const illustrations = {
      recording: '<code class="audio-file">campus-tour.wav</code>' + wave + dialogue(copy, [0, 1, 2, 3, 4, 5], true),
      request: '<div class="agent-window"><p class="agent-title">Agent</p><div class="request">' +
        '<code class="audio-file">./samples/campus-tour.wav</code><p>' + streamText(copy.prompt) +
        '</p></div><p class="approval"><span>' + copy.plan +
        '</span><span aria-hidden="true">→</span><span>' + copy.confirmation + '</span></p></div>',
      chunks: '<figure class="timeline"><figcaption class="overlap-label">' + copy.overlap +
        ' <small class="scale-note">' + copy.scale +
        '</small></figcaption><div class="tracks" aria-hidden="true"><span class="overlap-band"></span><span class="track track-a"></span><span class="track track-b"></span></div></figure>' +
        chunks(copy),
      transcription: '<p class="model"><span class="spark" aria-hidden="true">✦</span><strong>Gemini</strong>' +
        '<span class="model-status" aria-hidden="true">' + (views.transcription.dataset.phase === 'done' ? copy.done : copy.ready) +
        '</span></p>' + chunks(copy, true),
      stitch: '<div class="merge"><div class="match merge-text" aria-hidden="true"><span class="chunk-key">A + B</span>' +
        copy.match + '</div><div class="match merge-echo" aria-hidden="true"><span class="chunk-key">B</span>' + copy.match +
        '</div></div>' + dialogue(copy, [0, 1, 2, 3, 4, 5]),
      minutes: '<ul class="minutes" role="list">' + copy.decisions.map(([label, content]) =>
        '<li><strong>' + label + '</strong><span>' + content + '</span></li>').join('') + '</ul>'
    };

    for (const id of ids) {
      const view = views[id];
      const [title, summary] = copy[id];
      view.querySelector('h2').textContent = title;
      view.querySelector('.summary').textContent = summary;
      view.querySelector('.scene').innerHTML = illustrations[id];
    }
  }

  const active = new Map();

  function finish(view) {
    active.delete(view);
    view.dataset.phase = 'done';
    if (view === views.transcription) {
      view.querySelector('.model-status').textContent = (language === 'zh' ? chinese : english).done;
    }
  }

  function finishActive() {
    for (const [view, animations] of active) {
      for (const animation of animations) animation.cancel();
      finish(view);
    }
  }

  function play(view) {
    if (view.dataset.phase !== 'pending') return;
    if (skipMotion || motion.matches || typeof view.animate !== 'function') {
      finish(view);
      return;
    }
    view.dataset.phase = 'playing';
    const animations = [];
    const select = selector => view.querySelector(selector);
    const animate = (element, frames, options) => {
      animations.push(element.animate(frames, options));
    };
    const reveal = (selector, delay, interval, duration, frames, easing = 'ease-out') => {
      view.querySelectorAll(selector).forEach((element, index) => {
        animate(element, frames, { delay: delay + index * interval, duration, easing, fill: 'backwards' });
      });
    };
    const rise = [{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }];
    const stream = (delay, duration) => {
      const parts = view.querySelectorAll('.stream-part');
      const interval = Math.min(46, duration / Math.max(parts.length - 1, 1));
      parts.forEach((part, index) => {
        animate(part, [{ opacity: 0 }, { opacity: 1 }], {
          delay: delay + index * interval, duration: 105, easing: 'ease-out', fill: 'backwards'
        });
      });
      return delay + (parts.length - 1) * interval + 105;
    };

    switch (view.dataset.scene) {
      case 'recording':
        animate(select('.trace'), [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 2200 });
        stream(160, 2200);
        break;
      case 'request':
        reveal('.approval span', stream(80, 800), 120, 260, rise);
        break;
      case 'chunks':
        reveal('.match', 260, 120, 380, rise);
        animate(select('.overlap-band'), [{ opacity: 0 }, { opacity: 1 }], { duration: 650, fill: 'backwards' });
        break;
      case 'transcription':
        select('.model-status').textContent = (language === 'zh' ? chinese : english).working;
        animate(select('.spark'), [
          { transform: 'scale(1)', opacity: .75 },
          { transform: 'scale(1.25)', opacity: 1 },
          { transform: 'scale(1)', opacity: 1 }
        ], { duration: 650, easing: 'ease-in-out' });
        stream(430, 2200);
        break;
      case 'stitch':
        animate(select('.merge-echo'), [
          { opacity: 0, transform: 'translateY(.5rem)' },
          { opacity: 1, transform: 'translateY(.45rem)', offset: .28 },
          { opacity: 1, transform: 'translateY(.45rem)', offset: .62 },
          { opacity: 0, transform: 'translate(-.55rem, -1.85rem)' }
        ], { duration: 920, easing: 'ease-in-out' });
        reveal('.match:not(.merge-echo)', 0, 0, 390, rise);
        reveal('.turn', 660, 135, 270, rise);
        break;
      case 'minutes':
        reveal('.minutes li', 80, 260, 320, rise);
        break;
    }
    active.set(view, animations);
    Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (active.has(view)) finish(view);
    });
  }

  elSkip.addEventListener('click', () => {
    if (skipMotion) return;
    skipMotion = true;
    projectVisit.skip = true;
    finishActive();
    Object.values(views).filter(view => view.dataset.phase === 'pending').forEach(finish);
    renderMotionControl(language === 'zh' ? chinese : english);
  });
  function updateMotion() {
    if (motion.matches) finishActive();
    renderMotionControl(language === 'zh' ? chinese : english);
  }
  motion.addEventListener('change', updateMotion);
  let observer;

  function observeScenes() {
    if (!('IntersectionObserver' in window)) {
      Object.values(views).forEach(finish);
      return;
    }
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const view = entry.target.closest('[data-scene]');
        projectVisit.seen.add(view.dataset.scene);
        play(view);
      }
    }, { rootMargin: '0px 0px -12% 0px' });
    for (const view of Object.values(views)) {
      if (view.dataset.phase === 'pending') observer.observe(view.querySelector('.scene'));
    }
  }

  render();
  for (const id of ids) if (skipMotion || projectVisit.seen.has(id)) finish(views[id]);
  observeScenes();
  return () => {
    observer?.disconnect();
    motion.removeEventListener('change', updateMotion);
    finishActive();
  };
}

customElements.define('transcription-workflow', class extends HTMLElement {
  connectedCallback() {
    const root = this.shadowRoot || this.attachShadow({mode: 'open'});
    this.cleanup = mountTranscriptionWorkflow(root, this.lang, transcriptionVisit);
  }
  disconnectedCallback() { this.cleanup?.(); }
});
