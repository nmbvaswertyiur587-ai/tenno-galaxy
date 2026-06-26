import * as THREE from "https://esm.sh/three@0.165.0";
import { OrbitControls } from "https://esm.sh/three@0.165.0/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "https://esm.sh/three@0.165.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://esm.sh/three@0.165.0/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://esm.sh/three@0.165.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "https://esm.sh/three@0.165.0/examples/jsm/postprocessing/ShaderPass.js";

const warframeRecords = [
  record("Excalibur", "圣剑", "starter", 10, "#dfe9ff", ["咖喱", "圣剑哥"], ["Excalibur Prime", "Excalibur Umbra", "Dex Excalibur", "Proto-Armor", "Zato"]),
  record("Ash", "灰烬之刃", "assassin", 10, "#aeb8c8", ["灰烬", "忍者甲"], ["Ash Prime", "Koga", "Shroud", "Bai Hu"]),
  record("Mag", "磁力", "starter", 8, "#75c7ff", ["磁妹"], ["Mag Prime", "Pneuma", "Alata", "Ferro", "Induction"]),
  record("Volt", "伏特", "starter", 9, "#8fd7ff", ["电男"], ["Volt Prime", "Proto Volt", "Amp", "Graxx", "Electrolyst"]),
  record("Rhino", "犀牛", "tank", 12, "#f2c76d", ["牛", "牛甲"], ["Rhino Prime", "Palatine", "Deathwatch", "Rubedo Plated", "Vojnik"]),
  record("Mesa", "圣枪弥撒", "gunslinger", 15, "#ffc85a", ["圣枪", "梅萨", "女枪"], ["Mesa Prime", "Mesa Heirloom", "Presidio", "Projectilyst", "Graxx"]),
  record("Jade", "翡翠", "support", 11, "#7fffc1", [], ["Jade Aureolt", "Jade Ophanim", "Jade Chorus", "Jade Canticle"]),
  record("Wisp", "幽灵", "support", 14, "#9a8cff", ["花妈"], ["Wisp Prime", "Wisp Dex", "Gaoth", "Delusion", "Somnium"]),
  record("Gauss", "高斯", "speed", 12, "#75c7ff", ["跑男"], ["Gauss Prime", "Agito", "Kresnik", "Graxx", "Altra"]),
  record("Protea", "普洛蒂亚", "engineer", 12, "#ff9d6e", ["工程妹"], ["Protea Prime", "Caladrius", "Technocron", "Mavv"]),
  record("Saryn", "萨琳", "nuke", 13, "#93f18a", ["毒妈"], ["Saryn Prime", "Orphid", "Napellus", "Integra", "Blade of the Lotus"]),
  record("Nova", "诺娃", "control", 11, "#d58cff", ["加速娃"], ["Nova Prime", "Atomica", "Asuri", "Visage", "Corpra"]),
  record("Nidus", "奈德斯", "infested", 10, "#b5de74", ["蛆甲"], ["Nidus Prime", "Phryke", "Technocyst", "Nighthunter"]),
  record("Harrow", "驱魔使者", "ritual", 10, "#d8d4c8", ["主教"], ["Harrow Prime", "Reliquary", "Crucis", "Hieropha"]),
  record("Khora", "克拉", "hunter", 11, "#ff7fa8", ["猫甲"], ["Khora Prime", "Miyabi", "Urushu", "Fiera"]),
  record("Revenant", "夜灵", "eidolon", 12, "#7df7d7", ["夜灵甲"], ["Revenant Prime", "Mephisto", "Wight", "Immortuos"]),
  record("Dante", "但丁", "scribe", 10, "#c9b8ff", [], ["Dante Cantist", "Dante Noctua", "Dante Chronicler"]),
  record("Dagath", "达伽特", "specter", 9, "#7db5ff", [], ["Dagath Ganceann", "Dagath Dullahan", "Dagath Wraith"]),
  record("Kullervo", "库勒沃", "duviri", 10, "#ff6969", [], ["Kullervo Usvah", "Kullervo Ahlto", "Kullervo Thorn"]),
  record("Voruna", "沃鲁娜", "hunter", 10, "#8fa0ff", [], ["Voruna Anukas", "Voruna Voidshell", "Voruna Raksh"]),
  record("Lavos", "拉沃斯", "alchemist", 9, "#f0a35d", [], ["Lavos Kuvael", "Lavos Yersin", "Lavos Cordatus"]),
  record("Sevagoth", "赛瓦格斯", "void", 11, "#8aa0ff", [], ["Sevagoth Prime", "Glaukus", "Lucifuge", "Liminus"]),
  record("Xaku", "扎库", "void", 12, "#ebe3c4", ["骨架"], ["Xaku Prime", "Kintsu", "Dehiscence", "Avarice"]),
  record("Yareli", "夜灵鲛姬", "k-drive", 9, "#70dfff", ["水妹"], ["Yareli Pandea", "Yareli Physalia", "Yareli Calamari"]),
  record("Citrine", "柠晶", "crystal", 10, "#ff8ac8", ["水晶"], ["Citrine Kalite", "Citrine Auralyst", "Citrine Geode"]),
  record("Atlas", "撼天刑者", "brawler", 10, "#d7b170", ["土甲"], ["Atlas Prime", "Karst", "Telamon", "Graxx"]),
  record("Banshee", "女妖", "sonic", 9, "#94d7ff", [], ["Banshee Prime", "Soprana", "Sonority", "Echo"]),
  record("Baruuk", "荒野猎手", "martial", 10, "#e6d8ae", [], ["Baruuk Prime", "Doan", "Meroe", "Graxx"]),
  record("Caliban", "卡利班", "sentient", 10, "#b8f0ff", [], ["Caliban Orfeo", "Caliban Cranion", "Caliban Sentient"]),
  record("Chroma", "龙甲", "dragon", 11, "#ff9b5d", [], ["Chroma Prime", "Dynasty", "Graxx", "Thyrus"]),
  record("Ember", "永恒烈焰", "fire", 11, "#ff7b4d", ["火鸡"], ["Ember Prime", "Ember Heirloom", "Pyraxis", "Vermillion", "Graxx"]),
  record("Equinox", "阴阳双子", "duality", 10, "#c9c0ff", ["阴阳"], ["Equinox Prime", "Antonym", "Clisthert", "Megaera"]),
  record("Frost", "冰雪寒霜", "ice", 10, "#a7e7ff", ["冰男"], ["Frost Prime", "Harka", "Zastruga", "Grognak"]),
  record("Gara", "琉璃仕女", "glass", 10, "#c7f7ff", [], ["Gara Prime", "Kaleida", "Zamariu", "Virago"]),
  record("Garuda", "迦楼罗", "gore", 10, "#ff5f75", [], ["Garuda Prime", "Hinsa", "Successor", "Bathory"]),
  record("Grendel", "暴食", "tank", 10, "#b6d474", [], ["Grendel Prime", "Nian", "Glutt", "Moloch"]),
  record("Gyre", "旋涡", "electric", 10, "#72f0ff", [], ["Gyre Automaton", "Gyre Kuvael", "Gyre Rotorswell"]),
  record("Hildryn", "希尔德琳", "shield", 10, "#8fe0ff", [], ["Hildryn Prime", "Sigrun", "Asuron", "Einheri"]),
  record("Hydroid", "惊涛骇浪", "water", 10, "#66b7ff", ["水男"], ["Hydroid Prime", "Rakkam", "Triton", "Poseidon"]),
  record("Ivara", "吟游猎手", "hunter", 10, "#9bffce", [], ["Ivara Prime", "Skathi", "Youkai", "Zirastra"]),
  record("Limbo", "灵薄狱", "rift", 10, "#7d8fff", [], ["Limbo Prime", "Limina", "Vistyx", "Graxx"]),
  record("Loki", "洛基", "trickster", 10, "#b6ff9d", [], ["Loki Prime", "Knave", "Incubus", "Erebus"]),
  record("Mirage", "幻影装置", "illusion", 10, "#ffd27a", [], ["Mirage Prime", "Oneiro", "Trivelin", "Joli"]),
  record("Nekros", "亡灵梦魇", "necromancer", 11, "#b8d0cc", [], ["Nekros Prime", "Irkalla", "Lazarus", "Graxx"]),
  record("Nezha", "哪吒", "firewalker", 10, "#ffae73", [], ["Nezha Prime", "Empyrean", "Yaksha", "Jinza"]),
  record("Nyx", "灵化", "psychic", 9, "#b89cff", [], ["Nyx Prime", "Pasithea", "Nemesis", "Aurelia"]),
  record("Oberon", "圣骑士", "paladin", 10, "#b8f189", [], ["Oberon Prime", "Feyarch", "Blade of the Lotus", "Destrier"]),
  record("Octavia", "音乐甲", "music", 10, "#da8cff", ["音乐妹"], ["Octavia Prime", "Diva", "Maestra", "Youkai"]),
  record("Qorvex", "科维克斯", "concrete", 10, "#f0c886", [], ["Qorvex Raxpart", "Qorvex Muridae", "Qorvex Crucible"]),
  record("Styanax", "斯巴达", "hoplite", 10, "#89b6ff", [], ["Styanax Tonatiuh", "Styanax Gerousic", "Styanax Agogean"]),
  record("Titania", "蝶甲", "pixie", 10, "#ffa7d2", [], ["Titania Prime", "Empress", "Mab", "Unseelie"]),
  record("Trinity", "三位一体", "healer", 10, "#e8f1ff", ["奶妈"], ["Trinity Prime", "Strega", "Knightess", "Gersemi"]),
  record("Valkyr", "瓦尔基里", "berserker", 10, "#ff8c83", ["猫女"], ["Valkyr Prime", "Valkyr Heirloom", "Gersemi", "Carnivex", "Leonessa"]),
  record("Vauban", "工程统帅", "engineer", 10, "#9dd8ff", [], ["Vauban Prime", "Citadel", "Graxx", "Suppa"]),
  record("Wukong", "齐天大圣", "trickster", 12, "#ffd36a", ["猴子"], ["Wukong Prime", "Samadhi", "Macak", "Xingzhe"]),
  record("Zephyr", "狂啸西风", "air", 10, "#9ee7ff", ["鸟姐"], ["Zephyr Prime", "Harrier", "Hagoromo", "Strafe"])
];

const warframes = warframeRecords.map(toNode);

const weapons = [
  node("Skana", "melee", 8, "#dfe9ff", ["Skana Prime", "Prisma Skana", "Mordred Skin", "Day of the Dead"]),
  node("Braton", "rifle", 9, "#75c7ff", ["Braton Prime", "Braton Vandal", "Conclave Skin", "Nocturne Skin"]),
  node("Paris", "bow", 8, "#9a8cff", ["Paris Prime", "Abra Skin", "Dryad Skin", "Day of the Dead"]),
  node("Boltor", "rifle", 10, "#7fffc1", ["Boltor Prime", "Telos Boltor", "Bravura Skin", "Incarnon Adapter"]),
  node("Soma", "rifle", 11, "#f2c76d", ["Soma Prime", "Soma Vandal", "Huntsman Skin", "Incarnon Adapter"]),
  node("Lex", "pistol", 10, "#ff9d6e", ["Lex Prime", "Aklex Prime", "Conclave Skin", "Incarnon Adapter"]),
  node("Nikana", "melee", 12, "#ff6f9f", ["Nikana Prime", "Dragon Nikana", "Ryu Skin", "Gemini Skin"]),
  node("Tigris", "shotgun", 10, "#f2c76d", ["Tigris Prime", "Sancti Tigris", "Elixis Skin", "Tekelu Skin"]),
  node("Phenmor", "incarnon", 12, "#7fffc1", ["Incarnon Form", "Void Shell", "Zariman Finish"]),
  node("Laetum", "incarnon", 12, "#9a8cff", ["Incarnon Form", "Zariman Finish", "Protocol Finish"]),
  node("Praedos", "incarnon", 11, "#75c7ff", ["Incarnon Form", "Zariman Finish", "Voidcarver Finish"]),
  node("Kuva Bramma", "kuva", 11, "#ff6969", ["Kuva Variant", "Towsun Skin", "Festive Skin"]),
  node("Tenet Arca Plasmor", "tenet", 12, "#75c7ff", ["Tenet Variant", "Shock-Camo Skin", "Corpus Finish"]),
  node("Glaive", "melee", 10, "#dfe9ff", ["Glaive Prime", "Proto-Glaive Skin", "Orvius Echo"])
];

const categories = {
  prime: ["prime"],
  deluxe: ["presidio", "palatine", "atomica", "mephisto", "phryke", "urushu", "asuri", "caladrius", "glaukus"],
  heirloom: ["heirloom"],
  tennogen: ["graxx", "corpra", "kuvael", "blade of the lotus", "somnium", "projectilyst"],
  incarnon: ["incarnon"]
};

const detailCatalog = {
  "Mesa/Mesa Prime": {
    status: "公共资料已核对",
    verified: true,
    release: "2018-12-18（国际服）",
    acquisition: "虚空遗物轮换 / Prime Resurgence",
    copy: "Mesa Prime 是圣枪弥撒的 Prime 变体。这里优先展示可追溯的公共资料，具体轮换仍以游戏内与官方公告为准。",
    image: "https://wiki.warframe.com/w/Special:Redirect/file/MesaPrime.png",
    source: "https://wiki.warframe.com/w/Mesa_Prime"
  },
  "Mesa/Mesa Heirloom": {
    status: "待官方复核",
    verified: false,
    release: "尚未录入可靠日期",
    acquisition: "尚未录入可靠获取方式",
    copy: "该节点先保留为星图概念样板。由于当前无法稳定访问官方资料，暂不把传闻或推测写成正式信息。",
    image: "",
    source: ""
  },
  "Mesa/Presidio": {
    status: "公共资料已核对",
    verified: true,
    release: "豪华外观",
    acquisition: "游戏内商城 / 对应豪华组合包",
    copy: "Presidio 是圣枪弥撒的豪华外观节点，详情卡保留素材来源与获取类型，方便后续接入官方国服名称和商城状态。",
    image: "https://wiki.warframe.com/w/Special:Redirect/file/MesaPresidioSkin.png",
    source: "https://wiki.warframe.com/w/Mesa_Presidio_Skin"
  },
  "Mesa/Projectilyst": {
    status: "公共资料已核对",
    verified: true,
    release: "TennoGen 外观",
    acquisition: "对应平台 TennoGen 商店",
    copy: "Projectilyst 是社区创作者制作的 TennoGen 外观。可用性与价格会因平台和地区不同而变化。",
    image: "https://wiki.warframe.com/w/Special:Redirect/file/MesaProjectilystSkin.png",
    source: "https://wiki.warframe.com/w/Mesa_Projectilyst_Skin"
  },
  "Mesa/Graxx": {
    status: "公共资料已核对",
    verified: true,
    release: "TennoGen 外观",
    acquisition: "对应平台 TennoGen 商店",
    copy: "Graxx 是圣枪弥撒的 TennoGen 外观节点，归入 Graxx 系列视觉语言。平台上架情况以游戏内商店为准。",
    image: "https://wiki.warframe.com/w/Special:Redirect/file/MesaGraxxSkin.png",
    source: "https://wiki.warframe.com/w/Mesa_Graxx_Skin"
  }
};

const categoryAcquisition = {
  prime: "虚空遗物轮换 / Prime Resurgence",
  deluxe: "游戏内商城 / 对应豪华组合包",
  heirloom: "以官方公告与游戏内商城为准",
  tennogen: "对应平台 TennoGen 商店",
  incarnon: "钢铁之路轮换 / 对应灵化系统",
  variant: "以游戏内具体物品说明为准"
};

const nameTranslations = {
  Excalibur: "圣剑", Ash: "灰烬之刃", Mag: "磁力", Volt: "伏特", Rhino: "犀牛", Mesa: "圣枪弥撒",
  Jade: "翡翠", Wisp: "幽灵", Gauss: "高斯", Protea: "普洛蒂亚", Saryn: "萨琳",
  Nova: "诺娃", Nidus: "奈德斯", Harrow: "驱魔使者", Khora: "克拉", Revenant: "夜灵",
  Dante: "但丁", Dagath: "达伽特", Kullervo: "库勒沃", Voruna: "沃鲁娜", Lavos: "拉沃斯",
  Sevagoth: "赛沃格斯", Xaku: "扎库", Yareli: "夜灵鲛姬", Citrine: "柠晶",
  Skana: "空刃", Braton: "布莱顿", Paris: "帕里斯", Boltor: "螺钉步枪", Soma: "索玛",
  Lex: "雷克斯", Nikana: "侍刃", Tigris: "猛虎", Phenmor: "费摩", Laetum: "拉托姆",
  Praedos: "逐枭", "Kuva Bramma": "赤毒·布拉玛", "Tenet Arca Plasmor": "信条·弧电离子枪",
  Glaive: "战刃"
};

const nameAliases = {
  Excalibur: ["咖喱棒", "圣剑哥"], Ash: ["灰烬", "忍者甲"], Mag: ["磁妹"], Volt: ["电男"], Rhino: ["牛", "犀牛甲"],
  Mesa: ["圣枪", "梅萨", "女枪"], Wisp: ["花妈"], Gauss: ["跑男"], Protea: ["工程妹"], Saryn: ["毒妈"],
  Nova: ["诺娃", "加速娃"], Nidus: ["蛆甲"], Harrow: ["主教"], Khora: ["猫甲"],
  Revenant: ["夜灵甲"], Xaku: ["骨架"], Yareli: ["水妹"], Citrine: ["水晶甲"],
  "Kuva Bramma": ["赤毒弓"], "Tenet Arca Plasmor": ["信条喷子"], Glaive: ["飞盘"]
};

const variantTranslations = {
  Prime: "Prime版", Heirloom: "传家宝", Incarnon: "灵化", Adapter: "适配器",
  Skin: "外观", Variant: "变体", Form: "形态", Finish: "涂装", Vandal: "破坏者",
  Kuva: "赤毒", Tenet: "信条", Prisma: "棱晶", Dex: "周年庆", Umbra: "暗影"
};

Object.assign(nameTranslations, Object.fromEntries(warframeRecords.map((item) => [item.name, item.cn]).filter(([, cn]) => cn)));
Object.assign(nameAliases, Object.fromEntries(warframeRecords.map((item) => [item.name, item.aliases]).filter(([, aliases]) => aliases.length)));
Object.assign(categoryAcquisition, {
  prime: "虚空遗物轮换 / Prime Resurgence",
  deluxe: "游戏内商城 / 对应豪华组合包",
  heirloom: "以官方公告与游戏内商城为准",
  tennogen: "对应平台 TennoGen 商店",
  incarnon: "钢铁之路轮换 / 对应灵化系统",
  variant: "以游戏内具体物品说明为准"
});
Object.assign(detailCatalog, {
  "Mesa/Mesa Prime": {
    status: "公共资料已核对",
    verified: true,
    release: "2018-12-18（国际服）",
    acquisition: "虚空遗物轮换 / Prime Resurgence",
    copy: "Mesa Prime 是圣枪弥撒的 Prime 变体。这里优先展示可追溯的公共资料，具体轮换仍以游戏内与官方公告为准。",
    image: "https://wiki.warframe.com/w/Special:Redirect/file/MesaPrime.png",
    source: "https://wiki.warframe.com/w/Mesa_Prime"
  },
  "Mesa/Mesa Heirloom": {
    status: "待官方复核",
    verified: false,
    release: "待录入可靠日期",
    acquisition: "以官方公告与游戏内商城为准",
    copy: "该节点先保留为星图概念样板。没有核对到稳定官方资料前，不把传闻或推测写成正式信息。",
    image: "",
    source: ""
  },
  "Mesa/Presidio": {
    status: "公共资料已核对",
    verified: true,
    release: "豪华外观",
    acquisition: "游戏内商城 / 对应豪华组合包",
    copy: "Presidio 是圣枪弥撒的豪华外观节点，详情卡保留素材来源与获取类型，方便后续接入国服名称和商城状态。",
    image: "https://wiki.warframe.com/w/Special:Redirect/file/MesaPresidioSkin.png",
    source: "https://wiki.warframe.com/w/Mesa_Presidio_Skin"
  },
  "Mesa/Projectilyst": {
    status: "公共资料已核对",
    verified: true,
    release: "TennoGen 外观",
    acquisition: "对应平台 TennoGen 商店",
    copy: "Projectilyst 是社区创作者制作的 TennoGen 外观。可用性与价格会因平台和地区不同而变化。",
    image: "https://wiki.warframe.com/w/Special:Redirect/file/MesaProjectilystSkin.png",
    source: "https://wiki.warframe.com/w/Mesa_Projectilyst_Skin"
  },
  "Mesa/Graxx": {
    status: "公共资料已核对",
    verified: true,
    release: "TennoGen 外观",
    acquisition: "对应平台 TennoGen 商店",
    copy: "Graxx 是圣枪弥撒的 TennoGen 外观节点，归入 Graxx 系列视觉语言。平台上架情况以游戏内商店为准。",
    image: "https://wiki.warframe.com/w/Special:Redirect/file/MesaGraxxSkin.png",
    source: "https://wiki.warframe.com/w/Mesa_Graxx_Skin"
  }
});
Object.assign(variantTranslations, {
  Prime: "Prime版",
  Heirloom: "传家宝",
  Incarnon: "灵化",
  Adapter: "适配器",
  Skin: "外观",
  Variant: "变体",
  Form: "形态",
  Finish: "涂装",
  Vandal: "破坏者",
  Kuva: "赤毒",
  Tenet: "信条",
  Prisma: "棱晶",
  Dex: "周年庆",
  Umbra: "暗影"
});

function record(name, cn, category, weight, color, aliases, children, meta = {}) {
  return { name, cn, category, weight, color, aliases, children, meta };
}

function toNode(item) {
  return node(item.name, item.category, item.weight, item.color, item.children, {
    cn: item.cn,
    aliases: item.aliases,
    dataStatus: item.meta.dataStatus || "待国服官方复核"
  });
}

function node(name, category, weight, color, children, meta = {}) {
  return { name, category, weight, color, children, ...meta };
}

function getChineseName(name) {
  if (nameTranslations[name]) return nameTranslations[name];

  const root = Object.keys(nameTranslations)
    .sort((a, b) => b.length - a.length)
    .find((candidate) => name.startsWith(`${candidate} `));
  if (root) {
    const remainder = name.slice(root.length + 1);
    const translatedRemainder = remainder
      .split(" ")
      .map((part) => variantTranslations[part] || part)
      .join("·");
    return `${nameTranslations[root]}·${translatedRemainder}`;
  }

  const translated = name
    .split(" ")
    .map((part) => variantTranslations[part] || part)
    .join("·");
  return translated !== name.replaceAll(" ", "·") ? translated : "";
}

function formatName(name) {
  const chinese = getChineseName(name);
  return chinese ? `${name} · ${chinese}` : name;
}

function getNameSearchText(name) {
  return [name, getChineseName(name), ...(nameAliases[name] || [])].join(" ").toLowerCase();
}

function renderDataAudit() {
  if (!els.dataAudit) return;

  const totalWarframes = warframes.length;
  const totalSkins = warframes.reduce((sum, item) => sum + item.children.length, 0);
  const missingCn = warframes.filter((item) => !getChineseName(item.name)).length;
  const explicitEntries = Object.keys(detailCatalog).length;
  const pendingEntries = warframes.flatMap((item) => item.children.map((child) => `${item.name}/${child}`))
    .filter((key) => !detailCatalog[key]).length;
  const imageReady = warframes.flatMap((item) => item.children.map((child) => detailCatalog[`${item.name}/${child}`]))
    .filter((entry) => entry?.image || entry?.images?.length).length;

  els.dataAudit.innerHTML = `
    <div class="audit-title">
      <span>资料完整度</span>
      <strong>第一版</strong>
    </div>
    <div class="audit-grid">
      <span><b>${totalWarframes}</b> 战甲</span>
      <span><b>${totalSkins}</b> 行星</span>
      <span><b>${explicitEntries}</b> 已细化</span>
      <span><b>${imageReady}</b> 有图源</span>
    </div>
    <p>${pendingEntries} 个节点仍使用自动候选图源；${missingCn} 个战甲缺中文名。国服译名优先，未核对项会保留待复核状态。</p>
  `;
}

const canvas = document.querySelector("#galaxy");
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05070a, 0.0075);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 900);
camera.position.set(0, 42, 98);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
const qualityPixelRatio = Math.min(window.devicePixelRatio, 1.5);
renderer.setPixelRatio(qualityPixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.96;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.minDistance = 24;
controls.maxDistance = 180;
controls.zoomSpeed = 1.15;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.28;

controls.addEventListener("start", () => {
  targetCamera = null;
  targetLook = null;
});

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.12, 0.72, 0.09);
composer.addPass(bloom);
const warpPass = new ShaderPass({
  uniforms: {
    tDiffuse: { value: null },
    intensity: { value: 0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float intensity;
    varying vec2 vUv;
    void main() {
      vec2 center = vec2(0.5);
      vec2 delta = vUv - center;
      float radius = length(delta);
      vec2 direction = radius > 0.001 ? delta / radius : vec2(0.0);
      vec2 smear = direction * intensity * 0.038 * smoothstep(0.08, 0.82, radius);
      vec3 color = vec3(0.0);
      color.r = texture2D(tDiffuse, vUv + smear * 1.15).r;
      color.g = texture2D(tDiffuse, vUv + smear * 0.2).g;
      color.b = texture2D(tDiffuse, vUv - smear).b;
      color += texture2D(tDiffuse, vUv - smear * 0.45).rgb * intensity * 0.18;
      float core = exp(-radius * 8.0) * intensity * 0.22;
      gl_FragColor = vec4(color + vec3(core * 0.65, core, core * 0.9), 1.0);
    }
  `
});
warpPass.enabled = false;
composer.addPass(warpPass);

const galaxyRoot = new THREE.Group();
scene.add(galaxyRoot);

const ambient = new THREE.AmbientLight(0x8fb6ff, 0.22);
scene.add(ambient);

const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const tempWorldPosition = new THREE.Vector3();
const clickable = [];
const systems = [];
const nebulaClouds = [];
const farBeacons = [];
const planetTextureCache = new Map();
let connectionMesh = null;
let activeGalaxy = "warframes";
let activeFilter = "all";
let zoomDistance = null;
let selected = null;
let focusedSystem = null;
let focusModeMix = 0;
let cinema = false;
let cinemaTime = 0;
let targetCamera = null;
let targetLook = null;
let galaxyTransition = null;
let warpField = null;
let warpTunnel = null;
let warpFlash = null;
let controlsCollapsed = false;
let detailCollapsed = false;
let clickCandidate = null;
const activePointers = new Set();

const els = {
  objectList: document.querySelector("#objectList"),
  searchInput: document.querySelector("#searchInput"),
  resetView: document.querySelector("#resetView"),
  exitSystem: document.querySelector("#exitSystem"),
  systemExit: document.querySelector("#systemExit"),
  cinemaMode: document.querySelector("#cinemaMode"),
  detailType: document.querySelector("#detailType"),
  detailName: document.querySelector("#detailName"),
  detailCopy: document.querySelector("#detailCopy"),
  detailCategory: document.querySelector("#detailCategory"),
  detailChildren: document.querySelector("#detailChildren"),
  detailWeight: document.querySelector("#detailWeight"),
  detailTags: document.querySelector("#detailTags"),
  detailMedia: document.querySelector("#detailMedia"),
  detailImage: document.querySelector("#detailImage"),
  detailMediaFallback: document.querySelector("#detailMediaFallback"),
  detailFallbackMark: document.querySelector("#detailFallbackMark"),
  detailStatus: document.querySelector("#detailStatus"),
  toggleControls: document.querySelector("#toggleControls"),
  toggleDetail: document.querySelector("#toggleDetail"),
  mobileControlTitle: document.querySelector("#mobileControlTitle"),
  detailFacts: document.querySelector("#detailFacts"),
  detailRelease: document.querySelector("#detailRelease"),
  detailAcquisition: document.querySelector("#detailAcquisition"),
  detailSource: document.querySelector("#detailSource"),
  dataAudit: document.querySelector("#dataAudit"),
  warframeCount: document.querySelector("#warframeCount"),
  skinCount: document.querySelector("#skinCount"),
  weaponCount: document.querySelector("#weaponCount")
};

els.warframeCount.textContent = warframes.length;
els.skinCount.textContent = warframes.reduce((sum, item) => sum + item.children.length, 0);
els.weaponCount.textContent = weapons.length;
els.searchInput.placeholder = "搜索 圣枪弥撒 / 灰烬之刃 / Mesa";
renderDataAudit();

function setControlsCollapsed(collapsed) {
  controlsCollapsed = collapsed;
  document.body.classList.toggle("controls-collapsed", collapsed);
  if (els.toggleControls) {
    els.toggleControls.textContent = collapsed ? "展开" : "收起";
    els.toggleControls.setAttribute("aria-label", collapsed ? "展开搜索面板" : "收起搜索面板");
  }
}

function setDetailCollapsed(collapsed) {
  detailCollapsed = collapsed;
  document.body.classList.toggle("detail-collapsed", collapsed);
  if (els.toggleDetail) {
    els.toggleDetail.textContent = collapsed ? "展开" : "收起";
    els.toggleDetail.setAttribute("aria-label", collapsed ? "展开详情" : "收起详情");
  }
}

function updateMobileControlTitle() {
  if (!els.mobileControlTitle) return;
  if (focusedSystem) {
    els.mobileControlTitle.textContent = `${formatName(focusedSystem.userData.item.name)} 轨道`;
  } else {
    els.mobileControlTitle.textContent = activeGalaxy === "warframes" ? "战甲星系" : "武器星系";
  }
}

const flareTexture = createRadialTexture(["rgba(255,255,255,1)", "rgba(180,220,255,0.42)", "rgba(80,140,255,0)"]);
const dustTexture = createRadialTexture(["rgba(255,255,255,0.75)", "rgba(170,210,255,0.16)", "rgba(255,255,255,0)"]);

createStarfield();
createNebulaMist();
createNavigationGrid();
createGalacticCore();
createWarpField();
buildGalaxy();
renderList();
updateDetail(null);
animate();

function createStarfield() {
  const count = 1900;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < count; i += 1) {
    const radius = 70 + Math.random() * 290;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi) * 0.48;
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    color.setHSL(0.54 + Math.random() * 0.2, 0.48 + Math.random() * 0.35, 0.58 + Math.random() * 0.34);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.72,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    map: dustTexture,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  scene.add(new THREE.Points(geometry, material));
}

function createNebulaMist() {
  const palettes = [
    ["#7fffc1", "#ff6f9f", "#f9e7aa"],
    ["#75c7ff", "#9a8cff", "#ffffff"],
    ["#f2c76d", "#ff8ac8", "#a9fff0"]
  ];

  palettes.forEach((palette, layer) => {
    const count = 260;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i += 1) {
      const arm = (i % 4) * Math.PI * 0.5 + layer * 0.42;
      const t = i / count;
      const radius = 10 + Math.pow(t, 0.68) * (62 + layer * 24);
      const angle = arm + t * 8.2 + (Math.random() - 0.5) * 0.9;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * (12 + layer * 5);
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 9;
      color.set(palette[i % palette.length]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = 7 + Math.random() * 22;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    const material = new THREE.PointsMaterial({
      size: 10,
      map: dustTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    material.userData.baseOpacity = 0.14;
    const cloud = new THREE.Points(geometry, material);
    cloud.rotation.y = layer * 0.8;
    cloud.userData = { drift: 0.0003 + layer * 0.00018 };
    nebulaClouds.push(cloud);
    scene.add(cloud);
  });
}

function createNavigationGrid() {
  const grid = new THREE.Group();
  [24, 48, 72].forEach((radius, index) => {
    const points = [];
    for (let i = 0; i <= 240; i += 1) {
      const angle = (i / 240) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, -4.5, Math.sin(angle) * radius));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: index === 1 ? 0x7fffc1 : 0x75c7ff,
      transparent: true,
      opacity: index === 1 ? 0.055 : 0.035,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    grid.add(new THREE.LineLoop(geometry, material));
  });
  grid.rotation.x = -0.035;
  scene.add(grid);
}

function createGalacticCore() {
  const core = new THREE.Group();
  const colors = ["#ffffff", "#7fffc1", "#ff6f9f", "#f2c76d"];
  colors.forEach((color, index) => {
    const sprite = createFlare(color, 20 + index * 10, 0.1 - index * 0.014);
    sprite.position.set(index * 0.8 - 1.4, index * 0.25, index * -0.6);
    core.add(sprite);
  });
  core.position.set(0, -2, 0);
  core.scale.set(1.25, 0.38, 1);
  scene.add(core);
}

function createWarpField() {
  const positions = [];
  const colors = [];
  const color = new THREE.Color();

  for (let i = 0; i < 260; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2.5 + Math.pow(Math.random(), 0.55) * 38;
    const z = -12 - Math.random() * 92;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.58;
    const stretch = 4 + Math.random() * 18;
    positions.push(x, y, z, x * 1.06, y * 1.06, z + stretch);
    color.setHSL(0.48 + Math.random() * 0.22, 0.66, 0.68 + Math.random() * 0.25);
    colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false
  });
  warpField = new THREE.LineSegments(geometry, material);
  warpField.frustumCulled = false;
  camera.add(warpField);

  warpTunnel = new THREE.Group();
  const ringGeometry = new THREE.TorusGeometry(1, 0.012, 5, 96);
  for (let index = 0; index < 18; index += 1) {
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: index % 3 === 0 ? 0xf2c76d : (index % 2 ? 0x7fffc1 : 0x75c7ff),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    const radius = 4.8 + index * 0.82;
    ring.scale.set(radius, radius * 0.58, 1);
    ring.position.z = -10 - index * 4.4;
    ring.rotation.z = index * 0.23;
    ring.userData = { lane: index, baseZ: ring.position.z };
    warpTunnel.add(ring);
  }
  camera.add(warpTunnel);

  warpFlash = createFlare("#d8fff2", 18, 0);
  warpFlash.position.z = -9;
  warpFlash.material.depthTest = false;
  camera.add(warpFlash);
  scene.add(camera);
}

function buildGalaxy() {
  focusedSystem = null;
  els.systemExit.classList.remove("visible");
  clearGroup(galaxyRoot);
  clickable.length = 0;
  systems.length = 0;
  farBeacons.length = 0;
  selected = null;

  const data = getVisibleData();
  const radius = activeGalaxy === "warframes" ? 42 : 34;
  const arms = activeGalaxy === "warframes" ? 3 : 2;

  const nodesPerArm = Math.ceil(data.length / arms);
  data.forEach((item, index) => {
    const arm = index % arms;
    const step = Math.floor(index / arms);
    const progress = step / Math.max(1, nodesPerArm - 1);
    const lane = 9 + progress * radius;
    const angle = arm * (Math.PI * 2 / arms) + progress * 5.35 + Math.sin(index * 2.17) * 0.1;
    const position = new THREE.Vector3(
      Math.cos(angle) * lane,
      Math.sin(index * 1.83) * 3.8,
      Math.sin(angle) * lane
    );
    createSystem(item, position, index, arm, lane);
  });

  createSpiralLines(arms, radius);
  createConnections(arms);
}

function createSystem(item, position, index, arm, lane) {
  const system = new THREE.Group();
  system.position.copy(position);
  system.userData = { item, arm, lane };
  galaxyRoot.add(system);
  systems.push(system);

  const star = createStarBody(item.color, 1.5 + item.weight * 0.12, item.name);
  star.userData = { item, kind: "star", system };
  system.add(star);
  clickable.push(star);

  const light = new THREE.PointLight(item.color, 1.8, 34);
  system.add(light);

  const flare = createFlare(item.color, 7.5 + item.weight * 0.75, 0.32);
  flare.userData = { pulse: 0.45 + index * 0.07 };
  system.add(flare);

  const beaconGeometry = new THREE.BufferGeometry();
  beaconGeometry.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0], 3));
  const beaconMaterial = new THREE.PointsMaterial({
    color: item.color,
    size: 2.15 + item.weight * 0.12,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0.72,
    map: flareTexture,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false
  });
  const beacon = new THREE.Points(beaconGeometry, beaconMaterial);
  beacon.userData = { phase: index * 0.83, baseSize: beaconMaterial.size };
  system.add(beacon);
  farBeacons.push(beacon);

  const label = createLabel(item.name, item.color);
  label.position.set(0, 4.6 + item.weight * 0.15, 0);
  system.add(label);

  item.children.forEach((child, childIndex) => {
    const orbitRadius = 4.3 + childIndex * 1.28 + item.weight * 0.06;
    const orbit = createOrbit(orbitRadius, item.color);
    orbit.rotation.x = Math.PI / 2 + (childIndex % 2) * 0.18;
    orbit.rotation.z = childIndex * 0.35;
    system.add(orbit);

    const planet = createPlanetBody(
      planetColor(child),
      0.42 + childIndex * 0.025,
      classifyPlanet(child),
      child,
      item.name
    );
    const phase = childIndex * 1.48 + index * 0.38;
    planet.position.set(Math.cos(phase) * orbitRadius, Math.sin(childIndex) * 0.38, Math.sin(phase) * orbitRadius);
    planet.userData = { item: childNode(child, item), parent: item, kind: "planet", orbitRadius, phase, speed: 0.18 + childIndex * 0.018 };
    system.add(planet);
    const planetFlare = createFlare(planetColor(child), 1.55 + childIndex * 0.12, 0.075);
    planet.add(planetFlare);
    const planetLabel = createPlanetLabel(child, planetColor(child));
    planetLabel.position.set(0, 1.2 + childIndex * 0.025, 0);
    planet.add(planetLabel);
    clickable.push(planet);
  });
}

function createGlowSphere(color, size, emissiveIntensity) {
  const geometry = new THREE.SphereGeometry(size, 32, 18);
  const material = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity,
    roughness: 0.36,
    metalness: 0.18,
    transparent: true,
    opacity: 1
  });
  material.userData.visualKind = "bodySurface";
  material.userData.baseEmissive = emissiveIntensity;
  const mesh = new THREE.Mesh(geometry, material);

  const glowGeometry = new THREE.SphereGeometry(size * 1.9, 32, 18);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  glowMaterial.userData.visualKind = "bodyGlow";
  glowMaterial.userData.baseOpacity = 0.16;
  mesh.add(new THREE.Mesh(glowGeometry, glowMaterial));
  return mesh;
}

function createStarBody(color, size, name) {
  const star = createGlowSphere(color, size, 1.7);

  if (name === "Mesa") {
    star.material.dispose();
    star.material = createMesaPlasmaMaterial(color);
  }

  const coronaGeometry = new THREE.SphereGeometry(size * 1.42, 32, 20);
  const coronaMaterial = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.09,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  coronaMaterial.userData.visualKind = "bodyGlow";
  coronaMaterial.userData.baseOpacity = 0.09;
  star.add(new THREE.Mesh(coronaGeometry, coronaMaterial));

  [0, 1].forEach((ringIndex) => {
    const geometry = new THREE.TorusGeometry(size * (1.42 + ringIndex * 0.2), size * 0.018, 8, 96);
    const material = new THREE.MeshBasicMaterial({
      color: ringIndex ? 0xffffff : color,
      transparent: true,
      opacity: ringIndex ? 0.2 : 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    material.userData.baseOpacity = material.opacity;
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.set(Math.PI * (0.26 + ringIndex * 0.2), ringIndex * 0.9, ringIndex * 0.45);
    ring.userData = {
      visualKind: "energyRing",
      rotationSpeed: ringIndex ? -0.0032 : 0.0022
    };
    star.add(ring);
  });

  return star;
}

function createMesaPlasmaMaterial(color) {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      baseColor: { value: new THREE.Color(color) },
      intensity: { value: 1 },
      opacity: { value: 1 }
    },
    vertexShader: `
      uniform float time;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        float wave = sin(position.y * 4.8 + time * 1.7)
          * sin(position.x * 3.6 - time * 1.15)
          * 0.035;
        vec3 displaced = position + normal * wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform float intensity;
      uniform float opacity;
      varying vec3 vNormal;
      varying vec3 vPosition;

      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
          f.z
        );
      }

      void main() {
        vec3 flow = vPosition * 2.4 + vec3(time * 0.22, -time * 0.31, time * 0.18);
        float plasma = noise(flow) * 0.62 + noise(flow * 2.15) * 0.38;
        float bands = 0.5 + 0.5 * sin(vPosition.y * 8.0 + plasma * 7.0 - time * 1.2);
        float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.3);
        vec3 gold = vec3(1.0, 0.62, 0.16);
        vec3 jade = vec3(0.25, 1.0, 0.72);
        vec3 color = mix(baseColor * 0.72, gold * 1.06, plasma * 0.5);
        color = mix(color, jade, bands * 0.22);
        color += smoothstep(0.58, 0.94, plasma) * vec3(1.0, 0.82, 0.38) * 0.48;
        color += fresnel * vec3(0.45, 0.86, 1.0) * 0.72;
        gl_FragColor = vec4(color * intensity, opacity);
      }
    `,
    transparent: true
  });
  material.userData.visualKind = "mesaPlasma";
  return material;
}

function createPlanetSurfaceTexture(color, category, name) {
  const cacheKey = `${category}|${color}|${name}`;
  if (planetTextureCache.has(cacheKey)) return planetTextureCache.get(cacheKey);

  const canvasTexture = document.createElement("canvas");
  const width = 256;
  const height = 128;
  canvasTexture.width = width;
  canvasTexture.height = height;
  const ctx = canvasTexture.getContext("2d");
  const seed = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const random = (index) => {
    const value = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };
  const palettes = {
    prime: ["#111719", "#f3ead5", "#d8aa4d"],
    heirloom: ["#061a16", "#239775", "#b7ffe1"],
    deluxe: ["#130d1b", color, "#ff8ac8"],
    tennogen: ["#10141b", color, "#ff9d6e"],
    incarnon: ["#090817", "#6f5ee8", "#b9fff4"],
    skin: ["#111722", color, "#c9d8ff"]
  };
  const palette = palettes[category] || palettes.skin;

  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, palette[0]);
  background.addColorStop(0.48, palette[1]);
  background.addColorStop(1, palette[0]);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = "screen";
  for (let index = 0; index < 14; index += 1) {
    const y = 9 + index * 14 + (random(index) - 0.5) * 8;
    ctx.beginPath();
    ctx.moveTo(-18, y);
    ctx.bezierCurveTo(width * 0.25, y - 15, width * 0.72, y + 20, width + 18, y - 4);
    ctx.strokeStyle = `${palette[2]}${Math.round((0.12 + random(index + 20) * 0.18) * 255).toString(16).padStart(2, "0")}`;
    ctx.lineWidth = category === "heirloom" ? 2 : 1;
    ctx.stroke();
  }

  if (category === "prime") {
    ctx.strokeStyle = "rgba(255,220,132,0.72)";
    ctx.lineWidth = 2;
    for (let index = 0; index < 7; index += 1) {
      ctx.beginPath();
      ctx.ellipse(28 + index * 58, height / 2, 18 + random(index + 80) * 13, 74, index * 0.22, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (category === "heirloom") {
    ctx.strokeStyle = "rgba(166,255,220,0.82)";
    ctx.lineWidth = 2.4;
    for (let index = 0; index < 8; index += 1) {
      const x = 18 + index * 51;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 17, 48);
      ctx.lineTo(x - 7, 105);
      ctx.lineTo(x + 15, height);
      ctx.stroke();
    }
  } else if (category === "deluxe") {
    ctx.fillStyle = "rgba(255,138,200,0.2)";
    ctx.strokeStyle = "rgba(255,215,240,0.48)";
    for (let index = 0; index < 9; index += 1) {
      const x = index * 48 - 14;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 58, 0);
      ctx.lineTo(x + 28, height);
      ctx.lineTo(x - 26, height);
      ctx.closePath();
      if (index % 2 === 0) ctx.fill();
      ctx.stroke();
    }
  } else if (category === "tennogen") {
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    for (let y = 2; y < height; y += 6) ctx.fillRect(0, y, width, 1);
    ctx.strokeStyle = "rgba(255,157,110,0.64)";
    ctx.lineWidth = 3;
    for (let index = -2; index < 9; index += 1) {
      ctx.beginPath();
      ctx.moveTo(index * 58, height);
      ctx.lineTo(index * 58 + 96, 0);
      ctx.stroke();
    }
  } else if (category === "incarnon") {
    ctx.strokeStyle = "rgba(185,255,244,0.9)";
    ctx.lineWidth = 2.5;
    for (let index = 0; index < 11; index += 1) {
      const startX = random(index + 140) * width;
      ctx.beginPath();
      ctx.moveTo(startX, height / 2);
      ctx.lineTo(startX + (random(index + 160) - 0.5) * 42, height * 0.28);
      ctx.lineTo(startX + (random(index + 180) - 0.5) * 70, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(startX, height / 2);
      ctx.lineTo(startX + (random(index + 200) - 0.5) * 48, height * 0.74);
      ctx.lineTo(startX + (random(index + 220) - 0.5) * 76, height);
      ctx.stroke();
    }
  }

  for (let index = 0; index < 72; index += 1) {
    const x = random(index + 260) * width;
    const y = random(index + 340) * height;
    const radius = 0.35 + random(index + 420) * 1.8;
    ctx.fillStyle = `rgba(255,255,255,${0.05 + random(index + 500) * 0.18})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvasTexture);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  planetTextureCache.set(cacheKey, texture);
  return texture;
}

function createLegacyPlanetSurfaceTexture(color, category, name) {
  const canvasTexture = document.createElement("canvas");
  canvasTexture.width = 512;
  canvasTexture.height = 256;
  const ctx = canvasTexture.getContext("2d");
  const base = new THREE.Color(color);
  const seed = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const random = (index) => {
    const value = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  const gradient = ctx.createLinearGradient(0, 0, 512, 256);
  gradient.addColorStop(0, `#${base.clone().multiplyScalar(0.22).getHexString()}`);
  gradient.addColorStop(0.48, `#${base.clone().multiplyScalar(0.72).getHexString()}`);
  gradient.addColorStop(1, `#${base.clone().multiplyScalar(0.3).getHexString()}`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 256);

  ctx.globalCompositeOperation = "screen";
  for (let index = 0; index < 18; index += 1) {
    const y = 14 + index * 14 + (random(index) - 0.5) * 9;
    ctx.beginPath();
    ctx.moveTo(-20, y);
    ctx.bezierCurveTo(130, y - 18, 350, y + 22, 540, y - 6);
    ctx.strokeStyle = category === "prime"
      ? `rgba(255, 218, 120, ${0.12 + random(index + 20) * 0.2})`
      : `rgba(185, 235, 255, ${0.07 + random(index + 20) * 0.16})`;
    ctx.lineWidth = category === "heirloom" ? 2.2 : 1.1;
    ctx.stroke();
  }

  for (let index = 0; index < 90; index += 1) {
    const x = random(index + 80) * 512;
    const y = random(index + 180) * 256;
    const radius = 0.4 + random(index + 280) * 2.4;
    ctx.fillStyle = `rgba(255,255,255,${0.06 + random(index + 380) * 0.2})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  if (category === "heirloom" || category === "incarnon") {
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = category === "heirloom" ? "rgba(127,255,193,0.75)" : "rgba(166,145,255,0.78)";
    ctx.lineWidth = 3;
    for (let index = 0; index < 7; index += 1) {
      ctx.beginPath();
      const x = 45 + index * 72;
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 22, 72);
      ctx.lineTo(x - 8, 150);
      ctx.lineTo(x + 18, 256);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvasTexture);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return texture;
}

function createPlanetBody(color, size, category, name, parentName) {
  const properties = {
    prime: { metalness: 0.82, roughness: 0.2, clearcoat: 1 },
    deluxe: { metalness: 0.35, roughness: 0.32, clearcoat: 0.9 },
    heirloom: { metalness: 0.56, roughness: 0.24, clearcoat: 1 },
    tennogen: { metalness: 0.28, roughness: 0.46, clearcoat: 0.55 },
    incarnon: { metalness: 0.64, roughness: 0.18, clearcoat: 1 },
    skin: { metalness: 0.22, roughness: 0.58, clearcoat: 0.38 }
  }[category] || { metalness: 0.22, roughness: 0.58, clearcoat: 0.38 };

  const geometry = new THREE.SphereGeometry(size, 32, 24);
  const planetEmissive = category === "incarnon"
    ? 0.46
    : (category === "prime" || category === "heirloom" ? 0.34 : 0.22);
  const material = new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: planetEmissive,
    metalness: properties.metalness,
    roughness: properties.roughness,
    clearcoat: properties.clearcoat,
    clearcoatRoughness: 0.2,
    transparent: true,
    opacity: 1
  });
  material.userData.visualKind = "planetSurface";
  material.userData.baseEmissive = material.emissiveIntensity;
  material.userData.surfaceSpec = { color, category, name, size };
  const planet = new THREE.Mesh(geometry, material);

  const atmosphereMaterial = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: category === "heirloom" ? 0.16 : 0.08,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  atmosphereMaterial.userData.visualKind = "planetAtmosphere";
  atmosphereMaterial.userData.baseOpacity = atmosphereMaterial.opacity;
  planet.add(new THREE.Mesh(new THREE.SphereGeometry(size * 1.16, 28, 20), atmosphereMaterial));

  if (category === "prime" || category === "incarnon") {
    const ringColor = category === "prime" ? 0xffd978 : 0xb8a8ff;
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: ringColor,
      transparent: true,
      opacity: 0.62,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    ringMaterial.userData.baseOpacity = 0.62;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(size * 1.45, size * 0.035, 7, 64), ringMaterial);
    ring.rotation.x = category === "prime" ? Math.PI * 0.42 : Math.PI * 0.5;
    ring.rotation.y = category === "incarnon" ? Math.PI * 0.48 : 0;
    ring.userData = { visualKind: "planetAccent", rotationSpeed: category === "incarnon" ? 0.006 : 0.002 };
    planet.add(ring);
  }

  if (category === "heirloom") {
    for (let index = 0; index < 3; index += 1) {
      const fragment = new THREE.Mesh(
        new THREE.TetrahedronGeometry(size * 0.14),
        new THREE.MeshBasicMaterial({ color: 0xbfffe4, transparent: true, opacity: 0.72 })
      );
      fragment.material.userData.baseOpacity = 0.72;
      const angle = index * Math.PI * 2 / 3;
      fragment.position.set(Math.cos(angle) * size * 1.45, (index - 1) * size * 0.34, Math.sin(angle) * size * 1.45);
      fragment.userData = { visualKind: "heirloomFragment", rotationSpeed: 0.008 + index * 0.002 };
      planet.add(fragment);
    }
  }

  if (category === "deluxe") {
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8ac8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    shellMaterial.userData.baseOpacity = 0.22;
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(size * 1.22, 1), shellMaterial);
    shell.userData = { visualKind: "planetAccent", rotationSpeed: -0.0035 };
    planet.add(shell);
  }

  if (category === "tennogen") {
    for (let index = 0; index < 2; index += 1) {
      const scanMaterial = new THREE.MeshBasicMaterial({
        color: index ? 0xff9d6e : 0x8fd7ff,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      scanMaterial.userData.baseOpacity = 0.42;
      const scan = new THREE.Mesh(new THREE.TorusGeometry(size * (1.22 + index * 0.16), size * 0.025, 6, 48), scanMaterial);
      scan.rotation.set(Math.PI * (0.35 + index * 0.18), index * 0.8, 0);
      scan.userData = { visualKind: "planetAccent", rotationSpeed: index ? -0.004 : 0.005 };
      planet.add(scan);
    }
  }

  return planet;
}

function setSystemPlanetDetail(system, enabled) {
  if (!system) return;
  system.children
    .filter((child) => child.userData.kind === "planet")
    .forEach((planet) => {
      const material = planet.material;
      const spec = material.userData.surfaceSpec;
      if (!spec) return;

      if (enabled) {
        const texture = createPlanetSurfaceTexture(spec.color, spec.category, spec.name);
        material.map = texture;
        material.bumpMap = spec.category === "prime" || spec.category === "deluxe" ? texture : null;
        material.emissiveMap = spec.category === "heirloom" || spec.category === "incarnon" ? texture : null;
        material.bumpScale = spec.size * 0.045;
        material.color.set(0xffffff);
      } else {
        material.map = null;
        material.bumpMap = null;
        material.emissiveMap = null;
        material.color.set(spec.color);
      }
      material.needsUpdate = true;
    });
}

function createFlare(color, size, opacity) {
  const material = new THREE.SpriteMaterial({
    map: flareTexture,
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const sprite = new THREE.Sprite(material);
  material.userData.baseOpacity = opacity;
  sprite.userData.visualKind = "flare";
  sprite.scale.set(size, size, 1);
  return sprite;
}

function createOrbit(radius, color) {
  const points = [];
  for (let i = 0; i <= 160; i += 1) {
    const angle = (i / 160) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.17 });
  material.userData.baseOpacity = 0.17;
  const orbit = new THREE.Line(geometry, material);
  orbit.userData.visualKind = "orbit";
  return orbit;
}

function createSpiralLines(arms, radiusLimit) {
  for (let arm = 0; arm < arms; arm += 1) {
    const points = [];
    for (let i = 0; i <= 180; i += 1) {
      const progress = i / 180;
      const radius = 9 + progress * radiusLimit;
      const angle = arm * (Math.PI * 2 / arms) + progress * 5.35;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, -1.4, Math.sin(angle) * radius));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: arm % 2 === 0 ? 0x75c7ff : 0x7fffc1,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const line = new THREE.Line(geometry, material);
    line.userData.visualKind = "galaxyArm";
    material.userData.baseOpacity = 0.16;
    galaxyRoot.add(line);
  }
}

function createConnections(arms) {
  if (systems.length < 2) return;
  connectionMesh = new THREE.Group();

  for (let arm = 0; arm < arms; arm += 1) {
    const laneSystems = systems
      .filter((system) => system.userData.arm === arm)
      .sort((a, b) => a.userData.lane - b.userData.lane);

    for (let index = 0; index < laneSystems.length - 1; index += 1) {
      const source = laneSystems[index].position;
      const target = laneSystems[index + 1].position;
      const midpoint = source.clone().lerp(target, 0.5);
      midpoint.y += 2.2 + arm * 0.45;
      const curve = new THREE.QuadraticBezierCurve3(source, midpoint, target);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(28));
      const material = new THREE.LineBasicMaterial({
        color: arm % 2 === 0 ? 0x9adfff : 0xa2ffd4,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const route = new THREE.Line(geometry, material);
      route.userData.visualKind = "route";
      material.userData.baseOpacity = 0.22;
      connectionMesh.add(route);
    }
  }
  galaxyRoot.add(connectionMesh);
}

function createLabel(text, color) {
  const canvasLabel = document.createElement("canvas");
  canvasLabel.width = 640;
  canvasLabel.height = 176;
  const ctx = canvasLabel.getContext("2d");
  const chinese = getChineseName(text);
  ctx.clearRect(0, 0, 640, 176);
  ctx.font = `600 ${text.length > 18 ? 29 : 36}px Microsoft YaHei, Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const englishWidth = ctx.measureText(text).width;
  ctx.font = "500 27px Microsoft YaHei, Arial";
  const chineseWidth = chinese ? ctx.measureText(chinese).width : 0;
  const textWidth = Math.min(570, Math.max(englishWidth, chineseWidth) + 72);
  const left = (640 - textWidth) / 2;
  const right = left + textWidth;
  const top = 20;
  const bottom = 156;
  const radius = 18;
  ctx.beginPath();
  ctx.moveTo(left + radius, top);
  ctx.lineTo(right - radius, top);
  ctx.quadraticCurveTo(right, top, right, top + radius);
  ctx.lineTo(right, bottom - radius);
  ctx.quadraticCurveTo(right, bottom, right - radius, bottom);
  ctx.lineTo(left + radius, bottom);
  ctx.quadraticCurveTo(left, bottom, left, bottom - radius);
  ctx.lineTo(left, top + radius);
  ctx.quadraticCurveTo(left, top, left + radius, top);
  ctx.closePath();
  ctx.fillStyle = "rgba(3, 7, 13, 0.78)";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 8;
  ctx.fillStyle = "rgba(247, 251, 255, 0.98)";
  ctx.font = `600 ${text.length > 18 ? 29 : 36}px Microsoft YaHei, Arial`;
  ctx.fillText(text, 320, chinese ? 66 : 88);
  if (chinese) {
    ctx.shadowBlur = 4;
    ctx.fillStyle = "rgba(207, 224, 241, 0.92)";
    ctx.font = "500 27px Microsoft YaHei, Arial";
    ctx.fillText(chinese, 320, 116);
  }
  const texture = new THREE.CanvasTexture(canvasLabel);
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.94,
    depthTest: false,
    depthWrite: false
  });
  const sprite = new THREE.Sprite(material);
  sprite.userData.visualKind = "label";
  sprite.userData.baseScale = new THREE.Vector2(10.6, 2.9);
  sprite.renderOrder = 20;
  sprite.scale.set(10.6, 2.9, 1);
  return sprite;
}

function createPlanetLabel(text, color) {
  const label = createLabel(text, color);
  label.userData.visualKind = "planetLabel";
  label.userData.baseScale.multiplyScalar(0.58);
  label.scale.set(label.userData.baseScale.x, label.userData.baseScale.y, 1);
  label.material.opacity = 0;
  return label;
}

function createRadialTexture(stops) {
  const canvasTexture = document.createElement("canvas");
  canvasTexture.width = 256;
  canvasTexture.height = 256;
  const ctx = canvasTexture.getContext("2d");
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  stops.forEach((stop, index) => gradient.addColorStop(index / (stops.length - 1), stop));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvasTexture);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function planetColor(name) {
  const lower = name.toLowerCase();
  if (lower.includes("prime")) return "#f2c76d";
  if (lower.includes("heirloom")) return "#7fffc1";
  if (lower.includes("incarnon")) return "#9a8cff";
  if (categories.deluxe.some((keyword) => lower.includes(keyword))) return "#ff8ac8";
  if (categories.tennogen.some((keyword) => lower.includes(keyword))) return "#ff9d6e";
  if (lower.includes("kuva")) return "#ff6969";
  if (lower.includes("tenet")) return "#75c7ff";
  if (lower.includes("graxx") || lower.includes("corpra")) return "#ff9d6e";
  return "#c9d8ff";
}

function classifyPlanet(name) {
  const lower = name.toLowerCase();
  if (lower.includes("prime")) return "prime";
  if (lower.includes("heirloom")) return "heirloom";
  if (lower.includes("incarnon")) return "incarnon";
  if (categories.deluxe.some((keyword) => lower.includes(keyword))) return "deluxe";
  if (categories.tennogen.some((keyword) => lower.includes(keyword))) return "tennogen";
  return "skin";
}

function childNode(name, parent) {
  const lower = name.toLowerCase();
  let category = "skin";
  if (lower.includes("prime")) category = "prime";
  if (lower.includes("heirloom")) category = "heirloom";
  if (lower.includes("incarnon")) category = "incarnon";
  if (categories.deluxe.some((keyword) => lower.includes(keyword))) category = "deluxe";
  if (categories.tennogen.some((keyword) => lower.includes(keyword))) category = "tennogen";
  if (lower.includes("kuva")) category = "kuva";
  if (lower.includes("tenet")) category = "tenet";
  return {
    name,
    category,
    weight: Math.max(3, Math.round(parent.weight * 0.48)),
    color: planetColor(name),
    children: [],
    parent: parent.name
  };
}

function getVisibleData() {
  const source = activeGalaxy === "warframes" ? warframes : weapons;
  const query = els.searchInput.value.trim().toLowerCase();
  return source.filter((item) => {
    const matchesQuery = !query
      || getNameSearchText(item.name).includes(query)
      || item.children.some((child) => getNameSearchText(child).includes(query));
    const matchesFilter = activeFilter === "all" || item.children.some((child) => categoryMatch(child, activeFilter));
    return matchesQuery && matchesFilter;
  });
}

function categoryMatch(name, filter) {
  const needles = categories[filter] || [filter];
  const lower = name.toLowerCase();
  return needles.some((needle) => lower.includes(needle));
}

function renderList() {
  els.objectList.innerHTML = "";
  updateMobileControlTitle();

  if (focusedSystem) {
    const parent = focusedSystem.userData.item;
    const query = els.searchInput.value.trim().toLowerCase();
    const orbitals = parent.children
      .filter((name) => !query || getNameSearchText(name).includes(query))
      .filter((name) => activeFilter === "all" || categoryMatch(name, activeFilter));

    const context = document.createElement("div");
    context.className = "list-context";
    context.innerHTML = `
      <div><strong>${formatName(parent.name)}</strong><span>${orbitals.length} 个皮肤行星</span></div>
      <div class="list-context-actions">
        <button type="button" data-list-action="overview">返回列表</button>
        <button type="button" data-list-action="reset">总星图</button>
      </div>
    `;
    context.querySelector('[data-list-action="overview"]').addEventListener("click", leaveFocusedSystem);
    context.querySelector('[data-list-action="reset"]').addEventListener("click", resetCamera);
    els.objectList.appendChild(context);

    orbitals.forEach((name) => {
      const data = childNode(name, parent);
      const button = document.createElement("button");
      button.innerHTML = `<span><span class="node-title">${formatName(name)}</span><span class="node-meta">${data.category} · 轨道行星</span></span><span style="color:${data.color}">●</span>`;
      button.addEventListener("click", () => {
        const planet = focusedSystem.children.find((child) => child.userData.item?.name === name);
        if (planet) selectObject(planet);
      });
      els.objectList.appendChild(button);
    });
    return;
  }

  const data = getVisibleData();
  data.forEach((item) => {
    const button = document.createElement("button");
    button.innerHTML = `<span><span class="node-title">${formatName(item.name)}</span><span class="node-meta">${item.category} · ${item.children.length} 个轨道节点</span></span><span style="color:${item.color}">●</span>`;
    button.addEventListener("click", () => focusByName(item.name));
    els.objectList.appendChild(button);
  });
}

function updateDetail(nodeData) {
  resetDetailMedia();
  document.body.classList.toggle("has-selection", Boolean(nodeData));
  if (!nodeData) {
    els.detailType.textContent = activeGalaxy === "warframes" ? "WARFRAME GALAXY" : "WEAPON GALAXY";
    els.detailName.textContent = activeGalaxy === "warframes" ? "战甲星系" : "武器星系";
    els.detailCopy.textContent = "恒星代表装备本体，行星代表它的皮肤、变体、特殊形态。拖动星图探索，点击节点进入对应轨道。";
    els.detailCategory.textContent = "Atlas";
    els.detailChildren.textContent = getVisibleData().length;
    els.detailWeight.textContent = "Live";
    els.detailTags.innerHTML = "";
    return;
  }

  const isPlanet = !nodeData.children.length && nodeData.parent;
  const catalogEntry = getDetailEntry(nodeData, isPlanet);
  els.detailType.textContent = isPlanet ? "ORBITAL SKIN" : activeGalaxy === "warframes" ? "WARFRAME STAR" : "WEAPON STAR";
  els.detailName.textContent = formatName(nodeData.name);
  els.detailCopy.textContent = catalogEntry?.copy || (isPlanet
    ? `${nodeData.name} 是 ${nodeData.parent} 轨道上的外观节点，后续可以接入上线时间、获取方式、预览图和玩家配色。`
    : `${nodeData.name} 是这个星系中的一颗恒星，周围行星代表它的 Prime、Deluxe、Heirloom、TennoGen 或特殊外观。`);
  els.detailCategory.textContent = nodeData.category;
  els.detailChildren.textContent = nodeData.children.length || "1";
  els.detailWeight.textContent = nodeData.weight;
  const tags = nodeData.children.length ? nodeData.children : [nodeData.parent, nodeData.category];
  els.detailTags.innerHTML = tags.map((tag) => `<span>${formatName(tag)}</span>`).join("");

  showDetailMedia(nodeData, catalogEntry);
}

function getDetailEntry(nodeData, isPlanet) {
  if (!isPlanet) {
    const compactName = nodeData.name.replaceAll(" ", "");
    return {
      status: "公共资料入口",
      verified: false,
      release: "战甲本体",
      acquisition: "查看对应任务、商店或游戏内说明",
      images: [`${compactName}.png`, `${compactName}Full.png`].map(wikiImageUrl),
      source: `https://wiki.warframe.com/w/Special:Search?search=${encodeURIComponent(nodeData.name)}`
    };
  }

  const explicit = detailCatalog[`${nodeData.parent}/${nodeData.name}`];
  if (explicit) return explicit;

  const compactName = nodeData.name.replaceAll(" ", "");
  const compactParent = nodeData.parent.replaceAll(" ", "");
  const fileStem = nodeData.name.startsWith(nodeData.parent)
    ? compactName
    : `${compactParent}${compactName}`;
  const imageSuffix = nodeData.category === "prime" || nodeData.name.includes("Umbra") ? ".png" : "Skin.png";
  const categoryLabel = {
    prime: "Prime 变体",
    deluxe: "豪华外观",
    heirloom: "传家宝外观",
    tennogen: "TennoGen 外观",
    incarnon: "灵化形态"
  }[nodeData.category] || "特殊外观 / 变体";

  return {
    status: "公共资料待核对",
    verified: false,
    release: categoryLabel,
    acquisition: categoryAcquisition[nodeData.category] || categoryAcquisition.variant,
    copy: `${nodeData.name} 是 ${formatName(nodeData.parent)} 星系中的${categoryLabel}节点。当前已接入公共资料入口，具体国服名称、时间与获取状态仍需逐项核对。`,
    images: [
      `${fileStem}${imageSuffix}`,
      `${compactName}Full.png`,
      `${fileStem}Full.png`
    ].map(wikiImageUrl),
    source: `https://wiki.warframe.com/w/Special:Search?search=${encodeURIComponent(`${nodeData.parent} ${nodeData.name}`)}`
  };
}

function wikiImageUrl(fileName) {
  return `https://wiki.warframe.com/w/Special:Redirect/file/${encodeURIComponent(fileName)}`;
}

function resetDetailMedia() {
  els.detailMedia.hidden = true;
  els.detailMedia.classList.remove("has-image");
  els.detailImage.removeAttribute("src");
  els.detailImage.alt = "";
  els.detailFacts.hidden = true;
  els.detailSource.hidden = true;
  els.detailSource.removeAttribute("href");
}

function showDetailMedia(nodeData, entry) {
  const detail = entry || {
    status: "资料待补充",
    verified: false,
    release: "待补充",
    acquisition: "待补充",
    image: "",
    source: ""
  };
  els.detailMedia.hidden = false;
  els.detailFacts.hidden = false;
  els.detailFallbackMark.textContent = nodeData.name.slice(0, 1).toUpperCase();
  els.detailStatus.textContent = detail.status;
  els.detailStatus.classList.toggle("verified", detail.verified);
  els.detailRelease.textContent = detail.release;
  els.detailAcquisition.textContent = detail.acquisition;

  const imageCandidates = detail.images || (detail.image ? [detail.image] : []);
  if (imageCandidates.length) {
    let candidateIndex = 0;
    els.detailImage.alt = `${formatName(nodeData.name)} 资料预览`;
    els.detailImage.onload = () => els.detailMedia.classList.add("has-image");
    els.detailImage.onerror = () => {
      candidateIndex += 1;
      if (candidateIndex < imageCandidates.length) {
        els.detailImage.src = imageCandidates[candidateIndex];
      } else {
        els.detailMedia.classList.remove("has-image");
      }
    };
    els.detailImage.src = imageCandidates[candidateIndex];
  }

  if (detail.source) {
    els.detailSource.hidden = false;
    els.detailSource.href = detail.source;
  }
}

function focusByName(name) {
  const hit = clickable.find((mesh) => mesh.userData.item?.name === name || mesh.userData.parent?.name === name);
  if (!hit) return;
  selectObject(hit);
}

function leaveFocusedSystem() {
  if (focusedSystem) setSystemPlanetDetail(focusedSystem, false);
  focusedSystem = null;
  selected = null;
  els.systemExit.classList.remove("visible");
  controls.minDistance = 24;
  controls.autoRotate = true;
  targetCamera = new THREE.Vector3(0, 42, 98);
  targetLook = new THREE.Vector3(0, 0, 0);
  zoomDistance = null;
  renderList();
  updateDetail(null);
}

function selectObject(object) {
  const data = object.userData.item;
  selected = object;
  const nextSystem = object.userData.kind === "planet" ? object.parent : object.userData.system;
  if (focusedSystem && focusedSystem !== nextSystem) setSystemPlanetDetail(focusedSystem, false);
  focusedSystem = nextSystem;
  setSystemPlanetDetail(focusedSystem, true);
  els.systemExit.classList.add("visible");
  renderList();
  updateDetail(data);
  setDetailCollapsed(false);
  if (window.matchMedia("(max-width: 820px)").matches) setControlsCollapsed(true);
  const world = new THREE.Vector3();
  object.getWorldPosition(world);
  targetLook = world.clone();
  if (object.userData.kind === "planet") {
    controls.minDistance = 5;
    const systemWorld = new THREE.Vector3();
    object.parent.getWorldPosition(systemWorld);
    const outward = world.clone().sub(systemWorld).normalize();
    targetCamera = world.clone().add(outward.multiplyScalar(10.5)).add(new THREE.Vector3(0, 3.2, 0));
  } else {
    controls.minDistance = 12;
    targetCamera = world.clone().add(new THREE.Vector3(0, 9, 20));
  }
  controls.autoRotate = false;
}

function clearGroup(group) {
  while (group.children.length) {
    const child = group.children.pop();
    child.traverse((obj) => {
      obj.geometry?.dispose?.();
      if (Array.isArray(obj.material)) obj.material.forEach((mat) => mat.dispose?.());
      else obj.material?.dispose?.();
    });
  }
}

function onPointerDown(event) {
  activePointers.add(event.pointerId);
  clickCandidate = null;
  if (event.target.closest("button, input, .panel")) return;
  if (activePointers.size > 1) return;

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(clickable, true);
  const hit = intersects.find((entry) => entry.object.userData.item);
  if (!hit) return;

  clickCandidate = {
    object: hit.object,
    pointerId: event.pointerId,
    pointerType: event.pointerType,
    x: event.clientX,
    y: event.clientY,
    startedAt: performance.now(),
    moved: false
  };
}

function onPointerMove(event) {
  if (!clickCandidate || clickCandidate.pointerId !== event.pointerId) return;
  const distance = Math.hypot(event.clientX - clickCandidate.x, event.clientY - clickCandidate.y);
  if (distance > 8) clickCandidate.moved = true;
}

function onPointerUp(event) {
  const wasMultiTouch = activePointers.size > 1;
  activePointers.delete(event.pointerId);
  if (!clickCandidate || clickCandidate.pointerId !== event.pointerId) return;

  const candidate = clickCandidate;
  clickCandidate = null;
  const duration = performance.now() - candidate.startedAt;
  const distance = Math.hypot(event.clientX - candidate.x, event.clientY - candidate.y);
  const maxDuration = candidate.pointerType === "mouse" ? 280 : 330;
  if (wasMultiTouch || candidate.moved || distance > 8 || duration > maxDuration) return;

  selectObject(candidate.object);
}

function onPointerCancel(event) {
  activePointers.delete(event.pointerId);
  if (clickCandidate?.pointerId === event.pointerId) clickCandidate = null;
}

function onWheel(event) {
  if (event.target.closest("input, .list")) return;

  event.preventDefault();
  cinema = false;
  controls.autoRotate = false;
  targetCamera = null;
  targetLook = null;

  const currentDistance = camera.position.distanceTo(controls.target);
  const baseDistance = zoomDistance ?? currentDistance;
  const zoomFactor = Math.exp(event.deltaY * 0.00135);
  const requestedDistance = THREE.MathUtils.clamp(
    baseDistance * zoomFactor,
    controls.minDistance,
    controls.maxDistance
  );

  if (focusedSystem && event.deltaY > 0 && requestedDistance >= 62) {
    resetCamera();
    return;
  }

  zoomDistance = requestedDistance;
}

function beginGalaxyTransition(nextGalaxy) {
  if (nextGalaxy === activeGalaxy || galaxyTransition) return;

  cinema = false;
  setSystemPlanetDetail(focusedSystem, false);
  focusedSystem = null;
  selected = null;
  els.systemExit.classList.remove("visible");
  controls.minDistance = 24;
  zoomDistance = null;
  targetCamera = null;
  targetLook = null;
  controls.enabled = false;
  controls.autoRotate = false;
  composer.setPixelRatio(1);
  warpPass.enabled = true;
  galaxyTransition = {
    nextGalaxy,
    startedAt: performance.now(),
    swapped: false,
    startDistance: camera.position.distanceTo(controls.target),
    direction: camera.position.clone().sub(controls.target).normalize()
  };
}

function updateGalaxyTransition(time) {
  if (!galaxyTransition) return;
  const duration = 1750;
  const progress = Math.min(1, (time - galaxyTransition.startedAt) / duration);
  const half = progress < 0.5 ? progress * 2 : (progress - 0.5) * 2;
  const tunnel = progress < 0.5 ? half : 1 - half;
  const easedTunnel = 1 - Math.pow(1 - tunnel, 3);
  const warpStrength = Math.sin(progress * Math.PI);

  warpField.material.opacity = warpStrength * (0.5 + tunnel * 0.48);
  warpField.rotation.z += 0.007 + tunnel * 0.026;
  warpField.scale.z = 1 + tunnel * 3.8;
  warpPass.uniforms.intensity.value = Math.pow(warpStrength, 1.25) * 0.92;
  bloom.strength = Math.max(bloom.strength, 0.72 + tunnel * 0.86);
  warpTunnel.children.forEach((ring, index) => {
    ring.position.z += 0.8 + tunnel * 4.8;
    if (ring.position.z > -3) ring.position.z = -112 - index * 0.45;
    const depthFade = THREE.MathUtils.smoothstep(-ring.position.z, 5, 105);
    ring.material.opacity = warpStrength * (0.12 + tunnel * 0.5) * (1 - depthFade * 0.45);
    ring.rotation.z += (index % 2 ? -1 : 1) * (0.002 + tunnel * 0.008);
  });
  const flashPeak = Math.exp(-Math.pow((progress - 0.5) / 0.105, 2));
  warpFlash.material.opacity = flashPeak * 0.78;
  warpFlash.scale.setScalar(18 + flashPeak * 34);
  camera.fov = 48 + Math.sin(progress * Math.PI) * 24;
  camera.updateProjectionMatrix();
  galaxyRoot.rotation.y += 0.006 + tunnel * 0.035;

  if (progress < 0.5) {
    const distance = THREE.MathUtils.lerp(galaxyTransition.startDistance, controls.minDistance, easedTunnel);
    camera.position.copy(controls.target).add(galaxyTransition.direction.clone().multiplyScalar(distance));
  } else {
    if (!galaxyTransition.swapped) {
      activeGalaxy = galaxyTransition.nextGalaxy;
      galaxyTransition.swapped = true;
      buildGalaxy();
      renderList();
      updateDetail(null);
      galaxyRoot.rotation.y -= 1.15;
    }
    const emerge = 1 - Math.pow(1 - half, 3);
    const distance = THREE.MathUtils.lerp(controls.minDistance, 108, emerge);
    camera.position.copy(controls.target).add(galaxyTransition.direction.clone().multiplyScalar(distance));
  }

  camera.position.x += Math.sin(time * 0.034) * tunnel * 0.18;
  camera.position.y += Math.cos(time * 0.029) * tunnel * 0.12;

  if (progress >= 1) {
    warpField.material.opacity = 0;
    warpField.scale.z = 1;
    warpTunnel.children.forEach((ring) => { ring.material.opacity = 0; });
    warpFlash.material.opacity = 0;
    warpPass.uniforms.intensity.value = 0;
    warpPass.enabled = false;
    composer.setPixelRatio(qualityPixelRatio);
    camera.fov = 48;
    camera.updateProjectionMatrix();
    controls.enabled = true;
    controls.autoRotate = true;
    galaxyTransition = null;
  }
}

function animate(time = 0) {
  requestAnimationFrame(animate);
  const seconds = time * 0.001;

  if (!focusedSystem) galaxyRoot.rotation.y += 0.0008;
  nebulaClouds.forEach((cloud) => {
    cloud.rotation.y += cloud.userData.drift;
    cloud.rotation.z += cloud.userData.drift * 0.35;
  });
  clickable.forEach((mesh) => {
    if (mesh.userData.kind === "planet") {
      if (focusedSystem && mesh.parent === focusedSystem) return;
      const { orbitRadius, phase, speed } = mesh.userData;
      const a = phase + seconds * speed;
      mesh.position.x = Math.cos(a) * orbitRadius;
      mesh.position.z = Math.sin(a) * orbitRadius;
      mesh.rotation.y += 0.0025;
    }
  });

  systems.forEach((system, index) => {
    const flare = system.children.find((child) => child.isSprite);
    if (!flare) return;
    const pulse = 1 + Math.sin(seconds * 1.4 + index * 0.7) * 0.055;
    flare.scale.setScalar((7.5 + system.userData.item.weight * 0.75) * pulse);
  });

  const cameraDistance = camera.position.distanceTo(controls.target);
  const mediumMix = 1 - THREE.MathUtils.smoothstep(cameraDistance, 58, 132);
  const nearMix = 1 - THREE.MathUtils.smoothstep(cameraDistance, 34, 72);
  const farMix = THREE.MathUtils.smoothstep(cameraDistance, 78, controls.maxDistance);
  const mediumBloom = THREE.MathUtils.lerp(1.05, 0.38, mediumMix);
  const mediumExposure = THREE.MathUtils.lerp(0.94, 0.72, mediumMix);
  bloom.strength = THREE.MathUtils.lerp(mediumBloom, 0.2, nearMix);
  bloom.radius = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.7, 0.43, mediumMix), 0.28, nearMix);
  renderer.toneMappingExposure = THREE.MathUtils.lerp(mediumExposure, 0.56, nearMix);
  focusModeMix = THREE.MathUtils.lerp(focusModeMix, focusedSystem ? 1 : 0, 0.085);
  scene.fog.density = THREE.MathUtils.lerp(0.0075, 0.0022, farMix);
  nebulaClouds.forEach((cloud) => {
    cloud.material.opacity = THREE.MathUtils.lerp(cloud.material.userData.baseOpacity, 0.045, farMix);
  });
  farBeacons.forEach((beacon) => {
    const pulse = 0.78 + Math.sin(seconds * 1.7 + beacon.userData.phase) * 0.22;
    const beaconFocus = focusedSystem && beacon.parent !== focusedSystem
      ? THREE.MathUtils.lerp(1, 0.04, focusModeMix)
      : 1;
    beacon.material.opacity = THREE.MathUtils.lerp(0.34, 0.86 * pulse, farMix) * beaconFocus;
    beacon.material.size = beacon.userData.baseSize * (0.9 + pulse * 0.16);
  });
  const selectedSystem = selected
    ? (selected.userData.kind === "planet" ? selected.parent : selected.userData.system)
    : null;
  systems.forEach((system) => {
    system.visible = !(focusedSystem && focusedSystem !== system && focusModeMix > 0.56);
    const systemScale = THREE.MathUtils.lerp(1, 0.11, farMix);
    const selectionFocus = selectedSystem && selectedSystem !== system
      ? THREE.MathUtils.lerp(1, 0.34, nearMix)
      : 1;
    const isolationFocus = focusedSystem && focusedSystem !== system
      ? THREE.MathUtils.lerp(1, 0.008, focusModeMix)
      : 1;
    const focus = selectionFocus * isolationFocus;
    const isolationScale = focusedSystem && focusedSystem !== system
      ? THREE.MathUtils.lerp(1, 0.78, focusModeMix)
      : 1;
    system.scale.setScalar(systemScale * isolationScale);
    system.traverse((object) => {
      if (object.userData.visualKind === "energyRing") {
        object.rotation.z += object.userData.rotationSpeed;
        object.rotation.y += object.userData.rotationSpeed * 0.42;
        const ringFocus = selectedSystem
          ? (selectedSystem === system ? 1 : 0.08)
          : THREE.MathUtils.lerp(0.58, 0.24, nearMix);
        object.material.opacity = object.material.userData.baseOpacity
          * ringFocus
          * isolationFocus
          * THREE.MathUtils.lerp(1, 0.72, mediumMix)
          * (1 - farMix);
      } else if (object.userData.visualKind === "planetAccent") {
        object.rotation.z += object.userData.rotationSpeed;
        object.material.opacity = object.material.userData.baseOpacity * focus * (1 - farMix);
      } else if (object.userData.visualKind === "heirloomFragment") {
        object.rotation.x += object.userData.rotationSpeed;
        object.rotation.y -= object.userData.rotationSpeed * 0.7;
        object.material.opacity = object.material.userData.baseOpacity * focus * (1 - farMix);
      }

      if (object.userData.visualKind === "flare") {
        const distanceOpacity = THREE.MathUtils.lerp(object.material.userData.baseOpacity, 0.025, farMix);
        object.material.opacity = distanceOpacity
          * THREE.MathUtils.lerp(1, 0.55, mediumMix)
          * THREE.MathUtils.lerp(1, 0.69, nearMix)
          * focus;
      } else if (object.userData.visualKind === "label") {
        const labelFocus = selectedSystem && selectedSystem !== system
          ? THREE.MathUtils.lerp(1, 0.24, nearMix)
          : 1;
        object.material.opacity = THREE.MathUtils.lerp(0.94, 0, farMix) * labelFocus * isolationFocus;
        object.getWorldPosition(tempWorldPosition);
        const labelDistance = tempWorldPosition.distanceTo(camera.position);
        const selectedBoost = selectedSystem === system ? 1.3 : 1;
        const labelScale = THREE.MathUtils.clamp(labelDistance / 88, 0.36, 1.15) * selectedBoost;
        object.scale.set(
          object.userData.baseScale.x * labelScale,
          object.userData.baseScale.y * labelScale,
          1
        );
      } else if (object.userData.visualKind === "planetLabel") {
        const planetLabelOpacity = focusedSystem === system ? focusModeMix : 0;
        object.material.opacity = planetLabelOpacity * (1 - farMix);
        object.getWorldPosition(tempWorldPosition);
        const labelDistance = tempWorldPosition.distanceTo(camera.position);
        const labelScale = THREE.MathUtils.clamp(labelDistance / 34, 0.72, 1.16);
        object.scale.set(
          object.userData.baseScale.x * labelScale,
          object.userData.baseScale.y * labelScale,
          1
        );
      } else if (object.userData.visualKind === "orbit") {
        object.material.opacity = THREE.MathUtils.lerp(object.material.userData.baseOpacity, 0.018, farMix) * focus;
      }

      if (object.material?.userData.visualKind === "mesaPlasma") {
        object.material.uniforms.time.value = seconds;
        object.material.uniforms.intensity.value = THREE.MathUtils.lerp(1, 0.58, mediumMix)
          * THREE.MathUtils.lerp(1, 0.72, nearMix)
          * focus;
        object.material.uniforms.opacity.value = focus;
      } else if (object.material?.userData.visualKind === "bodySurface") {
        object.material.emissiveIntensity = object.material.userData.baseEmissive
          * THREE.MathUtils.lerp(1, 0.42, mediumMix)
          * THREE.MathUtils.lerp(1, 0.43, nearMix)
          * focus;
        object.material.opacity = focus;
      } else if (object.material?.userData.visualKind === "bodyGlow") {
        object.material.opacity = object.material.userData.baseOpacity
          * THREE.MathUtils.lerp(1, 0.5, mediumMix)
          * THREE.MathUtils.lerp(1, 0.28, nearMix)
          * focus;
      } else if (object.material?.userData.visualKind === "planetSurface") {
        object.material.emissiveIntensity = object.material.userData.baseEmissive
          * THREE.MathUtils.lerp(1, 0.78, nearMix);
        object.material.opacity = THREE.MathUtils.lerp(0.005, 1, focus);
      } else if (object.material?.userData.visualKind === "planetAtmosphere") {
        object.material.opacity = object.material.userData.baseOpacity
          * THREE.MathUtils.lerp(1, 0.72, nearMix)
          * focus;
      } else if (object.isPointLight) {
        object.intensity = 1.8
          * THREE.MathUtils.lerp(1, 0.5, mediumMix)
          * THREE.MathUtils.lerp(1, 0.32, nearMix)
          * focus;
      }
    });
  });
  galaxyRoot.traverse((object) => {
    if (object.userData.visualKind === "galaxyArm" || object.userData.visualKind === "route") {
      object.material.opacity = THREE.MathUtils.lerp(object.material.userData.baseOpacity, 0.045, farMix)
        * THREE.MathUtils.lerp(1, 0.12, focusModeMix);
    }
  });

  updateGalaxyTransition(time);

  if (galaxyTransition) {
    // The transition owns the camera until the new galaxy has emerged.
  } else if (cinema) {
    cinemaTime += 0.006;
    const radius = 86 + Math.sin(cinemaTime * 0.9) * 18;
    camera.position.x = Math.cos(cinemaTime) * radius;
    camera.position.z = Math.sin(cinemaTime) * radius;
    camera.position.y = 28 + Math.sin(cinemaTime * 1.4) * 16;
    controls.target.set(Math.sin(cinemaTime * 0.7) * 10, 0, Math.cos(cinemaTime * 0.8) * 10);
  } else if (targetCamera && targetLook) {
    camera.position.lerp(targetCamera, 0.08);
    controls.target.lerp(targetLook, 0.12);
  }

  if (!cinema && zoomDistance !== null) {
    const offset = camera.position.clone().sub(controls.target);
    const currentDistance = offset.length();
    const nextDistance = THREE.MathUtils.lerp(currentDistance, zoomDistance, 0.16);
    camera.position.copy(controls.target).add(offset.setLength(nextDistance));
    if (Math.abs(nextDistance - zoomDistance) < 0.03) zoomDistance = null;
  }

  controls.update();
  composer.render();
}

function resetCamera() {
  cinema = false;
  setSystemPlanetDetail(focusedSystem, false);
  focusedSystem = null;
  selected = null;
  els.systemExit.classList.remove("visible");
  els.cinemaMode.textContent = "电影镜头";
  controls.minDistance = 24;
  targetCamera = new THREE.Vector3(0, 42, 98);
  targetLook = new THREE.Vector3(0, 0, 0);
  controls.autoRotate = true;
  zoomDistance = null;
  els.searchInput.value = "";
  setControlsCollapsed(false);
  setDetailCollapsed(false);
  renderList();
  updateDetail(null);
}

document.querySelectorAll("[data-galaxy]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-galaxy]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    els.searchInput.value = "";
    setControlsCollapsed(false);
    setDetailCollapsed(false);
    beginGalaxyTransition(button.dataset.galaxy);
  });
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    if (focusedSystem) {
      renderList();
    } else {
      buildGalaxy();
      renderList();
      updateDetail(null);
    }
  });
});

els.searchInput.addEventListener("input", () => {
  if (focusedSystem) {
    renderList();
  } else {
    buildGalaxy();
    renderList();
  }
});

els.resetView.addEventListener("click", resetCamera);
els.exitSystem.addEventListener("click", resetCamera);
els.toggleControls?.addEventListener("click", () => setControlsCollapsed(!controlsCollapsed));
els.toggleDetail?.addEventListener("click", () => setDetailCollapsed(!detailCollapsed));
els.cinemaMode.addEventListener("click", () => {
  cinema = !cinema;
  controls.autoRotate = !cinema;
  els.cinemaMode.textContent = cinema ? "退出电影" : "电影镜头";
});

window.addEventListener("pointerdown", onPointerDown);
window.addEventListener("pointermove", onPointerMove);
window.addEventListener("pointerup", onPointerUp);
window.addEventListener("pointercancel", onPointerCancel);
window.addEventListener("blur", () => {
  activePointers.clear();
  clickCandidate = null;
});
window.addEventListener("wheel", onWheel, { passive: false, capture: true });
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
