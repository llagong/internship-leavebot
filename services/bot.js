const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

bot.start((ctx) => ctx.reply("Welcome"));




const d = new Date();
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateNow = `${month[d.getMonth()]} ${d.getDate()}`

bot.help((ctx) => ctx.reply("Help is on the way"));
bot.on("sticker", (ctx) => ctx.reply("👍"));

bot.hears("test", (ctx) => {
  console.log(ctx.update);
  console.log(ctx.update.message.from.first_name);
});

bot.hears("hello", (ctx) => {
  ctx.reply("world");
});

bot.hears("date", (ctx) => {
  ctx.reply(dateNow)
});

bot.hears("/leave", (ctx) =>{
  ctx.reply(`${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name} : ${dateNow}`);
  leaveLog.push(`${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name} : ${dateNow}`);
  console.log(leaveLog);
})

const leaveLog = [`List of leaves `];

bot.hears("/myleaves", (ctx) =>{
  ctx.reply(leaveLog.filter(log => log == `${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name} : ${dateNow}`));
})

bot.hears("/unleave", (ctx) =>{
  let userId = ctx.update.message.from.id;

  allLeaves = allLeaves.filter((people) => { 
    if (people.id !==userID){
      return true;
    } else {
      return false;
    }
  });

  ctx.reply("Leave cancelled for " + ctx.update.message.from.first_name)
});

bot.hears("/allleaves", (ctx) =>{
   let message = "";

   for (let i = 0; i < allLeaves.length; i++){
    let readableTimestamp = new Date(presentPeople[i].timestamp).toDateString();

     message = message + allLeaves[i].name + "" + readableTimestamp + "\n";
   }
  ctx.reply(message)
});
bot.hears("hello", (ctx) => {
  ctx.reply("world");
});
// /leave [Date]
// /myleave
// /unleave
// /allleaves

bot.launch();
