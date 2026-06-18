const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");
const moment = require("moment-timezone");

const _0x3a19 = [10, 240, 159, 145, 145, 32, 32, 240, 157, 134, 160, 240, 157, 135, 15, 240, 157, 135, 132, 240, 157, 135, 148, 240, 157, 135, 134, 45, 240, 157, 135, 131, 240, 157, 135, 134, 240, 157, 135, 142, 240, 157, 135, 137, 32, 32, 240, 159, 145, 145, 10, 10, 240, 157, 135, 136, 240, 157, 135, 131, 240, 157, 135, 138, 240, 157, 135, 143, 240, 157, 135, 134, 32, 240, 157, 135, 135, 240, 157, 135, 134, 240, 157, 135, 142, 240, 157, 135, 143, 32, 240, 157, 135, 136, 240, 157, 135, 142, 240, 157, 135, 137, 240, 157, 135, 138, 240, 157, 135, 134, 10, 10, 240, 159, 148, 144, 32, 32, 240, 157, 135, 131, 240, 157, 135, 134, 240, 157, 135, 136, 240, 157, 135, 136, 240, 157, 135, 138, 240, 157, 135, 142, 240, 157, 135, 142, 32, 58, 10, 32, 32, 32, 240, 157, 134, 160, 240, 159, 144, 184, 224, 166, 149, 224, 166, 149, 224, 166, 168, 32, 224, 166, 184, 224, 167, 129, 224, 166, 151, 224, 166, 17ূ, 32, 224, 166, 133, 224, 166, 174, 224, 166, 17|, 224, 166, 168, 32, 224, 166, 172, 224, 166, 168, 32, 224, 166, 184, 224, 166, 191, 224, 166, 175, 224, 166, 190, 240, 159, 170, 172, 10, 32, 32, 32, 240, 157, 134, 160, 224, 166, 172, 224, 166, 159, 32, 224, 166, 172, 224, 167, 135, 224, 166, 172, 224, 166, 185, 224, 166, 191, 224, 166, 160, 32, 224, 166, 149, 224, 166, 176, 224, 166, 164, 224, 166, 172, 224, 167, 135, 32, 224, 166, 170, 224, 166, 176, 224, 166, 164, 224, 167, 135, 32, 240, 157, 134, 160, 10, 10, 240, 159, 147, 133, 32, 32, 240, 157, 135, 137, 240, 157, 135, 134, 240, 157, 135, 141, 240, 157, 135, 138, 32, 58, 32, 37, 49, 10, 240, 159, 15timer, 170, 32, 32, 240, 157, 135, 143, 240, 157, 135, 137, 240, 157, 135, 140, 240, 157, 135, 138, 32, 58, 32, 37, 50, 10, 10, 240, 157, 134, 160, 32, 32, 240, 157, 135, 137, 240, 157, 135, 134, 240, 157, 135, 141, 240, 157, 135, 138, 240, 157, 135, 143, 240, 157, 135, 140, 32, 240, 157, 135, 132, 240, 157, 135, 137, 240, 157, 135, 134, 240, 157, 135, 143, 32, 240, 157, 135, 131, 240, 157, 135, 138, 240, 157, 135, 143, 32, 240, 157, 134, 160, 10];
const _0x2c0f = [10, 240, 159, 145, 145, 32, 32, 240, 157, 134, 160, 240, 157, 135, 15, 240, 157, 135, 132, 240, 157, 135, 148, 240, 157, 135, 134, 45, 240, 157, 135, 131, 240, 157, 135, 134, 240, 157, 135, 142, 240, 157, 135, 137, 32, 32, 240, 159, 145, 145, 10, 10, 240, 157, 135, 136, 240, 157, 135, 131, 240, 157, 135, 138, 240, 157, 135, 143, 240, 157, 135, 134, 32, 240, 157, 135, 135, 240, 157, 135, 134, 240, 157, 135, 142, 240, 157, 135, 143, 32, 240, 157, 135, 137, 240, 157, 135, 134, 240, 157, 135, 137, 240, 157, 135, 135, 240, 157, 135, 135, 240, 157, 135, 134, 240, 157, 135, 137, 10, 10, 240, 159, 140, 144, 32, 32, 240, 157, 135, 131, 240, 157, 135, 134, 240, 157, 135, 136, 240, 157, 135, 136, 240, 157, 135, 138, 240, 157, 135, 142, 240, 157, 135, 142, 32, 58, 10, 32, 32, 32, 240, 157, 134, 160, 224, 166, 149, 224, 166, 164, 224, 166, 168, 32, 224, 166, 184, 224, 166, 172, 224, 166, 190, 224, 166, 135, 32, 224, 166, 172, 224, 167, 135, 224, 166, 172, 224, 166, 185, 224, 166, 191, 224, 166, 160, 240, 159, 170, 172, 10, 32, 32, 32, 240, 157, 134, 160, 224, 166, 149, 224, 166, 176, 224, 166, 164, 224, 166, 172, 224, 167, 135, 32, 224, 166, 170, 224, 166, 176, 224, 166, 164, 224, 167, 135, 32, 240, 159, 142, 137, 10, 10, 240, 159, 147, 133, 32, 32, 240, 157, 135, 137, 240, 157, 135, 134, 240, 157, 135, 141, 240, 157, 135, 138, 32, 58, 32, 37, 49, 10, 240, 159, 15timer, 170, 32, 10, 240, 157, 134, 160, 240, 157, 135, 143, 240, 157, 135, 137, 240, 157, 135, 140, 240, 157, 135, 138, 32, 58, 32, 37, 50, 10, 10, 240, 157, 134, 160, 32, 32, 240, 157, 135, 137, 240, 157, 135, 134, 240, 157, 135, 141, 240, 157, 135, 138, 240, 157, 135, 143, 240, 157, 135, 140, 32, 240, 157, 135, 132, 240, 157, 135, 137, 240, 157, 135, 134, 240, 157, 135, 143, 32, 240, 157, 135, 131, 240, 157, 135, 138, 240, 157, 135, 143, 32, 240, 157, 134, 160, 10];

function _parseMsg(arr, d, t) {
	let s = Buffer.from(arr).toString('utf-8');
	return s.replace("%1", d).replace("%2", t);
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

			case "list":
			case "-l": {
				const names = await Promise.all(
					config.whiteListMode.whiteListIds.map(uid =>
						usersData.getName(uid).then(name => `• ${name} (${uid})`)
					)
				);

				return message.reply(getLang("listAdmin", names.join("\n")));
			}

			case "on": {
				config.whiteListMode.enable = true;
				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				const time = moment().tz("Asia/Dhaka").format("hh:mm A");
				const date = moment().tz("Asia/Dhaka").format("DD MMMM YYYY");

				const msg = _parseMsg(_0x3a19, date, time);
				return message.reply(msg);
			}

			case "off": {
				config.whiteListMode.enable = false;
				writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

				const time = moment().tz("Asia/Dhaka").format("hh:mm A");
				const date = moment().tz("Asia/Dhaka").format("DD MMMM YYYY");

				const msg = _parseMsg(_0x2c0f, date, time);
				return message.reply(msg);
			}

			default:
				return message.SyntaxError();
		}
	}
};
