// 👑 Owner: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
// Enterprise-Grade Owner/Admin Prefix Bypass Engine (v3.0.0)

const OWNER_UID = "61590360434650";

// Global Memory State and Garbage Collection Initialization
if (!global.__SiyamSpamRegistry) global.__SiyamSpamRegistry = new Map();
if (!global.__SiyamCacheState) {
  global.__SiyamCacheState = {
    commandsList: [],
    lastCount: 0
  };
}

// Single Interval Memory Cleaner (Memory Leak & Pressure Protection)
if (!global.__SiyamGcInterval) {
  global.__SiyamGcInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, timestamp] of global.__SiyamSpamRegistry.entries()) {
      if (now - timestamp > 10000) {
        global.__SiyamSpamRegistry.delete(key);
      }
    }
  }, 60000); // Sweeps background memory every 1 minute
}

/**
 * Professional Level-Based Logging System
 */
const logger = {
  info: (msg) => console.log(`\x1b[36m[OWNER_NOPREFIX][INFO]\x1b[0m ${msg}`),
  warn: (msg) => console.warn(`\x1b[33m[OWNER_NOPREFIX][WARN]\x1b[0m ${msg}`),
  error: (msg, err) => console.error(`\x1b[31m[OWNER_NOPREFIX][ERROR]\x1b[0m ${msg}`, err || "")
};

/**
 * Dynamic and Validated Unique Command Cache Refresher
 */
function validateAndRefreshCache(commands) {
  const currentCount = commands.size;
  
  if (global.__SiyamCacheState.lastCount === currentCount && global.__SiyamCacheState.commandsList.length > 0) {
    return;
  }

  const uniqueCmdSet = new Set();
  commands.forEach((cmd) => {
    const name = cmd.config?.name?.trim()?.toLowerCase();
    if (name) uniqueCmdSet.add(name);

    if (Array.isArray(cmd.config?.aliases)) {
      cmd.config.aliases.forEach((alias) => {
        const cleanAlias = alias?.trim()?.toLowerCase();
        if (cleanAlias) uniqueCmdSet.add(cleanAlias);
      });
    }
  });

  global.__SiyamCacheState.commandsList = Array.from(uniqueCmdSet);
  global.__SiyamCacheState.lastCount = currentCount;
  logger.info(`Dynamic Command Cache Rebuilt. Total Unique Entries: ${uniqueCmdSet.size}`);
}

module.exports = {
  config: {
    name: "owner_noprefix",
    version: "3.0.0",
    author: "👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑",
    role: 0,
    shortDescription: "Enterprise Owner No-Prefix Engine",
    longDescription: "Production ready system with dynamic caching, security boundaries and single cleanup thread.",
    category: "system"
  },

  onStart: async function () {
    return;
  },

  onChat: async function (O) {
    const { event, message } = O;
    const rawBody = event.body;

    // Input Sanitization (Safe exit if empty, spaces, or missing message object)
    if (!rawBody || typeof rawBody !== "string") return;
    const body = rawBody.trim();
    if (!body) return;

    const senderID = String(event.senderID);
    const botAdmins = (global.GoatBot?.config?.adminBot || []).map(id => String(id));

    // Instantly exit if sender is not the Owner or a Bot Admin
    if (senderID !== OWNER_UID && !botAdmins.includes(senderID)) return;

    try {
      if (!global.GoatBot || !global.GoatBot.commands) {
        logger.error("Critical core error: global.GoatBot.commands execution tree is unavailable");
        return;
      }

      // Safe escaping and removal of bot prefix
      const botPrefix = global.GoatBot?.config?.prefix || "/";
      let cleanBody = body;
      
      if (body.startsWith(botPrefix)) {
        cleanBody = body.slice(botPrefix.length).trim();
      }

      const args = cleanBody.split(/\s+/);
      const commandName = args.shift()?.toLowerCase();
      if (!commandName) return;

      const commands = global.GoatBot.commands;

      // Case-insensitive command and alias resolution
      const command = commands.get(commandName) || [...commands.values()].find(
        cmd => Array.isArray(cmd.config?.aliases) && 
        cmd.config.aliases.map(a => String(a).toLowerCase()).includes(commandName)
      );

      // ────────────────────────────────────────────────────────
      // 🚫 COMMAND NOT FOUND (Silent Exit - No Spam)
      // ────────────────────────────────────────────────────────
      if (!command) {
        // Anti-spam registry tracking for unmapped queries
        const currentTime = Date.now();
        const spamKey = `${senderID}_${commandName}`;

        if (global.__SiyamSpamRegistry.has(spamKey)) {
          const lastTime = global.__SiyamSpamRegistry.get(spamKey);
          if (currentTime - lastTime < 10000) {
            return;
          }
        }
        global.__SiyamSpamRegistry.set(spamKey, currentTime);

        // State validation sync
        validateAndRefreshCache(commands);
        
        // All error/suggestion messages removed to prevent spamming
        return; 
      }

      // ────────────────────────────────────────────────────────
      // ⚠️ DISABLED COMMAND GATEWAY
      // ────────────────────────────────────────────────────────
      const disabledCommands = global.GoatBot?.config?.commandDisabled || [];
      if (disabledCommands.includes(command.config?.name)) {
        return message.reply(`[WARN] The command "${command.config.name}" is currently disabled in the bot configuration.`);
      }

      // ────────────────────────────────────────────────────────
      // 🚀 SECURE COMMAND EXECUTION PIPELINE
      // ────────────────────────────────────────────────────────
      if (typeof command.onStart !== "function") {
        logger.warn(`Execution blocked: onStart function is missing in [${commandName}] module.`);
        return message.reply("[ERROR] Unable to execute command due to missing internal core handler.");
      }

      // Context preservation using GoatBot parameters
      const clonedParams = {
        ...O,
        args,
        commandName: command.config?.name || commandName
      };

      try {
        // Runs the target command seamlessly without triggering suggestions
        await command.onStart(clonedParams);
        logger.info(`SUCCESS: [${commandName}] successfully invoked by Admin/Owner: ${senderID}`);
      } catch (execError) {
        logger.error(`Core crash intercepted inside command [${commandName}] ->`, execError);
        return message.reply("[ERROR] An internal module error occurred during execution. Please check console logs.");
      }

    } catch (err) {
      // Global Exception Recovery Shield
      logger.error("Unhandled runtime exception caught safely inside global wrapper ->", err.message || err);
    }
  }
};
