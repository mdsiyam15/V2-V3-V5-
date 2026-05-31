const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "userinfo",
    version: "1.1.0",
    author: "siyam-Hassan",
    role: 0,
    category: "info",
    shortDescription: "User Information",
    longDescription: "Show stylish user information with avatar",
    guide: "{pn} [reply/tag/uid]",
    countDown: 5
  },

  onStart: async function ({ api, event, args }) {
    try {
      const { threadID, senderID, messageID, mentions } = event;

      let targetID;

      if (mentions && Object.keys(mentions).length > 0) {
        targetID = Object.keys(mentions)[0];
      } else if (event.messageReply) {
        targetID = event.messageReply.senderID;
      } else if (args[0]) {
        targetID = args[0];
      } else {
        targetID = senderID;
      }

      const userInfo = await api.getUserInfo(targetID);

      if (!userInfo || !userInfo[targetID]) {
        return api.sendMessage(
          "❌ User information not found.",
          threadID,
          messageID
        );
      }

      const info = userInfo[targetID];

      const cacheDir = path.join(__dirname, "cache");

      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      const imgPath = path.join(cacheDir, `avatar_${targetID}.png`);

      // ✅ NEW FIXED PROFILE API (WORKING)
      try {
        const avatarURL =
          `https://graph.facebook.com/${targetID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

        const avatar = await axios.get(avatarURL, {
          responseType: "arraybuffer"
        });

        fs.writeFileSync(imgPath, Buffer.from(avatar.data));
      } catch (e) {
        console.log("Avatar fetch error:", e.message);
      }

      const gender =
        info.gender == 2
          ? "👨 Male"
          : info.gender == 1
          ? "👩 Female"
          : "❓ Unknown";

      let userClass = "👤 Normal User";

      try {
        if (
          global.GoatBot &&
          global.GoatBot.config &&
          Array.isArray(global.GoatBot.config.adminBot) &&
          global.GoatBot.config.adminBot.includes(String(targetID))
        ) {
          userClass = "⚡ Bot Admin";
        }
      } catch (e) {}

      const msg =
`✦ ─── ✧ ─── ✦
✨ 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢 ✨
✦ ─── ✧ ─── ✦

🙍 Name: ${info.name || "N/A"}
🏷️ First Name: ${info.firstName || "N/A"}
🆔 UID: ${targetID}
🏫 Class: ${userClass}
🚻 Gender: ${gender}
🎂 Birthday: ${info.birthday || "Not Set"}
🤝 Friend With Bot: ${info.isFriend ? "✅ Yes" : "❌ No"}
🌐 Profile:
https://facebook.com/${targetID}

✦ ─── ✧ ─── ✦`;

      if (fs.existsSync(imgPath)) {
        api.sendMessage(
          {
            body: msg,
            attachment: fs.createReadStream(imgPath)
          },
          threadID,
          () => {
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
          },
          messageID
        );
      } else {
        api.sendMessage(msg, threadID, messageID);
      }

    } catch (err) {
      console.error(err);
      api.sendMessage(
        "⚠️ Couldn’t fetch user info.",
        event.threadID,
        event.messageID
      );
    }
  }
};
