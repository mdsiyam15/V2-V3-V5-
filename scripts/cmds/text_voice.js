// 😼 Author: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 😼
// ⚠️ নাম চেঞ্জ করলে ফাইল নষ্ট হয়ে যাবে 😾

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const _x1 = "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";
const _x2 = "MR_FARHAN";

// 🔒 hidden protect
const __lock = (() => {
  const a = ["𝆠", "፝", "𝐒", "𝐈", "𝐘", "𝐀", "𝐌"];
  return a.join("");
})();

// 🕒 Cooldown Storage (User ID based)
const userCooldowns = new Map();

module.exports = {
  config: {
    name: "text_voice",
    version: "3.0.0",
    author: _x2,
    countDown: 1,
    role: 0,
    shortDescription: "Ultra Fast Voice Reply",
    longDescription: "Premium Auto Voice System",
    category: "system"
  },

  // =========================
  // 🔒 HIDDEN LOCK SYSTEM
  // =========================
  _s() {
    if (!_x1.includes(__lock)) {
      throw new Error("SYSTEM LOCKED");
    }

    if (
      module.exports.config.author !==
      String.fromCharCode(
        77, 82, 95, 70, 65, 82, 72, 65, 78
      )
    ) {
      throw new Error("AUTHOR CHANGE DETECTED");
    }
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    this._s();

    if (!event.body) return;

    const input = event.body.toLowerCase().trim();
    const senderID = event.senderID;

    // =========================
    // 🎤 VOICE DATABASE
    // =========================
    
    // ১. যেকোনো জায়গায় থাকলে কাজ করবে (Includes)
    const badWordsMap = {
      "ভুদা": "https://files.catbox.moe/gnyx0p.mp3",
      "চুদি তর মাকে": "https://files.catbox.moe/8nhe74.mp4",
      "আসো হাত মারি": "https://files.catbox.moe/8ioph1.mp3",
      "মাদারচোদ চামচা": "https://tmpfiles.org/dl/wwwq6rpmRD0h/upload_1779657408207.mp3"
    };

    // ২. হুবহু একা থাকলে কাজ করবে (Exact Match)
    const exactVoiceMap = {
      "good night": "https://files.catbox.moe/i29m4q.mp3",
      "গুড নাইট": "https://files.catbox.moe/i29m4q.mp3",
      "good morning": "https://files.catbox.moe/8gzqx5.mp3",
      "গুড মর্নিং": "https://files.catbox.moe/8gzqx5.mp3",
      "siyam": "https://files.catbox.moe/9w6moo.mp3",
      "সিয়াম ভাই": "https://files.catbox.moe/9w6moo.mp3",
      "সিয়াম": "https://files.catbox.moe/9w6moo.mp3",
      "@পি্ঁচ্চি্ঁ রি্ঁদ্ঁয়্ঁ ত্যা্ঁহ্ঁ": "https://files.catbox.moe/9w6moo.mp3",
      "@everyone": "https://files.catbox.moe/5myzdz.mp4",
      "নিঝুম": "https://files.catbox.moe/5myzdz.mp4",
      ",sex": "https://files.catbox.moe/uy7mrv.mp3",
      ",hot": "https://files.catbox.moe/m5djca.mp3",
      "s+n": "https://files.catbox.moe/w9doti.mp4",
      "টুকি": "https://files.catbox.moe/e8ebel.mp3",
      "আমি মাদিها": "https://files.catbox.moe/9gyjwp.mp3",
      "নুনু": "https://files.catbox.moe/r5uz42.mp3",
      "🐍": "https://files.catbox.moe/s1k2nx.mp4",
      "✡️": "https://files.catbox.moe/5rdtc6.mp3",
      "মিম তুমারে চুদি": "https://files.catbox.moe/plex4g.mp4",
      "কপি বট": "https://files.catbox.moe/4vmyke.mp4"
    };

    // ৩. র্যান্ডম ভয়েস লিঙ্কের অ্যারে (Exact Match Multi-Trigger)
    const randomVoices = [
      "https://files.catbox.moe/8cxvdg.mp3",
      "https://files.catbox.moe/b5l6nz.mp3",
      "https://files.catbox.moe/gzq54t.mp3",
      "https://files.catbox.moe/uwg21p.mp3",
      "https://files.catbox.moe/x8ina4.mp3",
      "https://files.catbox.moe/3u6shs.mp3"
    ];
    const randomTriggers = ["bot", "জান", "baby", "bby", "বেবি"];

    // =========================
    // 📜 UNIQUE VOICE HELP
    // =========================
    if (input === "voicehelp") {
      const admins = global.GoatBot?.config?.adminBot || [];

      if (!admins.includes(senderID)) {
        return message.reply(" | 🤬এ মাদারচোদ বট তোর বাপের।🙄   🥵তোর আম্মুর বোদা ফাক কর🖕 👉এইটা শুধু আমার বস সিয়াম এর জন্য😻!");
      }

      // ট্রিগারগুলোর লিস্ট গোছানো
      const listBad = Object.keys(badWordsMap);
      const listExact = Object.keys(exactVoiceMap);
      
      let msg = `┏━━━ PREMIUM VOICE SYSTEM ━━━┓\n`;
      msg += `┃ 👑 OWNER : SIYAM HASAN\n`;
      msg += `┃ 🎧 TOTAL : ${listBad.length + listExact.length + randomTriggers.length} Voices\n`;
      msg += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;

      let index = 1;
      
      msg += `┌── 🚫 [ GALI / INCLUDES ]\n`;
      listBad.forEach(t => { msg += `├── ${index++}. ${t}\n`; });
      
      msg += `├── 🎵 [ EXACT MATCH ]\n`;
      listExact.forEach(t => { msg += `├── ${index++}. ${t}\n`; });

      msg += `├── 💖 [ MULTI-VOICE ]\n`;
      randomTriggers.forEach(t => { msg += `├── ${index++}. ${t}\n`; });
      msg += `└─────────────────────────────\n\n`;
      msg += `📱 Contact: +8801789138157`;

      return message.reply(msg);
    }

    // =========================
    // 🛡️ 3 MINUTES COOLDOWN SYSTEM
    // =========================
    let matchedAudioUrl = null;
    let matchedInputKey = null;

    // ১. গালি চেক (Includes)
    for (const key in badWordsMap) {
      if (input.includes(key)) {
        matchedAudioUrl = badWordsMap[key];
        matchedInputKey = key;
        break;
      }
    }

    // ২. সাধারণ ম্যাচ চেক (Exact Match)
    if (!matchedAudioUrl && exactVoiceMap[input]) {
      matchedAudioUrl = exactVoiceMap[input];
      matchedInputKey = input;
    }

    // ৩. র্যান্ডম ভয়েস ম্যাচ চেক (Multi-Trigger Match)
    if (!matchedAudioUrl && randomTriggers.includes(input)) {
      const randomIndex = Math.floor(Math.random() * randomVoices.length);
      matchedAudioUrl = randomVoices[randomIndex];
      matchedInputKey = input;
    }

    // যদি কোনো ট্রিগার ম্যাচ করে, তবে Cooldown চেক করা হবে
    if (matchedAudioUrl) {
      const currentTime = Date.now();
      const cooldownTime = 3 * 60 * 1000; // ৩ মিনিট মিলিসেকেন্ডে

      if (userCooldowns.has(senderID)) {
        const lastUsed = userCooldowns.get(senderID);
        if (currentTime - lastUsed < cooldownTime) {
          // ৩ মিনিট পার না হওয়া পর্যন্ত বট কোনো রেসপন্স করবে না
          return;
        }
      }

      // কোoldown টাইম আপডেট বা সেট করা
      userCooldowns.set(senderID, currentTime);

      // =========================
      // 🎧 AUTO VOICE DISPATCHER
      // =========================
      const cacheDir = path.join(__dirname, "cache", "voices");
      fs.ensureDirSync(cacheDir);

      const ext = matchedAudioUrl.endsWith(".mp4") ? ".mp4" : ".mp3";
      // ফাইলনেম ইউনিক রাখার জন্য অডিও ইউআরএল এর হ্যাশ ব্যবহার করা হয়েছে
      const fileName = Buffer.from(matchedAudioUrl).toString("hex").slice(0, 15) + ext;
      const filePath = path.join(cacheDir, fileName);

      try {
        // ⚡ FAST CACHE
        if (fs.existsSync(filePath)) {
          return await message.reply({
            attachment: fs.createReadStream(filePath)
          });
        }

        // 🌐 DOWNLOAD
        const response = await axios.get(matchedAudioUrl, {
          responseType: "arraybuffer"
        });

        fs.writeFileSync(filePath, Buffer.from(response.data));

        // 📤 SEND
        await message.reply({
          attachment: fs.createReadStream(filePath)
        });

      } catch (e) {
        console.error("Voice Error:", e);
      }
    }
  }
};
