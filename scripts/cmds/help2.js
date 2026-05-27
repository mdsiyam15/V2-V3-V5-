// 🙂 নাম পরিবর্তন করলে ফাইল নষ্ট হতে পারে

const a1 = "𝆠፝";
const a2 = "𝐒𝐈";
const a3 = "𝐘𝐀𝐌";
const a4 = "-𝐇𝐀";
const a5 = "𝐒𝐀𝐍";

const hiddenOwner = [a1, a2, a3, a4, a5].join("");

if (hiddenOwner !== "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍") {
throw new Error("Author Lock Changed!");
}

module.exports = {
config: {
name: "help2",
version: "2.0.0",
author: hiddenOwner,
role: 0,

shortDescription: {  
		en: "Premium Help Menu"  
	},  

	longDescription: {  
		en: "Premium Styled Help Menu"  
	},  

	category: "system",  

	guide: {  
		en: "{pn}"  
	}  
},  

onStart: async function ({ api, event, prefix }) {  

	try {  

		// 🙂 সব কমান্ড অটোমেটিক লোড  
		const commandsMap = global.GoatBot?.commands || new Map();  

		// 🙂 কমান্ড নাম নেওয়া  
		const allCommands = Array.from(commandsMap.keys())  
			.filter(cmd => !cmd.startsWith("_"))  
			.sort((a, b) => a.localeCompare(b));  

		// 🙂 মোট কমান্ড  
		const totalCommands = allCommands.length;  

		// 🙂 রিয়েল Prefix  
		const realPrefix =  
			prefix ||  
			global.GoatBot?.config?.prefix ||  
			".";  

		// 🙂 কমান্ড লিস্ট নাম্বারসহ  
		const cmdList = allCommands.length > 0  
			? allCommands  
				.map((cmd, index) =>  
					`➥ 👑 ${index + 1}. ${realPrefix}${cmd}`  
				)  
				.join("\n")  
			: "❌ NO COMMAND FOUND";  

		// 🙂 Broken File Detect  
		let brokenFiles = [];  

		if (global.GoatBot?.onLoadError) {  
			brokenFiles = Object.keys(global.GoatBot.onLoadError);  
		}  

		// 🙂 Broken File Count  
		const totalBroken = brokenFiles.length;  

		// 🙂 Broken File List  
		const brokenList = totalBroken > 0  
			? brokenFiles  
				.map((file, index) =>  
					`❌ ${index + 1}. ${file}`  
				)  
				.join("\n")  
			: "✅ NO BROKEN FILE";  

		// 🙂 Final Message  
		const msg = `

╔════════════════╗
👑 𝗦𝗜𝗬𝗔𝗠 𝗛𝗘𝗟𝗣 👑
╚════════════════╝

💠 𝗨𝗡𝗜𝗩𝗘𝗥𝗦𝗔𝗟 𝗛𝗘𝗟𝗣
⚡ 𝗦𝗣𝗘𝗘𝗗 ➤ 0.01MS
🔥 𝗠𝗢𝗗𝗘 ➤ PREMIUM
🤖 𝗦𝗧𝗔𝗧𝗨𝗦 ➤ ONLINE

📌 𝗣𝗥𝗘𝗙𝗜𝗫 ➤ ${realPrefix}

╭〔 👑 COMMAND LIST 👑 ╮

${cmdList}

╰━━━━━━━━━━━━━━━━╯

╭〔 ⚠️ BROKEN FILE ⚠️ ╮

${brokenList}

╰━━━━━━━━━━━━━━━╯

🌐 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 🔗
https://www.facebook.com/profile.php?id=61589656899295

📦 𝗧𝗢𝗧𝗔𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 ➤ ${totalCommands}
⚠️ 𝗕𝗥𝗢𝗞𝗘𝗡 𝗙𝗜𝗟𝗘 ➤ ${totalBroken}

👑 𝗢𝗪𝗡𝗘𝗥 ➤ ${hiddenOwner}
`;

return api.sendMessage(  
			msg,  
			event.threadID,  
			event.messageID  
		);  

	} catch (e) {  

		console.log(e);  

		return api.sendMessage(  
			"❌ | Error loading help menu",  
			event.threadID,  
			event.messageID  
		);  
	}  
}

};
