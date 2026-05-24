const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "autoreply2",
    version: "3.3",
    author: "SIYAM",
    role: 0,
    shortDescription: {
      en: "Auto reply with video/photo"
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
      const { body, threadID, messageID } = event;
      if (!body) return;

      const msg = body.toLowerCase().trim();

      const cachePath = path.join(__dirname, "cache");

      if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath, { recursive: true });
      }

      // RANDOM REACTION
      const reactions = [
        "🤗","🪬","😅","😔","😚","🙂","🥺","🫶",
        "👋","👑","☠️","😩","🙄","💫","😭","😻",
        "😺","🤬","🤔","🌚","🥵","🐸","😁","🤭",
        "📥","💻","✡️","😾","😿","😵‍💫","😘","🤣"
      ];

      const randomReaction =
        reactions[Math.floor(Math.random() * reactions.length)];

      api.setMessageReaction(randomReaction, messageID, () => {}, true);

      // LOADING MESSAGE
      async function loadingMessage() {
        return new Promise((resolve) => {
          api.sendMessage(
`👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✡️

📡 𝗩𝗜𝗗𝗘𝗢 / 𝗣𝗜𝗖 𝗜𝗦 𝗟𝗢𝗔𝗗𝗜𝗡𝗚...
⏳ PLEASE WAIT...`,
            threadID,
            (err, info) => {
              resolve(info.messageID);
            }
          );
        });
      }

      // SEND VIDEO
      async function sendVideo(url, fileName, text) {

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

          await api.sendMessage(
            {
              body: text,
              attachment: fs.createReadStream(filePath)
            },
            threadID
          );

          // VIDEO থাকবে কিন্তু LOADING DELETE হবে 10 sec পরে
          setTimeout(() => {
            api.unsendMessage(loadingMsg);
          }, 10000);

          setTimeout(() => {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }, 10000);

        });
      }

      // SEND PHOTO
      async function sendPhoto(url, fileName, text) {

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

          await api.sendMessage(
            {
              body: text,
              attachment: fs.createReadStream(filePath)
            },
            threadID
          );

          // PHOTO থাকবে কিন্তু LOADING DELETE হবে 10 sec পরে
          setTimeout(() => {
            api.unsendMessage(loadingMsg);
          }, 10000);

          setTimeout(() => {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }, 10000);

        });
      }

      // CALL REPLY
      if (msg.includes("কলে আসো")) {
        return sendVideo(
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
        return sendVideo(
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
        return sendVideo(
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
        return sendVideo(
          "https://files.catbox.moe/k6acls.mp4",
          "janu.mp4",

`তার জন্য নিজেকে তিলে তিলে শেষ করে দেওয়া যেই বেপারটা....!🥺💔😭😅`
        );
      }

      // CHUT MARANI
      if (msg.includes("চুত মারানি")) {
        return sendVideo(
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
        return sendVideo(
          "https://files.catbox.moe/3sjox4.mp4",
          "juti.mp4",

`হাতের দাগ গুলা না হয় সাক্ষী রইলো তোমায় কতটা ভালোবাসি...!🥺❤️‍🩹`
        );
      }

      // SIYAM
      if (msg.includes("*siyam")) {
        return sendVideo(
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

      if (angryEmoji.includes(body)) {

        await sendVideo(
          "https://files.catbox.moe/2f15i7.mp4",
          "rage.mp4",

`বাবা রাগ করলা 🥺💔`
        );

        setTimeout(async () => {

          await sendPhoto(
            "https://files.catbox.moe/z0d0jf.jpg",
            "rage.jpg",

`😁বল বিসমিল্লাহ কি রাগ করলা 😩💔`
          );

        }, 3000);
      }

    } catch (e) {
      console.log(e);
    }
  }
};
