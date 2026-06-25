// ⚠️নাম পরিবর্তন করলে ফাইল বন্ধ হয়ে যাবে
const a1 = "𝆠፝";
const a2 = "𝐒𝐈";
const a3 = "𝐘𝐀𝐌";
const a4 = "-𝐇𝐀";
const a5 = "𝐒𝐀𝐍";
const hiddenOwner = [a1, a2, a3, a4, a5].join("");

if (hiddenOwner!== "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍") {
  process.exit(0);
}

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const CACHE_DIR = path.join(__dirname, "cache");

// 📂 CACHE CREATE
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// 🎬 VIDEO LIST - 8টা ভিডিও, সব catbox এর পার্মানেন্ট লিংক
const videoList = [
  { url: "https://files.catbox.moe/qrcggr.mp4", file: "video1.mp4" },
  { url: "https://files.catbox.moe/4ox466.mp4", file: "video2.mp4" },
  { url: "https://files.catbox.moe/psl98k.mp4", file: "video3.mp4" },
  { url: "https://files.catbox.moe/rzhmck.mp4", file: "video4.mp4" },
  { url: "https://files.catbox.moe/6a7jbj.mp4", file: "video5.mp4" },
  // 👇 তোমার 3টা ভিডিও catbox.moe তে আপলোড করে এখানে লিংক বসাও
  { url: "https://files.catbox.moe/XXXXXX.mp4", file: "video6.mp4" },
  { url: "https://files.catbox.moe/YYYYYY.mp4", file: "video7.mp4" },
  { url: "https://files.catbox.moe/ZZZZZZ.mp4", file: "video8.mp4" }
];

// 🔄 VIDEO INDEX FILE
const indexFile = path.join(CACHE_DIR, "videoIndex.json");

// ⏱️ COOLDOWN - 5 সেকেন্ড
const USER_COOLDOWN = 5 * 1000;
const lastReplyUser = {};

// 📥 AUTO DOWNLOAD VIDEOS
async function downloadVideos() {
  for (const vid of videoList) {
    const filePath = path.join(CACHE_DIR, vid.file);
    if (!fs.existsSync(filePath)) {
      try {
        const response = await axios({
          method: "GET",
          url: vid.url,
          responseType: "stream",
          timeout: 30000
        });
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
        console.log(`✅ Downloaded: ${vid.file}`);
      } catch (err) {
        console.log(`❌ Failed: ${vid.file}`, err.message);
      }
    }
  }
}

// 🚀 START DOWNLOAD
downloadVideos();

module.exports = {
  config: {
    name: "admin3",
    version: "27.0",
    author: hiddenOwner,
    countDown: 0,
    role: 0,
    shortDescription: { en: "Admin mention auto reply - Final VIP" },
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {
    try {
      // 👑 শুধু রায়হান বসের জন্য
      const adminUID = "5465758586854576";
      const triggers = [
        "rayhan", "@দুঁষ্টুঁঁ ছে্ঁলে্ঁর্ঁ মিঁঁষ্টিঁঁ ক্ঁথা্ঁ", "রায়হান",
        "boss rayhan", "rayhan boss", "রায়হান ভাই", "বস রায়হান",
        "বটওনার কে", "রায়হান", "বস রায়হান", "রায়হান ভাই",
        "পিচ্চি", "pichchi", "picchi"
      ];

      // 👑 স্পেশাল ট্রিগার
      const specialTrigger = "@পিৃ্ঁচ্চিৃ্ঁ দু্ঁষ্টু্ঁ মে্ঁয়ে্ঁ ত্যাৃ্ঁহৃ্ঁ";

      const senderID = String(event.senderID);
      // 👑 IGNORE ADMIN SELF
      if (senderID === adminUID) return;

      const text = (event.body || "").trim();
      if (!text) return;

      const lowerText = text.toLowerCase().trim();
      const mentionedIDs = event.mentions? Object.keys(event.mentions) : [];

      // 🔍 DETECT ADMIN (MENTION OR EXACT TRIGGER MATCH)
      const isMentioned = mentionedIDs.includes(adminUID);
      const isExactTrigger = triggers.some(
        trigger => lowerText === trigger.toLowerCase().trim()
      );
      const isSpecialTrigger = text === specialTrigger;

      if (!isMentioned &&!isExactTrigger &&!isSpecialTrigger) return;

      // ⏱️ COOLDOWN CHECK - 5 সেকেন্ড
      const now = Date.now();
      if (lastReplyUser[senderID] && (now - lastReplyUser[senderID] < USER_COOLDOWN)) {
        return;
      }
      lastReplyUser[senderID] = now;

      let replyText = "";

      // 👑 স্পেশাল মেসেজ চেক
      if (isSpecialTrigger) {
        replyText = "╭〔 👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥👑 〕╮\n━━━━━━━━━━━━━━━\n➜ আমাকে না দেখে আমার বস রায়হানের সাথে একটু সময় দাও পিও 🥺💕\n➜ আমার বস রায়হান তোমার জন্য অপেক্ষা করতেছে 😘\n➜ জলদি দাও দেরি করো না 🫵💫\n➜ ইনবক্সে যাও 👉 https://www.facebook.com/profile.php?id=100088489418721\n╰━━━━━━━━━━━━╯";
      } else {
        // 💬 তোমার দেওয়া VIP মেসেজ - এটাই যাবে
        replyText = `╭〔 👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥👑 〕╮\n👑 𝗕𝗢𝗬𝗘𝗦 𝗞𝗜𝗡𝗚⚡\n🛸 𝗛𝗥𝗜𝗗𝗢𝗬 👑\n━━━━━━━━━━━━━━━\n💫 আসসালামু আলাইকুম 💫\n👑 আমার বস রায়হান এখন কাজে ব্যস্ত আছে ।\n📩 তার ইনবক্সে মেসেজ রাখেন🐯 নিচে\n🌐𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 লিংক\n📱𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 : নাম্বার দেওয়া আছে।\n🪽 বস ফ্রি হলে রিপ্লাই দেবে ।\n🤍 অযথা স্প্যাম বা বারবার মেসেজ দিবেন না ধন্যবাদ।\n━━━━━━━━━━━━━\n👑 𝗢𝗪𝗡𝗘𝗥 👑\n➤ 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍\n╰━━━━━━━━━━━━╯\n📱 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 : +01758438261\n🔗 Facebook Profile\nhttps://www.facebook.com/dekhalena.manata.antara.cokhe`;
      }

      // 🎬 VIDEO SELECTION - প্রতি মেসেজে ভিডিও যাবে
      let videoIndex = 0;
      if (fs.existsSync(indexFile)) {
        try {
          const data = JSON.parse(fs.readFileSync(indexFile, "utf8"));
          videoIndex = data.index || 0;
        } catch (e) {
          videoIndex = 0;
        }
      }

      const selectedVideo = videoList[videoIndex];
      const filePath = path.join(CACHE_DIR, selectedVideo.file);

      // 📤 SEND REPLY - ভিডিও + লেখা সবসময়
      if (fs.existsSync(filePath)) {
        api.sendMessage({
          body: replyText,
          attachment: fs.createReadStream(filePath)
        }, event.threadID, event.messageID);
      } else {
        api.sendMessage(replyText, event.threadID, event.messageID);
      }

      // 🔄 UPDATE INDEX - 8টা ভিডিও ঘুরবে
      const nextIndex = (videoIndex + 1) % videoList.length;
      fs.writeFileSync(indexFile, JSON.stringify({ index: nextIndex }));

    } catch (err) {
      console.error("❌ Admin3 Error:", err);
    }
  }
};
