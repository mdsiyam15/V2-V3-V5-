const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
	config: {
		name: "admin",
		alias: ["operator"],
		version: "3.0",
		author: "亗 SIYAM HASAN 亗",
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "Premium Operator System"
		},
		longDescription: {
			en: "Add / Remove / List Operators"
		},
		category: "box chat",
		guide: {
			en:
`{pn} add @tag/reply/uid
{pn} remove @tag/reply/uid
{pn} list`
		}
	},

	onStart: async function ({
		message,
		args,
		usersData,
		event
	}) {

		const OWNER = [
			"61590360434650"
		];

		const senderID = event.senderID;

		const isOwner =
			OWNER.includes(senderID);

		// ======================
		// ADD OPERATOR
		// ======================

		if (
			args[0] == "add" ||
			args[0] == "-a"
		) {

			if (!isOwner)
				return message.reply(
`╭〔 ❌ 𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗘𝗡𝗜𝗘𝗗 ❌ 〕╮
┃ Only SIYAM Owner Can
┃ Add New Operator!
╰━━━━━━━━━━━━━━━╯`
				);

			let uids = [];

			if (
				event.type ==
				"message_reply"
			) {

				uids.push(
					event.messageReply.senderID
				);

			}

			else if (
				Object.keys(
					event.mentions
				).length > 0
			) {

				uids = Object.keys(
					event.mentions
				);

			}

			else if (
				args.slice(1).length > 0
			) {

				uids = args
					.slice(1)
					.filter(uid => !isNaN(uid));

			}

			if (!uids.length)
				return message.reply(
`╭〔 ⚠️ 𝗠𝗜𝗦𝗦𝗜𝗡𝗚 𝗨𝗦𝗘𝗥 ⚠️ 〕╮
┃ Reply / Tag / UID Needed
╰━━━━━━━━━━━━━━━╯`
				);

			const addedUsers = [];
			const alreadyUsers = [];

			for (const uid of uids) {

				if (
					config.adminBot.includes(uid)
				) {

					alreadyUsers.push(uid);

				} else {

					config.adminBot.push(uid);

					addedUsers.push(uid);

				}

			}

			writeFileSync(
				global.client.dirConfig,
				JSON.stringify(
					config,
					null,
					2
				)
			);

			const userInfo =
				await Promise.all(
					uids.map(async uid => {

						const name =
							await usersData.getName(uid);

						return {
							uid,
							name
						};

					})
				);

			let msg = "";

			for (const user of userInfo) {

				if (
					addedUsers.includes(user.uid)
				) {

					msg +=
`╭〔 👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠👑 〕╮
┃───────────────
┃   👑𝆠፝${user.name}-𝐇𝐀𝐒𝐀𝐍 👑
┣━━━━━━━━━━━━━━╯
┃
┃ ✅ 𝐎𝐏𝐄𝐑𝐀𝐓𝐎𝐑 𝐀𝐃𝐃𝐄𝐃
┃ ───────────────────
┃ ⚜️ 𝐍𝐀𝐌𝐄    : ${user.name}
┃ 🆔 𝐔𝐈𝐃      : ${user.uid}
┃ 💠 𝐑𝐀𝐍𝐊    : Premium Operator
┃
┃ 🥂 𝐒𝐓𝐀𝐓𝐔𝐒 : Successfully Added
┃ 💎 𝐀𝐂𝐂𝐄𝐒𝐒 : Full Permissions
┃ ✨ 𝐒𝐘𝐒𝐓𝐄𝐌 : Activated Successfully
┃
┣━━━━━━━━━━━━━━━╯
┃  👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 👑
╰━━━━━━━━━━━━━━━╯

`;

				}

				if (
					alreadyUsers.includes(user.uid)
				) {

					msg +=
`╭〔 ⚠️ 𝗔𝗟𝗥𝗘𝗔𝗗𝗬 𝗢𝗣𝗘𝗥𝗔𝗧𝗢𝗥 ⚠️ 〕╮
┃ 👤 ${user.name}
┃ 🆔 ${user.uid}
┃ 💎 Already Premium Operator
╰━━━━━━━━━━━━━━━╯

`;

				}

			}

			return message.reply(msg);

		}

		// ======================
		// REMOVE OPERATOR
		// ======================

		if (
			args[0] == "remove" ||
			args[0] == "-r"
		) {

			if (!isOwner)
				return message.reply(
`╭〔 ❌ 𝗔𝗖𝗖𝗘𝗦𝗦 𝗗𝗘𝗡𝗜𝗘𝗗 〕╮
┃ 𝗢𝗻𝗹𝘆 𝗦𝗜𝗬𝗔𝗠 𝗢𝘄𝗻𝗲𝗿 𝗖𝗮𝗻
┃ 𝗥𝗲𝗺𝗼𝘃𝗲 𝗢𝗽𝗲𝗿𝗮𝘁𝗼𝗿 !
╰━━━━━━━━━━━━━━━╯`
				);

			let uids = [];

			if (
				event.type ==
				"message_reply"
			) {

				uids.push(
					event.messageReply.senderID
				);

			}

			else if (
				Object.keys(
					event.mentions
				).length > 0
			) {

				uids = Object.keys(
					event.mentions
				);

			}

			else if (
				args.slice(1).length > 0
			) {

				uids = args
					.slice(1)
					.filter(uid => !isNaN(uid));

			}

			if (!uids.length)
				return message.reply(
`╭〔 ⚠️ 𝗠𝗜𝗦𝗦𝗜𝗡𝗚 𝗨𝗦𝗘𝗥 ⚠️ 〕╮
┃ Reply / Tag / UID Needed
╰━━━━━━━━━━━━━━━╯`
				);

			const removedUsers = [];
			const notUsers = [];

			for (const uid of uids) {

				if (
					config.adminBot.includes(uid)
				) {

					config.adminBot.splice(
						config.adminBot.indexOf(uid),
						1
					);

					removedUsers.push(uid);

				} else {

					notUsers.push(uid);

				}

			}

			writeFileSync(
				global.client.dirConfig,
				JSON.stringify(
					config,
					null,
					2
				)
			);

			const userInfo =
				await Promise.all(
					uids.map(async uid => {

						const name =
							await usersData.getName(uid);

						return {
							uid,
							name
						};

					})
				);

			let msg = "";

			for (const user of userInfo) {

				if (
					removedUsers.includes(user.uid)
				) {

					msg +=
`╭〔 👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠👑 〕╮
┃───────────────
┃   👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
┣━━━━━━━━━━━━━━╯
┃
┃ ❌ 𝐎𝐏𝐄𝐑𝐀𝐓𝐎𝐑 𝐑𝐄𝐌𝐎𝐕𝐄𝐃
┃ ───────────────────
┃ ⚜️ 𝐍𝐀𝐌𝐄    : ${user.name}
┃ 🆔 𝐔𝐈𝐃      : ${user.uid}
┃ 💠 𝐑𝐀𝐍𝐊    : Premium Operator
┃
┃ 💔 𝐒𝐓𝐀𝐓𝐔𝐒 : Removed Successfully
┃ 🔒 𝐀𝐂𝐂𝐄𝐒𝐒 : Permission Closed
┃ ⚠️ 𝐒𝐘𝐒𝐓𝐄𝐌 : Operator Access Revoked
┃
┣━━━━━━━━━━━━━━━╯
┃  👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 👑
╰━━━━━━━━━━━━━━━╯

`;

				}

				if (
					notUsers.includes(user.uid)
				) {

					msg +=
`╭〔 ⚠️ 𝗡𝗢𝗧 𝗢𝗣𝗘𝗥𝗔𝗧𝗢𝗥 ⚠️ 〕╮
┃ 👤 ${user.name}
┃ 🆔 ${user.uid}
┃ ❌ Not In Operator List
╰━━━━━━━━━━━━━━━╯

`;

				}

			}

			return message.reply(msg);

		}

		// ======================
		// LIST OPERATOR
		// ======================

		if (
			args[0] == "list" ||
			args[0] == "-l"
		) {

			const users =
				await Promise.all(
					config.adminBot.map(
						async uid => {

							const name =
								await usersData.getName(uid);

							return {
								uid,
								name
							};

						}
					)
				);

			let listText = "";

			users.forEach(
				(user, index) => {

					listText +=
`┃ ${index + 1}. 👑 ${user.name}
┃ 🆔 ${user.uid}
┃ ─────────────────
`;

				}
			);

			return message.reply(
`╭〔 👑𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 𝆠👑 〕╮
┃───────────────
┃   👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
┣━━━━━━━━━━━━━━╯
┃
┃ ⚙️ 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐎𝐏𝐄𝐑𝐀𝐓𝐎𝐑 𝐋𝐈𝐒𝐓
┃ ───────────────────
${listText || "┃ ❌ No Operators Found"}
┣━━━━━━━━━━━━━━━╯
┃  👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 👑
╰━━━━━━━━━━━━━━━╯`
			);

		}

		return message.SyntaxError();

	}
};
				
