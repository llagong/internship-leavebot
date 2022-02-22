const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

bot.start((ctx) => ctx.reply("Welcome"));








bot.help((ctx) => ctx.reply("Help is on the way"));
bot.on("sticker", (ctx) => ctx.reply("👍"));

bot.hears("test", (ctx) => {
  let d = new Date()
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateNow = `${month[d.getMonth()]} ${d.getDate()}`
const timeNow = `${d.getMonth()+1}/${d.getDate()}  ${d.getHours()}:${d.getMinutes()}`
  console.log(ctx.update);
  console.log(ctx.update.message.from.first_name);
  console.log(d)
});

bot.hears("hello", (ctx) => {
  ctx.reply("world");
});

bot.hears("date", (ctx) => {
  ctx.reply(dateNow)
});

bot.command(`/leave`, (ctx) =>{  
  let d = new Date()
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateNow = `${month[d.getMonth()]} ${d.getDate()}`  
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

//made to check myleaves can add leave with different name
bot.command("/adduser", (ctx) =>{
  let d = new Date()
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateNow = `${month[d.getMonth()]} ${d.getDate()}`
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



bot.command(`/timelog`, (ctx) =>{
  console.log(timeLog)
});

const timePresent = [];
let timeLog = [];

bot.command(`timein`, (ctx) =>{ 
  let d = new Date()
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateNow = `${month[d.getMonth()]} ${d.getDate()}`
const timeNow = `${d.getMonth()+1}/${d.getDate()}  ${d.getHours()}:${d.getMinutes()}`   
    let leaveUpdateFrom = ctx.update.message.from;
    let userName = leaveUpdateFrom.first_name + ' '+leaveUpdateFrom.last_name;  
    let timeID = {
      name: userName,
      id: leaveUpdateFrom.id,
      timein: '',
      timeout: '',
    };
  
    timeID.timein = timeNow;
    timeLog.push(timeID);
    timePresent.push(timeID);
    console.log(timeLog);
    console.log(timePresent[0].name)
  
    ctx.reply(`${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name} has logged in at ${timeNow}`);
  });

bot.command(`present`, (ctx) =>{  
  let list = 'List of Present \n';
  for(let i = 0; i < timePresent.length; i++) {
    list = list + timePresent[i].name + ': '+ timePresent[i].timein + ' \n';
  }
  ctx.reply(list);
  console.log(timePresent)
})

bot.command(`timeout`, (ctx) =>{  
  let d = new Date()
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateNow = `${month[d.getMonth()]} ${d.getDate()}`
const timeNow = `${d.getMonth()+1}/${d.getDate()}  ${d.getHours()}:${d.getMinutes()}`
  let leaveUpdateFrom = ctx.update.message.from;
  let userName = leaveUpdateFrom.first_name + ' '+leaveUpdateFrom.last_name; 
  
  
  for(let i = 0; i < timePresent.length; i++) {
    if (timePresent[i].name === userName){
      console.log(timePresent[i])  
      timePresent.splice(i,1)
      console.log(timePresent)
    } 
  }
  
  console.log(`'${d.getMonth()+1}/${d.getDate()}'`)
  for(let i = 0; i < timeLog.length; i++) {
    if (timeLog[i].timein.split(" ")[0] === `${d.getMonth()+1}/${d.getDate()}`){
      console.log(timeLog[i])  
      timeLog[i].timeout = timeNow
      console.log(timeLog[i])
      console.log(timeLog)
    } 
  }
  ctx.reply(`${userName} has logged off for the day.`)
})

//returns last ten logs
bot.command('logbook', (ctx) =>{
  let timeLog10 = timeLog;
  console.log(timeLog.length>2)
  if(timeLog.length>9){
    timeLog10=timeLog.slice(timeLog.length-11, timeLog.length-1)
  }
  
  let list = 'Last 10 logs \n';
  console.log(timeLog10)
  for(let i = 0; i < timeLog10.length; i++) {
    
    list = list + timeLog10[i].name + ': '+ timeLog10[i].timein+' ' +timeLog10[i].timeout.split(' ')[2] + ' \n';
    
  }
  ctx.reply(list);
})

bot.command("/adduser1", (ctx) =>{
  let d = new Date()
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const dateNow = `${month[d.getMonth()]} ${d.getDate()}`
const timeNow = `${d.getMonth()+1}/${d.getDate()}  ${d.getHours()}:${d.getMinutes()}`
  let textInput = ctx.update.message.text;
  let leaveUpdateFrom = ctx.update.message.from;
  let userName = leaveUpdateFrom.first_name + ' '+leaveUpdateFrom.last_name;  
  let timeID = {
    name: userName,
    id: leaveUpdateFrom.id,
    timein: timeNow,
    timeout: timeNow
  };
  timeID.name = textInput.substring(10, textInput.length);
    timeLog.push(timeID);
    console.log(ctx.update);
    console.log(timeLog);
});

bot.command('mylogs', (ctx) =>{
  let leaveUpdateFrom = ctx.update.message.from;
  let userName = leaveUpdateFrom.first_name + ' '+leaveUpdateFrom.last_name; 
  let list = 'List of logs \n';
  for(let i = 0; i < timeLog.length; i++) {
    if(timeLog[i].name === userName){
    console.log(timeLog[i].timeout.split(' ')[2])
    list = list + timeLog[i].name + ': '+ timeLog[i].timein+' ' +timeLog[i].timeout.split(' ')[2] + ' \n';
  }
}
  ctx.reply(list);
})
//returns all logs
bot.command('alllogs', (ctx) =>{
  let list = 'List of logs \n';
  for(let i = 0; i < timeLog.length; i++) {
    console.log(timeLog[i].timeout.split(' ')[2])
    list = list + timeLog[i].name + ': '+ timeLog[i].timein+' ' +timeLog[i].timeout.split(' ')[2] + ' \n';
  }
  ctx.reply(list);
})

bot.hears("/hello", (ctx) => {
  ctx.reply("world");
  let dd = new Date()
  console.log(dd.getSeconds())
  console.log(timeNow + d.getSeconds())
});
// /leave [Date]
// /myleave
// /unleave
// /allleaves



bot.launch();
