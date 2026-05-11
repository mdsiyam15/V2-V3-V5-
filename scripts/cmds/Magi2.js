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

      const cacheDir = path.join(__dirname, "cache");
      const cachePath = path.join(cacheDir, `${Date.now()}.mp4`);

      await fs.ensureDir(cacheDir);

      // ⏳ Loading Message
      api.sendMessage("⏳ ভিডিও লোড হচ্ছে অপেক্ষা করুন...", event.threadID);

      const response = await axios({
        url: match.link,
        method: "GET",
        responseType: "stream"
      });

      const writer = fs.createWriteStream(cachePath);

      response.data.pipe(writer);

      writer.on("finish", async () => {
        api.sendMessage(
          {
            body: "🎥 Video Sent Successfully 💚",
            attachment: fs.createReadStream(cachePath)
          },
          event.threadID,
          () => {
            fs.unlink(cachePath, (err) => {
              if (err) console.log(err);
            });
          }
        );
      });

      writer.on("error", (err) => {
        console.log(err);
        api.sendMessage(
          "❌ ভিডিও ডাউনলোড করতে সমস্যা হয়েছে!",
          event.threadID
        );
      });

    } catch (e) {
      console.log(e);
      api.sendMessage(
        "❌ Server Error হয়েছে!",
        event.threadID
      );
    }
  }
};
