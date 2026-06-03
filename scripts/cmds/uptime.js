const fs = require("fs");
const path = require("path");
const Canvas = require("canvas");

// Cache implementation for background images rotation
const CACHE_DIR = path.join(__dirname, "..", "cache");
const CACHE_FILE = path.join(CACHE_DIR, "bg_index.json");

if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}
if (!fs.existsSync(CACHE_FILE)) {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({ index: 0 }, null, 2));
}

// Background images list in sequential order
const bgImages = [
    "https://i.imgur.com/V7MxEiv.jpeg", // 1st Background
    "https://i.imgur.com/P2QgqXv.jpeg", // 2nd Background
    "https://i.imgur.com/hjWdA6L.jpeg"  // 3rd Background (Original)
];

function getNextBackgroundImage() {
    let data = { index: 0 };
    try {
        data = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    } catch (e) {}
    
    const bgImage = bgImages[data.index];
    data.index++;
    
    if (data.index >= bgImages.length) data.index = 0;
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
    return bgImage;
}

module.exports = {
    config: {
        name: "up",
        aliases: ["uptime"],
        version: "2.0",
        author: "SIYAM_HASAN",
        countDown: 5,
        role: 0,
        shortDescription: "Neon Premium Dashboard",
        category: "system"
    },
    onStart: async function ({ message, api, event }) {
        const startTime = Date.now();
        api.setMessageReaction("⏳", event.messageID, () => {}, true);
        try {
            // ================= DATA =================
            const uptime = process.uptime();
            const h = Math.floor(uptime / 3600);
            const m = Math.floor((uptime % 3600) / 60);
            const s = Math.floor(uptime % 60);
            const uptimeStr = `${h}h ${m}m ${s}s`;

            const ping = Date.now() - startTime;
            const memUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
            const memTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2);
            const memPercent = ((memUsed / memTotal) * 100).toFixed(1);

            const cpuUsage = Math.min(
                ((process.cpuUsage().user + process.cpuUsage().system) / 1000000) % 100,
                100
            );
            const nodeVersion = process.version;

            // ================= CANVAS =================
            const canvas = Canvas.createCanvas(1400, 900);
            const ctx = canvas.getContext("2d");

            // ===== Background image rotation =====
            const currentBgUrl = getNextBackgroundImage();
            const bg = await Canvas.loadImage(currentBgUrl);
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

            // Dark overlay
            ctx.fillStyle = "rgba(0,0,0,0.65)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // ================= PROFILE IMAGE =================
            // Replaced with the requested profile picture link
            const avatar = await Canvas.loadImage("https://i.imgur.com/uNsoWXG.jpeg");

            // Position & size
            const avatarX = 1150;
            const avatarY = 110;
            const avatarSize = 150;

            // Circle crop
            ctx.save();
            ctx.beginPath();
            ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            // Draw image
            ctx.drawImage(
                avatar,
                avatarX - avatarSize / 2,
                avatarY - avatarSize / 2,
                avatarSize,
                avatarSize
            );
            ctx.restore();

            // Neon border glow
            ctx.beginPath();
            ctx.arc(avatarX, avatarY, avatarSize / 2, 0, Math.PI * 2);
            ctx.strokeStyle = "#00eaff";
            ctx.lineWidth = 5;
            ctx.shadowColor = "#00eaff";
            ctx.shadowBlur = 25;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // ================= TITLE BOX =================
            ctx.strokeStyle = "#00eaff";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.roundRect(200, 50, 1000, 120, 40);
            ctx.stroke();

            ctx.font = "bold 60px Arial";
            ctx.fillStyle = "#00eaff";
            ctx.textAlign = "center";
            ctx.fillText("SIYAM HASAN", 700, 120);

            // ================= CIRCLE FUNCTION =================
            function drawCircle(x, y, color, title, value) {
                ctx.beginPath();
                ctx.arc(x, y, 100, 0, Math.PI * 2);
                ctx.strokeStyle = color;
                ctx.lineWidth = 8;
                ctx.shadowColor = color;
                ctx.shadowBlur = 20;
                ctx.stroke();
                ctx.shadowBlur = 0;

                ctx.font = "bold 22px Arial";
                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.fillText(title, x, y - 10);

                ctx.font = "bold 28px Arial";
                ctx.fillStyle = color;
                ctx.fillText(value, x, y + 30);
            }

            // ================= 6 CIRCLES =================
            drawCircle(300, 350, "#00eaff", "UPTIME", uptimeStr);
            drawCircle(700, 350, "#ff00ff", "PING", `${ping}ms`);
            drawCircle(1100, 350, "#00ff88", "MEMORY", `${memUsed}MB`);

            drawCircle(300, 650, "#ffd700", "CPU", `${cpuUsage.toFixed(1)}%`);
            drawCircle(700, 650, "#ff4444", "NODE", nodeVersion);
            drawCircle(1100, 650, "#ff8800", "OWNER", "SIYAM");

            // ================= FOOTER =================
            ctx.strokeStyle = "#ff00ff";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.roundRect(200, 780, 1000, 80, 30);
            ctx.stroke();

            ctx.font = "bold 28px Arial";
            ctx.fillStyle = "#ffffff";
            ctx.fillText("GOAT BOT • Premium System Dashboard", 700, 830);

            // ================= SAVE =================
            const filePath = path.join(__dirname, `neon-${Date.now()}.png`);
            fs.writeFileSync(filePath, canvas.toBuffer());

            api.setMessageReaction("✅", event.messageID, () => {}, true);

            await message.reply({
                body: `◢◤━━━━━━━━━━━━━◥◣\n   𝗚𝗢𝗔𝗧 𝗕𝗢𝗧 𝐕𝟐 𝗨𝗣𝗧𝗜𝗠𝗘\n   𝗢𝗪𝗡𝗘𝗥 : 𝆠፝𝐒𝐈𝐘𝐀𝐌\n◥◣━━━━━━━━━━━━━◢◤`,
                attachment: fs.createReadStream(filePath)
            });

            setTimeout(() => fs.unlinkSync(filePath), 5000);
        } catch (err) {
            console.log(err);
            api.setMessageReaction("❌", event.messageID, () => {}, true);
            message.reply("Error generating dashboard");
        }
    }
};
