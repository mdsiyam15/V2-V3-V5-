const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "Magi2",
    version: "3.3.1",
    author: "FARHAN-KHAN",
    role: 0,
    countDown: 5,
    category: "media"
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {
    try {

      const body = (event.body || "").trim();
      if (!body) return;

      // 🎯 TRIGGER MAP
      const videoMap = [
        { key: "কলে আসো", link: "https://files.catbox.moe/p8qlso.mp4" },
        { key: "চিপা থেকে বাহির হও", link: "https://files.catbox.moe/atdk5k.mp4" },
        { key: "রিয়েক্ট দে", link: "https://files.catbox.moe/hitsnc.mp4" },
        { key: "😿", link: "https://files.catbox.moe/k6acls.mp4" },
        { key: "চুত মারানি", link: "https://files.catbox.moe/zdirp4.mp4" }
      ];

      // ✔️ MATCH
      const match = videoMap.find(v => body.includes(v.key));
      if (!match) return;

      // 📁 Cache Folder
      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);

      const cachePath = path.join(cacheDir, `${Date.now()}.mp4`);

      // 🌟 Stylish Loading Message
      const loadingText = `
╔════════════╗
║ 👑 𝗢𝗪𝗡𝗘𝗥 ➤ 👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
╠═════════════════╣
║ 🕌 𝗥𝗘𝗟𝗜𝗚𝗜𝗢𝗡 ➤ 𝗜𝗦𝗟𝗔𝗠
║ 🎂 𝗔𝗚𝗘 ➤ 𝟭𝟳+
║ 🚹 𝗚𝗘𝗡𝗗𝗘𝗥 ➤ 𝗠𝗔𝗟𝗘
╠═════════════════╣
║ 🏠 𝗔𝗗𝗗𝗥𝗘𝗦𝗦
║ ➤ 𝗞𝗜𝗦𝗛𝗢𝗥𝗘𝗚𝗔𝗡𝗝
║ ➤ 𝗕𝗔𝗡𝗚𝗟𝗔𝗗𝗘𝗦𝗛
║
║ 💔 𝗦𝗧𝗔𝗧𝗨𝗦 ➤ 𝗦𝗜𝗡𝗚𝗟𝗘
║ 🧑‍🎓 𝗪𝗢𝗥𝗞 ➤ 𝗦𝗧𝗨𝗗𝗘𝗡𝗧
╠═════════════════╣
║      👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍👑
║      👑𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧👑
╚═════════════════╝

⏳ ভিডিও লোড হচ্ছে অপেক্ষা করুন...
`;

      // 📩 Send Loading Message
      api.sendMessage(
        loadingText,
        event.threadID,
        async (err, info) => {

          if (err) return console.log(err);

          const loadingMsgID = info.messageID;

          // ⏳ Auto Delete Loading Message After 30 Seconds
          const autoDelete = setTimeout(() => {
            api.unsendMessage(loadingMsgID);
          }, 30000);

          try {

            // 🎥 Download Video
            const response = await axios({
              url: match.link,
              method: "GET",
              responseType: "stream",
              timeout: 30000
            });

            const writer = fs.createWriteStream(cachePath);

            response.data.pipe(writer);

            writer.on("finish", async () => {

              // 🛑 Stop Auto Delete Timer
              clearTimeout(autoDelete);

              // ❌ Delete Loading Message
              api.unsendMessage(loadingMsgID);

              // ✅ Send Video
              api.sendMessage(
                {
                  body: "👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑",
                  attachment: fs.createReadStream(cachePath)
                },
                event.threadID,
                () => {

                  // 🗑️ Delete Cache File
                  fs.unlink(cachePath, (err) => {
                    if (err) console.log(err);
                  });

                }
              );

            });

            writer.on("error", async (err) => {

              console.log(err);

              clearTimeout(autoDelete);

              api.unsendMessage(loadingMsgID);

              api.sendMessage(
                "❌ ভিডিও ডাউনলোড করতে সমস্যা হয়েছে!",
                event.threadID
              );

            });

          } catch (error) {

            console.log(error);

            clearTimeout(autoDelete);

            api.unsendMessage(loadingMsgID);

            api.sendMessage(
              "❌ Server Error হয়েছে!",
              event.threadID
            );

          }
        }
      );

    } catch (e) {

      console.log(e);

      api.sendMessage(
        "❌ Unexpected Error হয়েছে!",
        event.threadID
      );

    }
  }
};
