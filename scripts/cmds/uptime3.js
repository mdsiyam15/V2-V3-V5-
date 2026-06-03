const axios = require("axios");
const os = require("os");

module.exports = {
    config: {
        name: "up3",
        aliases: ["uptime3", "status", "dashboard"],
        version: "9.5.0",
        author: "SIYAM_HASAN",
        countDown: 5,
        role: 0,
        shortDescription: "Ultra Premium Cyber Eagle Dashboard",
        category: "system"
    },

    onStart: async function ({ message, api, event }) {
        api.setMessageReaction("⏳", event.messageID, () => {}, true);
        const loadingMessage = await message.reply("⚙️ 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐈𝐍𝐆 𝐓𝐎 𝐂𝐘𝐁𝐄𝐑 𝐂𝐎𝐑𝐄 𝐒𝐘𝐒𝐓𝐄𝐌...");

        try {
            const uptimeSec = process.uptime();
            const days = Math.floor(uptimeSec / (3600 * 24)).toString().padStart(2, '0');
            const hours = Math.floor((uptimeSec % (3600 * 24)) / 3600).toString().padStart(2, '0');
            const minutes = Math.floor((uptimeSec % 3600) / 60).toString().padStart(2, '0');
            const seconds = Math.floor(uptimeSec % 60).toString().padStart(2, '0');

            const tzOptions = { timeZone: 'Asia/Dhaka' };
            const now = new Date();
            const liveDate = now.toLocaleDateString('en-US', { ...tzOptions, year: 'numeric', month: 'long', day: 'numeric' });
            const liveTime = now.toLocaleTimeString('en-US', { ...tzOptions, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

            const totalRAM = os.totalmem();
            const freeRAM = os.freemem();
            const usedRAM = totalRAM - freeRAM;
            const ramPercent = Math.round((usedRAM / totalRAM) * 100);
            const usedRAM_GB = (usedRAM / (1024 * 1024 * 1024)).toFixed(2);
            const totalRAM_GB = (totalRAM / (1024 * 1024 * 1024)).toFixed(2);

            const cpus = os.cpus();
            const loadAvg = os.loadavg();
            let cpuPercent = Math.round((loadAvg[0] / cpus.length) * 100);
            if (isNaN(cpuPercent) || cpuPercent <= 0) cpuPercent = 15;

            const totalCommands = global.client && global.client.commands ? global.client.commands.size : "270+";
            const cyberEagleImageUrl = "https://i.imgur.com/FpAf1wQ.jpeg";

            // Image stream downloader
            const response = await axios.get(cyberEagleImageUrl, { responseType: 'stream' });

            const dashboardText = `👑 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 : 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍\n\n🦅 𝗖𝗬𝗕𝗘𝗥 𝗘𝗔𝗚𝗟𝗘 𝗦𝗬𝗦𝗧𝗘𝗠 𝗗𝗔𝗦𝗛𝗕𝗢𝗔𝗥𝗗 🦅\n\n📅 Date ➜ 🍏 ${liveDate}\n⏰ Time ➜ ⏰ ${liveTime}\n━━━━━━━━━━━━━━━━━\n⏳ [ 𝗕𝗢𝗧 𝗥𝗨𝗡𝗡𝗜𝗡𝗚 𝗨𝗣𝗧𝗜𝗠𝗘 ]\n⭕ 𝗗𝗮𝘆𝘀 ➜ 🔴 ${days} Days\n⭕ 𝗛𝗼𝘂𝗿𝘀 ➜ 🟡 ${hours} Hours\n⭕ 𝗠𝗶𝗻𝘂𝘁𝗲𝘀 ➜ 🟢 ${minutes} Minutes\n⭕ 𝗦𝗲𝗰𝗼𝗻𝗱𝘀 ➜ 🔵 ${seconds} Seconds\n━━━━━━━━━━━━━━━━━━\n🛡️ [ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗛𝗔𝗥𝗗𝗪𝗔𝗥𝗘 𝗖𝗢𝗥𝗘 ]\n⚙️ 𝗖𝗣𝗨 𝗟𝗼𝗮𝗱 ➜ ⚡ ${cpuPercent}% Active\n💽 𝗥𝗔𝗠 𝗨𝘀𝗲𝗱 ➜ 🧬 ${ramPercent}% [${usedRAM_GB} / ${totalRAM_GB} GB]\n📈 𝗧𝗼𝘁𝗮𝗹 𝗖𝗺𝗱 ➜ 🔮 ${totalCommands} Loaded\n\n💎 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 🛸𝐒𝐈𝐘𝐀𝐌-𝐇𝗔𝐒𝐀𝐍 💎`;

            await message.reply({ body: dashboardText, attachment: response.data });
            api.setMessageReaction("✅", event.messageID, () => {}, true);
            api.unsendMessage(loadingMessage.messageID);

        } catch (err) {
            console.error(err);
            api.unsendMessage(loadingMessage.messageID);
            message.reply(`❌ Error: ${err.message}`);
        }
    }
};
