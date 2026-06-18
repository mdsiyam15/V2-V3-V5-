const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");
const moment = require("moment-timezone");

// 🔒 এনক্রিপ্টেড মেসেজ ডেটা (ফাইলের ভেতর কেউ লেখা বুঝতে পারবে না)
const _0x51a1 = "wqDwnZSM8J2UgfCdlIbwnZSPLeCdlIbwnZSU8J2UhyDwnZSM8J2Uhw0KDQrwnZSW8J2UhfCdlInwnZST8J2UhSDwnZSM8J2UhfCdlKOf8J2UhSDwnZSM8J2UhfCdlIbwnZST8J2UlPCdlIYNcountiDwnZSM8J2Ugy8J2Ugy8J2Uhy8J2Ugy8J2UkyA6DQogICDwnZSM8J2Ugy8J2Ugy8J2Yp9Cmj9CmrOCmqCDgprbgpqugpqYg4KaG4Kau4Ka+4KawIOCmrOCmuSDgprjgprngpr7gpq7wn6asDQogICDwnZSM8J2Ugy8J2Ypa4Kas4KafIOCmrOCnjeCmr9CmrOCmuOCmvuCmsiDgpJXgprDgpqYg4Kaq4Ka+4Kaw4Kas4KeHIPCdlIwNCg0K8J2UfPCdlIUhICDwnZSM8J2Ugy8J2UmvCdlKOfIDogJTENCvCdlKfwnZSFICDwnZSM8J2Ugy8J2UmvCdlKOfIDogJTINCg0K8J2UjPCdlIUhICDwnZSM8J2UjfCdlInwnZSM8J2UofCdlKOf8J2UkyDwnZSM8J2UhfCdlIHN8J2UgyDwnZSM8J2UhfCdlIHNIPCdlIUh";
const _0x2b8e = "wqDwnZSM8J2UgfCdlIbwnZSPLeCdlIbwnZSU8J2UhyDwnZSM8J2Uhw0KDQrwnZSW8J2UhfCdlInwnZST8J2UhSDwnZSM8J2UhfCdlKOf8J2UhSDwnZSM8J2UhfCdlIbwnZST8J2UlPCdlIYNcountiDwnZSM8J2UhvCdlIXwnZSM8J2UhfCdlInwnZST8J2UkyA6DQogICDgpI7gpofgpqgg4Ka44Kas4Ka+4KaHIOCmrOCmnyDgpqzgpYzgprDgpqngpY3gprYg4Kaq4KeN4Kaw4KeN4Kav4KeL4KaX8KaoDQogICDgpJXgprDgpqYg4Kaq4Ka+4Kaw4Kas4KeHIPCfjrYNCg0K8J2UfPCdlIUhICDwnZSM8J2Ugy8J2UmvCdlKOfIDogJTENCvCdlKfwnZSFICANCvCdlJSM8J2Ugy8J2UjfCdlInwnZSM8J2UofCdlKOfIDogJTINCg0K8J2UjPCdlIUhICDwnZSM8J2UjfCdlInwnZSM8J2UofCdlKOf8J2UkyDwnZSM8J2UhfCdlIHN8J2UgyDwnZSM8J2UhfCdlIHNIPCdlIUh";

// 🔓 ডিক্রিপ্ট ফাংশন
function _getMsg(str, date, time) {
	let decoded = Buffer.from(str, 'base64').toString('utf-8');
	return decoded.replace("%1", date).replace("%2", time);
}

module.exports = {
	config: {
		name: "wl",
		version: "2.0",
		author: "MR_FARHAN + SIYAM EDIT",
		countDown: 5,
		role: 2,
		longDescription: {
			en: "Manage whiteListIds"
		},
		category: "owner",
		guide: {
			en:
				"{pn} add <uid | @tag>\n" +
				"{pn} remove <uid | @tag>\n" +
				"{pn} list\n" +
				"{pn} on / off"
		}
	},

	langs: {
		en: {
			added: "✅ Added:\n%1",
			removed: "✅ Removed:\n%1",
			listAdmin: "👑 WhiteList Users:\n%1",
			missingIdAdd: "⚠️ Give ID or tag",
			missingIdRemove: "⚠️ Give ID or tag"
		}
	},

	onStart: async function ({ message, args, usersData, event, getLang }) {

		switch (args[0]) {

			// ================= ADD =================
			case "add":
			case "-a": {
				if (!args[1]) return message.reply(getLang("missingIdAdd"));

				let uids = [];

				if (Object.keys(event.mentions).length > 0)
					uids = Object.keys(event.mentions);
				else if (event.messageReply)
					uids.push(event.messageReply.senderID);
				else
					uids = args.filter(arg => !isNaN(arg));

				const added = [];

				for (const uid of uids) {
					if (!config.whiteListMode.whiteListIds.includes(uid)) {
						config.whiteListMode.whiteListIds.push(uid);
						added.push(uid);
					}
				}

				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				const names = await Promise.all(
					added.map(uid => usersData.getName(uid).then(name => `• ${name} (${uid})`))
				);

				return message.reply(getLang("added", names.join("\n")));
			}

			// ================= REMOVE =================
			case "remove":
			case "-r": {
				if (!args[1]) return message.reply(getLang("missingIdRemove"));

				let uids = [];

				if (Object.keys(event.mentions).length > 0)
					uids = Object.keys(event.mentions);
				else
					uids = args.filter(arg => !isNaN(arg));

				const removed = [];

				for (const uid of uids) {
					if (config.whiteListMode.whiteListIds.includes(uid)) {
						config.whiteListMode.whiteListIds.splice(
							config.whiteListMode.whiteListIds.indexOf(uid),
							1
						);
						removed.push(uid);
					}
				}

				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				const names = await Promise.all(
					removed.map(uid => usersData.getName(uid).then(name => `• ${name} (${uid})`))
				);

				return message.reply(getLang("removed", names.join("\n")));
			}

			// ================= LIST =================
			case "list":
			case "-l": {
				const names = await Promise.all(
					config.whiteListMode.whiteListIds.map(uid =>
						usersData.getName(uid).then(name => `• ${name} (${uid})`)
					)
				);

				return message.reply(getLang("listAdmin", names.join("\n")));
			}

			// ================= ON =================
			case "on": {
				config.whiteListMode.enable = true;
				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				const time = moment().tz("Asia/Dhaka").format("hh:mm A");
				const date = moment().tz("Asia/Dhaka").format("DD MMMM YYYY");

				// 🔓 প্রোটেক্টেড মেসেজ লোড হচ্ছে
				const msg = _getMsg(_0x51a1, date, time);
				return message.reply(msg);
			}

			// ================= OFF =================
			case "off": {
				config.whiteListMode.enable = false;
				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				const time = moment().tz("Asia/Dhaka").format("hh:mm A");
				const date = moment().tz("Asia/Dhaka").format("DD MMMM YYYY");

				// 🔓 প্রোটেক্টেড মেসেজ লোড হচ্ছে
				const msg = _getMsg(_0x2b8e, date, time);
				return message.reply(msg);
			}

			default:
				return message.SyntaxError();
		}
	}
};
