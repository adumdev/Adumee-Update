const Discord = require("discord.js");
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig.json");

const { Client, GatewayIntentBits, Partials } = require("discord.js");

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent 
  ]
});

let botname = "Adumee";

bot.on("ready", async () => {
  console.log(`${bot.user.username} is running!`);

  let statuses = ["Prefix: -help"];

  setInterval(function () {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, { type: "PLAYING" });
  }, 3000);
});

bot.on("messageCreate", async (message) => {
  console.log(`Received message: "${message.content || '<empty>'}" from ${message.author.tag} in ${message.channel.name}`);

  if (message.author.bot) {
    return;
  }

  if (!message.content.startsWith(botconfig.prefix)) {
    return;
  }

  const args = message.content.slice(botconfig.prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (cmd === "invitelink") {
    message.channel.send("https://discord.gg/CT29euky8v");
  } else if (cmd === "insta") {
    message.channel.send("https://www.instagram.com/adumeebot/");
  } else if (cmd === "scpet") {
    message.channel.send("https://discord.gg/d6y77szKPT");
  } else if (cmd === "szia") {
    message.channel.send("Heyyoo!");
  } else if (cmd === "wassup?") {
    message.channel.send("Im fineee! And you?");
  } else if (cmd === "help") {
    let helpEmbed = new Discord.EmbedBuilder()
      .setAuthor({ name: message.author.username })
      .setTitle("Help")
      .addFields({ name: "Commands:", value: "-szia\n -wassup?\n -help\n -invitelink\n -insta\n -scpet" })
      .setImage(message.guild.iconURL())
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription("**Itt mindent megtalálsz**")
      .setFooter({ text: `${botname} | ${message.createdAt}` })
      .setColor("Random");

    message.channel.send({ embeds: [helpEmbed] });
  }
});

bot.login(tokenfile.token);
