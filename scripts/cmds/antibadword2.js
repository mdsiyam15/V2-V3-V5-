// 😼 Author: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 😼
// ⚠️ নাম চেঞ্জ করলে ফাইল নষ্ট হয়ে যাবে ভাই 😾

const AUTHOR_LOCK = "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";
const VISIBLE_AUTHOR = "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";

if (VISIBLE_AUTHOR !== AUTHOR_LOCK) {
  throw new Error("🚫 AUTHOR LOCK BROKEN!");
}

if (!global.antibadword2Data) {
  global.antibadword2Data = {};
}

module.exports = {
  config: {
    name: "antibadword2",
    version: "5.0",
    author: AUTHOR_LOCK,
    role: 1,
    category: "group",
    shortDescription: {
      en: "Anti badword system"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const tid = event.threadID;

      if (!global.antibadword2Data[tid]) {
        global.antibadword2Data[tid] = {
          enabled: false,
          warnedUsers: {},
          stoppedUsers: {}
        };
      }

      const input = (args[0] || "").toLowerCase();

      if (input === "on") {
        global.antibadword2Data[tid].enabled = true;

        return api.sendMessage(
          `👑 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑

✅ ANTI BADWORD SYSTEM ENABLED ✅

🛡️ গ্রুপে এখন খারাপ ভাষা চেক করা হবে 🔐।`,
          tid
        );
      }

      if (input === "off") {
        global.antibadword2Data[tid].enabled = false;

        return api.sendMessage(
          `👑 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑

❌ ANTI BADWORD SYSTEM DISABLED ❌

🔕 এখন আর খারাপ ভাষার Warning দিবে না 🛡️।`,
          tid
        );
      }

      return api.sendMessage(
        `⚙️ ব্যবহার:

fuck on
fuck off`,
        tid
      );

    } catch (e) {
      console.log(e);
    }
  },

  onChat: async function ({ api, event }) {
    try {

      const tid = event.threadID;
      const uid = event.senderID;

      if (!global.antibadword2Data)
        global.antibadword2Data = {};

      if (!global.antibadword2Data[tid]) {
        global.antibadword2Data[tid] = {
          enabled: false,
          warnedUsers: {},
          stoppedUsers: {}
        };
      }

      const data = global.antibadword2Data[tid];

      // ❌ SYSTEM OFF
      if (!data.enabled) return;

      // ❌ STOPPED USER
      if (data.stoppedUsers[uid]) return;

      const badWords = [
        "fuck", "bitch", "sex", "shit", "asshole",
        "porn", "bastard",
        "মাগি", "খানকি", "চুদি", "চুদ", "বাল",
        "বোকাচোদা", "মাদারচোদ", "হারামি",
        "madarchod", "bokachoda", "khanki"
      ];

      const body = (event.body || "").toLowerCase();

      if (!body) return;

      const match = badWords.some(word => body.includes(word));

      if (!match) return;

      // =========================
      // 👤 USER INFO
      // =========================
      let name = "User";

      try {
        const info = await api.getUserInfo(uid);
        name = info[uid]?.name || "User";
      } catch {}

      // =========================
      // 👑 ADMIN CHECK
      // =========================
      let isAdmin = false;

      try {

        const threadInfo = await api.getThreadInfo(tid);

        const adminIDs = threadInfo.adminIDs.map(a => a.id);

        const botAdmins =
          global.GoatBot.config.adminBot || [];

        if (
          adminIDs.includes(uid) ||
          botAdmins.includes(uid)
        ) {
          isAdmin = true;
        }

      } catch (e) {
        console.log("Admin Check Error:", e);
      }

      // =========================
      // ⚠️ WARNING STORAGE
      // =========================
      if (!data.warnedUsers[uid]) {
        data.warnedUsers[uid] = 0;
      }

      data.warnedUsers[uid]++;

      const count = data.warnedUsers[uid];

      // =================================================
      // 👑 ADMIN SYSTEM
      // =================================================
      if (isAdmin) {

        // 👑 ৩ বার পর্যন্ত নোটিশ
        if (count <= 3) {

          return api.sendMessage(

`👑 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑

👑 ADMIN NOTICE 👑

🕌 আসসালামু আলাইকুম ${name}

⚠️ আপনি একজন এডমিন🔐 হয়ে 🤷।

🚫 গ্রুপে খারাপ 📢ভাষা ব্যবহার করছেন 😾 এটা ঠিক না।🛡️

💖 সবাইকে 🪬সুন্দরভাবে কথা 🔮বলার 🪤অনুরোধ রইলো📣।

📌 Admin Notice: ${count}/3`,
            tid
          );
        }

        // 👑 ৩ বারের পরে আর কিছু বলবে না
        data.stoppedUsers[uid] = true;
        return;
      }

      // =================================================
      // 👤 NORMAL USER SYSTEM
      // =================================================

      // ⚠️ WARNING 1 & 2
      if (count < 3) {

        return api.sendMessage(

`👑 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑

⚠️ WARNING ${count}/3 ⚠️

👤 User : ${name}

🚫 গ্রুপে গালিগালাজ করা নিষিদ্ধ ❎।

📌 Remaining Warning : ${3 - count}

⚡ আবার খারাপ 🔐ভাষা ব্যবহার করলে🪬সম্মানের সহিত🛡️🦶লাথি দিয়ে বাহির করা হবে🙌🫶 ।`,
          tid
        );
      }

      // 🚫 FINAL REMOVE
      api.sendMessage(

`👑 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑

🚫 AUTO REMOVE SYSTEM 🚫

👤 User : ${name}

❌ ৩ বার গালিগালাজ করার কারণে🔐আপনাকে গ্রুপ থেকে🪬Remove করা হচ্ছে🛡️।`,
        tid,

        async () => {

          try {

            await api.removeUserFromGroup(uid, tid);

            // 🗑️ RESET WARNING
            delete data.warnedUsers[uid];

          } catch (e) {

            api.sendMessage(

`👑 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑

❌ এডমিন ভাইয়া 🫶অথবা আপু 🙌 🪬আগে আমাকে মানে🪤 বট কে 🤷 গ্রুপ এডমিন দাও🛡️🔮.`,
              tid
            );

          }

        }
      );

    } catch (err) {

      console.log("AntiBadword Error:", err);

    }
  }
};
