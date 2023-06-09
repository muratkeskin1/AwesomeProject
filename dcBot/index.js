const { Client, GuildMember, GatewayIntentBits } = require("discord.js");
const { Player, QueryType } = require("discord-player");

const Discord = require('discord.js');
const ytdl = require('ytdl-core');

// Create a new Discord client
const client = new Discord.Client();

// Define a function to play a song
const playSong = async (message, url) => {
  // Create a new player
  const player = new AudioPlayer();

  // Try to download the song
  try {
    const song = await ytdl.getInfo(url);

    // Create a new AudioStream from the song data
    const stream = new AudioStream(song.content);

    // Play the stream
    player.play(stream);

    // Add a listener to the player's end event
    player.on('end', () => {
      // Remove the player from the voice channel
      client.guilds.get(message.guild.id).voiceChannels.get(message.member.voiceChannelId).players.remove(player);
    });
  } catch (error) {
    // Send an error message to the user
    message.channel.send('Error playing song: ' + error.message);
  }
};

// Define a command to play a song
const playCommand = (message, args) => {
  // Check if the user has the required permissions
  if (!message.author.permissions.has('MANAGE_CHANNELS')) {
    message.channel.send('You do not have permission to play music.');
    return;
  }

  // Check if the user has provided a song URL
  if (!args[0]) {
    message.channel.send('Please provide a song URL.');
    return;
  }

  // Play the song
  playSong(message, args[0]);
};

// Add the play command to the client
client.commands.add('play', playCommand);

// Start the client

client.login("MTA5ODQ4Njg4OTEwOTAwODQyMA.GZ8eRR.i0eV9gLjpFZ_V3zTAdvZaFHK_lnpuwnG3N7WVs");