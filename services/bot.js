const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

bot.start((ctx) => ctx.reply("Welcome"));

bot.help((ctx) => ctx.reply("Help is on the way"));
bot.on("sticker", (ctx) => ctx.reply("👍"));

bot.hears("test", (ctx) => {
  console.log(ctx.update);
});

bot.hears("hello", (ctx) => {
  ctx.reply("world");
});

// /leave [Date]
// /myleave
// /unleave
// /allleaves

bot.launch();
