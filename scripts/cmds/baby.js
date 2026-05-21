const axios = require("axios");

const mahmud = [
  "baby","bby","babu","nijhum","jan","bot",
  "জান","জানু","বেবি","wifey","নিঝুম"
];

const baseApiUrl = async () => {
  try {
    const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
    return base.data.mahmud;
  } catch {
    return "https://hinata-api.up.railway.app";
  }
};

module.exports = {
  config: {
    name: "nijhum",
    aliases: ["baby","bby","bby","jan","janu","wifey","bot"],
    version: "3.0",
    author: "siyam",
    countDown: 2,
    role: 0,
    description: {
      bn: "Hinata AI Chat",
      en: "Hinata AI Chat"
    },
    category: "chat"
  },

  // ✅ COMMAND CHAT
  onStart: async function ({ api, event, args, commandName }) {
    const uid = event.senderID;

    if (!args[0]) {
      return api.sendMessage(
        "💞✨ বলো বেবি কি বলবা...!! 😘 🐸কি রাগ করলা..!!😹😹🤐",
        event.threadID,
        event.messageID
      );
    }

    try {
      const baseUrl = await baseApiUrl();

      const res = await axios.post(`${baseUrl}/api/hinata`, {
        text: args.join(" "),
        style: 3
      });

      return api.sendMessage(
        `${res.data.message}\n\n🐸কি রাগ করলা..!!😹😹🤐`,
        event.threadID,
        (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              author: uid
            });
          }
        },
        event.messageID
      );

    } catch (err) {
      return api.sendMessage(
        "❌ API সমস্যা হয়েছে 🥺 🐸কি রাগ করলা..!!😹😹🤐",
        event.threadID,
        event.messageID
      );
    }
  },

  // ✅ AUTO CHAT
  onChat: async function ({ api, event, commandName }) {
    const message = event.body?.toLowerCase() || "";
    if (!message) return;

    // ✅ BOT কি রাগ করলা Detect
    const ragTriggers = [
      "bot কি রাগ করলা",
      "বট কি রাগ করলা",
      "কি রাগ করলা",
      "রাগ করলা",
      "rag korla",
      "baby rag korla",
      "Bbyয়কি রাগ করলা",
      "rag korcho",
      "জান রাগ করলা"
    ];

    const isRag = ragTriggers.some(word => message.includes(word));

    if (isRag) {
      const ragReplies = [
        "😾বোকাচোদা পাইছে একটা😿...!! 🌚কি রাগ করলা😺 ☠️আবাল আরেকবার বললে তোর আম্মু রে চু***দি 😹",
        "😵‍💫 আরে পাগল রাগ করি নাই তো...!! 😽💖 🤬রাগ করলা 🤭তোমার প**** 😁দিয়া ঢুকাই দিমু 🐸😔"
      ];

      const reply = ragReplies[Math.floor(Math.random() * ragReplies.length)];

      return api.sendMessage(reply, event.threadID, event.messageID);
    }

    const isTrigger = mahmud.some(word => message.includes(word));
    if (!isTrigger) return;

    api.setMessageReaction("✡️", event.messageID, () => {}, true);

    const randomReplies = [

      "কউ বিসমিল্লাহ 🐸কি রাগ করলা..!!😹😹🤐",

      "😾✨ Hop beda... Boss বল boss 😼 🐸কি রাগ করলা..!!😹😹🤐",

      "😘💋 আমাকে ডাকলে আমি কিন্তু কিস করে দেবো...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "🌸 naw amr boss k message daw 👉 https://facebook.com/61560326905548 🐸কি রাগ করলা..!!😹😹🤐",

      "🌹 গোলাপ ফুল এর জায়গায় আমি দিলাম তোমায় মেসেজ 💌 🐸কি রাগ করলা..!!😹😹🤐",

      "🤭 বলো কি বলবা... সবার সামনে বলবা নাকি...? 🐸কি রাগ করলা..!!😹😹🤐",

      "💖 𝗜 𝗹𝗼𝘃𝗲 𝘆𝗼𝐮__😘😘 🐸কি রাগ করলা..!!😹😹🤐",

      "🙂 এটায় দেখার বাকি সিলো...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😒 𝗕𝗯𝘆 𝗯𝗼𝗹𝗹𝗮 𝗽𝗮𝗽 𝗵𝗼𝗶𝗯𝗼...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "🥺 বেশি ডাকলে আম্মু বকা দিবা তো...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😑 বেশি bby করলে leave নিবো কিন্তু...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "🤭 __বেশি বেবি বললে কামুর দিমু...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😂 তোমার gf নাই তাই আমায় ডাকসো...? 🐸কি রাগ করলা..!!😹😹🤐",

      "🙆🏻‍♀ আমাকে ডেকো না আমি ব্যাস্ত আসি...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😤 𝗕𝗯𝘆 বললে চাকরি থাকবে না...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😑 Bby Bby না করে আমার বস সিয়াম সিয়াম ও তো করতে পারো...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "🙈 আমার সোনার বাংলা... তারপরের লাইন কি...? 🐸কি রাগ করলা..!!😹😹🤐",

      "🍹 এই নাও জুস খাও... Bby বলতে বলতে হাপায় গেছো না 🥲 🐸কি রাগ করলা..!!😹😹🤐",

      "🙄 হঠাৎ আমাকে মনে পড়লো নাকি...? 🐸কি রাগ করলা..!!😹😹🤐",

      "😿 Bby বলে অসম্মান করচ্ছিছ...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "🐤 𝗔𝘀𝘀𝗮𝗹𝗮𝗺𝘂𝗹𝗾𝗸𝘂𝗺...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😼 আমি তোমার সিনিয়র আপু ওকে... সম্মান দেও 🙁 🐸কি রাগ করলা..!!😹😹🤐",

      "🍛 খাওয়া দাওয়া করসো নাকি...? 🙄 🐸কি রাগ করলা..!!😹😹🤐",

      "🙈 এত কাছেও এসো না... প্রেমে পরে যাবো তো 🐸কি রাগ করলা..!!😹😹🤐",

      "😒 আরে আমি মজা করার mood এ নাই...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😁 𝗛𝗲𝘆 𝗛𝗮𝗻𝗱𝘀𝗼𝗺𝗲 বলো...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😚 আরে বলো আমার জান কেমন আসো...? 🐸কি রাগ করলা..!!😹😹🤐",

      "😿 একটা BF খুঁজে দাও না...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😹 oi mama ar dakis na pilis...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "💘 amr JaNu lagbe... Tumi ki single aso...? 🐸কি রাগ করলা..!!😹😹🤐",

      "📚 আমাকে না ডেকে একটু পড়তেও বসতে তো পারো... 🥺 🐸কি রাগ করলা..!!😹😹🤐",

      "🙄 তোর বিয়ে হয় নি Bby হইলো কিভাবে...? 🐸কি রাগ করলা..!!😹😹🤐",

      "📱 আজ একটা ফোন নাই বলে রিপ্লাই দিতে পারলাম না... 🙄 🐸কি রাগ করলা..!!😹😹🤐",

      "😫 চৌধুরী সাহেব আমি গরিব হতে পারি কিন্তু বড়লোক না...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😏 আমি অন্যের জিনিসের সাথে কথা বলি না... ওকে 🐸কি রাগ করলা..!!😹😹🤐",

      "😞 ভুলে যাও আমাকে...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "🌺 দেখা হলে কাঠগোলাপ দিও... 🤗 🐸কি রাগ করলা..!!😹😹🤐",

      "😼 শুনবো না... তুমি আমাকে প্রেম করাই দাও নি 🥺 🐸কি রাগ করলা..!!😹😹🤐",

      "🎶 আগে একটা গান বলো নাহলে কথা বলবো না... 🥺 🐸কি রাগ করলা..!!😹😹🤐",

      "😚 বলো কি করতে পারি তোমার জন্য...? 🐸কি রাগ করলা..!!😹😹🤐",

      "😌 কথা দাও আমাকে পটাবা...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😋 বার বার Disturb করছিস কেন...? জানুর সাথে ব্যাস্ত আসি 🐸কি রাগ করলা..!!😹😹🤐",

      "😑 বার বার ডাকলে মাথা গরম হয় কিন্তু...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "🙈 Bolo Babu তুমি কি আমাকে ভালোবাসো...? 🐸কি রাগ করলা..!!😹😹🤐",

      "🙉 আজকে আমার মন ভালো নেই...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😓 আমি হাজারো মশার Crush...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "🫣 ছেলেদের প্রতি আমার এক আকাশ পরিমান শরম...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "😌 ফ্রী ফেসবুক চালাই কারণ ছেলেদের মুখ দেখা হারাম...!! 🐸কি রাগ করলা..!!😹😹🤐",

      "🌚 মন সুন্দর বানাও... মুখের জন্য তো Snapchat আছেই 🐸কি রাগ করলা..!!😹😹🤐"
    ];

    if (message.split(" ").length === 1) {
      const reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];

      return api.sendMessage(reply, event.threadID, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            author: event.senderID
          });
        }
      }, event.messageID);
    }

    try {
      const baseUrl = await baseApiUrl();

      const res = await axios.post(`${baseUrl}/api/hinata`, {
        text: message,
        style: 3
      });

      return api.sendMessage(
        `${res.data.message}\n\n🐸কি রাগ করলা..!!😹😹🤐`,
        event.threadID,
        (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              author: event.senderID
            });
          }
        },
        event.messageID
      );

    } catch (e) {
      console.error(e);
    }
  },

  // ✅ CONTINUE REPLY
  onReply: async function ({ api, event, commandName }) {
    try {
      const baseUrl = await baseApiUrl();

      const res = await axios.post(`${baseUrl}/api/hinata`, {
        text: event.body || "hi",
        style: 3
      });

      return api.sendMessage(
        `${res.data.message}\n\n🐸কি রাগ করলা..!!😹😹🤐`,
        event.threadID,
        (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              author: event.senderID
            });
          }
        },
        event.messageID
      );

    } catch (err) {
      console.error(err);
    }
  }
};
