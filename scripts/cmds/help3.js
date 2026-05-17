const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const gifLinks = [
  "https://i.imgur.com/LaJEm5S.gif",
  "https://i.imgur.com/ctfxKEa.gif"
];

module.exports = {
  config: {
    name: "help3",
    aliases: [],
    version: "5.0.0",
    author: "𝐇𝐀𝐒𝐀𝐍",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Auto GIF"
    },
    longDescription: {
      en: "Auto cycle gif sender"
    },
    category: "media",
    guide: {
      en: "{pn}"
    }
  },

  onLoad: async function () {

    const cacheFolder = path.join(__dirname, "cache");

    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder, { recursive: true });
    }

    const indexPath = path.join(cacheFolder, "aaa_index.txt");

    if (!fs.existsSync(indexPath)) {
      fs.writeFileSync(indexPath, "0");
    }
  },

  onStart: async function ({ api, event }) {

    try {

      const loadingMsg = await api.sendMessage(
`       👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧✡️

📡 𝗛𝗘𝗟𝗣 𝟯 𝗟𝗢𝗔𝗗𝗜𝗡𝗚... ⏳ 𝗣𝗟𝗘𝗔𝗦𝗘 𝗪𝗔𝗜𝗧
 
      👑𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡👑`,
        event.threadID
      );

      const cacheFolder = path.join(__dirname, "cache");

      const indexPath = path.join(cacheFolder, "aaa_index.txt");

      let currentIndex = 0;

      if (fs.existsSync(indexPath)) {
        currentIndex = parseInt(
          fs.readFileSync(indexPath, "utf8")
        );
      }

      if (isNaN(currentIndex)) {
        currentIndex = 0;
      }

      const gifUrl = gifLinks[currentIndex];

      let nextIndex = currentIndex + 1;

      if (nextIndex >= gifLinks.length) {
        nextIndex = 0;
      }

      fs.writeFileSync(indexPath, String(nextIndex));

      const filePath = path.join(
        cacheFolder,
        `aaa_${Date.now()}.gif`
      );

      const response = await axios({
        method: "GET",
        url: gifUrl,
        responseType: "stream",
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      writer.on("finish", async () => {

        api.sendMessage(
          {
            body:
`╭━〔👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑〕━╮
┃ 🎬 𝗚𝗜𝗙 𝗟𝗢𝗔𝗗𝗘𝗗 
┃ 📡 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬
┃ 💫 𝗘𝗻𝗷𝗼𝘆 𝗧𝗵𝗲 𝗣𝗿𝗲𝗺𝗶𝘂𝗺
┃ 🪬          𝗩𝗶𝗲𝘄
┃ 🪯👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
╰━━━━━━━━━━━━━━━━━╯`,
            attachment: fs.createReadStream(filePath)
          },
          event.threadID,
          () => {

            setTimeout(() => {
              api.unsendMessage(loadingMsg.messageID);
            }, 4000);

            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }

          },
          event.messageID
        );

      });

      writer.on("error", async (err) => {

        console.log(err);

        api.sendMessage(
          "❌ GIF Write Failed",
          event.threadID,
          event.messageID
        );

      });

    } catch (e) {

      console.log(e);

      api.sendMessage(
        `❌ ${e.message}`,
        event.threadID,
        event.messageID
      );

    }
  }
};
