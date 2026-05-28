// 🙂 নাম পরিবর্তন করলে ফাইল নষ্ট হতে পারে

const a1 = "𝆠፝";
const a2 = "𝐒𝐈";
const a3 = "𝐘𝐀𝐌";
const a4 = "-𝐇𝐀";
const a5 = "𝐒𝐀𝐍";

const hiddenOwner = [a1, a2, a3, a4, a5].join("");

if (hiddenOwner !== "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍") {
  process.exit(0);
}

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "admin3",
    version: "12.0",
    author: hiddenOwner,
    countDown: 0,
    role: 0,

    shortDescription: {
      en: "Admin mention auto reply"
    },

    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({
    api,
    event,
    message
  }) {

    try {

      // 👑 ADMIN DATA
      const admins = [
        {
          uid: "61568411310748",

          triggers: [

            "@পি্ঁচ্চি্ঁ রি্ঁদ্ঁয়্ঁ ত্যা্ঁহ্ঁ",
            "*সিয়াম",

            "siyam",
            "Siyam",
            "SIYAM",
            "সিয়াম ভাই",

            "boss siyam",
            "siyam boss",
            "হৃদয়",
            "হৃদয় ভাই",
            "বস সিয়াম",
            "রিদয় ভাই",
            "admin"
          ]
        }
      ];

      const senderID =
        String(event.senderID);

      // 👑 ignore admin self
      if (
        admins.some(
          a => a.uid === senderID
        )
      ) return;

      const text =
        (event.body || "")
        .toLowerCase()
        .trim();

      if (!text) return;

      const mentionedIDs =
        event.mentions
          ? Object.keys(event.mentions)
          : [];

      // 🔍 DETECT
      const triggeredAdmin =
        admins.find(admin =>

          mentionedIDs.includes(
            admin.uid
          ) ||

          admin.triggers.some(
            trigger =>
              text.includes(
                trigger.toLowerCase()
              )
          )
        );

      if (!triggeredAdmin) return;

      // 🎬 VIDEO LINKS
      // 🙂 পরে এগুলা change করে নিবি
      const videos = [

        "https://files.catbox.moe/video1.mp4",
        "https://files.catbox.moe/video2.mp4",
        "https://files.catbox.moe/video3.mp4",
        "https://files.catbox.moe/video4.mp4",
        "https://files.catbox.moe/video5.mp4"

      ];

      // 💬 TEXTS (UNCHANGED)
      const captions = [
        "Mantion_দিস না _সিয়াম বস এর মন মন ভালো নেই আস্কে-!💔🥀",
        "- আমার বস সিয়াম এর সাথে কেউ সেক্স করে না থুক্কু টেক্স করে নাহ🫂💔",
        "👉আমার বস ♻️ 𝑺𝒊𝒚𝒂𝒎  এখন বিজি আছে । তার ইনবক্সে এ মেসেজ দিয়ে রাখো https://www.facebook.com/profile.php?id=61589656899295 🔰 ♪√বস ফ্রি হলে আসবে🧡😁😜🐒",
        "বস সিয়াম কে এত মেনশন না দিয়ে বক্স আসো হট করে দিবো🤷‍ঝাং 😘🥒",
        "বস সিয়াম কে Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা,লামু 💋😾😾🔨",
        "সিয়াম বস এখন বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰",
        "সিয়াম বস কে এতো মেনশন নাহ দিয়া বস কে একটা জি এফ দে 😒 😏",
        "Mantion_না দিয়ে বস সিয়াম এর সাথে সিরিয়াস প্রেম করতে চাইলে ইনবক্স",
        "বস সিয়াম কে মেনশন দিসনা পারলে একটা জি এফ দে",
        "বাল পাকনা Mantion_দিস না বস সিয়াম প্রচুর বিজি আছে 🥵🥀🤐",
        "চুমু খাওয়ার বয়স টা আমার বস সিয়াম চকলেট🍫খেয়ে উড়িয়ে দিল 🤗"
      ];

      // 🎲 RANDOM TEXT
      const rawCaption =
        captions[
          Math.floor(
            Math.random() *
            captions.length
          )
        ];

      // 🎲 RANDOM VIDEO
      const videoUrl =
        videos[
          Math.floor(
            Math.random() *
            videos.length
          )
        ];

      // ✨ STYLE
      const styledCaption = `
✿•≫─────────────≪•✿
『 ${rawCaption} 』
✿•≫─────────────≪•✿
`;

      // 📂 CACHE FOLDER
      const cacheDir =
        path.join(
          __dirname,
          "cache"
        );

      if (
        !fs.existsSync(cacheDir)
      ) {

        fs.mkdirSync(
          cacheDir,
          { recursive: true }
        );
      }

      // 📥 RANDOM FILE NAME
      const filePath =
        path.join(
          cacheDir,
          `admin_${Date.now()}.mp4`
        );

      try {

        // ⬇️ DOWNLOAD VIDEO
        const response =
          await axios({
            method: "GET",
            url: videoUrl,
            responseType: "stream",
            timeout: 30000
          });

        // 💾 SAVE VIDEO
        const writer =
          fs.createWriteStream(filePath);

        response.data.pipe(writer);

        await new Promise(
          (resolve, reject) => {

            writer.on(
              "finish",
              resolve
            );

            writer.on(
              "error",
              reject
            );
          }
        );

        // 📤 SEND VIDEO + TEXT
        await message.reply({
          body: styledCaption,
          attachment:
            fs.createReadStream(
              filePath
            )
        });

      } catch (videoErr) {

        console.log(
          "Video Download Error:",
          videoErr.message
        );

        // ✅ VIDEO FAIL হলেও TEXT যাবে
        await message.reply(
          styledCaption
        );
      }

      // 🧹 DELETE CACHE
      setTimeout(() => {

        if (
          fs.existsSync(filePath)
        ) {

          fs.unlinkSync(filePath);
        }

      }, 5000);

    } catch (err) {

      console.log(
        "AdminMention Error:",
        err
      );
    }
  }
};
