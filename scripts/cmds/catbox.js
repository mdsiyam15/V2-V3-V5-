const axios = require("axios");
const FormData = require("form-data");

module.exports = {
  config: {
    name: "catbox",
    aliases: ["sy"],
    version: "1.1",
    author: "SIYAM",
    countDown: 5,
    role: 0,
    shortDescription: "Media uploader",
    category: "tools",
    guide: {
      en: "{pn} reply to media"
    }
  },

  onStart: async function ({ api, event, message }) {

    const reply = event.messageReply;

    if (!reply?.attachments?.length) {
      return message.reply("⚠️ Reply to image/video/audio");
    }

    const media = reply.attachments[0];

    if (!media.url) {
      return message.reply("❌ Invalid media URL");
    }

    try {

      api.setMessageReaction("📤", event.messageID, () => {}, true);

      const loading = await message.reply("⏳ Uploading...");

      // 📥 DIRECT BUFFER DOWNLOAD
      const file = await axios.get(media.url, {
        responseType: "arraybuffer",
        timeout: 20000
      });

      if (!file.data) {
        return message.reply("❌ Download failed");
      }

      // 📤 FORM
      const form = new FormData();

      form.append("reqtype", "fileupload");

      form.append("fileToUpload", Buffer.from(file.data), {
        filename: `file_${Date.now()}`
      });

      // 🚀 UPLOAD
      const res = await axios.post(
        "https://catbox.moe/user/api.php",
        form,
        {
          headers: form.getHeaders(),
          timeout: 30000
        }
      );

      if (!res.data) {
        throw new Error("No response from server");
      }

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      return message.reply(`✅ Upload Successful\n\n🔗 ${res.data}`);

    } catch (err) {

      console.log("UPLOAD ERROR:", err.message);

      api.setMessageReaction("❌", event.messageID, () => {}, true);

      return message.reply(
`❌ Upload failed

কারণ:
- 😾মাদার চুদ 🖕 
- 🔐বট তোর বাপের🙄
- 🖕আবাল 🫵 
- 🤤চুদা খাবি🥵`
      );
    }
  }
};
