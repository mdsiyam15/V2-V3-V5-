if (!global.siyamCopyCooldown) {
    global.siyamCopyCooldown = {};
}

module.exports = {
    config: {
        name: "copy",
        version: "6.0.0",
        author: "SIYAM HASAN",
        role: 0,
        countDown: 5,
        category: "UTILITY",
        shortDescription: "Multiplies text or emojis safely up to 10000",
        longDescription: "৩ মিনিটের ইউজার কুলডাউনসহ ১০,০০০ বার পর্যন্ত কপি করার সাধারণ সিস্টেম।",
        guide: "copy [text/emoji] [count]\nExample: copy 🔪 5000"
    },

    onStart: async function ({ api, event, args }) {
        const { threadID, messageID, senderID } = event;

        try {
            if (args.length < 2) {
                return api.sendMessage("⚠️ ব্যবহার বিধি: copy [টেক্সট/ইমোজি] [সংখ্যা]\nউদাহরণ: copy 🔪 2000", threadID, messageID);
            }

            const countStr = args[args.length - 1];
            const count = parseInt(countStr);

            if (isNaN(count) || count <= 0) {
                return api.sendMessage("❌ ভুল সংখ্যা! দয়া করে একটি সঠিক সংখ্যা দিন (যেমন: ১ থেকে ১০,০০০)।", threadID, messageID);
            }

            if (count > 10000) {
                return api.sendMessage("⚠️ সেফটি সিস্টেম অ্যালার্ট: বটের সুরক্ষার জন্য একসাথে সর্বোচ্চ ১০,০০০ বার কপি করা যাবে।", threadID, messageID);
            }

            // ৩ মিনিটের ব্যক্তিগত কুলডাউন চেক
            const currentTime = Date.now();
            const cooldownTime = 3 * 60 * 1000; 

            if (global.siyamCopyCooldown[senderID] && (currentTime - global.siyamCopyCooldown[senderID] < cooldownTime)) {
                const remainingTime = Math.ceil((cooldownTime - (currentTime - global.siyamCopyCooldown[senderID])) / 1000);
                console.log(`[COOLDOWN] Copy command ignored for ${senderID}. ${remainingTime}s remaining.`);
                return; 
            }

            args.pop();
            const targetText = args.join(" ");

            if (!targetText) {
                return api.sendMessage("❌ দয়া করে কপি করার জন্য কোনো টেক্সট বা ইমোজি দিন।", threadID, messageID);
            }

            // কুলডাউন একটিভ করা
            global.siyamCopyCooldown[senderID] = currentTime;

            // টেক্সট রিপিট তৈরি করা
            let repeatedResult = Array(count).fill(targetText).join(" ");
            
            // অটো-স্প্লিটার (মেসেঞ্জারের লিমিট সেফটি)
            const MAX_LENGTH = 1900; 
            let messageChunks = [];

            while (repeatedResult.length > 0) {
                if (repeatedResult.length > MAX_LENGTH) {
                    let chunk = repeatedResult.substring(0, MAX_LENGTH);
                    messageChunks.push(chunk);
                    repeatedResult = repeatedResult.substring(MAX_LENGTH);
                } else {
                    messageChunks.push(repeatedResult);
                    repeatedResult = "";
                }
            }

            // বিরতি দিয়ে স্প্লিট মেসেজগুলো সেন্ড করা
            for (let i = 0; i < messageChunks.length; i++) {
                await api.sendMessage(messageChunks[i], threadID);
                if (messageChunks.length > 1) {
                    await new Promise(resolve => setTimeout(resolve, 1500)); 
                }
            }

        } catch (err) {
            console.error("Copy Command Error:", err);
            api.sendMessage("❌ অভ্যন্তরীণ সমস্যা! ফাইল ক্রাশ এড়ানো হয়েছে: " + err.message, threadID, messageID);
        }
    }
};
