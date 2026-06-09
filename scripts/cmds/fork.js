module.exports = {
  config: {
    name: "fork",
    aliases: ["repo", "link"],
    version: "4.0",
    author: "SIYAM",
    countDown: 3,
    role: 0,
    shortDescription: "GOAT BOT V2 Information",
    longDescription: "Shows GOAT BOT V2 information and contact details",
    category: "info",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {
    return message.reply(`⚡━━━━━━━━━━━━━━
💎𝐒𝐈𝐘𝐀𝐌 𝐁𝐎𝐓 𝐕𝟐 • 𝐕𝟑 • 𝐕𝟓💎
━━━━━━━━━━━━━━
📌 কমান্ড দেখতে নিচের কমান্ডগুলো ব্যবহার করুন:
➤ ,𝐡𝐞𝐥𝐩𝟐
— বটের সকল কমান্ড একসাথে  🚀  দেখতে ,𝐡𝐞𝐥𝐩𝐚𝐥𝐥 টাইপ করুন।
━━━━━━━━━━━━━━
🚀 মোট কমান্ড ➜ ৩০০+
🤖 সাপোর্টেড ভার্সন ➜ 𝐕𝟐 • 𝐕𝟑 • 𝐕𝟓
━━━━━━━━━━━━━━━ 

https://mw-legends-chatbot.lovable.app/
`);
  }
};
