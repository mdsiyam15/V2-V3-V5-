const a1 = "𝆠፝"; const a2 = "𝐒𝐈"; const a3 = "𝐘𝐀𝐌"; const a4 = "-𝐇𝐀"; const a5 = "𝐒𝐀𝐍";

const hiddenOwner = [a1, a2, a3, a4, a5].join("");

module.exports = { config: { name: "helpall", version: "3.0.0", author: hiddenOwner, role: 0, shortDescription: { en: "Show all commands" }, longDescription: { en: "Premium Help Menu" }, category: "system", guide: { en: "{pn}" } },

onStart: async function ({ api, event, prefix }) { 	try { 		const commandsMap = global.GoatBot?.commands || new Map(); 		const allCommands = Array.from(commandsMap.keys()) 			.filter(cmd => !cmd.startsWith("_")) 			.sort((a, b) => a.localeCompare(b)); 		const totalCommands = allCommands.length; 		const realPrefix = 			prefix || 			global.GoatBot?.config?.prefix || 			"."; 		const cmdLines = []; 		for (let i = 0; i < allCommands.length; i += 4) { 			const chunk = allCommands.slice(i, i + 4); 			const row = chunk.map((cmd, index) => { 				const num = i + index + 1; 				return `${num}. ${cmd}`.padEnd(18, " "); 			}).join(""); 			cmdLines.push(row); 		} 		const cmdList = cmdLines.join("\n"); 		const msg = ` 

👑 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
📌 PREFIX : ${realPrefix}
${cmdList}
📦 TOTAL COMMANDS : ${totalCommands}
👑 OWNER : ${hiddenOwner}
 `;

		return api.sendMessage( 			msg, 			event.threadID, 			event.messageID 		); 	} catch (err) { 		console.log(err); 		return api.sendMessage( 			"❌ | Error loading help menu", 			event.threadID, 			event.messageID 		); 	} } 

};
