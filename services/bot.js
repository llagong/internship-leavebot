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

bot.command(`/leave`, (ctx) =>{    
let leaveUpdateFrom = ctx.update.message.from;
  let userName = leaveUpdateFrom.first_name + ' '+leaveUpdateFrom.last_name;  
  let leaveID = {
    name: userName,
    id: leaveUpdateFrom.id,
    timestamp: dateNow,
  };
  let textInput = ctx.update.message.text;

  if(textInput === '/leave') {
    leaveLog.push(leaveID)
    console.log(leaveLog)
  }else {
    leaveID.timestamp = textInput.substring(7, textInput.length);
    leaveLog.push(leaveID);
    console.log(leaveLog)
  }

  ctx.reply(`${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name} : ${leaveID.timestamp}`);
});

let leaveLog = [];


bot.command(`/leave`, (ctx) =>{    
    
  let leaveUpdateFrom = ctx.update.message.from;
  let userName = leaveUpdateFrom.first_name + ' '+leaveUpdateFrom.last_name;  
  let leaveID = {
    name: userName,
    id: leaveUpdateFrom.id,
    timestamp: dateNow,
  };
  let textInput = ctx.update.message.text;

  if(textInput === '/leave') {
    leaveLog.push(leaveID)
    console.log(leaveLog)
  }else {
    leaveID.timestamp = textInput.substring(7, textInput.length);
    leaveLog.push(leaveID);
    console.log(leaveLog)
  }

  ctx.reply(`${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name} : ${leaveID.timestamp}`);
});

//made to check myleaves can add leave with different name
bot.command("/adduser", (ctx) =>{
  let textInput = ctx.update.message.text;
  let leaveUpdateFrom = ctx.update.message.from;
  let userName = leaveUpdateFrom.first_name + ' '+leaveUpdateFrom.last_name;  
  let leaveID = {
    name: userName,
    id: leaveUpdateFrom.id,
    timestamp: dateNow,
  };
  leaveID.name = textInput.substring(9, textInput.length);
    leaveLog.push(leaveID);
    console.log(ctx.update);
    console.log(leaveLog);
});

bot.hears("/myleaves", (ctx) =>{
  let leaveUpdateFrom = ctx.update.message.from;
  let userName = leaveUpdateFrom.first_name + ' '+leaveUpdateFrom.last_name;
  let leavesList = 'List of leaves from ' + userName + '\n';
  for(let i = 0; i < leaveLog.length; i++) {
    if (leaveLog[i].name === userName){
      leavesList = leavesList + leaveLog[i].name + ': '+ leaveLog[i].timestamp + ' \n';
    } 
  } 
  ctx.reply(leavesList);
  console.log(leaveLog)
})

bot.hears("/unleave", (ctx) =>{
  let userId = ctx.update.message.from.id;

  leaveLog = leaveLog.filter((people) => {
    if (people.id !== userId){
      return true;
    } else{
      return false;
    }
  });
  
  ctx.reply("Leave cancelled for " + ctx.update.message.from.first_name)
});

  

bot.hears("/allleaves", (ctx) => {
  
  let list = 'List of leaves \n';
  for(let i = 0; i < leaveLog.length; i++) {
    list = list + leaveLog[i].name + ': '+ leaveLog[i].timestamp + ' \n';
  }
  ctx.reply(list);
  
});
bot.command(`/timein`, (ctx) =>{    
    
  let leaveUpdateFrom = ctx.update.message.from;
  let userName = leaveUpdateFrom.first_name + ' '+leaveUpdateFrom.last_name;  
  let leaveID = {
    name: userName,
    id: leaveUpdateFrom.id,
    timestamp: timeNow,
  };
  let textInput = ctx.update.message.text;

  if(textInput === '/leave') {
    leaveLog.push(leaveID)
    console.log(leaveLog)
  }else {
    leaveID.timestamp = textInput.substring(7, textInput.length);
    leaveLog.push(leaveID);
    console.log(leaveLog)
  }

  ctx.reply(`${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name} : ${leaveID.timestamp}`);
});




bot.hears("hello", (ctx) => {
  ctx.reply("world");
});
// /leave [Date]
// /myleave
// /unleave
// /allleaves

bot.launch();
