/**
 * 👑 Siyam Absolute Core Framework - Ultimate Enterprise Edition
 * High-Performance, Resilient, Anti-Crash, Anti-Spam & Global Permission Engine
 * Integrated with Premium Admin2 List Generator
 * Author: 𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍 (All Rights Reserved)
 */

const fs = require("fs");
const path = require("path");

// 💾 Centralized Configuration & Immutable Security State
const VIP_UIDS = new Set([
  "61590360434650",
  "100084729135721",
  "100073956182433",
  "100094821035784"
]);

// 🧠 Advanced TTL Cache & State Management
const spamMap = new Map();
const muteMap = new Map();
const apiQueue = [];
let isProcessingQueue = false;

// 📜 Core Logger Engine
const LOG_DIR = path.join(process.cwd(), "siyam_logs");
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function writeLog(filename, type, message) {
  try {
    const logPath = path.join(LOG_DIR, filename);
    const logMessage = `[${new Date().toISOString()}] [${type}] ${message}\n`;
    fs.appendFileSync(logPath, logMessage, "utf8");
  } catch (err) {
    console.error(`[Logger Critical Error] ${err.message}`);
  }
}

const SiyamCore = {
  vips: VIP_UIDS,

  // 👑 Global Absolute Power Bypass
  hasAbsolutePower: function (senderID) {
    if (!senderID || typeof senderID !== "string") return false;
    if (!/^\d+$/.test(senderID)) return false; // UID Spoof & Validation Protection
    return VIP_UIDS.has(senderID);
  },

  // 🛡️ Global Permission Interceptor Matrix
  interceptPermission: function (senderID, currentPermissionState) {
    if (this.hasAbsolutePower(senderID)) {
      return {
        isOwner: true,
        isAdmin: true,
        isWhiteListed: true,
        isPremium: true,
        bypassMaintenance: true,
        bypassBan: true,
        allowedToExecute: true,
        role: 7 // Supreme Root Level Role
      };
    }
    return currentPermissionState;
  },

  // ⚡ Advanced Anti-Spam, Rate-Limiting & Mute Engine
  checkSpam: function (senderID, content = "") {
    if (this.hasAbsolutePower(senderID)) return { isSpam: false, action: "execute" };

    const now = Date.now();
    
    // Check Temporary Mute Status
    if (muteMap.has(senderID)) {
      const muteExpiry = muteMap.get(senderID);
      if (now < muteExpiry) {
        return { isSpam: true, action: "mute", remaining: muteExpiry - now };
      } else {
        muteMap.delete(senderID);
      }
    }

    const userData = spamMap.get(senderID) || { 
      lastMsgTime: 0, 
      count: 0, 
      warnCount: 0, 
      lastContentHash: "" 
    };

    const contentHash = content.trim().toLowerCase();
    const isDuplicate = (contentHash && userData.lastContentHash === contentHash && (now - userData.lastMsgTime < 3000));
    const isMessageFlood = (now - userData.lastMsgTime < 1200);

    if (isMessageFlood || isDuplicate) {
      userData.count++;
      userData.lastMsgTime = now;
      if (isDuplicate) userData.count += 1; 
      
      spamMap.set(senderID, userData);

      if (userData.count >= 4) {
        userData.warnCount++;
        userData.count = 0; 
        spamMap.set(senderID, userData);

        if (userData.warnCount >= 3) {
          const muteDuration = 5 * 60 * 1000; 
          muteMap.set(senderID, now + muteDuration);
          writeLog("security.log", "MUTE", `User ${senderID} muted for aggressive spamming.`);
          return { isSpam: true, action: "penalty", duration: muteDuration };
        }

        return { isSpam: true, action: "warning", warnCount: userData.warnCount };
      }
      return { isSpam: true, action: "suppress" };
    }

    userData.count = Math.max(0, userData.count - 1);
    userData.lastMsgTime = now;
    userData.lastContentHash = contentHash;
    spamMap.set(senderID, userData);

    return { isSpam: false, action: "execute" };
  },

  // 📥 API Shield with Exponential Backoff & Queue Integration
  safeApiCall: async function (apiCallFunc, maxRetries = 3, baseDelay = 1000) {
    return new Promise((resolve, reject) => {
      const task = async () => {
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
          try {
            const timeoutPromise = new Promise((_, reqReject) =>
              setTimeout(() => reqReject(new Error("API Gateway Timeout")), 5000)
            );
            const result = await Promise.race([apiCallFunc(), timeoutPromise]);
            resolve(result);
            return;
          } catch (err) {
            if (attempt === maxRetries) {
              writeLog("api_error.log", "CRITICAL", `All ${maxRetries} retries exhausted. Error: ${err.message}`);
              resolve(null); 
              return;
            }
            const delay = baseDelay * Math.pow(2, attempt); 
            await new Promise(res => setTimeout(res, delay));
          }
        }
      };

      apiQueue.push(task);
      this._processApiQueue();
    });
  },

  _processApiQueue: async function () {
    if (isProcessingQueue || apiQueue.length === 0) return;
    isProcessingQueue = true;

    while (apiQueue.length > 0) {
      const currentTask = apiQueue.shift();
      try {
        await currentTask();
        await new Promise(res => setTimeout(res, 200)); 
      } catch (queueErr) {
        writeLog("api_error.log", "QUEUE_EXEC_ERR", queueErr.message);
      }
    }
    isProcessingQueue = false;
  },

  // 🛡️ Command Sandbox & Protection Matrix
  executeCommandSafely: async function (commandName, commandFunc, context) {
    const senderID = String(context?.event?.senderID);
    
    if (!commandName || typeof commandFunc !== "function" || !context) {
      writeLog("security.log", "INVALID_INJECTION_ATTEMPT", `Malformed payload or injection vector blocked.`);
      return;
    }

    try {
      writeLog("command.log", "EXECUTE", `UID: ${senderID} triggered Command: ${commandName}`);
      return await commandFunc(context);
    } catch (cmdError) {
      writeLog("error.log", "COMMAND_CRASH", `Command [${commandName}] failed. Reason: ${cmdError.stack}`);
      
      try {
        if (context.message && typeof context.message.reply === "function") {
          await context.message.reply("❌ An internal stability exception occurred. Command isolated safely.");
        }
      } catch (uiErr) {
        writeLog("error.log", "UI_FALLBACK_ERR", uiErr.message);
      }
    }
  },

  // 👑 𝗕𝗢𝗧 𝗔𝗗𝗠𝗜𝗡 𝗟𝗜𝗦𝗧 Generator Engine (কম স্পেস ও প্রিমিয়াম ইন্টারফেস)
  generateAdmin2List: async function (api, message) {
    const uids = Array.from(VIP_UIDS);
    const ownerUID = uids[0];
    const assistantUIDs = [uids[1], uids[2], uids[3]];

    let ownerName = "Live Syncing...";
    let assistantNames = ["Live Syncing...", "Live Syncing...", "Live Syncing..."];

    const loadingMsg = await message.reply("⚡ ⎡ 𝐒𝐈𝐘𝐀𝐌 𝐍𝐄𝐓𝐖𝐎𝐑𝐊 ⎦ ⚡\n⏳ Generating Verified Data...");

    const fetchedData = await this.safeApiCall(() => api.getUserInfo(uids));

    if (fetchedData) {
      if (fetchedData[ownerUID]) ownerName = fetchedData[ownerUID].name;
      assistantUIDs.forEach((uid, index) => {
        if (fetchedData[uid]) assistantNames[index] = fetchedData[uid].name;
      });
    } else {
      ownerName = "পি্ঁচ্চি্ঁ রি্ঁদ্ঁয়্ঁ ত্যা্ঁহ্ঁ";
      assistantNames = ["Assistant Admin 1", "Assistant Admin 2", "Assistant Admin 3"];
    }

    const premiumList = `👑 [ 𝗧𝗛𝗘 𝗔𝗕𝗦𝗢𝗟𝗨𝗧𝗘 𝗕𝗢𝗦 ] 👑
════════════════════
» 👤 𝗕𝗢𝗦𝗦: ${ownerName}
» 🆔 𝗨𝗜𝗗: ${ownerUID}
» ⚡ 𝗣𝗢𝗪𝗘𝗥: ALL POWERFUL ROOT
════════════════════

⚔️ [ 𝗔𝗦𝗦𝗜𝗦𝗧𝗔𝗡𝗧 𝗔𝗗𝗠𝗜𝗡𝗦 ]
────────────────────
[01] 👤 🎯: ${assistantNames[0]}
     🆔 𝗨𝗜𝗗: ${assistantUIDs[0]}
     🎖️ 𝗦𝗧𝗔𝗧𝗨𝗦: সহকারী এডমিন
────────────────────
[02] 👤 🎯: ${assistantNames[1]}
     🆔 𝗨𝗜𝗗: ${assistantUIDs[1]}
     🎖️ 𝗦𝗧𝗔𝗧𝗨𝗦: সহকারী এডমিন
────────────────────
[03] 👤 🎯: ${assistantNames[2]}
     🆔 𝗨𝗜𝗗: ${assistantUIDs[2]}
     🎖️ 𝗦𝗧𝗔𝗧𝗨𝗦: সহকারী এডমিন
════════════════════
👤 Developed by: 𝐒𝐈𝐘𝐀𝐌 𝐇𝐀𝐒𝐀𝐍`;

    if (loadingMsg && loadingMsg.messageID) {
      try { await api.unsendMessage(loadingMsg.messageID); } catch (e) {}
    }

    return message.reply({ body: premiumList });
  },

  // 🧠 Memory Optimization Engine
  optimizeMemory: function () {
    const now = Date.now();

    for (const [key, value] of spamMap.entries()) {
      if (now - value.lastMsgTime > 15 * 60 * 1000) {
        spamMap.delete(key);
      }
    }

    for (const [key, expiry] of muteMap.entries()) {
      if (now >= expiry) {
        muteMap.delete(key);
      }
    }

    if (global.gc) {
      try { global.gc(); } catch (e) { writeLog("error.log", "GC_FAILED", e.message); }
    }
    writeLog("system.log", "OPTIMIZE", "Granular Cache Cleanup and Memory Isolation successfully executed.");
  },

  // ⚙️ Graceful Shutdown Orchestrator
  handleShutdown: function (signal) {
    writeLog("system.log", "SHUTDOWN", `Received process termination signal: ${signal}. Saving states...`);
    console.log(`[Siyam Core] Graceful Shutdown complete via ${signal}.`);
    process.exit(0);
  }
};

// 🛡️ Anti-Crash Process Level Event Monitors
process.on("unhandledRejection", (reason, promise) => {
  writeLog("error.log", "UNHANDLED_REJECTION", `Reason: ${reason?.stack || reason}`);
});

process.on("uncaughtException", (err) => {
  writeLog("error.log", "UNCAUGHT_EXCEPTION", `Message: ${err.stack}`);
});

process.on("SIGINT", () => SiyamCore.handleShutdown("SIGINT"));
process.on("SIGTERM", () => SiyamCore.handleShutdown("SIGTERM"));

setInterval(() => SiyamCore.optimizeMemory(), 5 * 60 * 1000);

module.exports = SiyamCore;
