const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "Magi2",
    version: "3.3.2",
    author: "FARHAN-KHAN (fixed)",
    role: 0,
    countDown: 5,
    category: "media"
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {
    try {
      const body = (event.body || "").trim().toLowerCase();
      if (!body) return;

      const videoMap = [
        { key: "কলে আসো", link: "https://files.catbox.moe/p8qlso.mp4" },
        { key: "চিপা থেকে বাহির হও", link: "https://files.catbox.moe/atdk5k.mp4" },
        { key: "রিয়েক্ট দে", link: "https://files.catbox.moe/hitsnc.mp4" },
        { key: "😿", link: "https://files.catbox.moe/k6acls.mp4" },
        { key: "চুত মারানি", link: "https://files.catbox.moe/zdirp4.mp4" }
      ];

      const match = videoMap.find(v => body.includes(v.key.toLowerCase()));
      if (!match) return;

      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);

      const cachePath = path.join(cacheDir, `${Date.now()}.mp4`);

      // 🎯 random reaction emoji
      const reactions = ["✡️", "🪬", "🚬", "🔮"];
      const reactEmoji = reactions[Math.floor(Math.random() * reactions.length)];

      // ⚡ short loading message
      const loadingText = `⏳ ভিডিও লোড হচ্ছে...`;

      api.sendMessage(loadingText, event.threadID, async (err, info) => {
        if (err) return;

        const loadingMsgID = info.messageID;

        // 🟢 reaction add (if supported)
        try {
          api.setMessageReaction(reactEmoji, event.messageID, () => {}, true);
        } catch (e) {}

        const autoDelete = setTimeout(() => {
          api.unsendMessage(loadingMsgID);
        }, 30000);

        try {
          const response = await axios({
            url: match.link,
            method: "GET",
            responseType: "stream",
            timeout: 30000
          });

          const writer = fs.createWriteStream(cachePath);
          response.data.pipe(writer);

          writer.on("finish", () => {
            clearTimeout(autoDelete);
            api.unsendMessage(loadingMsgID);

            api.sendMessage(
              {
                body: "👑 SIYAM-REPLY",
                attachment: fs.createReadStream(cachePath)
              },
              event.threadID,
              () => {
                fs.unlink(cachePath, () => {});
              }
            );
          });

          writer.on("error", (err) => {
            clearTimeout(autoDelete);
            api.unsendMessage(loadingMsgID);

            api.sendMessage("❌ ভিডিও প্রসেসিং সমস্যা হয়েছে", event.threadID);
            console.log(err);
          });

        } catch (error) {
          clearTimeout(autoDelete);
          api.unsendMessage(loadingMsgID);

          api.sendMessage("❌ সার্ভার সমস্যা হয়েছে", event.threadID);
          console.log(error);
        }
      });

    } catch (e) {
      console.log(e);
      api.sendMessage("❌ অপ্রত্যাশিত সমস্যা হয়েছে", event.threadID);
    }
  }
};
