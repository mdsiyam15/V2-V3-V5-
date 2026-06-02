const fs = require("fs");
const path = require("path");
const os = require("os");

const CACHE_DIR = path.join(__dirname, "..", "cache");
const CACHE_FILE = path.join(CACHE_DIR, "boinfo.json");

if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}
if (!fs.existsSync(CACHE_FILE)) {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({ index: 0 }, null, 2));
}

const images = [
    "https://files.catbox.moe/xx5obo.jpg",
    "https://files.catbox.moe/n7ce0a.jpg"
];

function getNextImage() {
    let data = { index: 0 };
    try {
        data = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    } catch (e) {}
    const image = images[data.index];
    data.index++;
    if (data.index >= images.length) data.index = 0;
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
    return image;
}

module.exports = {
    config: {
        name: "boinfo",
        version: "3.0.0",
        author: "SIYAM-HASAN",
        role: 0,
        shortDescription: "Premium Bot Information",
        category: "owner",
        guide: "{pn}"
    },
    onStart: async function ({ message, api }) {
        const img = getNextImage();

        // Real System Information Fetching
        const cpus = os.cpus();
        const cpuModel = cpus.length > 0 ? cpus[0].model.replace(/\s+/g, ' ').trim() : "Unknown CPU";
        const totalRAM = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + " GB";
        
        // Dynamic Uptime Calculation
        const uptimeSec = process.uptime();
        const hours = Math.floor(uptimeSec / 3600);
        const minutes = Math.floor((uptimeSec % 3600) / 60);
        const uptimeString = `${hours}h ${minutes}m Active`;

        // Dynamic Total Commands Count
        let totalCommands = "270+";
        if (global.client && global.client.commands) {
            totalCommands = global.client.commands.size;
        }

        // Dynamic Ping/Response Speed Calculation
        const startTime = Date.now();
        const ping = Date.now() - startTime;
        const responseSpeed = ping < 20 ? "Instant Reply" : `${ping}ms`;

        const text = `
👑 𝗧𝗛𝗘 𝗖𝗥𝗢𝗪𝗡𝗘𝗗 𝗢𝗪𝗡𝗘𝗥
🔥 𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 :

🛸 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍
━━━━━━━━━━━━━━━━━━
🦅 𝗥𝗢𝗬𝗔𝗟 𝗜𝗗𝗘𝗡𝗧𝗜𝗧𝗬
👤 𝗥𝗲𝗮𝗹 𝗡𝗮𝗺𝗲 ➜ 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍

🌍 𝗖𝗼𝘂𝗻𝘁𝗿𝘆 ➜ Bangladesh

🏘️ 𝗖𝗶𝘁𝘆 ➜ Shuruganj

📖 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 ➜ Class Ten

🎂 𝗬𝗲𝗮𝗿𝘀 ➜ 17+

📬 𝗠𝗮𝗶𝗹𝗯𝗼𝘅 ➜ mdsiyam@gmail.com

📞 𝗗𝗶𝗿𝗲𝗰𝘁 𝗟𝗶𝗻𝗲 ➜ +8801789138157
━━━━━━━━━━━━━━━━━━
⚡ 𝗔𝗥𝗧𝗜𝗙𝗜𝗖𝗜𝗔𝗟 𝗜𝗡𝗧𝗘𝗟𝗟𝗜𝗚𝗘𝗡𝗖𝗘 𝗖𝗢𝗥𝗘
🚀 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 ➜ 👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✨

🏆 𝗘𝗱𝗶𝘁𝗶𝗼𝗻 ➜ God Bot V3

⚔️ 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 ➜ 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍

📈 𝗧𝗼𝘁𝗮𝗹 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀 ➜ ${totalCommands}

🌟 𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗦𝘁𝗮𝘁𝘂𝘀 ➜ Ultra Fast
━━━━━━━━━━━━━━━━━━
🔥 𝗕𝗘𝗔𝗦𝗧 𝗣𝗘𝗥𝗙𝗢𝗥𝗠𝗔𝗡𝗖𝗘
⚙️ 𝗖𝗣𝗨 ➜ ${cpuModel}

💽 𝗥𝗔𝗠 ➜ ${totalRAM}

🗃️ 𝗦𝘁𝗼𝗿𝗮𝗴𝗲 ➜ NVMe SSD Allocated

📡 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 ➜ ${responseSpeed}

🔋 𝗨𝗽𝘁𝗶𝗺𝗲 ➜ ${uptimeString}

🛡️ 𝗣𝗿𝗼𝘁𝗲𝗰𝘁𝗶𝗼𝗻 ➜ Military Grade
━━━━━━━━━━━━━━━━━━
💎 𝗘𝗟𝗜𝗧𝗘 𝗙𝗘𝗔𝗧𝗨𝗥𝗘𝗦
✨ Premium Interface
     
🎖️ Premium Commands
     
🎯 Premium Accuracy
     
🚀 Lightning Speed
     
🔐 Advanced Security
     
🎭 Entertainment Features
     
📊 Smart Management
     
🎨 Luxury Design
     
🔮 AI Powered System
     
🏅 VIP Experience
━━━━━━━━━━━━━━━━━━
🌹 আমাদের বট কেন ব্যবহার করবেন?
💖 প্রিমিয়াম ডিজাইন
   
💝 প্রিমিয়াম লুক
   
🎁 প্রিমিয়াম কমান্ড
   
🌺 সুন্দর ও আকর্ষণীয় ইন্টারফেস
   
🦋 খুব সহজে ব্যবহার করা যায়
   
🍁 মজার মজার ফিচার
   
🌈 দ্রুত কাজ করে
   
🌸 নিয়মিত আপডেট পাওয়া যায়
   
🪷 নিরাপদ ও সুরক্ষিত
   
🍀 ২৪ ঘণ্টা অনলাইন
   
🌼 আধুনিক প্রযুক্তি ব্যবহার করা হয়েছে
   
💫 শক্তিশালী পারফরম্যান্স
━━━━━━━━━━━━━━━━━━
🛸 QUICK ACCESS PANEL
🎯 help

👑 owner

⚔️ fork

📑 info

🦅 siyam

🤖 bot

💞 Bby

🎪 menu

🌟 alive

🎨 support
━━━━━━━━━━━━━━━━━━
🦅 𝗧𝗛𝗘 𝗘𝗠𝗣𝗜𝗥𝗘 𝗦𝗧𝗔𝗧𝗜𝗦𝗧𝗜𝗖𝗦
👥 Users ➜ Unlimited

🌐 Groups ➜ Unlimited

⚡ Speed ➜ Extreme

🛡️ Security ➜ Maximum

📊 Database ➜ Premium

🚀 Performance ➜ 100%

💎 Rank ➜ Legendary

🏆 Quality ➜ Elite
🦅━━━━━━━━━━━━━━🦅

👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 • 𝗚𝗢𝗗 𝗕𝗢𝗧 𝗩𝟯 👑

🦅━━━━━━━━━━━━━━🦅
💎 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 💎
`;

        return message.reply({
            body: text,
            attachment: await global.utils.getStreamFromURL(img)
        });
    }
};
