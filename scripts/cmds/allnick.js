module.exports = {
  config: {
    name: "allnick",
    aliases: ["an"],
    version: "2.2",
    author: "亗 SIYAM HASAN 亗",
    countDown: 10,
    role: 1,
    shortDescription: {
      en: "Change/reset nickname of all members"
    },
    category: "owner",
    guide: {
      en: "{pn} <nickname | cancel>"
    },
    envConfig: {
      delayPerBatch: 800,
      batchSize: 8,
      retryLimit: 2
    }
  },

  onStart: async function ({
    api,
    event,
    args,
    message
  }) {

    const threadID = event.threadID;
    const input = args.join(" ").trim();

    // =========================
    // NO INPUT
    // =========================

    if (!input) {

      return message.reply(
`👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍  👑

⚠️ নিকনেম দাও অথবা cancel লেখো ✨

👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✨`
      );

    }

    try {

      const threadInfo =
        await api.getThreadInfo(threadID);

      // =========================
      // GROUP CHECK
      // =========================

      if (!threadInfo.isGroup) {

        return message.reply(
`👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍  👑

❌ এই কমান্ড শুধু গ্রুপে কাজ করে 😿

👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✨`
        );

      }

      // =========================
      // BOT ADMIN CHECK
      // =========================

      const botID =
        api.getCurrentUserID();

      const isAdmin =
        threadInfo.adminIDs.some(
          item => item.id == botID
        );

      if (!isAdmin) {

        return message.reply(
`👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍  👑

⛔ বট এডমিন না 😾
✨ আগে বটকে এডমিন বানাও

👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✨`
        );

      }

      const members =
        threadInfo.participantIDs;

      const {
        delayPerBatch,
        batchSize,
        retryLimit
      } = module.exports.config.envConfig;

      // =========================
      // START MESSAGE
      // =========================

      await message.reply(
`👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍  👑

🚀 সব মেম্বারের নিকনেম চেঞ্জ হচ্ছে... 💫

👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✨`
      );

      // =========================
      // ARRAY CHUNK
      // =========================

      const chunkArray = (
        array,
        size
      ) => {

        const result = [];

        for (
          let i = 0;
          i < array.length;
          i += size
        ) {

          result.push(
            array.slice(i, i + size)
          );

        }

        return result;

      };

      const batches =
        chunkArray(
          members,
          batchSize
        );

      let failed = [];
      let done = 0;

      // =========================
      // PROCESS SYSTEM
      // =========================

      for (const batch of batches) {

        for (const userID of batch) {

          let success = false;

          for (
            let retry = 0;
            retry <= retryLimit;
            retry++
          ) {

            try {

              if (
                input.toLowerCase() ==
                "cancel"
              ) {

                await api.changeNickname(
                  "",
                  threadID,
                  userID
                );

              }

              else {

                await api.changeNickname(
                  input,
                  threadID,
                  userID
                );

              }

              success = true;
              break;

            }

            catch {

              if (
                retry === retryLimit
              ) {

                failed.push(userID);

              }

            }

          }

          if (success)
            done++;

        }

        // =========================
        // PROGRESS
        // =========================

        const percent =
          Math.floor(
            (done / members.length) * 100
          );

        await message.reply(
`👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍  👑

📊 কাজ চলছে... ${percent}% ✨

👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✨`
        );

        await new Promise(resolve =>
          setTimeout(
            resolve,
            delayPerBatch
          )
        );

      }

      // =========================
      // FINAL RESULT
      // =========================

      if (failed.length == 0) {

        if (
          input.toLowerCase() ==
          "cancel"
        ) {

          return message.reply(
`👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍  👑

🔄 সব নিকনেম রিমুভ করা হয়েছে 💫

👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✨`
          );

        }

        else {

          return message.reply(
`👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍  👑

✅ সব নিকনেম সফলভাবে চেঞ্জ হয়েছে ✨

👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✨`
          );

        }

      }

      else {

        return message.reply(
`👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍  👑

⚠️ ${failed.length} জনের নিকনেম চেঞ্জ হয় নাই 😿

👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✨`
        );

      }

    }

    catch (err) {

      console.log(err);

      return message.reply(
`👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍  👑

❌ সিস্টেম এরর হয়েছে 😿

👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✨`
      );

    }

  }

};
