const Canvas = require("canvas");
const fs = require("fs-extra");
const path = require("path");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "uptime2",
    aliases: ["upt2", "up2", "rtm2"],
    version: "12.0",
    author: "SIYAM",
    countDown: 5,
    role: 0,

    shortDescription: {
      en: "Stylish uptime system"
    },

    longDescription: {
      en: "Show bot uptime with premium canvas"
    },

    category: "system",

    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {

    const react = (emoji) =>
      api.setMessageReaction(
        emoji,
        event.messageID,
        () => {},
        true
      );

    try {

      react("🥵");

      // Time & Date
      const time = moment
        .tz("Asia/Dhaka")
        .format("hh:mm A");

      const date = moment
        .tz("Asia/Dhaka")
        .format("dddd, DD MMMM YYYY");

      // Uptime
      const uptime = process.uptime();

      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      // Commands Auto Count
      const totalCommands =
        global.GoatBot?.commands?.size ||
        global.client?.commands?.size ||
        Object.keys(global.client?.commands || {}).length ||
        0;

      // Prefix Auto
      const prefix =
        global.GoatBot?.config?.prefix ||
        global.config?.PREFIX ||
        ".";

      // Bot Name
      const botName =
        global.GoatBot?.config?.botName ||
        global.config?.BOTNAME ||
        "SIYAM HASAN";

      // Canvas
      const canvas = Canvas.createCanvas(900, 500);
      const ctx = canvas.getContext("2d");

      // Background
      const bg = ctx.createLinearGradient(0, 0, 900, 500);
      bg.addColorStop(0, "#0f0f0f");
      bg.addColorStop(1, "#1c1c1c");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 900, 500);

      // Border
      ctx.strokeStyle = "#00ffcc";
      ctx.lineWidth = 5;
      ctx.strokeRect(15, 15, 870, 470);

      // Title
      ctx.fillStyle = "#00ffcc";
      ctx.font = "bold 42px Arial";
      ctx.fillText(botName, 280, 70);

      // Info Box
      ctx.fillStyle = "#ffffff";
      ctx.font = "28px Arial";

      ctx.fillText(`⏰ Real Time : ${time}`, 70, 150);
      ctx.fillText(`📅 Real Date : ${date}`, 70, 210);

      ctx.fillText(
        `⏳ Uptime : ${days}D ${hours}H ${minutes}M ${seconds}S`,
        70,
        270
      );

      ctx.fillText(
        `🤖 Total Commands : ${totalCommands}`,
        70,
        330
      );

      ctx.fillText(
        `⚡ Bot Prefix : ${prefix}`,
        70,
        390
      );

      ctx.fillText(
        `✅ Status : Active`,
        70,
        450
      );

      // Progress Bar
      const percent = Math.min(
        100,
        (uptime / 86400) * 100
      );

      ctx.fillStyle = "#333";
      ctx.fillRect(520, 420, 280, 30);

      ctx.fillStyle = "#00ff00";
      ctx.fillRect(
        520,
        420,
        (280 * percent) / 100,
        30
      );

      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect(520, 420, 280, 30);

      // Cache Folder
      const cachePath = path.join(__dirname, "cache");

      if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath, {
          recursive: true
        });
      }

      // Image Path
      const imagePath = path.join(
        cachePath,
        `uptime_${Date.now()}.png`
      );

      // Save
      fs.writeFileSync(
        imagePath,
        canvas.toBuffer("image/png")
      );

      react("✅");

      // Send Message
      await api.sendMessage(
        {
          body:
`╭━━━〔 ${botName} 〕━━━╮

⏰ 𝗥𝗘𝗔𝗟 𝗧𝗜𝗠𝗘
├‣ ${time}

📅 𝗥𝗘𝗔𝗟 𝗗𝗔𝗧𝗘
├‣ ${date}

🤖 𝗕𝗢𝗧 𝗦𝗧𝗔𝗧𝗨𝗦
├‣ Total Commands : ${totalCommands}
├‣ Bot Prefix : ${prefix}
├‣ Uptime : ${days}D ${hours}H ${minutes}M ${seconds}S
╰‣ Status : Active ✅`,
          attachment: fs.createReadStream(imagePath)
        },
        event.threadID,
        () => fs.unlinkSync(imagePath),
        event.messageID
      );

    } catch (err) {

      console.log(err);

      react("❌");

      api.sendMessage(
        `⚠️ | SIYAM UPTIME ERROR\n${err.message}`,
        event.threadID,
        event.messageID
      );
    }
  }
};
