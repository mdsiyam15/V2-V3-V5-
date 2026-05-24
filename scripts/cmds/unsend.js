// 😼 Author: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 😼
// ⚠️ নাম চেঞ্জ করলে ফাইল নষ্ট হয়ে যাবে ভাই 😾

const AUTHOR_LOCK = "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";
const VISIBLE_AUTHOR = "MR_FARHAN";

if (VISIBLE_AUTHOR !== "MR_FARHAN") {
	throw new Error("Author Locked!");
}

module.exports = {
	config: {
		name: "unsend",
		aliases: ["s", "siyam", "uns"],
		version: "1.2",
		author: VISIBLE_AUTHOR,
		countDown: 5,
		role: 0,
		description: {
			vi: "Gỡ tin nhắn của bot",
			en: "Unsend bot's message"
		},
		category: "box chat",
		guide: {
			vi: "reply tin nhắn muốn gỡ của bot và gọi lệnh {pn}",
			en: "reply the message you want to unsend and call the command {pn}"
		}
	},

	langs: {
		vi: {
			syntaxError: "Vui lòng reply tin nhắn muốn gỡ của bot",
			cantUnsend: "Không thể gỡ tin nhắn này"
		},
		en: {
			syntaxError: "Please reply the message you want to unsend",
			cantUnsend: "Cannot unsend this message"
		}
	},

	onStart: async function ({ message, event, api, getLang }) {

		if (!event.messageReply)
			return message.reply(getLang("syntaxError"));

		const botID = api.getCurrentUserID();

		if (event.messageReply.senderID != botID)
			return message.reply(getLang("cantUnsend"));

		try {
			await api.unsendMessage(event.messageReply.messageID);
		}
		catch (e) {
			return message.reply(getLang("cantUnsend"));
		}
	}
};
