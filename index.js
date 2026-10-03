require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { execFile, spawn } = require('child_process');
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
`╭━━━〔 ⚡ CYBER ZONE ⚡ 〕━━━╮
       𝙇𝙐𝙏𝙏𝙐𝙓𝙀𝙍 𝙈𝘿
╰━━━━━━━━━━━━━━━━━━━━━━╯

⟡ ⚡ PREMIUM TELEGRAM BOT ⚡ ⟡

╭────────────────────╮
  👥 5K+ USERS COMMUNITY
  🚀 FAST • SMART • POWERFUL
  📥 MEDIA DOWNLOADER
  🛠️ PREMIUM MEDIA TOOLS
╰────────────────────╯

👋🏻 Welcome, ${msg.from.first_name || 'User'}!

◈ SELECT YOUR FEATURE BELOW ◈
⚡ Choose a button to get started!

𓆩♡𓆪 𝙇𝙪𝙩𝙩𝙪𝙭𝙚𝙧 𝘿𝙇 🦋

🎬 ʏᴏᴜʀ ᴠɪᴅᴇᴏ, ʏᴏᴜʀ sᴛʏʟᴇ!

✦ ʜᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ 🎥
✦ ᴜᴘ ᴛᴏ 1080ᴘ 💎
✦ ᴠɪᴅᴇᴏ ᴛᴏ ᴍᴘ3 🎧
✦ ʟɪᴠᴇ ᴘʀᴏɢʀᴇss 📊
✦ ғᴀsᴛ • sᴍᴏᴏᴛʜ • sɪᴍᴘʟᴇ ⚡

ᴍᴀᴅᴇ ᴡɪᴛʜ 🤍 ʙʏ ʟᴜᴛᴛᴜxᴇʀ

${BRAND}`;

  await bot.sendVideo(
    msg.chat.id,
    path.join(__dirname, 'start-original.mp4'),
    { supports_streaming: true }
  );

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

const pendingQualityLinks = new Map();

const pendingMp3Files = new Map();

async function convertAndSendMp3(chatId, id) {
  const item = pendingMp3Files.get(id);
  if (!item) {
    await bot.sendMessage(chatId, '⌛ Ee video request expire aayi. Video veendum ayakku.');
    return;
  }

  pendingMp3Files.delete(id);
  const output = path.join(DOWNLOAD_DIR, 'luttuxer_audio_' + id + '.mp3');

  try {
    await bot.sendMessage(chatId, '🎵 MP3 convert cheyyunnu... kuttaa, wait 🤍');

    await new Promise((resolve, reject) => {
      const child = spawn('ffmpeg', [
        '-y', '-i', item.path, '-vn',
        '-codec:a', 'libmp3lame', '-q:a', '2', output
      ]);
      child.on('error', reject);
      child.on('close', code => {
        if (code === 0) resolve();
        else reject(new Error('ffmpeg exit code ' + code));
      });
    });

    if (!fs.existsSync(output) || fs.statSync(output).size === 0) {
      throw new Error('MP3 output empty');
    }
    if (fs.statSync(output).size > 49 * 1024 * 1024) {
      throw new Error('MP3 exceeds 49 MB');
    }

    await bot.sendAudio(chatId, output, {
      title: '⏱‹‹ 𝞘𝞵𝞽⃕͜𝞽𝞴𝞺⃕𝞺𝞲 𝞭𝞮⃕͜𝟆 ↲ 🈀🥕',
      performer: '⏱‹‹ 𝞘𝞵𝞽⃕͜𝞽𝞴𝞺⃕𝞺𝞲 𝞭𝞮⃕͜𝟆 ↲ 🈀🥕'
    });
  } catch (err) {
    console.log('MP3 CONVERSION ERROR:', err.message);
    await bot.sendMessage(chatId, '🥹 MP3 convert cheyyan pattiyilla. Vere video try cheyyu.');
  } finally {
    try { fs.unlinkSync(item.path); } catch {}
    try { fs.unlinkSync(output); } catch {}
  }
}


async function getAvailableQualities(url) {
  return new Promise((resolve, reject) => {
    execFile('yt-dlp', ['--no-warnings', '--no-playlist', '-J', url],
      { timeout: 90000, maxBuffer: 20 * 1024 * 1024 },
      (err, stdout, stderr) => {
        if (err) return reject(new Error(stderr || err.message));
        try {
          const info = JSON.parse(stdout);
          const heights = [...new Set((info.formats || [])
            .filter(f => f.vcodec && f.vcodec !== 'none' && f.height)
            .map(f => Number(f.height))
            .filter(h => Number.isFinite(h) && h > 0))]
            .sort((a, b) => a - b);
          resolve(heights);
        } catch (e) { reject(e); }
      });
  });
}

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
`🎬 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙏𝙊𝙊𝙇𝙎

Choose what you want to do 👇`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '📥 Reel / Video', callback_data: 'ig_download' },
              { text: '🖼️ Post / Photo', callback_data: 'ig_post' }
            ],
            [
              { text: '👤 Profile Info', callback_data: 'ig_profile' },
              { text: '🔗 URL Info', callback_data: 'ig_info' }
            ],
            [
              { text: '🔙 Back', callback_data: 'back' }
            ]
          ]
        }
      }
    );

    return;
  }


  // -----------------------------
  // INSTAGRAM PROFILE INFO
  // -----------------------------

  if (data === 'ig_profile') {

    await bot.sendMessage(
      chatId,
`👤 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙋𝙍𝙊𝙁𝙄𝙇𝙀

Send a public Instagram profile URL.

Example:
https://instagram.com/username

🔎 I'll try to fetch publicly available profile info.`
    );

    return;
  }


  // -----------------------------
  // INSTAGRAM POST / PHOTO
  // -----------------------------

  if (data === 'ig_post') {

    await bot.sendMessage(
      chatId,
`🖼️ 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙋𝙊𝙎𝙏

Send a public Instagram post/photo link.`
    );

    return;
  }


  // -----------------------------
  // INSTAGRAM URL INFO
  // -----------------------------

  if (data === 'ig_info') {

    await bot.sendMessage(
      chatId,
`🔗 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙐𝙍𝙇 𝙄𝙉𝙁𝙊

Send an Instagram Reel, Post or Profile URL.`
    );

    return;
  }


  // -----------------------------
  // INSTAGRAM DOWNLOAD
  // -----------------------------

  if (data === 'ig_download') {

    await bot.sendMessage(
      chatId,
`📥 𝙄𝙉𝙎𝙏𝘼𝙂𝙍𝘼𝙈 𝙍𝙀𝙀𝙇 / 𝙑𝙄𝘿𝙀𝙊

Send a public Instagram Reel / Video link.`
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

  if (data.startsWith('mp3_yes_') || data.startsWith('mp3_convert_')) {
    const id = data.startsWith('mp3_yes_')
      ? data.slice('mp3_yes_'.length)
      : data.slice('mp3_convert_'.length);
    await convertAndSendMp3(chatId, id);
    return;
  }

  if (data.startsWith('mp3_cancel_')) {
    const id = data.slice('mp3_cancel_'.length);
    const item = pendingMp3Files.get(id);
    if (item) {
      pendingMp3Files.delete(id);
      try { fs.unlinkSync(item.path); } catch {}
    }
    await bot.sendMessage(chatId, '👌 MP3 conversion cancel cheythu.');
    return;
  }

  if (data.startsWith('quality_')) {
    const requested = Number(data.slice(8));
    const pending = pendingQualityLinks.get(chatId);

    if (![360, 480, 720, 1080].includes(requested) || !pending) {
      await bot.sendMessage(chatId, '⌛ Link expire aayi. Video link veendum ayakku.');
      return;
    }

    const lower = pending.heights.filter(h => h <= requested);
    const actual = lower.length ? Math.max(...lower) : Math.min(...pending.heights);
    const id = Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const output = path.join(DOWNLOAD_DIR, 'luttuxer_' + id + '.%(ext)s');

    try {
    let progressMessage;
    let progressIsPhoto = false;
    let lastShown = -5;

    const progressCaption = (pct, speed = '', eta = '') => {
      const n = Math.max(0, Math.min(100, Math.round(pct)));
      const filled = Math.round(n / 5);
      const bar = '━'.repeat(Math.min(filled, 19)) + (n >= 100 ? '●' : '●') + '─'.repeat(Math.max(0, 19 - filled));
      return '🩵 𝙇𝙪𝙩𝙩𝙪𝙭𝙚𝙧 𝘿𝙇 🐼\n\n' +
        '🎬 Downloading your video...\n' +
        bar + '\n' + n + '% | ' + actual + 'p\n' +
        (speed ? '⚡ Speed: ' + speed + '\n' : '') +
        (eta ? '⏳ ETA: ' + eta + '\n' : '') +
        '\n💙 Please wait, kuttaa!';
    };

    try {
      progressMessage = await bot.sendPhoto(
        chatId,
        path.join(__dirname, 'progress-model.jpg'),
        {
          caption: progressCaption(0),
          reply_markup: {
            inline_keyboard: [[
              { text: '🩵 LuttuXer DL', callback_data: 'progress_info' }
            ]]
          }
        }
      );
      progressIsPhoto = true;
    } catch (photoErr) {
      console.log('PROGRESS PHOTO ERROR:', photoErr.message);
      progressMessage = await bot.sendMessage(
        chatId, progressCaption(0)
      );
    }

    await new Promise((resolve, reject) => {
      const args = [
        '--no-playlist', '--no-warnings',
        '--newline', '--progress',
        '-f', 'bv[height=' + actual + ']+ba/b[height=' + actual + ']',
        '--merge-output-format', 'mp4', '-o', output, pending.url
      ];

      const child = spawn('yt-dlp', args);
      let logs = '';

      const updateProgress = (chunk) => {
        logs = (logs + chunk.toString()).slice(-12000);
        const lines = logs.split(/\r?\n/);
        const line = lines[lines.length - 1] || lines[lines.length - 2] || '';
        const match = line.match(/(\d+(?:\.\d+)?)%/);
        if (!match) return;

        const pct = Number(match[1]);
        if (!Number.isFinite(pct) || pct < 0 || pct > 100) return;
        const shown = Math.floor(pct / 5) * 5;
        if (shown <= lastShown && pct < 100) return;
        lastShown = shown;

        const speed = (line.match(/\bat\s+([0-9.]+\s*[KMG]?i?B\/s)/i) || [])[1] || '';
        const eta = (line.match(/\bETA\s+([0-9:]+)/i) || [])[1] || '';
        const caption = progressCaption(pct, speed, eta);
        const opts = {
          chat_id: chatId,
          message_id: progressMessage.message_id
        };

        const edit = progressIsPhoto
          ? bot.editMessageCaption(caption, opts)
          : bot.editMessageText(caption, opts);

        edit.catch(() => {});
      };

      child.stdout.on('data', updateProgress);
      child.stderr.on('data', updateProgress);
      child.on('error', reject);
      child.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error('yt-dlp exited with code ' + code));
      });
    });

      const files = fs.readdirSync(DOWNLOAD_DIR)
        .filter(n => n.startsWith('luttuxer_' + id + '.'))
        .filter(n => !n.endsWith('.part'));

      if (!files.length) throw Error('Downloaded file not found');

      const fp = path.join(DOWNLOAD_DIR, files[0]);
      if (fs.statSync(fp).size > 49 * 1024 * 1024) {
        await bot.sendMessage(chatId, '⚠️ File 49 MB-il kooduthal aanu.');
      } else {
        await bot.sendVideo(chatId, fp, {
          caption: '✅ 𝙇𝙪𝙩𝙩𝙪𝙭𝙚𝙧 𝘿𝙇 ⚡ | ' + actual + 'p'
        });
        pendingMp3Files.set(id, { path: fp });
        await bot.sendMessage(chatId, '🎵 Ee video MP3 aakki tharano?', {
          reply_markup: { inline_keyboard: [[
            { text: '🎵 Yes, MP3', callback_data: 'mp3_yes_' + id },
            { text: '❌ No', callback_data: 'mp3_cancel_' + id }
          ]] }
        });
      }
      if (!pendingMp3Files.has(id)) {
        try { fs.unlinkSync(fp); } catch {}
      }
    } catch (err) {
      console.log('QUALITY DOWNLOAD ERROR:', err.message);
      await bot.sendMessage(chatId, '🥹 Ee quality download cheyyan pattiyilla. Vere quality automatic aayi try cheythittilla.');
      try {
        for (const n of fs.readdirSync(DOWNLOAD_DIR).filter(n => n.startsWith('luttuxer_' + id + '.'))) {
          try { fs.unlinkSync(path.join(DOWNLOAD_DIR, n)); } catch {}
        }
      } catch {}
    }
    pendingQualityLinks.delete(chatId);
    return;
  }

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
    if (msg.from?.is_bot) return;

    const uploadedVideo = msg.video ||
      (msg.document && /^video\//i.test(msg.document.mime_type || '') ? msg.document : null);

    if (uploadedVideo) {
      const fileId = uploadedVideo.file_id;
      const id = Date.now() + '_' + Math.random().toString(36).slice(2, 8);

      try {
        await bot.sendMessage(msg.chat.id, '📥 Video receive cheythu. MP3 option ready aakkunnu...');
        const downloadedPath = await bot.downloadFile(fileId, DOWNLOAD_DIR);
        const savedPath = path.join(DOWNLOAD_DIR, 'luttuxer_upload_' + id + path.extname(downloadedPath || ''));

        fs.renameSync(downloadedPath, savedPath);
        pendingMp3Files.set(id, { path: savedPath });

        await bot.sendMessage(msg.chat.id, '🎵 Ee video MP3 aakki tharano?', {
          reply_markup: { inline_keyboard: [[
            { text: '🎵 Convert MP3', callback_data: 'mp3_convert_' + id },
            { text: '❌ Cancel', callback_data: 'mp3_cancel_' + id }
          ]] }
        });
      } catch (err) {
        console.log('UPLOADED VIDEO ERROR:', err.message);
        await bot.sendMessage(msg.chat.id, '🥹 Video download cheyyan pattiyilla. Cheriya video try cheyyu.');
      }
      return;
    }

    if (!msg.text) return;

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
      await bot.sendMessage(chatId, '🔎 Available video qualities check cheyyunnu...');

      try {
        const heights = await getAvailableQualities(url);
        if (!heights.length) {
          await bot.sendMessage(chatId, '🥹 Ee link-il video quality detect cheyyan pattiyilla.');
          return;
        }

        pendingQualityLinks.set(chatId, { url, heights });
        await bot.sendMessage(chatId,
          '🎬 SELECT VIDEO QUALITY\n\nAvailable quality illenkil nearest available quality try cheyyum 👇',
          { reply_markup: { inline_keyboard: [
            [
              { text: '360p', callback_data: 'quality_360' },
              { text: '480p', callback_data: 'quality_480' }
            ],
            [
              { text: '720p HD', callback_data: 'quality_720' },
              { text: '1080p Full HD', callback_data: 'quality_1080' }
            ]
          ] } }
        );
      } catch (err) {
        console.log('QUALITY DETECTION ERROR:', err.message);
        await bot.sendMessage(chatId, '🥹 Ee link-inte quality check cheyyan pattiyilla. Public video link veendum ayakku.');
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
