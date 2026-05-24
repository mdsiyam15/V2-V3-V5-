// 😼 Author: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 😼
// ⚠️ নাম চেঞ্জ করলে ফাইল নষ্ট হয়ে যাবে ভাই 😾

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
    version: "4.0",
    author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    role: 0,
    shortDescription: {
      en: "Auto reply with media"
    },
    longDescription: {
      en: "Reply trigger system without prefix"
    },
    category: "chat",
    guide: {
      en: "No Prefix Auto Reply"
    }
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
            (err, info) => {
              resolve(info?.messageID);
            }
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
            {
              body: text,
              attachment: stream
            },
            threadID
          );

          // শুধু Loading Message Delete হবে
          setTimeout(() => {
            if (loadingMsg) {
              api.unsendMessage(loadingMsg);
            }
          }, 5000);

          // Cache File Delete
          setTimeout(() => {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }, 10000);

        });

        writer.on("error", () => {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }

      // CALL REPLY
      if (msg.includes("কলে আসো")) {
        return sendMedia(
          "https://files.catbox.moe/p8qlso.mp4",
          "call.mp4",

`╭〔 ☎️ CALL REPLY 〕╮
┃ @Everyone
┃ 📞 সবাই কলে আসো!
┃ 😎 gf bf দেওয়া হবে 🧑‍🍼
╰━━━━━━━━━━━━━━━╯`
        );
      }

      // CHIPA
      if (msg.includes("চিপা থেকে বাহির হও")) {
        return sendMedia(
          "https://files.catbox.moe/atdk5k.mp4",
          "chipa.mp4",

`🤡 FUNNY REPLY
🐸 চিপায় থাকলে লাভ নাই ভাই
🚶 বাহির হও
😂 সবাই ডাকছে`
        );
      }

      // REACT
      if (msg.includes("রিয়েক্ট দে")) {
        return sendMedia(
          "https://files.catbox.moe/hitsnc.mp4",
          "react.mp4",

`╭〔 🔥 REACT BOOST 〕╮
┃ ❤️ রিয়েক্ট না দিলে কিক🤪
┃ 😩 প্রতিবন্ধী মেম্বার?
┃ 🖕 দরকার নাই🥴
╰━━━━━━━━━━━━━━━╯`
        );
      }

      // JANU
      if (msg.includes("*জানু")) {
        return sendMedia(
          "https://files.catbox.moe/k6acls.mp4",
          "janu.mp4",

`তার জন্য নিজেকে তিলে তিলে শেষ করে দেওয়া যেই বেপারটা....!🥺💔😭😅`
        );
      }

      // CHUT MARANI
      if (msg.includes("চুত মারানি")) {
        return sendMedia(
          "https://files.catbox.moe/zdirp4.mp4",
          "attitude.mp4",

`╭〔 💀 ATTITUDE MODE 〕╮
┃ 😎 বেশি হাতমারা ভালো না
┃ 🔥 শান্ত থাকো না হলে কিন্তু
┃ 🖕 এমন চু*দাচু*দবো
┃ 🥵 ভার্চুয়াল এ মুখ
┃ 😼 দেখাতে পারবে না🖕🥵
╰━━━━━━━━━━━━━━━━╯`
        );
      }

      // JUTI
      if (msg.includes("জুতি")) {
        return sendMedia(
          "https://files.catbox.moe/3sjox4.mp4",
          "juti.mp4",

`হাতের দাগ গুলা না হয় সাক্ষী রইলো তোমায় কতটা ভালোবাসি...!🥺❤️‍🩹`
        );
      }

      // SIYAM
      if (msg.includes("*siyam")) {
        return sendMedia(
          "https://files.catbox.moe/nwulno.mp4",
          "siyam.mp4",

`╭〔 💔 SAD LOVE STORY 〕╮

একটা সময় ছিল...!
যার সাথে কথা না বললে
ঘুম আসতো না...!🙂💔

আজ সে মানুষটাই
অন্য কারো সাথে ব্যস্ত...!🥀

আমি শুধু দূর থেকে দেখি...
আর নিজের কষ্ট নিজেই লুকাই...!😅

ভালোবাসা সুন্দর ছিল,
কিন্তু মানুষটা আমার ছিল না...!🙂💔

╰━━━━━━━━━━━━━━━╯`
        );
      }

      // RAGE EMOJI
      const angryEmoji = ["😡", "🤬", "👺", "😼", "😾"];

      if (angryEmoji.includes(msg)) {

        await sendMedia(
          "https://files.catbox.moe/2f15i7.mp4",
          "rage.mp4",

`বাবা রাগ করলা 🥺💔`
        );

        setTimeout(async () => {

          await sendMedia(
            "https://files.catbox.moe/z0d0jf.jpg",
            "rage.jpg",

`😁 বল বিসমিল্লাহ কি রাগ করলা 😩💔`
          );

        }, 3000);
      }

    } catch (e) {
      console.log("OUTE2 ERROR:", e);
    }
  }
};
