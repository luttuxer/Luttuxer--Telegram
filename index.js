require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');
const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TOKEN, {
  polling: true
});

const START_TIME = Date.now();

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

console.log('🤖 LuttuxerBot started!');
console.log('📁 Download folder:', DOWNLOAD_DIR);


// ===============================
// BOT NAME
// ===============================

const BRAND =
  '⌁⏱ 𝞘𝞵𝞽⃕͜𝞽𝞴𝞺𝞺𝞲 𝞭𝞮⃕͜𝟆 ↲ 🈀 🥕';


// ===============================
// START MENU
// ===============================

function mainMenu() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🎬 Instagram', callback_data: 'instagram' },
          { text: '🎵 MP3 / Audio', callback_data: 'mp3' }
        ],
        [
          { text: '▶️ YouTube', callback_data: 'youtube' },
          { text: '🎵 TikTok', callback_data: 'tiktok' }
        ],
        [
          { text: '🖼️ Media Tools', callback_data: 'media' },
          { text: '⚡ More', callback_data: 'more' }
        ],
        [
          { text: '👤 Owner', callback_data: 'owner' },
          { text: 'ℹ️ About', callback_data: 'about' }
        ]
      ]
    }
  };
}


// ===============================
// MORE MENU
// ===============================

function moreMenu() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🎞️ Video → GIF', callback_data: 'gif' },
          { text: '🎞️ Video → Sticker', callback_data: 'vsticker' }
        ],
        [
          { text: '🖼️ Image → Sticker', callback_data: 'isticker' },
          { text: '✂️ Video Trim', callback_data: 'trim' }
        ],
        [
          { text: '🔗 URL / File Info', callback_data: 'info' },
          { text: '📊 Bot Status', callback_data: 'status' }
        ],
        [
          { text: '🆘 Help', callback_data: 'help' }
        ],
        [
          { text: '🔙 Back', callback_data: 'back' }
        ]
      ]
    }
  };
}


// ===============================
// START
// ===============================

bot.onText(/^\/start$/, async (msg) => {

  const text =
`╭━━━━━━━━━━━━━━━━━━━━━━╮
        𝙇𝙐𝙏𝙏𝙐𝙓𝙀𝙍 𝙈𝘿
╰━━━━━━━━━━━━━━━━━━━━━━╯

⚡ 𝙋𝙍𝙀𝙈𝙄𝙐𝙈 𝙏𝙀𝙇𝙀𝙂𝙍𝘼𝙈 𝘽𝙊𝙏

👋🏻 Welcome, ${msg.from.first_name || 'User'}!

🚀 Fast • Smart • Powerful
📥 Media Downloader & Tools

👇🏻 𝙎𝙀𝙇𝙀𝘾𝙏 𝘼 𝙁𝙀𝘼𝙏𝙐𝙍𝙀

${BRAND}`;

  await bot.sendMessage(
    msg.chat.id,
    text,
    mainMenu()
  );
});


// ===============================
// PING
// ===============================

bot.onText(/^\/ping$/, async (msg) => {

  const start = Date.now();

  const message = await bot.sendMessage(
    msg.chat.id,
    '🏓 𝙋𝙞𝙣𝙜𝙞𝙣𝙜...'
  );

  const latency = Date.now() - start;

  await bot.editMessageText(
    `🏓 𝙋𝙊𝙉𝙂!\n\n⚡ 𝙇𝙖𝙩𝙚𝙣𝙘𝙮: ${latency} ms\n🤖 𝙎𝙩𝙖𝙩𝙪𝙨: 𝙊𝙣𝙡𝙞𝙣𝙚`,
    {
      chat_id: msg.chat.id,
      message_id: message.message_id
    }
  );
});


// ===============================
// ALIVE
// ===============================

bot.onText(/^\/alive$/, async (msg) => {

  await bot.sendMessage(
    msg.chat.id,
`╭━━━━━━━━━━━━━━━━━━╮
      🤖 𝙇𝙐𝙏𝙏𝙐𝙓𝙀𝙍 𝙈𝘿
╰━━━━━━━━━━━━━━━━━━╯

✅ 𝙄'𝙢 𝘼𝙡𝙞𝙫𝙚!

⚡ 𝙎𝙮𝙨𝙩𝙚𝙢: 𝙊𝙣𝙡𝙞𝙣𝙚
🚀 𝙈𝙤𝙙𝙚: 𝙋𝙪𝙗𝙡𝙞𝙘
🟢 𝙎𝙩𝙖𝙩𝙪𝙨: 𝙒𝙤𝙧𝙠𝙞𝙣𝙜

${BRAND}`
  );
});


// ===============================
// HELP
// ===============================

bot.onText(/^\/help$/, async (msg) => {

  await bot.sendMessage(
    msg.chat.id,
`╭━━━━━━〔 🆘 𝙃𝙀𝙇𝙋 〕━━━━━━╮

/start  →  Main Menu
/ping   →  Check Ping
/alive  →  Bot Status
/owner  →  Owner Info
/about  →  About Bot

📥 𝙈𝙀𝘿𝙄𝘼

🎬 Instagram Downloader
📸 Instagram Photo / Carousel
🎵 Audio / MP3
▶️ YouTube
🎵 TikTok

🛠️ 𝙏𝙊𝙊𝙇𝙎

🎞️ Video → GIF
🎞️ Video → Sticker
🖼️ Image → Sticker
✂️ Video Trim
🔗 URL / File Info

╰━━━━━━━━━━━━━━━━━━━━━━╯`
  );
});


// ===============================
// OWNER
// ===============================

bot.onText(/^\/owner$/, async (msg) => {

  await bot.sendMessage(
    msg.chat.id,
`╭━━━━━━〔 👤 𝙊𝙒𝙉𝙀𝙍 〕━━━━━━╮

🤖 𝙇𝙪𝙩𝙩𝙪𝙭𝙚𝙧 𝙈𝘿

⚡ Developer:
𝙇𝙪𝙩𝙩𝙪𝙭𝙚𝙧

💚 Thanks for using the bot!

╰━━━━━━━━━━━━━━━━━━━━━━╯`
  );
});


// ===============================
// ABOUT
// ===============================

bot.onText(/^\/about$/, async (msg) => {

  await bot.sendMessage(
    msg.chat.id,
`╭━━━━━━〔 ℹ️ 𝘼𝘽𝙊𝙐𝙏 〕━━━━━━╮

🤖 𝙇𝙐𝙏𝙏𝙐𝙓𝙀𝙍 𝙈𝘿

⚡ Personal Telegram Bot

🚀 Fast & Simple
📥 Media Downloader
🛠️ Media Tools
🎬 Social Media Tools

💚 Crafted by Luttuxer

╰━━━━━━━━━━━━━━━━━━━━━━╯`
  );
});


// ===============================
// CALLBACK BUTTONS
// ===============================

bot.on('callback_query', async (query) => {

  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  await bot.answerCallbackQuery(query.id);

  const data = query.data;


  // -----------------------------
  // BACK
  // -----------------------------

  if (data === 'back') {

    await bot.editMessageReplyMarkup(
      mainMenu().reply_markup,
      {
        chat_id: chatId,
        message_id: messageId
      }
    );

    return;
  }


  // -----------------------------
  // MORE
  // -----------------------------

  if (data === 'more') {

    await bot.editMessageText(
`╭━━━━━━〔 ⚡ 𝙈𝙊𝙍𝙀 〕━━━━━━╮

🛠️ 𝙈𝙊𝙍𝙀 𝙏𝙊𝙊𝙇𝙎

Select a tool below 👇🏻

╰━━━━━━━━━━━━━━━━━━━━━━╯`,
      {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: moreMenu().reply_markup
      }
    );

    return;
  }


  // -----------------------------
  // INSTAGRAM
  // -----------------------------

  if (data === 'instagram') {

    await bot.sendMessage(
      chatId,
`🎬 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈

📥 Send a public Instagram
Reel / Video / Post link.

⚡ I'll try to download it for you.`
    );

    return;
  }


  // -----------------------------
  // MP3
  // -----------------------------

  if (data === 'mp3') {

    await bot.sendMessage(
      chatId,
`🎵 𝙈𝙋𝟯 / 𝘼𝙐𝘿𝙄𝙊

Send a supported video link.

🎧 Audio extraction will be added here.`
    );

    return;
  }


  // -----------------------------
  // YOUTUBE
  // -----------------------------

  if (data === 'youtube') {

    await bot.sendMessage(
      chatId,
`▶️ 𝙔𝙊𝙐𝙏𝙐𝘽𝙀

Send a public YouTube link.

🎬 Video / Audio downloader
will be connected here.`
    );

    return;
  }


  // -----------------------------
  // TIKTOK
  // -----------------------------

  if (data === 'tiktok') {

    await bot.sendMessage(
      chatId,
`🎵 𝙏𝙄𝙆𝙏𝙊𝙆

Send a public TikTok link.

📥 Downloader will be connected here.`
    );

    return;
  }


  // -----------------------------
  // MEDIA
  // -----------------------------

  if (data === 'media') {

    await bot.sendMessage(
      chatId,
`🖼️ 𝙈𝙀𝘿𝙄𝘼 𝙏𝙊𝙊𝙇𝙎

🖼️ Image Tools
🎞️ Video Tools
🎵 Audio Tools

More tools coming soon ⚡`
    );

    return;
  }


  // -----------------------------
  // GIF
  // -----------------------------

  if (data === 'gif') {

    await bot.sendMessage(
      chatId,
`🎞️ 𝙑𝙄𝘿𝙀𝙊 → 𝙂𝙄𝙁

Send a video file.

⚙️ GIF converter will process it.`
    );

    return;
  }


  // -----------------------------
  // VIDEO STICKER
  // -----------------------------

  if (data === 'vsticker') {

    await bot.sendMessage(
      chatId,
`🎞️ 𝙑𝙄𝘿𝙀𝙊 → 𝙎𝙏𝙄𝘾𝙆𝙀𝙍

Send a short video.

⚙️ Sticker converter will process it.`
    );

    return;
  }


  // -----------------------------
  // IMAGE STICKER
  // -----------------------------

  if (data === 'isticker') {

    await bot.sendMessage(
      chatId,
`🖼️ 𝙄𝙈𝘼𝙂𝙀 → 𝙎𝙏𝙄𝘾𝙆𝙀𝙍

Send an image.

⚙️ Sticker converter will process it.`
    );

    return;
  }


  // -----------------------------
  // TRIM
  // -----------------------------

  if (data === 'trim') {

    await bot.sendMessage(
      chatId,
`✂️ 𝙑𝙄𝘿𝙀𝙊 𝙏𝙍𝙄𝙈

Send a video file.

⏱️ Trim tool will be connected here.`
    );

    return;
  }


  // -----------------------------
  // INFO
  // -----------------------------

  if (data === 'info') {

    await bot.sendMessage(
      chatId,
`🔗 𝙐𝙍𝙇 / 𝙁𝙄𝙇𝙀 𝙄𝙉𝙁𝙊

Send a supported URL or file.

ℹ️ Information tool will be connected here.`
    );

    return;
  }


  // -----------------------------
  // STATUS
  // -----------------------------

  if (data === 'status') {

    const uptime = formatUptime(
      Date.now() - START_TIME
    );

    await bot.sendMessage(
      chatId,
`╭━━━━━━〔 📊 𝙎𝙏𝘼𝙏𝙐𝙎 〕━━━━━━╮

🤖 𝘽𝙤𝙩: 𝙊𝙣𝙡𝙞𝙣𝙚
🟢 𝙋𝙤𝙡𝙡𝙞𝙣𝙜: 𝙍𝙪𝙣𝙣𝙞𝙣𝙜
⏱️ 𝙐𝙥𝙩𝙞𝙢𝙚: ${uptime}

╰━━━━━━━━━━━━━━━━━━━━━━╯`
    );

    return;
  }


  // -----------------------------
  // OWNER BUTTON
  // -----------------------------

  if (data === 'owner') {

    await bot.sendMessage(
      chatId,
`👤 𝙊𝙒𝙉𝙀𝙍

🤖 𝙇𝙪𝙩𝙩𝙪𝙭𝙚𝙧 𝙈𝘿
⚡ Developer: 𝙇𝙪𝙩𝙩𝙪𝙭𝙚𝙧`
    );

    return;
  }


  // -----------------------------
  // ABOUT BUTTON
  // -----------------------------

  if (data === 'about') {

    await bot.sendMessage(
      chatId,
`ℹ️ 𝙇𝙐𝙏𝙏𝙐𝙓𝙀𝙍 𝙈𝘿

⚡ Premium Telegram Bot
📥 Media Downloader
🛠️ Media Tools
🚀 Fast & Simple

💚 Crafted by Luttuxer`
    );

    return;
  }


  // -----------------------------
  // HELP BUTTON
  // -----------------------------

  if (data === 'help') {

    await bot.sendMessage(
      chatId,
`🆘 𝙃𝙀𝙇𝙋

/start — Main Menu
/ping — Ping
/alive — Alive
/owner — Owner
/about — About
/help — Help

Use the buttons in /start
for available tools.`
    );

    return;
  }

});// =========================
// 🤖 GEMINI AI CHAT
// =========================

const aiHistory = new Map();

let botUsername = '';

(async () => {
  try {
    const me = await bot.getMe();
    botUsername = me.username || '';
    console.log(`🤖 AI mention mode: @${botUsername}`);
  } catch (e) {
    console.log('❌ Could not get bot username:', e.message);
  }
})();

bot.on('message', async (msg) => {
  try {
    if (!msg.text) return;
    if (msg.from?.is_bot) return;

    const text = msg.text.trim();
    const chatId = msg.chat.id;

    // Commands AI handle cheyyilla
    if (text.startsWith('/')) return;

    // =========================
  // 🔗 AUTO MEDIA LINK DOWNLOADER
  // =========================

  const mediaUrlMatch = text.match(/https?:\/\/[^\s]+/i);

  if (mediaUrlMatch) {
    const url = mediaUrlMatch[0].replace(/[)\]}>.,!?]+$/, '');

    if (/^(https?:\/\/)(www\.)?(instagram\.com|youtube\.com|youtu\.be|tiktok\.com|x\.com|twitter\.com|facebook\.com)\//i.test(url)) {
      const path = require('path');
      const fs = require('fs');

      const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const output = path.join(DOWNLOAD_DIR, `luttuxer_${id}.%(ext)s`);

      try {
        await bot.sendMessage(chatId, '⏳ Downloading media...');

        await new Promise((resolve, reject) => {
          execFile(
            'yt-dlp',
            [
              '--no-playlist',
              '--no-warnings',
              '-f',
              'bv*+ba/b',
              '--merge-output-format',
              'mp4',
              '-o',
              output,
              url
            ],
            { timeout: 180000 },
            (error, stdout, stderr) => {
              if (error) {
                reject(new Error(stderr?.trim() || error.message));
                return;
              }
              resolve();
            }
          );
        });

        const files = fs.readdirSync(DOWNLOAD_DIR)
          .filter(name => name.startsWith(`luttuxer_${id}.`));

        if (!files.length) {
          throw new Error('Downloaded file not found');
        }

        const filePath = path.join(DOWNLOAD_DIR, files[0]);
        const stat = fs.statSync(filePath);

        if (stat.size > 49 * 1024 * 1024) {
          await bot.sendMessage(
            chatId,
            '⚠️ File valare valuth aanu. Telegram upload limit karanam send cheyyan pattilla.'
          );
        } else {
          await bot.sendVideo(chatId, filePath, {
            caption: '✅ 𝙇𝙪𝙩𝙩𝙪𝙭𝙚𝙧 𝙈𝘿 ⚡'
          });
        }

        try { fs.unlinkSync(filePath); } catch {}
      } catch (err) {
        console.log('❌ MEDIA DOWNLOAD ERROR:', err.message);

        await bot.sendMessage(
          chatId,
          '🥹 Ee link-il ninn media download cheyyan pattiyilla.\n\n🔒 Private/login-required content support illa.'
        );

        try {
          const files = fs.readdirSync(DOWNLOAD_DIR)
            .filter(name => name.startsWith(`luttuxer_${id}.`));

          for (const file of files) {
            try { fs.unlinkSync(path.join(DOWNLOAD_DIR, file)); } catch {}
          }
        } catch {}
      }

      return;
    }
  }

  // Instagram links downloader handle cheyyum
    if (/https?:\/\/(www\.)?instagram\.com\//i.test(text)) return;

    // Group-il @mention cheythal mathram AI reply
    if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
      const mentioned =
        botUsername &&
        new RegExp(`@${botUsername}\\b`, 'i').test(text);

      if (!mentioned) return;
    }

    // Bot mention remove cheythu clean message AI-kku kodukkum
    const cleanText = botUsername
      ? text.replace(new RegExp(`@${botUsername}\\b`, 'ig'), '').trim()
      : text;

    if (!cleanText) return;

    await bot.sendChatAction(chatId, 'typing');

    if (!aiHistory.has(chatId)) {
      aiHistory.set(chatId, []);
    }

    const history = aiHistory.get(chatId);

    history.push({
      role: 'user',
      parts: [{ text: cleanText }]
    });

    if (history.length > 10) {
      history.splice(0, history.length - 10);
    }

    const response = await gemini.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: history,
      config: {
        systemInstruction:
          'You are Luttuxer MD, a friendly Telegram AI assistant. ' +
          'Reply naturally like a normal conversation. ' +
          'For Malayalam, ALWAYS use Manglish using English/Roman letters, NOT Malayalam script. ' +
          'Understand Malayalam, Manglish and English. ' +
          'Match the user language and casual style. ' +
          'Keep replies friendly, natural and reasonably short. ' +
          'Use emojis naturally when appropriate.'
      }
    });

    const answer = response.text?.trim();

    if (!answer) {
      await bot.sendMessage(
        chatId,
        '🥹 Sorry, ippo reply generate cheyyan pattiyilla.'
      );
      return;
    }

    history.push({
      role: 'model',
      parts: [{ text: answer }]
    });

    if (history.length > 10) {
      history.splice(0, history.length - 10);
    }

    await bot.sendMessage(chatId, answer);

  } catch (error) {
    console.log('❌ GEMINI ERROR:', error.message);

    await bot.sendMessage(
      msg.chat.id,
      '🥹 AI reply cheyyumbol oru small error vannu. Kurachu kazhinju try cheyyu.'
    );
  }
});



// =========================
// 🤖 BOT BIO
// =========================

(async () => {
  try {
    await bot.setMyDescription({
      description: '🤖 Luttuxer MD | AI • Media • Tools ⚡'
    });

    await bot.setMyShortDescription({
      short_description: '🤖 Luttuxer MD | AI • Media • Tools ⚡'
    });

    console.log('✅ Bot bio set aayi!');
  } catch (e) {
    console.log('❌ BIO ERROR:', e.message);
  }
})();
