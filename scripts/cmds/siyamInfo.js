const fs = require("fs");
const axios = require("axios");
const path = require("path");

// ⏱️ USER COOLDOWN (3 Minutes = 180,000 Milliseconds)
const USER_COOLDOWN = 3 * 60 * 1000;
const lastReplyUser = {};

module.exports = {
  config: {
    name: "siyaminfo",
    aliases: ["siyam"],
    version: "20.3",
    author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    countDown: 1,
    role: 0,
    shortDescription: "ROYAL SIYAM INFO with user cooldown",
    longDescription: "PREMIUM AUTO INFO SYSTEM WITH HD API AND 3 MIN COOLDOWN",
    category: "info"
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {

    if (!event.body) return;

    const senderID = String(event.senderID);

    // 🤖 IGNORE BOT SELF
    if (senderID == api.getCurrentUserID()) return;

    const triggerWords = [
      "*সিয়াম",
      "*সিয়াম ভাই",
      "*siyam",
      "*Siyam",
      "*SIYAM",
      "*siyam hasan",
      "*siyam vai"
    ];

    const body = event.body.trim();

    // শুধু ট্রিগার একা থাকলে কাজ করবে (Exact Match)
    const matched = triggerWords.some(
      word => body.toLowerCase() === word.toLowerCase()
    );

    if (!matched) return;

    // ⏱️ INDIVIDUAL USER COOLDOWN CHECK
    const now = Date.now();
    if (lastReplyUser[senderID] && (now - lastReplyUser[senderID] < USER_COOLDOWN)) {
      return; // ৩ মিনিট পার না হলে কোড এখানেই থেমে যাবে, কোনো রেসপন্স করবে না।
    }

    // ⏱️ SET COOLDOWN FOR THIS USER
    lastReplyUser[senderID] = now;

    api.setMessageReaction("🖕", event.messageID, () => {}, true);

    // STYLE ROTATION
    if (!global.siyamStyle) global.siyamStyle = 0;

    global.siyamStyle++;

    if (global.siyamStyle > 4) {
      global.siyamStyle = 1;
    }

    const style = global.siyamStyle;

    // IMAGE SYSTEM
    async function getHDImage() {
      try {
        const images = [
          "https://files.catbox.moe/yeka3n.jpg",
          "https://files.catbox.moe/76jrsr.jpg"
        ];

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const response = await axios.get(randomImage, {
          responseType: "arraybuffer"
        });

        return response.data;
      } catch (err) {
        console.log("Image Error:", err);
        return null;
      }
    }

    // CACHE SYSTEM
    const cacheDir = path.join(__dirname, "cache");

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const cachePath = path.join(cacheDir, `siyam_${Date.now()}.jpg`);

    const imageBuffer = await getHDImage();

    if (!imageBuffer) {
      return api.sendMessage(
        "❌ Image load failed!",
        event.threadID,
        event.messageID
      );
    }

    fs.writeFileSync(cachePath, imageBuffer);

    const attachment = fs.createReadStream(cachePath);

    // 4 DESIGNS
    const designs = [
`╭━━━〔👑〕━━━╮
  🛸𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍🛸 
╰━━━〔👑〕━━━╯
🌺 𝐍𝐚𝐦𝐞 ➤ তোরা
🏠 𝐋𝐢𝐯𝐞𝐬 ➤ কিশোরগঞ্জ, বাংলাদেশ
📚 𝐒𝐭𝐮𝐝𝐞𝐧𝐭 ➤ ক্লাস ১০
🎂 𝐀𝐠𝐞 ➤ ১৭+
🏫 𝐒𝐜𝐡𝐨𝐨运行 ➤ এন এ মান্নান মানিক উচ্চ বিদ্যালয়
💌 𝐀𝐛𝐨𝐮𝐭 𝐌𝐞 :
❝ শান্ত থাকতে ভালোবাসি,
কারণ আমার attitude-ই
আমার সবচেয়ে বড় পরিচয়। ❞
💎🦋🌹✨💖🌙🔥
༺═───────────═༻`,

`╭〔 👑 𝐑𝐎𝐘𝐀𝐋 𝐊𝐈𝐍𝐆 👑 〕╮
   🦅 𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍 🦅
  ╰━━━━━━━━━━━━━━━━╯

✦･ﾟ: *✧･ﾟ:* 💎 𝐄𝐋𝐈𝐓𝐄 𝐈𝐃𝐄𝐍𝐓𝐈𝐓𝐘 💎 *:･ﾟ✧*:･ﾟ✦

┏━━━━━━━━━━━━━━━━┓
┃ 👤 𝐍𝐀𝐌𝐄      ➤ 𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍
┃ 🌏 𝐂𝐎𝐔𝐍𝐓𝐑𝐘   ➤ 𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇
┃ 🏙️ 𝐃𝐈𝐒𝐓𝐑𝐈𝐂𝐓  ➤ 𝐊𝐈𝐒𝐇𝐎𝐑𝐄𝐆𝐀𝐍𝐉
┃ 📚 𝐒𝐓𝐔𝐃𝐄𝐍𝐓  ➤ 𝐂𝐋𝐀𝐒𝐒 𝟏𝟎
┃ 🎂 𝐀𝐆𝐄       ➤ 𝟏𝟕+
┃ 📱 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 ➤ +𝟖𝟖𝟎𝟏𝟕𝟖𝟗𝟏𝟑𝟖𝟏𝟓𝟕
┗━━━━━━━━━━━━━━━━┛

⚜️ 🔥 𝐋𝐈𝐅𝐄 𝐒𝐓𝐘𝐋𝐄 🔥 ⚜️

🚀 𝐃𝐑𝐄𝐀𝐌 ➤ 𝐁𝐄𝐂𝐎𝐌𝐄 𝐒𝐎𝐌𝐄𝐓𝐇𝐈𝐍𝐆 𝐆𝐑𝐄𝐀𝐓
🦅 𝐌𝐈𝐍𝐃 ➤ 𝐀𝐋𝐖𝐀𝐘𝐒 𝐅𝐎𝐂𝐔𝐒𝐄𝐃
👑 𝐒𝐓𝐀𝐓𝐔𝐒 ➤ 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐁𝐎𝐘
💎 𝐕𝐈𝐁𝐄 ➤ 𝐑𝐎𝐘𝐀𝐋 𝐀𝐍𝐃 𝐂𝐋𝐀𝐒𝐒𝐘

╔═══════════════╗
      🖤 𝐀𝐓𝐓𝐈𝐓𝐔𝐃𝐄 🖤
╚═══════════════╝

❝ 𝐈 𝐀𝐌 𝐍𝐎𝐓 𝐀 𝐂𝐎𝐏𝐘,
𝐈 𝐀𝐌 𝐓𝐇𝐄 𝐎𝐑𝐈𝐆𝐈𝐍𝐀𝐋.

𝐈 𝐃𝐎𝐍 𝐓 𝐅𝐎𝐋𝐋𝐎𝐖 𝐓𝐑𝐄𝐍𝐃𝐒,
𝐈 𝐂𝐑𝐄𝐀𝐓𝐄 𝐓𝐇𝐄𝐌. ❞`,

`╭💎 𝆠፝𝐒𝐈𝐘𝐀𝐌 𝐄𝐌𝐏𝐈𝐑𝐄 💎 ╮

🌹 নাম ➤ উদয় হাসান
🌍 দেশ ➤ বাংলাদেশ
🏡 ঠিকানা ➤ কিশোরগঞ্জ
📚 শ্রেণী ➤ নিউ টেন
🎂 বয়স ➤ ১৭+
🏫 বিদ্যালয় ➤
এন এ মান্নান মানিক উচ্চ বিদ্যালয়

🌸 𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋 𝐏𝐑𝐎𝐅𝐈𝐋𝐄 🌸

💫 উক্তি :

❝ আমি কারো মতো হতে চাই না,
কারণ আমার নিজের পরিচয়ই যথেষ্ট।

মানুষ আমাকে পছন্দ করুক বা না করুক,
আমি সবসময় নিজের মতোই থাকি। ❞
━━━༺ 🛸 ༻━━━`,

`╭━━━〔 💎 〕━━━╮
 ╔═━━✦❘༻ 👑 ༺❘✦━━═╗
         🛸𝕾𝖎𝖞𝖆𝖒 𝕰𝖒𝖕𝖎𝖗𝖊🛸
╚═━━✦❘༻ 💎 ༺❘✦━━═╝

🌟 𝕺𝖂𝕹𝕰𝕽 ➤ 𝕾𝖎𝖞𝖆𝖒 𝕳𝖆𝖘𝖆𝖓
🏡 𝕬𝕯𝕯𝕽𝕰𝕾𝕾 ➤ 𝕶𝖎𝖘𝖍𝖔𝖗𝖊𝖌𝖆𝖓𝖏, 𝕭𝖆𝖓𝖌𝖑𝖆𝖉𝖊𝖘𝖍
📚 𝕾𝕿𝖀𝕯𝖄 ➤ 𝕹𝖊𝖜 𝕿𝖊健全
🎂 𝕬𝕲𝕰 ➤ 17+
🏫 𝕾𝕮𝕳𝕺𝕺𝕷 ➤ 𝕹.𝕬. 𝕸𝖆𝖓𝖓𝖆𝖓 𝕸𝖆𝖓𝖎𝖐 𝕳𝖎𝖌𝖍 𝕾𝖈𝖍𝖔𝖔狠

╭──── ⚜️ ────╮
🔥 𝕸𝖄 𝖁𝕴𝕭𝕰 🔥
╰─────⚜️ ───╯

❝
𝕴 𝕯𝕺𝕹'𝕿 𝕹𝕰𝕰𝕯
𝕿𝕺 𝕻𝕽𝕺𝖂𝕰 𝕸𝖄 𝖂𝕺𝕽𝕿𝕳.

𝕸𝖄 𝖂𝖀𝕮𝕮𝕰𝕾𝕾
𝕾𝕻𝕰𝕬𝕶𝕾 𝕱𝕺𝕽 𝕸𝖰.
❞

🖤⚜️👑💎🔥🌙✨🦅💫🥀

▬▬▬▬▬▬▬▬▬▬▬`
    ];

    return api.sendMessage(
      {
        body: designs[style - 1],
        attachment
      },
      event.threadID,
      () => {
        try {
          fs.unlinkSync(cachePath);
        } catch (e) {
          console.log("Unlink Error:", e);
        }
      },
      event.messageID
    );
  }
};
