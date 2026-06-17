const fs = require("fs-extra");
const moment = require("moment-timezone");

const getStreamFromURL = global.utils.getStreamFromURL;

// ✅ VIDEO + IMAGE SUPPORT (both work)
const mediaList = [
  "https://files.catbox.moe/apl9z8.jpg",
  "https://files.catbox.moe/o2ocsw.jpg"
];

// ✅ per-thread toggle storage
global.GoatBot.prefixVideoToggle = global.GoatBot.prefixVideoToggle || {};

module.exports = {
  config: {
    name: "prefix",
    version: "2.6",
    author: "FARHAN-KHAN",
    countDown: 5,
    role: 0,
    description: "Change & show bot prefix",
    category: "config"
  },

  langs: {
    en: {
      usage: "❌ 𝐔𝐬𝐚𝐠𝐞: 𝐩𝐫𝐞𝐟𝐢𝐱 <𝐧𝐞𝐰> | 𝐩𝐫𝐞𝐟𝐢𝐱 𝐫𝐞𝐬𝐞𝐭 | 𝐩𝐫𝐞𝐟𝐢𝐱 <𝐧𝐞𝐰> -g",
      reset: "✅ 𝐏𝐫𝐞𝐟𝐢𝐱 𝐑𝐞𝐬𝐞𝐭 𝐒𝐮𝐜𝐜𝐞𝐬𝐬!\n🔰 𝐒𝐲𝐬𝐭𝐞𝐦: %1",
      onlyAdmin: "⛔ 𝐎𝐧𝐥𝐲 𝐁𝐨𝐭 𝐀𝐝𝐦𝐢𝐧 𝐂𝐚𝐧 𝐂𝐡𝐚𝐧𝐠𝐞 𝐆𝐥𝐨𝐛𝐚𝐥 𝐏𝐫𝐞𝐟𝐢𝐱.",
      confirmGlobal: "⚠️ 𝐆𝐥𝐨𝐛𝐚𝐥 𝐏𝐫𝐞𝐟𝐢𝐱 𝐂𝐡𝐚𝐧𝐠𝐞?\n👉 𝐑𝐞𝐚𝐜𝐭 𝐓𝐨 𝐂𝐨𝐧𝐟𝐢𝐫𝐦",
      confirmThisThread: "⚠️ 𝐆𝐫𝐨𝐮𝐩 𝐏𝐫𝐞𝐟𝐢𝐱 𝐂𝐡𝐚𝐧𝐠𝐞?\n👉 𝐑𝐞𝐚𝐜𝐭 𝐓𝐨 𝐂𝐨𝐧𝐟𝐢𝐫𝐦",
      successGlobal: "✅ 𝐆𝐋𝐎𝐁𝐀𝐋 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄𝐃!\n🆕 %1",
      successThisThread: "✅ 𝐆𝐑𝐎𝐔𝐏 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄𝐃!\n🆕 %1"
    }
  },

  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0]) return message.reply(getLang("usage"));

    const threadID = event.threadID;

    if (args[0] === "reset") {
      await threadsData.set(threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const newPrefix = args[0];
    const setGlobal = args[1] === "-g";

    if (setGlobal && role < 2)
      return message.reply(getLang("onlyAdmin"));

    const media = await getStreamFromURL(mediaList[0]);

    const confirmMsg = setGlobal
      ? getLang("confirmGlobal")
      : getLang("confirmThisThread");

    message.reply(
      { body: confirmMsg, attachment: media },
      (err, info) => {
        if (err) return;

        global.GoatBot.onReaction.set(info.messageID, {
          commandName,
          author: event.senderID,
          newPrefix,
          setGlobal
        });
      }
    );
  },

  onReaction: async function ({ event, message, threadsData, Reaction, getLang }) {
    if (event.userID !== Reaction.author) return;

    global.GoatBot.onReaction.delete(event.messageID);

    if (Reaction.setGlobal) {
      global.GoatBot.config.prefix = Reaction.newPrefix;

      fs.writeFileSync(
        global.client.dirConfig,
        JSON.stringify(global.GoatBot.config, null, 2)
      );

      return message.reply(getLang("successGlobal", Reaction.newPrefix));
    }

    await threadsData.set(
      event.threadID,
      Reaction.newPrefix,
      "data.prefix"
    );

    return message.reply(getLang("successThisThread", Reaction.newPrefix));
  },

  onChat: async function ({ event, message, threadsData }) {
    if (!event.body || event.body.toLowerCase() !== "prefix") return;

    const threadID = event.threadID;

    if (global.GoatBot.prefixVideoToggle[threadID] === undefined)
      global.GoatBot.prefixVideoToggle[threadID] = 0;

    const index = global.GoatBot.prefixVideoToggle[threadID];
    global.GoatBot.prefixVideoToggle[threadID] = index === 0 ? 1 : 0;

    const media = await getStreamFromURL(mediaList[index]);

    const systemPrefix = global.GoatBot.config.prefix;
    const groupPrefix = global.utils.getPrefix(threadID);

    const threadInfo = await threadsData.get(threadID);
    const groupName = threadInfo?.threadName || "Unknown Group";

    const time = moment().tz("Asia/Dhaka").format("hh:mm A");
    const date = moment().tz("Asia/Dhaka").format("DD MMM YYYY");

    const owner = "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";

    const design1 = `╭👑 𝐏𝐑𝐄𝐅𝐈𝐗 𝐏𝐀𝐍𝐄𝐋 👑 ╮
🏷️ 𝐆𝐑𝐎𝐔𝐏 ➜ ${groupName}
🔰 𝐒𝐘𝐒𝐓𝐄𝐌 ➜ ${systemPrefix}
💬 𝐏𝐑𝐄𝐅𝐈𝐗 ➜ ${groupPrefix}
⏰ 𝐓𝐈𝐌𝐄 ➜ ${time}
📅 𝐃𝐀𝐓𝐄 ➜ ${date}
👑 𝐎𝐖𝐍𝐄𝐑 ➜ ${owner}
📊 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ➜ 6086+
🚀 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 ➜ V2 • V3 • V5
⚡ 𝐒𝐓𝐀𝐓𝐔𝐒 ➜ ONLINE
〔 💎𝐍𝐈𝐉𝐇𝐔𝐌 𝐁𝐎𝐓💎 〕`;

    const design2 = `◢◤◢◤◢◤◢◤◢◤◢◤◢◤
🔥 𝐏𝐑𝐄𝐅𝐈𝐗 𝐏𝐀𝐍𝐄𝐋 🔥
➥ 👥 𝐆𝐑𝐎𝐔𝐏 :: ${groupName}
➥ ⚙️ 𝐒𝐘𝐒𝐓𝐄𝐌 :: ${systemPrefix}
➥ 💬 𝐏𝐑𝐄𝐅𝐈𝐗 :: ${groupPrefix}
➥ ⏰ 𝐓𝐈𝐌𝐄 :: ${time}
➥ 📆 𝐃𝐀𝐓𝐄 :: ${date}
➥ 👑 𝐎𝐖𝐍𝐄𝐑 :: ${owner}
➥ 📊 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 :: 6086+
➥ 🚀 𝐕𝐄𝐑𝐒𝐈𝐎𝐍 :: V2 • V3 • V5
➥ ⚡ 𝐒𝐓𝐀𝐓𝐔𝐒 :: ONLINE
💎𝐒𝐈𝐘𝐀𝐌 𝐄𝐌𝐏𝐈𝐑𝐄💎`;

    return message.reply({
      body: index === 0 ? design1 : design2,
      attachment: media
    });
  }
};
