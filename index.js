const config = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true})
const fs = require('fs')
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("[ERROR] Não foi possível encontrar a pasta de comandos!")
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    bot.commands.set(props.help.name, props)

  })
})

bot.on('guildMemberAdd', member => {
  let embed = new Discord.RichEmbed()
  .setAuthor(member.guild.name, member.guild.iconURL)
  .setTitle('Novo membro no servidor')
  .setDescription(`Olá <@${member.id}>, se sinta em casa no \`${member.guild.name}\` \n`)
  .setThumbnail(member.user.displayAvatarURL)
  .setColor("#0088f7")
  member.guild.channels.get('guild here').send(embed)
      let role = member.guild.roles.find(role => role.name == 'Membro');//nome do cargo membro
          member.addRole(role.id); //aqui adiciona o cargo

          member.send(`Seja bem vindo ao servidor \`${member.guild.name}\` \n`)
          member.send(`para saber os comandos entre em #comandos e digite \`-->!ajuda\` \n`)
          member.send("Qualquer coisa contate meu criador: \`Kygo#1907\` \n")
});

bot.on('guildMemberRemove', member => {
  let embed = new Discord.RichEmbed()
  .setAuthor(member.guild.name, member.guild.iconURL)
  .setTitle('Alguém saiu do servidor :(')
  .setDescription(`O ${member} saiu do \`${member.guild.name}\` \n infelizmente :(`)
  .setThumbnail(member.user.displayAvatarURL)
  .setColor("#0088f7")
  member.guild.channels.get('537742508797460480').send(embed)
});
bot.on("message", async message => {
message.channel.fetchMessage("542497555754516483")
const exemplo = (reaction) => reaction.emoji.name === 'white_check_mark';
const exemploTeste = message.createReactionCollector(exemplo, { time: 15000 });

exemploTeste.on("collect", async r => {
user.addrole("542506756824367105");
});
});

bot.on('ready', () => {
  console.log('Estou pronto para lhe servir!');
  console.log(`${bot.user.username} Está online em ${bot.guilds.size} servidores! ${bot.users.size} pessoas`);
  console.log(`${bot.user.username} Linguagem: JavaScript`)

    let status = [
      {name: `${bot.users.size} usuários!`, type: 'WATCHING'},
      {name: `Meu prefix: ! | Use !ajuda para Obter ajuda!!!`, type: 'LISTENING'},
      {name: `Liddo é o melhor hotel!`, type: 'STREAMING', url: 'https://liddo.org'},
      {name: `Feliz 2019`, type: 'WATCHING'},
      {name: `Liddo Hotel`, type: 'PLAYING'},
      {name: `Netflix ;)`, type: 'WATCHING'},
      {name: `Fui feito em JavaScript :O, contate meu criador: #Kygo1907`, type: `LISTENING`},
      {name: `Olá, tudo bem?`, type: `LISTENING`},
		  {name: `Ygor é o melhor fundador do Liddo!`, type: `LISTENING`},
    ];
    //STREAMING = TRANSMITINDO
    //LISTENING = OUVINDO
    //PLAYING = JOGANDO
    //WATCHING = ASSISTINDO

    function setStatus() {
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        bot.user.setPresence({game: randomStatus});
    }

    setStatus();
    setInterval(() => setStatus(), 6000);

  });

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});


bot.login(config.token);
