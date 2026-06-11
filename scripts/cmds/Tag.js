let tagStates = {};

module.exports = {
  config: {
    name: "tag",
    version: "3.7",
    author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    role: 0,
    category: "GROUP",
    shortDescription: "Auto tag members with custom styles",
    longDescription: "tag on = চালু, tag off = বন্ধ।",
    guide: "tag on / tag off"
  },

  onStart: async function () {},

  onChat: async function ({ api, event }) {
    try {
      const body = event.body?.toLowerCase().trim();
      const threadID = event.threadID;

      if (body === "tag on") {
        if (tagStates[threadID]?.running) return api.sendMessage("সিয়াম ভাই ⚠️অলরেডি ট্যাগ চালু আছে!", threadID);
        tagStates[threadID] = { running: true };
        api.sendMessage("✅ সিয়াম ভাই ট্যাগ সিস্টেম চালু হয়েছে! অফ করতে tag off টাইপ করো", threadID);
        this.startTagLoop(api, threadID);
        return;
      }

      if (body === "tag off") {
        tagStates[threadID].running = false;
        return api.sendMessage("❌ ট্যাগ সিস্টেম অফ করা হয়েছে। সিয়াম ভাই ☺️", threadID);
      }
    } catch (err) { api.sendMessage("Error: " + err.message, event.threadID); }
  },

  startTagLoop: async function (api, threadID) {
    const baseMessages = [
      "𓆩👑𓆪✧𝕾𝖎𝖞𝖆𝖒 𖣘 𝕳𝖆𝖘𝖆𝖓✧𓆩👑𓆪\n╰┈➤ 💎 সবাই কি মরে গেছো? অনলাইনে আসো! 💎",
      "༺⚜️𝐒𝐈𝐘𝐀𝐌 ✦ 𝐇𝐀𝐒𝐀𝐍⚜️༺\n╰┈➤ ✨ সবাই একটু গ্রুপে অ্যাক্টিভ হও তো! ✨",
      "𓆩🔥𓆪 ༒𝑺𝒊𝒚𝒂𝒎 ༒ 𝑯𝒂𝒔𝒂𝒏༒ 𓆩🔥𓆪\n╰┈➤ 💥 গ্রুপটা পুরো শ্মশান হয়ে আছে, আগুন জ্বালাও! 💥",
      "༒☠️𝓢𝓲𝔂𝓪𝓶 ♛ 𝓗𝓪𝓼𝓪𝓷☠️\n╰┈➤ 🚨 কিরে, সিন করে রিপ্লাই দিস না কেন? 🚨",
      "🦋𝙎𝙄𝙔𝘼𝙈 ⫸ 𝙃𝘼𝙎𝘼𝙉 🦋\n╰┈➤ 🎭 আড্ডায় জয়েন করো সবাই! 🎭",
      "𓆩🐉𓆪 𝕊𝕚𝕪𝕒𝕞 ✧ ℍ𝕒𝕤𝕒𝕟 𓆩🐉𓆪\n╰┈➤ 📢 বস ডাকছে, সবাই হাজির হও! 📢",
      "𖣘⚔️𝗦𝗜𝗬𝗔𝗠 〄 𝗛𝗔𝗦𝗔𝗡⚔️𖣘\n╰┈➤ 💎 একটু কথা বলো, গ্রুপে প্রাণ আনো! 💎",
      "𓆩👹𓆪 ✰ 𝒮𝒾𝓎𝒶𝓂 ✰ 𝐻𝒶𝓈𝒶𝓃 ✰ 𓆩👹𓆪\n╰┈➤ 🌙 ঘুম থেকে ওঠো, আড্ডা শুরু হবে! 🌙",
      "💠 𝖲𝖨𝖸𝖠𝖬 ⎯͢⎯ 𝖧𝖠𝖲𝖠𝖭 💠👑༻💠\n╰┈➤ 🔥 সবাই জলদি আসো, গরম খবর আছে! 🔥",
      "𖤍🦋 𝘚𝘪𝘺𝘢𝘮 ♡ 𝘏𝘢𝘴𝘢𝘯 𖤍🦋𖤍\n╰┈➤ ✨ চুপচাপ না থেকে কিছু বলো! ✨",
      "👑༺🖤༻👑 Sɪʏᴀᴍ ✧ Hᴀsᴀɴ 👑༺\n╰┈➤ 📣 আমার গ্রুপে কোনো নীরবতা সহ্য হবে না! 📣",
      "𓆩❄️𓆪 SIYAM 〆 HASAN 𓆩❄️𓆪\n╰┈➤ 🥶 সবাই কি বরফ হয়ে গেছো? 🥶",
      "⚡ Sΐyαm メ Hαsαn ⚡༒\n╰┈➤ 🚀 টার্গেট এখন তোমরা, সবাই আসো! 🚀",
      "🔱 Ṩḭẏḁṁ ✪ Ḥḁṩḁṅ 🔱\n╰┈➤ 🎉 ফ্রেশ আড্ডা হবে, জয়েন করো! 🎉",
      "💣༺💣 ֆɨʏǟʍ ✦ ɦǟֆǟռ 💣༺🌙\n╰┈➤ 🚨 গ্রুপটা ডুবতেছে, সবাই বাঁচাও! 🚨",
      "🦄༺🦄 𝕊𝕀𝕐𝔸𝕄 ☬ ℍ𝔸𝕊𝔸ℕ 🦄༺🎭\n╰┈➤ ❤️ একটা করে লাভ রিয়্যাক্ট দাও তো দেখি! ❤️",
      "👺༺👑 𝕾𝖎𝖞𝖆𝖒 𖣘 𝕳𝖆𝖘𝖆𝖓 👺༺👑\n╰┈➤ ⚡ ইগনোর করবা না একদম, খবর আছে! ⚡",
      "🎸༺⚜️ 𝐒𝐈𝐘𝐀𝐌 ✦ 𝐇𝐀𝐒𝐀𝐍 🎸༺⚜️\n╰┈➤ 🎶 মিউজিক আর আড্ডা নিয়ে আসো! 🎶",
      "🧿༺🔥𝑺𝒊𝒚𝒂𝒎 ༒ 𝑯𝒂𝒔𝒂𝒏 🧿༺🔥\n╰┈➤ 🤍 সবাই ভালো আছো তো? একটু জানাও! 🤍",
      "☠️𝓢𝓲𝔂𝓪𝓶 ♛ 𝓗𝓪𝓼𝓪𝓷 ☠️\n╰┈➤ 💥 গ্রুপে আগুন লাগানোর সময় হয়েছে! 💥"
    ];

    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const members = threadInfo.participantIDs;
      const userInfo = threadInfo.userInfo;

      while (tagStates[threadID]?.running) {
        for (const uid of members) {
          if (!tagStates[threadID]?.running) break;

          const baseMsg = baseMessages[Math.floor(Math.random() * baseMessages.length)];
          const userName = userInfo.find(u => u.id == uid)?.name || "User";
          
          // ডিজাইন অনুযায়ী মেসেজ ফরম্যাট
          const msg = `${baseMsg}\n\n@${userName}`;

          await api.sendMessage({
            body: msg,
            mentions: [{
              tag: `@${userName}`,
              id: uid
            }]
          }, threadID);

          await new Promise(resolve => setTimeout(resolve, 4000));
        }
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    } catch (err) {
      console.log(err);
      if (tagStates[threadID]) tagStates[threadID].running = false;
    }
  }
};
