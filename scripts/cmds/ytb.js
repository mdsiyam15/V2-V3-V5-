const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const baseApiUrl = async () => {
  try {
    const res = await axios.get(
      "https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json"
    );
    return res.data.mahmud;
  } catch (e) {
    return null;
  }
};

const apiList = async () => {
  const base = await baseApiUrl();
  return [
    base,
    "https://mahmudx7-api.vercel.app"
  ].filter(Boolean);
};

async function fetchWithFallback(builder) {
  const apis = await apiList();

  for (let api of apis) {
    try {
      const res = await axios.get(builder(api), { timeout: 15000 });
      if (res?.data) return res.data;
    } catch (e) {}
  }
  throw new Error("API failed");
}

module.exports = {
  config: {
    name: "ytb",
    aliases: ["youtube", "yt"],
    version: "2.2",
    author: "𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    role: 0,
    countDown: 5,
    category: "media"
  },

  onStart: async function ({ api, args, event, getLang }) {
    const { threadID, messageID, senderID } = event;
    const query = args.join(" ");

    if (!query) {
      return api.sendMessage("👉 ytb song name লিখো", threadID, messageID);
    }

    try {
      api.setMessageReaction("🔎", messageID, () => {}, true);

      const data = await fetchWithFallback((b) =>
        `${b}/api/ytb/search?q=${encodeURIComponent(query)}`
      );

      const results = data?.results?.slice(0, 6);

      if (!results || results.length === 0) {
        return api.sendMessage("❌ কিছু পাওয়া যায়নি", threadID, messageID);
      }

      let msg = "";

      results.forEach((r, i) => {
        msg += `${i + 1}. ${r.title}\n⏱ ${r.time}\n\n`;
      });

      return api.sendMessage(
        {
          body: "📌 নাম্বার দিয়ে রিপ্লাই করো:\n\n" + msg
        },
        threadID,
        (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            author: senderID,
            results
          });
        },
        messageID
      );

    } catch (e) {
      return api.sendMessage("❌ সার্চ সমস্যা হয়েছে", threadID, messageID);
    }
  },

  onReply: async function ({ event, api, Reply }) {
    const { results, author } = Reply;

    if (event.senderID !== author) return;

    const index = parseInt(event.body);
    if (isNaN(index) || index < 1 || index > results.length) return;

    const video = results[index - 1];

    try {
      api.setMessageReaction("⬇️", event.messageID, () => {}, true);

      const data = await fetchWithFallback((b) =>
        `${b}/api/ytb/get?id=${video.id}&type=video`
      );

      const link = data?.data?.downloadLink;
      const title = data?.data?.title;

      if (!link) {
        return api.sendMessage("❌ Download link পাওয়া যায়নি", event.threadID);
      }

      const filePath = path.join(__dirname, "cache", `${Date.now()}.mp4`);

      const response = await axios({
        url: link,
        method: "GET",
        responseType: "stream",
        timeout: 20000
      });

      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      // 🔥 ERROR HANDLING FIX
      response.data.on("error", (err) => {
        writer.destroy();
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        return api.sendMessage(
          "❌ Download failed (stream error)",
          event.threadID,
          event.messageID
        );
      });

      writer.on("error", (err) => {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

        return api.sendMessage(
          "❌ File write failed",
          event.threadID,
          event.messageID
        );
      });

      writer.on("finish", () => {
        api.sendMessage(
          {
            body: `✅ Downloaded: ${title}`,
            attachment: fs.createReadStream(filePath)
          },
          event.threadID,
          () => fs.unlinkSync(filePath),
          event.messageID
        );
      });

    } catch (e) {
      return api.sendMessage(
        "❌ Download system error",
        event.threadID,
        event.messageID
      );
    }
  }
};
