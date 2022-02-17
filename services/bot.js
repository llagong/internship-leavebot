const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

bot.start((ctx) => ctx.reply("Welcome"));

let leaveLog = [];

const d = new Date();
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateNow = `${month[d.getMonth()]} ${d.getDate()}`

bot.help((ctx) => ctx.reply("Help is on the way"));
bot.on("sticker", (ctx) => ctx.reply("👍"));

bot.hears("test", (ctx) => {
  console.log(ctx.update);
});

bot.hears("hello", (ctx) => {
  ctx.reply("world");
});

bot.hears("date", (ctx) => {
  ctx.reply(dateNow)
});

bot.hears("/leave", (ctx) =>{
  ctx.reply(dateNow);
  leaveLog.push('userid')
  console.log(leaveLog);
})
bot.launch();
