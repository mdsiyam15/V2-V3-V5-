module.exports = {
config: {
name: "atag",
aliases: ["all", "veryone"],
version: "1.0.9",
credit: "MOHAMMAD BADOL",
role: 1,
prefix: true,
description: "গ্রুপের সবাইকে একে একে mention করে",
category: "group",
usages: "[custom text]",
cooldown: 10
},

onStart: async function ({ api, event, args }) {
	return api.sendMessage("✅ atag loaded", event.threadID);
},

onChat: async function () {}

};
