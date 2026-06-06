/**
 * 📌 File: demoCommandsReal.js
 * 👑 Owner: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍
 * ⚙️ Purpose: Realistic AI-style demo for all commands with admin-only restriction
 */

const adminIDs = ["100037154624637"]; // 👈 শুধুমাত্র এডমিনরা
const commands = [
  "18+", "8k", "accept", "activemember",
  "actor", "ad", "adduser", "admin",
  "admin3", "adminonly", "age", "album",
  "all", "allgroup", "allnick", "allnoti",
  "alluser", "ani", "aniinfo", "anime",
  "anti_isis_leave", "antibadword2", "antiout", "appstore",
  "atag", "autolink", "autoreact", "autoreply2",
  "autoseen", "autosetname", "autosticker", "autotag",
  "baby", "backupdata", "badwords", "balancec",
  "ban", "bet", "bigtxt", "blur",
  "bot", "botinfo", "botinfo2", "botnick",
  "botstatus", "botstatus2", "boxinfo", "butslap",
  "buzz", "call", "captain", "caption",
  "catbox", "catbox2", "cdp", "chakrun",
  "chudi", "ck", "clear", "cmd",
  "cmdstore2", "config", "convertmp3", "copuledp2",
  "count", "creart", "customrankcard", "cutereply",
  "daily", "dalle3", "delete", "dim",
  "download", "edit", "emoji", "emoji_voice",
  "emojimean", "emojimix", "ephoto", "eval",
  "event", "fakechat", "farhan_mention", "farhan_tx",
  "fbcover", "fbinfo", "ffinfo", "fflike",
  "filecmd", "filteruser", "flux", "fo",
  "fuck", "fuck_you", "fuck2", "fuck3",
  "fun", "funny", "gan", "gay",
  "gay2", "gcimg", "getfbstate", "goatstore",
  "goru", "goru2", "groupimage", "groupinfo",
  "groupname", "grouptag", "guessnumber", "hack",
  "hadis", "help", "help2", "help3",
  "helpall", "hijla", "hitler", "horny",
  "hot", "hot2", "hubble", "hug",
  "i", "ifter", "ignoreonlyad", "ignoreonlyadbox",
  "imagen3", "imgbb", "imgen", "imgur",
  "inbox", "info", "info2", "islamic",
  "jail", "jail2", "join", "jsontomongodb",
  "jsontosqlite", "kick", "kickall", "kiss",
  "kiss2", "kola", "latti", "liner",
  "links", "loadconfig", "lock", "lov",
  "love", "man", "manga", "married",
  "meme", "mia", "momoi", "murgi",
  "murgi2", "mygirl", "namaj", "namaz",
  "nc", "needgf", "nigga", "nokia",
  "notification", "nude", "onlyadminbox", "out",
  "oute2", "owner", "owner2", "p",
  "pair", "pair2", "pair3", "pair4",
  "pastebin", "pending", "pet", "pfp",
  "pikachu", "pinterest", "poli", "pp",
  "prefix", "prompt", "propose", "protect",
  "qrgen", "quiz", "quran", "rajakar",
  "random", "rank", "rankup", "rbg",
  "refresh", "remini", "restart", "rndm",
  "rules", "ruls", "sad", "say",
  "scan2", "sdxl", "sen", "sendnoti",
  "setalias", "setavt", "setlang", "setleave",
  "setname", "setrankup", "setrole", "settings",
  "setwelcome", "sex", "sex2", "shell",
  "shortcut", "siyam5", "siyaminfo", "sizuka",
  "sk2", "slot", "smb", "sms",
  "song", "sorthelp", "sound", "spamkick",
  "spy", "ss", "su", "supportgc",
  "tag", "tempmail", "text_voice", "texttoimage",
  "thread", "tid", "tik", "tiktok",
  "time", "toilet", "tokai", "translate",
  "trash", "trigger", "ttt", "uff",
  "uid", "uid2", "uidall", "uns",
  "up", "update", "uptime2", "user",
  "userinfo", "vaggo", "video", "video2",
  "voice", "wanted", "warn", "we"
];

function randomAIResponse(cmd) {
  const responses = [
    `🤖 😁: "${cmd}" কমান্ড চেক করেছি। সবকিছু ঠিক আছে বলে মনে হচ্ছে।`,
    `⚠️ 🐣: "${cmd}" কমান্ডে কিছু ছোটখাটো সমস্যা আছে। ঠিক করো বস।`,
    `🔍 🗃️: "${cmd}" কমান্ডের কিছু ফাংশন্যালিটি অসম্পূর্ণ মনে হচ্ছে।`,
    `💡 🌝: মনে হচ্ছে "${cmd}" কমান্ড ঠিক আছে, তবে কিছু জায়গায় অপ্টিমাইজ করতে হবে।`,
    `🛠️ 🛸: "${cmd}" কমান্ডে এই জায়গায় সমস্যা হতে পারে। রিপেয়ার করো।`,
    `✅ 🫡: "${cmd}" কমান্ড পরীক্ষা হয়েছে। কাজ করছে।`,
    `❗ 📓: "${cmd}" কমান্ডে এই অংশে সতর্কতা আছে। দেখতে হবে।`,
    `✨ 📂: "${cmd}" কমান্ড ফাংশনাল। কিছু ছোটখাটো সংশোধন করলে পারফেক্ট হবে।`
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

module.exports = {
  config: {
    name: "demoCommandsReal",
    version: "2.0.0",
    author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "Realistic AI-style demo of all commands (admin only)",
    commandCategory: "utility",
    usages: "[command]",
    cooldowns: 2,
    hasPermission: 2 // Admin-only
  },

  onMessage: async function({ event, api, args }) {
    const senderID = event.senderID;

    // এডমিন চেক
    if (!adminIDs.includes(senderID)) {
      return api.sendMessage("❌ এই খানকির 🌝মাগির পোলা 😝বেসসা মাগির পোলা এডমিন তুই সিয়াম তোর বাপ🤣।", event.threadID, event.messageID);
    }

    // কোনো কমান্ড না দিলে লিস্ট দেখাবে
    if (!args[0]) {
      let listMsg = "💠  কমান্ড লিস্ট:\n\n";
      commands.forEach((cmd, i) => {
        listMsg += `• ${cmd}\n`;
      });
      listMsg += `\n🤖 বস: কমেন্টে কোনো কমান্ড দিলে আমি আলাদা করে চেক করব। AI যাচাই করবো।`;
      return api.sendMessage(listMsg, event.threadID, event.messageID);
    }

    const inputCmd = args[0].toLowerCase();
    if (commands.includes(inputCmd)) {
      const reply = randomAIResponse(inputCmd);
      return api.sendMessage(reply, event.threadID, event.messageID);
    } else {
      return api.sendMessage(`❌ বস: "${inputCmd}" কমান্ড লিস্টে নেই।`, event.threadID, event.messageID);
    }
  }
};
