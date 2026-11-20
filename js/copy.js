// 全部界面文案集中在这里（页面文件里不写中文）
// 英文学习内容来自 app/data/*，不放这里

export const APP_TITLE = '每天学英语';

export const COMMON = {
  slow: '慢速',
  normal: '正常',
  speedHint: '点一下切换读音快慢',
  back: '‹ 返回',
  listen: '🔊',
  listenLabel: '听一遍',
  noVoice: '手机没找到英语朗读声音，请在 设置 → 辅助功能 → 朗读内容 → 声音 里下载英语声音',
  noMic: '没有麦克风权限，请在 设置 → Safari → 麦克风 里允许',
  noRecord: '这台手机现在录不了音，先跟着读出声就好',
  saveFailed: '这次没存上，手机存储可能满了，清理一下再试',
  done: '已打勾',
};

export const ITEMS = {
  review: { name: '复习', minutes: 10 },
  new: { name: '新内容', minutes: 25 },
  listen: { name: '听', minutes: 15 },
  speak: { name: '开口', minutes: 5 },
  baby: { name: '对宝宝说', minutes: 5 },
};

export const HOME = {
  streak: (n) => `已连续 ${n} 天`,
  total: (n) => `累计 ${n} 天`,
  weekDays: ['一', '二', '三', '四', '五', '六', '日'],
  weekLabel: '本周',
  minutes: (n) => `约 ${n} 分钟`,
  allDone: '今天学完了 🎉',
  allDoneSub: '明天打开会自动换成新内容',
  recovered: '学习记录读不出来，已重新开始，可在「我的 → 设置」里用备份恢复',
  repeatNote: '今天的新内容明天会再学一遍',
  next: (name) => `下一步：${name}`,
  start: '开始',
  progress: '今天进度',
  progressCount: (a, b) => `${a}/${b}`,
  listTitle: '今天要学的',
  go: '去学 ›',
  doneMark: '✓',
  doneLabel: '做完了',
  // 每行下面那一句「今天具体学什么」
  reviewLine: (n) => `${n} 张卡要复习`,
  reviewNone: '今天没有要复习的',
  newPhonics: (symbols) => symbols,
  newNce: (a, b) => (a === b ? `新概念第 ${a} 课` : `新概念第 ${a}–${b} 课`),
  newPhonicsReview: '复习学过的音标',
  newJoin: ' + ',
  newFinished: '新内容都学完了',
  listenLine: (n) => `例词和重点句，共 ${n} 条`,
  speakLine: '跟读今天 3 句，录下来对比听',
  babyLine: (scene) => `${scene}时说的 3 句`,
};

export const FINISHED = {
  title: '新概念第一册和 48 个音标，全部学完了！',
  body: '这是一件了不起的事。以后每天还可以接着复习、听、开口、对宝宝说。',
  ok: '好的，继续每天复习',
};

export const FIRST_RUN = {
  title: '欢迎！每天跟着「今天」页学就行',
  question: '音标学到哪了？',
  fromStart: '从头开始',
  partly: '学过一部分',
  pickDay: '选一下学到第几天了（一共 21 天）',
  day: (n) => `第 ${n} 天`,
  ncNote: '新概念从第 3 课开始，设置里可以改',
};

export const NEW = {
  title: '新内容',
  phonicsTitle: '今天的音标',
  phonicsReviewTitle: '今天复习这些音标',
  cardCount: (i, n) => `第 ${i} 张 / 共 ${n} 张`,
  tapSymbol: '点大号音标听读音',
  tapSymbolWord: '听例词里的这个音',
  how: '怎么发',
  like: '像中文',
  mistake: '常犯的错',
  words: '例词',
  sentence: '一句话串起来',
  prev: '上一张',
  next: '下一张',
  toQuiz: '去做听音选对',
  toNce: '去看新概念',
  quizTitle: '听音选对',
  quizHint: '点 🔊 听单词，选它里面是哪个音',
  quizCount: (i, n) => `第 ${i} 题 / 共 ${n} 题`,
  right: '对了！',
  wrong: (ans) => `不对，是 ${ans}`,
  quizNext: '下一题',
  quizDone: (r, n) => `答对 ${r} 题，共 ${n} 题`,
  nceTitle: '新概念',
  lesson: (n) => `第 ${n} 课`,
  nceWhere: '课文和录音在外研U学里听',
  keyWords: '重点词',
  keySentences: '重点句',
  practice: '句型练习',
  noNew: '新内容都学完了，点下面「学完了」就行',
  finish: '学完了',
  again: '明天再学一遍',
  againDone: '好的，明天再学一遍今天的内容',
};

export const REVIEW = {
  title: '复习',
  left: (n) => `还剩 ${n} 张`,
  tapFlip: '点卡片看意思',
  remember: '记得',
  forgot: '忘了',
  none: '今天没有要复习的，点下面「做完了」就行',
  check: '做完了',
  allDone: '今天的卡片复习完了',
  phonicsBack: (word) => `例词：${word}`,
  sep: '，',
};

export const LISTEN = {
  title: '听',
  intro: '点「从头播放」，一条一条读给你听，每条中间停一下',
  play: '从头播放',
  stop: '停下',
  playing: (i, n) => `正在读第 ${i} 条 / 共 ${n} 条`,
  ended: '播完了，可以再听一遍',
  nceTip: '新概念课文和录音，去外研U学里听',
  finish: '听完了',
  empty: '今天没有新的例词，去外研U学听听课文就好',
};

export const SPEAK = {
  title: '开口',
  intro: '先听标准读音，再按住按钮录下自己读的，放出来对比听',
  count: (i, n) => `第 ${i} 句 / 共 ${n} 句`,
  hold: '按住录音',
  recording: '正在录，松开结束',
  playMine: '听我读的',
  noMine: '还没录',
  finish: '练完了',
};

export const BABY = {
  title: '对宝宝说',
  scene: (name) => `本周场景：${name}`,
  when: '什么时候说',
  tip: '怎么读',
  rhyme: '今天的儿歌',
  finish: '说过了',
};

export const SETTINGS = {
  title: '设置',
  pushTitle: '提醒时间',
  pushNote: '提醒功能下一步才做好，先把时间定下来',
  babyTime: '宝宝英语',
  studyTime: '今天的学习',
  nceTitle: '新概念学到第几课',
  nceCurrent: (n) => `从第 ${n} 课开始`,
  ncePrev: '往前两课',
  nceNext: '往后两课',
  nceSaved: (n) => `好的，今天从第 ${n} 课开始`,
  backupTitle: '备份',
  backupNote: '换手机或清理 Safari 前，先导出备份存到「文件」里',
  exportBtn: '导出备份',
  importBtn: '导入备份',
  exported: '备份已导出，记得存到「文件」里',
  importConfirm: '导入后会用备份里的进度替换现在的进度，确定吗？',
  imported: '备份已导入，进度恢复好了',
  importBad: '这个文件不是本软件导出的备份，换一个试试',
  creditsBtn: '声音来源',
  creditsTitle: '声音来源',
  creditsNote: '音标和例词的真人发音来自维基共享资源，按各自的授权使用',
  creditsAccent: { ipa: '音标示范', 'en-GB': '英式', 'en-US': '美式' },
  creditsAuthor: '录音人',
  creditsLoadFail: '声音来源清单没读出来，稍后再打开看看',
  homeTitle: '添加到主屏幕',
  homeSteps: [
    '用 Safari 打开本页',
    '点屏幕下方中间的「分享」按钮（方框带向上箭头）',
    '往下滑，点「添加到主屏幕」',
    '点右上角「添加」，桌面上就有图标了',
  ],
  homeNote: '以后从桌面图标打开，像 App 一样全屏使用',
};

// 屏幕最下面的分栏
export const TABS = [
  { key: 'home', icon: '🏠', label: '今天' },
  { key: 'phonics', icon: '🔤', label: '音标' },
  { key: 'nce', icon: '📖', label: '新概念' },
  { key: 'baby', icon: '👶', label: '宝宝' },
  { key: 'me', icon: '🙂', label: '我的' },
];

export const PHONICS_TAB = {
  title: '音标',
  intro: '点一下听读音，点下面「看卡片」看怎么发。颜色淡的是还没学到的',
  groups: { mono: '单元音', diph: '双元音', cons: '辅音' },
  groupCount: (n) => `${n} 个`,
  card: '看卡片',
  cardTitle: '音标卡片',
  notFound: '没找到这个音标，返回再选一个',
};

export const NCE_TAB = {
  title: '新概念',
  intro: '课文和录音在外研U学里听，这里是每课的重点词和句子',
  lesson: (n) => `第 ${n} 课`,
  today: '今天',
  doneMark: '✓',
  doneLabel: '学过了',
  notFound: '没找到这一课，返回再选一课',
};

export const BABY_TAB = {
  title: '宝宝',
  today: '今天对宝宝说',
  scenes: '生活场景',
  sceneCount: (n) => `${n} 句`,
  rhymes: '儿歌',
  rhymeLines: (n) => `${n} 行`,
  more: '›',
  notFound: '没找到这一页，返回再选一个',
};

export const ME = {
  title: '我的',
  week: '本周学习',
  weekNote: '实心圆 = 那天 5 项都做完了',
  progressTitle: '学到哪了',
  phonics: '音标',
  phonicsDay: (n) => `第 ${n} 天 / 共 21 天`,
  phonicsDone: '48 个全学完了',
  nce: '新概念',
  nceLesson: (n) => `第 ${n} 课 / 共 144 课`,
  nceDone: '144 课全学完了',
  settings: '设置',
  settingsSub: '提醒时间、新概念课号、备份、添加到主屏幕',
  credits: '声音来源',
  creditsSub: '真人发音是谁录的',
};
