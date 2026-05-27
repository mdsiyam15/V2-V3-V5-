// 😼 Author: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 😼
// ⚠️ নাম পরিবর্তন করলে ফাইল কাজ করবে না

const { getStreamsFromAttachment } = global.utils;

const _0xA = ["𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", "LOCKED"];

(function () {
	if (_0xA[0] !== "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍") {
		throw new Error(_0xA[1]);
	}
})();

module.exports = {
	config: {
		name: "nut",
		aliases: ["notice", "allnoti"],
		version: "1.0",
		author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
		countDown: 5,
		role: 2,
		shortDescription: {
			en: "Send notification to all groups"
		},
		longDescription: {
			en: "Broadcast notification to all group chats"
		},
		category: "owner",
		guide: {
			en: "{pn} your message"
		},
		envConfig: {
			delayPerGroup: 300
		}
	},

	langs: {
		en: {
			missingMessage: "⚠️ Please enter a message",
			sending: "📡 Sending notification to %1 groups...",
			success: "✅ Successfully sent to %1 groups",
			failed: "❌ Failed to send to %1 groups"
		}
	},

	onStart: async function ({
		api,
		args,
		event,
		message,
		threadsData,
		getLang,
		commandName,
		envCommands
	}) {

		const { delayPerGroup } = envCommands[commandName];

		if (!args[0]) {
			return message.reply(getLang("missingMessage"));
		}

		const formSend = {
			body:
Bot Owner: 
 🫶𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍🪽
https://www.facebook.com/profile.php?id=61589656899295
────────────────
${args.join(" ")}`,

			attachment: await getStreamsFromAttachment(
				[
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item =>
					["photo", "png", "animated_image", "video", "audio"].includes(item.type)
				)
			)
		};

		const allThreads = (await threadsData.getAll())
			.filter(t =>
				t.isGroup &&
				t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup
			);

		message.reply(getLang("sending", allThreads.length));

		let success = 0;
		let failed = 0;

		for (const thread of allThreads) {
			try {
				await api.sendMessage(formSend, thread.threadID);
				success++;
			}
			catch (e) {
				failed++;
			}

			await new Promise(resolve =>
				setTimeout(resolve, delayPerGroup)
			);
		}

		return message.reply(
`${getLang("success", success)}
${failed > 0 ? getLang("failed", failed) : ""}`
		);
	}
};
