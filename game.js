const assets = {
  home: "assets/images/9）首页标题图.png",
  mall: "assets/images/5）开场初见图（商场门口）.png",
  tea: "assets/images/6）奶茶店主场景图.png",
  teaBg: "assets/images/7）奶茶店背景图（无人版，可选）.png",
  night: "assets/images/8）结尾分别图（奶茶店门口  夜晚街边）.png",
  result: "assets/images/12）结果页背景图.png",
  default: "assets/images/1）米蛋儿公主默认立绘.png",
  happy: "assets/images/2）米蛋儿公主开心立绘.png",
  proud: "assets/images/3）米蛋儿公主傲娇立绘.png",
  angry: "assets/images/4）米蛋儿公主微微生气立绘.png",
};

const state = {
  mood: 50,
  heart: 20,
  teaCorrect: 0,
  node: "start",
  tapCount: 0,
  tapBonusUsed: false,
};

const els = {
  app: document.getElementById("app"),
  startScreen: document.getElementById("startScreen"),
  gameScreen: document.getElementById("gameScreen"),
  resultScreen: document.getElementById("resultScreen"),
  startBtn: document.getElementById("startBtn"),
  restartBtn: document.getElementById("restartBtn"),
  sceneBg: document.getElementById("sceneBg"),
  character: document.getElementById("character"),
  characterBtn: document.getElementById("characterBtn"),
  speaker: document.getElementById("speaker"),
  dialogText: document.getElementById("dialogText"),
  options: document.getElementById("options"),
  moodText: document.getElementById("moodText"),
  heartText: document.getElementById("heartText"),
  moodBar: document.getElementById("moodBar"),
  heartBar: document.getElementById("heartBar"),
  floatLayer: document.getElementById("floatLayer"),
};

const speakerClass = {
  "米蛋儿公主": "",
  系统: "system",
  我的内心: "inner",
  玩家: "player",
  店员: "system",
  旁白: "inner",
};

const scenes = {
  introMessage: {
    bg: "mall",
    character: null,
    lines: [
      ["米蛋儿公主", "我到了。"],
      ["系统", "警告。\n\n米蛋儿公主已经到了。"],
      ["系统", "你的约会考试，\n从这一秒正式开始。"],
    ],
    choices: [
      {
        text: "米蛋儿公主站着别动，我来接你。",
        mood: 10,
        heart: 5,
        lines: [
          ["系统", "不错。\n\n合格小宝贝第一守则：\n\n不能让米蛋儿公主找你，\n只能是你去找米蛋儿公主。"],
          ["米蛋儿公主", "那你快点。"],
        ],
        next: "firstMeet",
      },
      {
        text: "好的，我马上到！",
        mood: -10,
        shake: true,
        lines: [
          ["系统", "“马上到？”"],
          ["系统", "也就是说……\n\n米蛋儿公主到了，\n你居然还没到？"],
          ["米蛋儿公主", "你最好真的很快。"],
        ],
        next: "firstMeet",
      },
      {
        text: "米蛋儿公主在哪个出口呀？",
        mood: -5,
        lines: [
          ["米蛋儿公主", "你猜。"],
          ["系统", "⚠ 公主测试已经开始。"],
        ],
        next: "firstMeet",
      },
    ],
  },
  firstMeet: {
    bg: "mall",
    character: "default",
    enterHearts: true,
    lines: [
      ["我的内心", "……\n\n完了。"],
      ["我的内心", "米蛋儿公主今天\n怎么又比上次更好看了。"],
      ["我的内心", "世界上到底是谁允许\n米蛋儿公主这么漂亮的？"],
      ["我的内心", "算了。\n\n如果是米蛋儿公主的话，\n可以。"],
    ],
    choices: [
      {
        text: "米蛋儿公主今天好漂亮。",
        mood: 5,
        heart: 5,
        lines: [
          ["米蛋儿公主", "今天才漂亮？"],
          ["系统", "危险发言。\n\n好在米蛋儿公主今天心情不错。"],
        ],
        next: "goTea",
      },
      {
        text: "米蛋儿公主今天这一身特别适合你。",
        mood: 10,
        heart: 15,
        character: "happy",
        lines: [
          ["米蛋儿公主", "你居然看出来了？"],
          ["米蛋儿公主", "算你今天开局表现不错。"],
          ["系统", "🎉 米蛋儿公主夸你了！\n\n今日人生任务完成度：100%"],
        ],
        next: "goTea",
      },
      {
        text: "米蛋儿公主，小的今天有荣幸替你拿包吗？",
        mood: 10,
        heart: 5,
        character: "proud",
        lines: [
          ["米蛋儿公主", "这么自觉？"],
          ["米蛋儿公主", "给你吧。"],
          ["系统", "恭喜。\n\n成功获得：\n《米蛋儿公主今日拎包资格》"],
        ],
        next: "goTea",
      },
    ],
  },
  goTea: {
    bg: "mall",
    character: "default",
    lines: [["米蛋儿公主", "走吧。\n\n想喝奶茶了。"]],
    choices: [{ text: "陪米蛋儿公主去喝奶茶 ♡", next: "teaStart" }],
  },
  teaStart: {
    bg: "tea",
    character: "default",
    lines: [
      ["店员", "您好，请问喝点什么？"],
      ["米蛋儿公主", "你帮我点吧。"],
      ["系统", "来了。", "big"],
      ["系统", "这不是点奶茶。"],
      ["系统", "这是期末考试。"],
    ],
    choices: [{ text: "开始米蛋儿公主奶茶考试", next: "teaQ1" }],
  },
  teaQ1: {
    bg: "tea",
    character: "default",
    lines: [["系统", "米蛋儿公主喜欢喝什么？"]],
    choices: teaChoices(0, ["A. 茉莉奶绿", "B. 芋泥啵啵奶茶", "C. 杨枝甘露"], "teaQ2"),
  },
  teaQ2: {
    bg: "tea",
    character: "default",
    lines: [["系统", "甜度呢？"]],
    choices: teaChoices(1, ["A. 全糖", "B. 三分糖", "C. 不另外加糖"], "teaQ3"),
  },
  teaQ3: {
    bg: "tea",
    character: "default",
    lines: [["系统", "最后一个。\n\n米蛋儿公主要加什么？"]],
    choices: teaChoices(2, ["A. 珍珠", "B. 椰果", "C. 脆啵啵"], "teaResult"),
  },
  coldScene: {
    bg: "teaBg",
    character: "default",
    lines: [
      ["米蛋儿公主", "今天外面人好多。"],
      ["玩家", "还好我们找到位置了。"],
      ["旁白", "米蛋儿公主轻轻揉了一下手臂。"],
      ["系统", "你注意到了一个小动作。"],
    ],
    choices: [
      {
        text: "米蛋儿公主，是不是空调有点冷？",
        mood: 10,
        heart: 10,
        lines: [["米蛋儿公主", "有一点。"]],
        next: "coat",
      },
      {
        text: "要不要换个位置？",
        mood: 8,
        heart: 5,
        lines: [
          ["米蛋儿公主", "不用啦。"],
          ["米蛋儿公主", "你还挺细心。"],
        ],
        next: "chat",
      },
      {
        text: "我觉得还好呀。",
        mood: -15,
        heart: -10,
        shake: true,
        dim: true,
        lines: [
          ["系统", "……"],
          ["系统", "米蛋儿公主说冷。"],
          ["系统", "你说你觉得还好。"],
          ["系统", "请问谁问你了？"],
          ["米蛋儿公主", "哦。"],
          ["系统", "⚠ 高危信号：\n米蛋儿公主说“哦”。"],
        ],
        next: "chat",
      },
    ],
  },
  coat: {
    bg: "teaBg",
    character: "proud",
    lines: [],
    choices: [
      {
        text: "把外套给米蛋儿公主",
        heart: 10,
        lines: [
          ["米蛋儿公主", "你不冷吗？"],
          ["玩家", "米蛋儿公主冷比较重要。"],
          ["米蛋儿公主", "……"],
          ["米蛋儿公主", "嘴真甜。"],
          ["系统", "💗 心动暴击"],
        ],
        next: "chat",
      },
    ],
  },
  chat: {
    bg: "teaBg",
    character: "default",
    lines: [
      ["米蛋儿公主", "随便聊聊吧。"],
      ["系统", "“随便”。\n\n恋爱考试高频危险词汇。"],
    ],
    choices: [
      {
        text: "那我想听米蛋儿公主说说今天过得怎么样。",
        mood: 10,
        heart: 15,
        character: "proud",
        lines: [
          ["米蛋儿公主", "你今天怎么这么会说话？"],
          ["米蛋儿公主", "故意哄我开心？"],
          ["玩家", "哄米蛋儿公主开心，\n不是应该的吗？"],
          ["米蛋儿公主", "……"],
          ["米蛋儿公主", "油嘴滑舌。"],
          ["系统", "翻译：\n\n米蛋儿公主没有讨厌。"],
        ],
        next: "endingScene",
      },
      {
        text: "那我给米蛋儿公主讲个笑话。",
        mood: 5,
        heart: 3,
        lines: [
          ["米蛋儿公主", "你最好真的好笑。"],
          ["系统", "一分钟后。"],
          ["米蛋儿公主", "……"],
          ["米蛋儿公主", "你还是别讲了。"],
          ["玩家", "收到。"],
        ],
        next: "endingScene",
      },
      {
        text: "那我们安静坐一会儿也行。",
        mood: 3,
        heart: 5,
        lines: [
          ["米蛋儿公主", "也行。"],
          ["旁白", "窗外的人来来往往。\n\n米蛋儿公主坐在你对面，\n慢慢喝着奶茶。"],
          ["旁白", "好像什么都不说，\n也挺好的。"],
        ],
        next: "endingScene",
      },
    ],
  },
  endingScene: {
    bg: "night",
    character: "default",
    lines: [
      ["旁白", "喝完奶茶，\n天已经慢慢黑了。"],
      ["旁白", "你陪米蛋儿公主走到路口。"],
      ["米蛋儿公主", "今天……"],
      ["米蛋儿公主", "还行吧。"],
      ["系统", "《米蛋儿公主语言研究手册》\n实时翻译中……"],
      ["系统", "“还行吧”\n\n≈\n\n“其实我今天挺开心的。”"],
      ["米蛋儿公主", "你今天表现得还不错。"],
    ],
    choices: [
      {
        text: "因为对象是米蛋儿公主，我当然得认真。",
        heart: 10,
        lines: [["米蛋儿公主", "你还挺会说。"]],
        next: "result",
      },
      {
        text: "米蛋儿公主开心就好。",
        mood: 8,
        heart: 5,
        lines: [["米蛋儿公主", "就知道说好听的。"]],
        next: "result",
      },
      {
        text: "那下次还能约米蛋儿公主喝奶茶吗？",
        heart: 15,
        character: "proud",
        lines: [
          ["米蛋儿公主", "谁说下次只有奶茶了？"],
          ["米蛋儿公主", "……"],
          ["米蛋儿公主", "下次再看你表现吧。"],
          ["米蛋儿公主", "不过——"],
          ["米蛋儿公主", "下次不许迟到。"],
          ["系统", "💗 等一下。"],
          ["系统", "米蛋儿公主刚才是不是……"],
          ["系统", "默认还有下次？？？", "big"],
        ],
        hearts: true,
        next: "result",
      },
    ],
  },
};

function teaChoices(correctIndex, labels, next) {
  return labels.map((text, index) => ({
    text,
    mood: index === correctIndex ? 8 : -5,
    heart: index === correctIndex ? 5 : 0,
    teaCorrect: index === correctIndex,
    lines: [
      index === correctIndex
        ? ["系统", "米蛋儿公主的眼神看起来很平静。\n\n这通常意味着你答对了。"]
        : ["系统", "空气突然安静了一点点。\n\n你开始反思自己的人生。"],
    ],
    shake: index !== correctIndex,
    next,
  }));
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function resetState() {
  state.mood = 50;
  state.heart = 20;
  state.teaCorrect = 0;
  state.node = "start";
  state.tapCount = 0;
  state.tapBonusUsed = false;
  updateHud();
}

function updateHud() {
  els.moodText.textContent = state.mood;
  els.heartText.textContent = state.heart;
  els.moodBar.style.width = `${state.mood}%`;
  els.heartBar.style.width = `${state.heart}%`;
}

function applyDelta(choice) {
  const beforeMood = state.mood;
  const beforeHeart = state.heart;
  state.mood = clamp(state.mood + (choice.mood || 0));
  state.heart = clamp(state.heart + (choice.heart || 0));
  if (choice.teaCorrect) state.teaCorrect += 1;
  updateHud();
  showDelta("👑", state.mood - beforeMood, 72);
  showDelta("💗", state.heart - beforeHeart, 128);
}

function showDelta(icon, delta, top) {
  if (!delta) return;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = `${icon} ${delta > 0 ? "+" : ""}${delta}`;
  bubble.style.right = "26px";
  bubble.style.top = `${top}px`;
  els.floatLayer.appendChild(bubble);
  bubble.addEventListener("animationend", () => bubble.remove());
}

function setScene(node) {
  const scene = scenes[node];
  state.node = node;
  els.gameScreen.classList.remove("dim");
  if (scene.bg) {
    els.sceneBg.style.backgroundImage = `url("${assets[scene.bg]}")`;
  }
  if (scene.character === null) {
    els.characterBtn.classList.add("hidden");
  } else {
    els.characterBtn.classList.remove("hidden");
    if (scene.character) els.character.src = assets[scene.character];
  }
  if (scene.enterHearts) burstHearts(7);
  playLines(scene.lines || [], () => renderChoices(scene.choices || []));
}

function playLines(lines, done) {
  els.options.innerHTML = "";
  let index = 0;
  const advance = () => {
    if (index >= lines.length) {
      done();
      return;
    }
    const [speaker, text, mode] = lines[index];
    renderLine(speaker, text, mode);
    index += 1;
    els.options.innerHTML = "";
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = index >= lines.length ? "继续" : "下一句";
    btn.addEventListener("click", advance, { once: true });
    els.options.appendChild(btn);
  };
  advance();
}

function renderLine(speaker, text, mode) {
  els.speaker.textContent = speaker;
  els.speaker.className = `speaker ${speakerClass[speaker] || ""}`;
  els.dialogText.className = `dialog-text ${mode === "big" ? "big" : ""}`;
  els.dialogText.textContent = text;
}

function renderChoices(choices) {
  els.options.innerHTML = "";
  choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.text;
    btn.style.animation = `popIn 0.28s ease ${index * 0.06}s both`;
    btn.addEventListener("click", () => choose(choice));
    els.options.appendChild(btn);
  });
}

function choose(choice) {
  applyDelta(choice);
  if (choice.character) els.character.src = assets[choice.character];
  if (choice.shake) shake();
  if (choice.dim) {
    els.gameScreen.classList.add("dim");
    setTimeout(() => els.gameScreen.classList.remove("dim"), 900);
  }
  if (choice.hearts) burstHearts(12);
  playLines(choice.lines || [], () => {
    if (choice.next === "teaResult") {
      showTeaResult();
    } else if (choice.next === "result") {
      showResult();
    } else {
      setScene(choice.next);
    }
  });
}

function showTeaResult() {
  if (state.teaCorrect === 3) {
    state.mood = clamp(state.mood + 10);
    state.heart = clamp(state.heart + 15);
    updateHud();
    showDelta("👑", 10, 72);
    showDelta("💗", 15, 128);
    els.character.src = assets.happy;
    playLines(
      [
        ["米蛋儿公主", "嗯。"],
        ["米蛋儿公主", "不错嘛。"],
        ["米蛋儿公主", "居然真的记得。"],
        ["我的内心", "她说不错。"],
        ["我的内心", "米蛋儿公主说我不错。"],
        ["我的内心", "今晚不用睡了。\n\n我要把这句话拿出来\n反复回忆。"],
        ["系统", "💗 米蛋儿公主似乎有一点开心。"],
      ],
      () => renderChoices([{ text: "继续奶茶店约会", next: "coldScene" }])
    );
  } else if (state.teaCorrect === 2) {
    state.mood = clamp(state.mood + 5);
    updateHud();
    showDelta("👑", 5, 72);
    playLines(
      [
        ["米蛋儿公主", "还行。"],
        ["我的内心", "“还行”。"],
        ["系统", "根据《米蛋儿公主语言研究手册》，\n这已经属于积极评价。"],
      ],
      () => renderChoices([{ text: "继续奶茶店约会", next: "coldScene" }])
    );
  } else {
    els.character.src = assets.angry;
    playLines(
      [
        ["米蛋儿公主", "……"],
        ["米蛋儿公主", "我什么时候开始喝这个了？"],
        ["系统", "完了。"],
      ],
      () =>
        renderChoices([
          {
            text: "对不起米蛋儿公主，我马上重新买。",
            mood: 8,
            heart: 3,
            lines: [
              ["米蛋儿公主", "算啦。"],
              ["米蛋儿公主", "下次记清楚一点。"],
              ["系统", "虽然点错了。\n\n但认错速度尚可。"],
            ],
            next: "coldScene",
          },
          {
            text: "请米蛋儿公主再给笨蛋一次重新做人的机会。",
            mood: 5,
            heart: 5,
            character: "happy",
            lines: [
              ["米蛋儿公主", "噗。"],
              ["米蛋儿公主", "你真的很笨。"],
              ["我的内心", "米蛋儿公主笑了。\n\n这一波……\n\n好像也不算完全亏？"],
            ],
            next: "coldScene",
          },
        ])
    );
  }
}

function showResult() {
  els.gameScreen.classList.add("hidden");
  els.resultScreen.classList.remove("hidden");
  let ending;
  if (state.mood >= 80 && state.heart >= 75) {
    ending = {
      rank: "👑 S级结局",
      title: "《米蛋儿公主专属陪喝员》",
      name: "【米蛋儿公主专属陪喝员】",
      identity: "米蛋儿公主的 专属陪喝员 ♡",
      story:
        "米蛋儿公主：\n以后我想喝奶茶的时候……\n\n米蛋儿公主：\n你应该知道自己要出现吧？\n\n玩家：\n收到，米蛋儿公主。\n\n米蛋儿公主：\n真听话。",
    };
    burstHearts(28);
  } else if (state.mood >= 55) {
    ending = {
      rank: "💗 A级结局",
      title: "《今天表现尚可》",
      name: "【今天表现尚可】",
      identity: "米蛋儿公主的 头号小宝贝",
      story:
        "米蛋儿公主：\n今天还算听话。\n\n米蛋儿公主：\n继续保持。\n\n系统：\n恭喜你。\n成功保住米蛋儿公主头号小宝贝资格。",
    };
  } else {
    ending = {
      rank: "特殊结局",
      title: "《你还得再学学》",
      name: "【你还得再学学】",
      identity: "米蛋儿公主的 补考生",
      story:
        "米蛋儿公主：\n你今天怎么老是搞错。\n\n米蛋儿公主：\n回去好好复习。\n\n系统：\n本次米蛋儿公主约会考试暂未通过。\n但是米蛋儿公主允许你补考。",
    };
  }
  document.getElementById("endingRank").textContent = ending.rank;
  document.getElementById("endingTitle").textContent = ending.title;
  document.getElementById("endingName").textContent = ending.name;
  document.getElementById("endingStory").textContent = ending.story;
  document.getElementById("finalMood").textContent = state.mood;
  document.getElementById("finalHeart").textContent = state.heart;
  document.getElementById("finalIdentity").textContent = ending.identity;
  document.getElementById("princessReview").textContent = getReview();
}

function getReview() {
  if (state.heart >= 85) return "米蛋儿公主评价：\n“算你特别会哄人。”";
  if (state.heart >= 60) return "米蛋儿公主评价：\n“今天表现还不错。”";
  return "米蛋儿公主评价：\n“下次记清楚一点。”";
}

function shake() {
  els.app.classList.remove("shake");
  void els.app.offsetWidth;
  els.app.classList.add("shake");
}

function burstHearts(count) {
  for (let i = 0; i < count; i += 1) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = Math.random() > 0.25 ? "♡" : "💗";
      heart.style.left = `${12 + Math.random() * 76}vw`;
      heart.style.top = `${64 + Math.random() * 24}vh`;
      heart.style.animationDuration = `${1.1 + Math.random() * 1.3}s`;
      els.floatLayer.appendChild(heart);
      heart.addEventListener("animationend", () => heart.remove());
    }, i * 70);
  }
}

function startGame() {
  resetState();
  els.startScreen.classList.add("hidden");
  els.resultScreen.classList.add("hidden");
  els.gameScreen.classList.remove("hidden");
  setScene("introMessage");
}

els.startBtn.addEventListener("click", startGame);
els.restartBtn.addEventListener("click", () => {
  resetState();
  els.resultScreen.classList.add("hidden");
  els.startScreen.classList.remove("hidden");
});

els.characterBtn.addEventListener("click", () => {
  if (els.characterBtn.classList.contains("hidden")) return;
  state.tapCount += 1;
  const lines = ["干嘛？", "你一直点我干嘛？", "你好烦哦。", "再点一下试试？", "……\n\n笨蛋。"];
  renderLine("米蛋儿公主", lines[Math.min(state.tapCount - 1, lines.length - 1)]);
  if (state.tapCount >= 5 && !state.tapBonusUsed) {
    state.tapBonusUsed = true;
    state.heart = clamp(state.heart + 1);
    updateHud();
    showDelta("💗", 1, 128);
  }
});

updateHud();
