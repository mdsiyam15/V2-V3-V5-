module.exports.config = {
  name: "settings",
  version: "1.0.0",
  permission: 2,
  credits: "siyam",
  description: "Bot settings menu",
  prefix: true,
  category: "admin",
  usages: "",
  cooldowns: 10,
};

const fs = require("fs-extra");
const path = require("path");
const totalPath = __dirname + "/cache/totalChat.json";
const _24hours = 86400000;

/* ================== UTILS ================== */
function handleOS(ping) {
  return `📌 𝗣𝗜𝗡𝗚: ${Date.now() - ping}ms\n`;
}

/* ================== ON LOAD ================== */
module.exports.onLoad = function () {
  const dataPath = path.join(__dirname, "cache", "data.json");
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({ adminbox: {} }, null, 2));
  }
};

/* ================== CORE ================== */
async function handler({ api, event }) {
  return api.sendMessage(
`👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑

⚙️ 𝗦𝗘𝗧𝗧𝗜𝗡𝗚𝗦 𝗣𝗔𝗡𝗘𝗟  ⚙️ 

[ 1 ] 🔄 𝗥𝗘𝗕𝗢𝗢𝗧 𝗕𝗢𝗧
[ 2 ] ♻️ 𝗥𝗘𝗟𝗢𝗔𝗗 𝗖𝗢𝗡𝗙𝗜𝗚
[ 3 ] 📊 𝗨𝗣𝗗𝗔𝗧𝗘 𝗕𝗢𝗫 𝗗𝗔𝗧𝗔
[ 4 ] 👤 𝗨𝗣𝗗𝗔𝗧𝗘 𝗨𝗦𝗘𝗥 𝗗𝗔𝗧𝗔
[ 5 ] 🚪 𝗟𝗢𝗚𝗢𝗨𝗧 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞

━━━━━━━━━━━━━━━━━━

[ 6 ] 🔒 𝗔𝗗𝗠𝗜𝗡 𝗢𝗡𝗟𝗬 𝗠𝗢𝗗𝗘
[ 7 ] 🚫 𝗔𝗡𝗧𝗜 𝗝𝗢𝗜𝗡
[ 8 ] 🛡️ 𝗔𝗡𝗧𝗜 𝗥𝗢𝗕𝗕𝗘𝗥𝗬
[ 9 ] 🚷 𝗔𝗡𝗧𝗜 𝗢𝗨𝗧
[ 10 ] 👢 𝗞𝗜𝗖𝗞 𝗨𝗦𝗘𝗥𝗦

━━━━━━━━━━━━━━━━━━

[ 11 ] 🤖 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢
[ 12 ] 📦 𝗕𝗢𝗫 𝗜𝗡𝗙𝗢
[ 13 ] 👮 𝗚𝗥𝗢𝗨𝗣 𝗔𝗗𝗠𝗜𝗡 𝗟𝗜𝗦𝗧
[ 14 ] 👑 𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 𝗟𝗜𝗦𝗧
[ 15 ] 📋 𝗚𝗥𝗢𝗨𝗣 𝗟𝗜𝗦𝗧

━━━━━━━━━━━━━━━━━━
👉 𝗥𝗘𝗣𝗟𝗬 𝗪𝗜𝗧𝗛 𝗔 𝗡𝗨𝗠𝗕𝗘𝗥
`,
    event.threadID,
    (err, info) => {
      global.client.handleReply.push({
        name: "settings",
        messageID: info.messageID,
        author: event.senderID,
        type: "choose"
      });
    }
  );
};

/* ================== IMPORTANT FIX ================== */
module.exports.onStart = handler;   // 👈 REQUIRED
module.exports.run = handler;       // 👈 compatibility

/* ================== HANDLE REPLY ================== */
module.exports.handleReply = async function ({
  api, event, Users, Threads, handleReply
}) {
  const { threadID } = event;

  if (event.senderID !== handleReply.author) return;

  switch (event.body) {
    case "1":
      api.sendMessage("Restarting bot...", threadID, () => process.exit(1));
      break;
  }
};

/* ================== HANDLE EVENT ================== */
module.exports.handleEvent = async ({ api, event }) => {
  if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
};
