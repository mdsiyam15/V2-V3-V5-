const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "filecmd",
    aliases: ["file"],
    version: "1.1",
    author: "FARHAN-KHAN",
    countDown: 5,
    role: 2,
    shortDescription: "View code of a command",
    longDescription: "View the raw source code of any command in the commands folder",
    category: "owner",
    guide: "{pn} <commandName>"
  },

  onStart: async function ({ args, message }) {

    // 🔐 ADMIN CHECK
    if (message.role !== 2) {

      const replies = [
`
👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
😾 কিরে ফাইল কি  তোর? 😼
🙄 বাপে বানাইছে আবালচোদা 🖕
          👑 𝆠፝𝐍𝐈𝐉𝐇𝐔𝐌-𝐁𝐎𝐓 👑
`,

`
👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
😼 এই ফাইল কমান্ড টা তোর জন্য না 
🫵 শুধু  তোর বাপ 😾 𝆠፝𝐒𝐈𝐘𝐀𝐌-এর জন্য 🪬
          👑 𝆠፝𝐍𝐈𝐉𝐇𝐔𝐌-𝐁𝐎𝐓 👑
`,

`
👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
😾  পুটকিমারা দে 🖕গা 🥵
🥵 এইটা  তোর বাপের জন্য 😵
          👑 𝆠፝𝐍𝐈𝐉𝐇𝐔𝐌-𝐁𝐎𝐓 👑
`,

`
👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
😼 মাদারচোদ তোর বোনরে বিয়া দিবি🙅‍♂️
🔐  তাহলে ফাইল দিব আগে চোদবো🖕
          👑 𝆠፝𝐍𝐈𝐉𝐇𝐔𝐌-𝐁𝐎𝐓 👑
`
      ];

      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return message.reply(randomReply);
    }

    // 📌 COMMAND NAME CHECK
    const cmdName = args[0];
    if (!cmdName) {
      return message.reply("❌ | Please provide the command name.\nExample: filecmd fluxsnell");
    }

    const cmdPath = path.join(__dirname, `${cmdName}.js`);

    if (!fs.existsSync(cmdPath)) {
      return message.reply(`❌ | Command "${cmdName}" not found in this folder.`);
    }

    try {
      const code = fs.readFileSync(cmdPath, "utf8");

      if (code.length > 19000) {
        return message.reply("⚠️ | This file is too large to display.");
      }

      return message.reply({
        body: `📄 | Source code of "${cmdName}.js":\n\n${code}`
      });

    } catch (err) {
      console.error(err);
      return message.reply("❌ | Error reading the file.");
    }
  }
};
