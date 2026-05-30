// 😼 Author: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 😼

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const AUTHOR_LOCK = "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";

if (AUTHOR_LOCK !== "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍") {
  process.exit(1);
}

module.exports = {
  config: {
    name: "oute2",
    version: "4.1",
    author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    role: 0,
    shortDescription: { en: "Auto reply with media" },
    longDescription: { en: "Reply trigger system without prefix" },
    category: "chat",
    guide: { en: "No Prefix Auto Reply" }
  },

  onStart: async () => {},

  onChat: async function ({ api, event }) {
    try {
      const { body, threadID } = event;
      if (!body || typeof body !== "string") return;

      const msg = body.toLowerCase().trim();
      const cachePath = path.join(__dirname, "cache");

      if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath, { recursive: true });
      }

      // LOADING MESSAGE
      async function loadingMessage() {
        return new Promise((resolve) => {
          api.sendMessage(
            `👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✡️

📡 𝗩𝗜𝗗𝗘𝗢 / 𝗣𝗜𝗖 𝗜𝗦 𝗟𝗢𝗔𝗗𝗜𝗡𝗚...
⏳ PLEASE WAIT...`,
            threadID,
            (err, info) => resolve(info?.messageID)
          );
        });
      }

      // SEND MEDIA
      async function sendMedia(url, fileName, text) {
        const loadingMsg = await loadingMessage();

        const filePath = path.join(cachePath, fileName);

        const response = await axios({
          url,
          method: "GET",
          responseType: "stream"
        });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on("finish", async () => {
          const stream = fs.createReadStream(filePath);

          await api.sendMessage(
            { body: text, attachment: stream },
            threadID
          );

          setTimeout(() => {
            if (loadingMsg) api.unsendMessage(loadingMsg);
          }, 5000);

          setTimeout(() => {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          }, 10000);
        });

        writer.on("error", () => {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        });
      }

      // ======================
      // NEW SIMPLE TRIGGERS
      // ======================
      if (
        msg === "ভিডিও" ||
        msg === "video" ||
        msg === "হাতের ভিডিও" ||
        msg === "হাত"
      ) {
        return sendMedia(
          "https://files.catbox.moe/pni1z0.mp4",
          "video.mp4",
          "হ্যাঁ আমি নেশা করি 😅 একবারও কি জানতে চাইছো 😔🪽কিসের জন্য নেশা করি😅🚬😚"
        );
      }

      // ======================
      // OLD TRIGGERS (UNCHANGED)
      // ======================

      if (msg.includes("কলে আসো")) {
        return sendMedia(
          "https://files.catbox.moe/p8qlso.mp4",
          "call.mp4",
          `☎️ CALL REPLY

@Everyone 📞 সবাই কলে আসো!
😎 gf bf দেওয়া হবে 🧑‍🍼`
        );
      }

      if (msg.includes("চিপা থেকে বাহির হও")) {
        return sendMedia(
          "https://files.catbox.moe/atdk5k.mp4",
          "chipa.mp4",
          `🤡 FUNNY REPLY
🐸 চিপায় থাকলে লাভ নাই ভাই
🚶 বাহির হও 😂 সবাই ডাকছে`
        );
      }

      if (msg.includes("রিয়েক্ট দে")) {
        return sendMedia(
          "https://files.catbox.moe/hitsnc.mp4",
          "react.mp4",
          `🔥 REACT BOOST
❤️ রিয়েক্ট না দিলে কিক🤪
🖕 দরকার নাই🥴`
        );
      }

      if (msg.includes("*জানু")) {
        return sendMedia(
          "https://files.catbox.moe/k6acls.mp4",
          "janu.mp4",
          "তার জন্য নিজেকে তিলে তিলে শেষ করে দেওয়া যেই বেপারটা....!🥺💔😭😅"
        );
      }

      if (msg.includes("চুত মারানি")) {
        return sendMedia(
          "https://files.catbox.moe/zdirp4.mp4",
          "attitude.mp4",
          `💀 ATTITUDE MODE
😎 বেশি হাতমারা ভালো না
🔥 শান্ত থাকো না হলে কিন্তু
🖕 ভার্চুয়াল এ মুখ দেখাতে পারবে না`
        );
      }

      if (msg.includes("জুতি")) {
        return sendMedia(
          "https://files.catbox.moe/3sjox4.mp4",
          "juti.mp4",
          "হাতের দাগ গুলা না হয় সাক্ষী রইলো তোমায় কতটা ভালোবাসি...!🥺❤️‍🩹"
        );
      }

      if (msg.includes("*siyam")) {
        return sendMedia(
          "https://files.catbox.moe/nwulno.mp4",
          "siyam.mp4",
          `💔 SAD LOVE STORY

একটা সময় ছিল...!
যার সাথে কথা না বললে ঘুম আসতো না...!🙂💔

আজ সে মানুষটাই অন্য কারো সাথে ব্যস্ত...!🥀

আমি শুধু দূর থেকে দেখি...
আর নিজের কষ্ট নিজেই লুকাই...!😅`
        );
      }

      // ======================
      // RAGE SYSTEM (ALTERNATE VIDEO / PIC)
      // ======================

      const angryEmoji = ["😡", "🤬", "👺", "😼", "😾"];
      const rageFile = path.join(cachePath, "rageCount.json");

      if (!fs.existsSync(rageFile)) {
        fs.writeFileSync(rageFile, JSON.stringify({}));
      }

      if (angryEmoji.includes(msg)) {
        const data = JSON.parse(fs.readFileSync(rageFile));

        if (!data[threadID]) data[threadID] = 0;
        data[threadID]++;

        fs.writeFileSync(rageFile, JSON.stringify(data, null, 2));

        const count = data[threadID];

        // ODD = VIDEO
        if (count % 2 === 1) {
          return sendMedia(
            "https://files.catbox.moe/2f15i7.mp4",
            "rage.mp4",
            "বাবা রাগ করলা 🥺💔"
          );
        }

        // EVEN = PIC
        const imgPath = path.join(cachePath, "rage.jpg");

        const response = await axios({
          url: "https://files.catbox.moe/pni1z0.mp4",
          method: "GET",
          responseType: "stream"
        });

        const writer = fs.createWriteStream(imgPath);
        response.data.pipe(writer);

        writer.on("finish", async () => {
          await api.sendMessage(
            {
              body: "এত রাগ ভালো না জান 🥺❤️‍🩹",
              attachment: fs.createReadStream(imgPath)
            },
            threadID
          );

          setTimeout(() => {
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
          }, 10000);
        });

        return;
      }

    } catch (err) {
      console.log("oute2 error:", err);
    }
  }
};
