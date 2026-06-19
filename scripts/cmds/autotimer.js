const moment = require("moment-timezone");
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "autotimer",
  version: "12.0",
  role: 0,
  author: "ꜰᴀʀʜᴀɴ-ᴋʜᴀɴ",
  description: "⏰ ২৪ ঘণ্টায় ২৪টি নির্দিষ্ট ভিডিও ও টেক্সট পাঠাবে (সব গ্রুপ কাভারেজ ও অ্যান্টি-ব্যানসহ)",
  category: "AutoTime",
  countDown: 3,
};

const cacheDir = path.join(__dirname, "cache");
const statusFile = path.join(__dirname, "autotimer_status.json");

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// ✅ বট রিস্টার্ট দিলে যেন ডিফল্টভাবে ON থাকে
if (!fs.existsSync(statusFile)) {
  fs.writeJsonSync(statusFile, { enabled: true });
}

// ✅ ২৪ ঘণ্টার ২৪টি নির্দিষ্ট আলাদা ভিডিও লিংক এবং আলাদা টেক্সট ডেটা সেটআপ
const timerData = {
  "12:00 AM": { text: "🌌 এখন রাত ১২টা বাজে❥︎নতুন দিন শুরু হলো ✨", url: "https://files.catbox.moe/2ii8c7.mp4" },
  "01:00 AM": { text: "🌙 এখন রাত ১টা বাজে❥︎গভীর রাত, ঘুমাও সবাই 🤫", url: "https://files.catbox.moe/ah0s9r.mp4" },
  "02:00 AM": { text: "🖤 এখন রাত ২টা বাজে❥︎কিছু নীরব স্মৃতি ও একাকীত্ব 🥀", url: "https://files.catbox.moe/ydwkrm.mp4" },
  "03:00 AM": { text: "💤 এখন রাত ৩টা বাজে❥︎মন শুধু তোমাকেই খোঁজে 🥺", url: "https://files.catbox.moe/111n24.mp4" },
  "04:00 AM": { text: "🕌 এখন ভোর ৪টা বাজে❥︎তাহাজ্জুদ/ফজরের প্রস্তুতি নাও 🤲", url: "https://files.catbox.moe/ebyeyi.mp4" },
  "05:00 AM": { text: "🌅 এখন ভোর ৫টা বাজে❥︎শুভ সকাল, ভালো কাটুক দিনটি ☕", url: "https://files.catbox.moe/olpzpk.mp4" },
  "06:00 AM": { text: "🌞 এখন সকাল ৬টা বাজে❥︎ঘুম থেকে উঠো সবাই ☕", url: "https://files.catbox.moe/3y330y.mp4" },
  "07:00 AM": { text: "🍞 এখন সকাল ৭টা বাজে❥︎ব্রেকফাস্ট করে নাও", url: "https://files.catbox.moe/j4fhyp.mp4" },
  "08:00 AM": { text: "✨ এখন সকাল ৮টা বাজে❥︎কাজ শুরু করো মন দিয়ে", url: "https://files.catbox.moe/gc2ard.mp4" },
  "09:00 AM": { text: "🕘 এখন সকাল ৯টা বাজে❥︎চল কাজে মন দিই", url: "https://files.catbox.moe/44oya3.mp4" },
  "10:00 AM": { text: "☀️ এখন সকাল ১০টা বাজে❥︎তোমাদের মিস করছি", url: "https://files.catbox.moe/ffvnm1.mp4" },
  "11:00 AM": { text: "😌 এখন সকাল ১১টা বাজে❥︎কাজ চালিয়ে যাও", url: "https://files.catbox.moe/c5ja93.mp4" },
  "12:00 PM": { text: "❤️ এখন দুপুর ১২টা বাজে❥︎ভালোবাসা জানাও সবাইকে", url: "https://files.catbox.moe/56bgjp.mp4" },
  "01:00 PM": { text: "🤲 এখন দুপুর ১টা বাজে❥︎জোহরের নামাজ পড়ে নাও", url: "https://files.catbox.moe/2l5loh.mp4" },
  "02:00 PM": { text: "🍛 এখন দুপুর ২টা বাজে❥︎দুপুরের খাবার খেয়েছো তো", url: "https://files.catbox.moe/0j8bwh.mp4" },
  "03:00 PM": { text: "☀️ এখন বিকাল ৩টা বাজে❥︎কাজে ফোকাস করো", url: "https://files.catbox.moe/4hjg4f.mp4" },
  "04:00 PM": { text: "🥀 এখন বিকাল ৪টা বাজে❥︎আসরের নামাজ পড়ে নাও", url: "https://files.catbox.moe/l5bfws.mp4" },
  "05:00 PM": { text: "🌆 এখন বিকাল ৫টা বাজে❥︎একটু বিশ্রাম নাও", url: "https://files.catbox.moe/7nvnsi.mp4" },
  "06:00 PM": { text: "🌇 এখন সন্ধ্যা ৬টা বাজে❥︎পরিবারকে সময় দাও 😍", url: "https://files.catbox.moe/j7gndp.mp4" },
  "07:00 PM": { text: "🌃 এখন সন্ধ্যা ৭টা বাজে❥︎এশার নামাজ পড়ো ❤️", url: "https://files.catbox.moe/9tfka4.mp4" },
  "08:00 PM": { text: "🧖 এখন রাত ৮টা বাজে❥︎আজকের কাজ শেষ করো", url: "https://files.catbox.moe/6dyzum.mp4" },
  "09:00 PM": { text: "🌙 এখন রাত ৯টা বাজে❥︎ঘুমের প্রস্তুতি নাও 😴", url: "https://files.catbox.moe/hgf9vq.mp4" },
  "10:00 PM": { text: "💤 এখন রাত ১০টা বাজে❥︎ঘুমাতে যাও, স্বপ্নে দেখা হবে", url: "https://files.catbox.moe/3e5pct.mp4" },
  "11:00 PM": { text: "🌌 এখন রাত ১১টা বাজে❥︎ভালোবাসা রইলো 🥰", url: "https://files.catbox.moe/uak967.mp4" }
};

const startupTexts = [
  "✅ সিয়াম বস সফলভাবে চালু হয়েছে...!! 👑🚀",
  "🥀 কথা কম কাজ বেশি, সিয়াম বসের রাজত্বে হিংসা কম অ্যাটিটিউড বেশি...!! 👑🔥",
  "🖤 নিজের গ্যাং নিজের রুলস, কার অবহেলায় কী আসে যায়...!! 😎💥",
  "🥀 ব্র্যান্ডের চশমা পরে ভাব নিস না ভাই, চরিত্র ঠিক কর ওটা এমনিতেই জ্বলজ্বল করবে...!! 🦅🔥",
  "⏳ শোন ভাই, গুড বয় সেজে কারোর লাইফে হিরো হওয়ার শখ আমার নাই...!! 🧠🔱",
  "😂 ভুল মানুষের পিছে টাইম লস না করে, দিনে তিনবার ভাত খান শরীর ভালো থাকবে...!! 🍛🏃‍♂️",
  "🔥 শত্রু যত বাড়বে, সিয়াম বসের এটিটিউড ততটাই কড়া হবে...!! 🦁💥"
];

let lastSentTime = "";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 🔄 ইনবক্সের সমস্ত গ্রুপ থ্রেড আইডি খুঁজে বের করার ফাংশন
async function getAllGroups(api) {
  let groups = [];
  let hasMore = true;
  let timestamp = null;

  while (hasMore) {
    try {
      // একবারে ৫০টি করে থ্রেড ফেচ করবে যতক্ষণ না শেষ হচ্ছে
      const threads = await api.getThreadList(50, timestamp, ["INBOX"]);
      if (!threads || threads.length === 0) {
        hasMore = false;
        break;
      }
      
      const filtered = threads.filter(t => t.isGroup);
      groups.push(...filtered);
      
      timestamp = threads[threads.length - 1].timestamp;
      
      // যদি ৫০টির কম আসে তার মানে আর কোনো চ্যাট বাকি নেই
      if (threads.length < 50) {
        hasMore = false;
      }
    } catch (err) {
      console.error("❌ Error fetching thread list:", err.message);
      hasMore = false;
    }
  }
  return groups;
}

module.exports.onLoad = async function ({ api }) {
  console.log("🔥 AUTOTIMER LOADED (ALL GROUPS ENABLED)");

  if (module.exports.config.author !== "... Farhan Khan ...".replace(/\./g, "").trim().replace(/ /g, "-").toLowerCase()) {
    // ক্রিয়েটর ক্রেডিট চেক করার জন্য অথর নেম ভ্যালিডেশন ফিক্সড রাখা হলো
    if (module.exports.config.author !== "ꜰᴀʀʜᴀɴ-ᴋʜᴀɴ") {
      console.error("❌ Author Changed");
      return process.exit(1);
    }
  }

  // 🚀 স্টার্টআপ নোটিফিকেশন ফাংশন
  const handleStartupAnnouncement = async () => {
    console.log("🚀 Startup function running...");
    try {
      const startupVideoUrl = "https://files.catbox.moe/jjrnjf.mp4";
      const startupVideoPath = path.join(cacheDir, "bot_startup_video.mp4");
      const randomText = startupTexts[Math.floor(Math.random() * startupTexts.length)];  

      if (!fs.existsSync(startupVideoPath) || fs.statSync(startupVideoPath).size === 0) {  
        const response = await axios.get(startupVideoUrl, { responseType: "arraybuffer" });  
        fs.writeFileSync(startupVideoPath, Buffer.from(response.data));  
      }  

      const startupMsg = `
╭───────────────⭓
│🛡️𝗕𝗢𝗧 𝗦𝗧𝗔𝗥𝗧𝗨 𝗡𝗢𝗧
├───────────────⭓
│ ${randomText}
├───────────────⭓
│  👑𝗢𝗪𝗡𝗘𝗥 ➜ 𝆠፝𝐒𝐈𝐘𝐀𝐌 👑
╰───────────────⭓`;

      const groups = await getAllGroups(api);  
      console.log(`📨 Sending startup message to all (${groups.length}) groups...`);

      // ৩ সেকেন্ড পর পর সেফলি মেসেজ পাঠানোর কিউ লুপ
      for (let i = 0; i < groups.length; i++) {
        const thread = groups[i];
        api.sendMessage({  
          body: startupMsg,  
          attachment: fs.createReadStream(startupVideoPath)  
        }, thread.threadID, (err, info) => {
          if (!err && info && info.messageID) {  
            setTimeout(() => { api.unsendMessage(info.messageID); }, 30 * 60 * 1000); 
          }  
        });
        await sleep(3000); // প্রতি গ্রুপের মাঝে ৩ সেকেন্ড বিরতি (Anti-ban)
      }

    } catch (err) {  
      console.error("❌ Error sending startup announcement:", err.message);
    }
  };

  // ৫ সেকেন্ড পর স্টার্টআপ রান হবে
  setTimeout(handleStartupAnnouncement, 5000);

  // অটো টাইমার কোর ফাংশন
  const checkTimeAndSend = async () => {
    console.log("⏰ Timer Check:", moment().tz("Asia/Dhaka").format("hh:mm:ss A"));
    try {
      if (!fs.existsSync(statusFile)) return;
      const statusData = fs.readJsonSync(statusFile);
      if (!statusData.enabled) return;

      const currentTime = moment().tz("Asia/Dhaka");  
      const minutes = currentTime.format("mm");  
      const now = currentTime.format("hh:00 A");  

      // কাঁটায় কাঁটায় ০০ মিনিট না হলে ব্যাক করবে
      if (minutes !== "00") return;  
      if (!timerData[now]) return;  

      if (now !== lastSentTime) {  
        lastSentTime = now;  

        const todayDate = currentTime.format("DD-MM-YYYY");  
        const currentHourData = timerData[now];  
        const videoUrl = currentHourData.url;  
          
        const videoName = `video_${now.replace(/:| /g, "_")}.mp4`;  
        const videoPath = path.join(cacheDir, videoName);  

        if (!fs.existsSync(videoPath) || fs.statSync(videoPath).size === 0) {  
          const response = await axios.get(videoUrl, { responseType: "arraybuffer" });  
          fs.writeFileSync(videoPath, Buffer.from(response.data));  
          console.log("📥 Downloaded:", videoName);  
        }  

        const text = currentHourData.text;  
        const msg = `
╭───────────────⭓
│ ⏰ 𝗔𝗨𝗧𝗢 𝗧𝗜𝗠𝗘 𝗡𝗢𝗧𝗘
├───────────────⭓
│ 🕒 𝗧𝗜𝗠𝗘 : ${now}
│ 📅 𝗗𝗔𝗧𝗘 : ${todayDate}
├───────────────⭓
│ ${text}
├───────────────⭓
│ 👑𝗢𝗪𝗡𝗘𝗥 ➜ 𝆠፝𝐒𝐈𝐘𝐀𝐌 👑
╰───────────────⭓`;

        const groups = await getAllGroups(api);  
        console.log(`📨 Sending hourly routine to all (${groups.length}) groups...`);

        // প্রতিটি গ্রুপে মেম্বারদের মেনশনসহ মেসেজ কিউ (Anti-ban Protection)
        for (let i = 0; i < groups.length; i++) {
          const thread = groups[i];
          const mentions = thread.participantIDs ? thread.participantIDs.map(uid => ({ tag: "@", id: uid })) : [];  

          api.sendMessage({  
            body: msg,  
            mentions,  
            attachment: fs.createReadStream(videoPath)  
          }, thread.threadID, (err, info) => {  
            if (!err && info && info.messageID) {  
              setTimeout(() => { api.unsendMessage(info.messageID); }, 30 * 60 * 1000);  
            }  
          });
          await sleep(3000); // আইডি সুরক্ষিত রাখার জন্য ৩ সেকেন্ড ডিলে
        }

        console.log("✅ Scheduled routine video for:", now);  
      }  
    } catch (err) {  
      console.error("❌ Error in interval:", err.message);  
    }
  };

  // প্রতি ১ মিনিটে চেক করবে
  setInterval(checkTimeAndSend, 60000);
};

// ✅ ON / OFF COMMAND SYSTEM
module.exports.onStart = async function ({ api, event, args }) {
  if (!fs.existsSync(statusFile)) {
    fs.writeJsonSync(statusFile, { enabled: true });
  }
  const statusData = fs.readJsonSync(statusFile);

  if (!args[0]) {
    return api.sendMessage(
      "⚙️ Usage:\n/autotimer on (চালু করতে)\n/autotimer off (বন্ধ করতে)",
      event.threadID,
      event.messageID
    );
  }

  if (args[0].toLowerCase() === "on") {
    if (statusData.enabled) {
      return api.sendMessage("🚨 𝑨𝒖𝒕𝒐 𝑻𝒊𝒎𝒆𝒓 আগেই 𝑶𝑵 আছে 💻", event.threadID, event.messageID);
    }
    fs.writeJsonSync(statusFile, { enabled: true });
    lastSentTime = ""; 

    return api.sendMessage(
      "╔═════ஜ۩☢۩ஜ═════╗\n   ⏰ 👑 𝐀𝐔𝐓𝐎 𝐓𝐈𝐌𝐄/ 𝐎𝐍 ✅\n   ✡️ এখন থেকে সব গ্রুপে অটো ভিডিও যাবে📥\n╚═════ஜ۩☢۩ஜ═════╝",
      event.threadID,
      event.messageID
    );
  }

  if (args[0].toLowerCase() === "off") {
    if (!statusData.enabled) {
      return api.sendMessage("⌛ 𝙰𝚄𝚃𝙾 𝚃𝙸𝙼𝙴 𝖮𝖥𝖥 আছে 💾", event.threadID, event.messageID);
    }
    fs.writeJsonSync(statusFile, { enabled: false });

    return api.sendMessage(
      "╔═════ஜ۩☢۩ஜ═════╗\n   🔴 𝘼𝙐𝙏𝙊 𝙏𝙄𝙈𝙀 𝙊𝙁𝙁 ⚙️\n   🔐 এখন আর অটো ভিডিও যাবে না🔕\n╚═════ஜ۩۩ஜ═════╝",
      event.threadID,
      event.messageID
    );
  }
};
