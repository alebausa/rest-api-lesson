require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');

const projects = [
  {
    title: "Ultimate to-do app",
    description: "Ultimate to-do app is an application to help people keep track of the tasks they have yet to finish"
  },
  {
    title: "Restaurant madness game",
    description: "Restaurant madness game is the game I did as the first project for Ironhack. It's a game where you have to organize different tables and make sure customers end up happy."
  },
  {
    title: "Chill pill",
    description: "Chill pill is an online CBD store that we did as the project for the second module of Ironhack"
  },
  {
    title: "Lego Buddies",
    description: "Lego Stars is an app designed to help Lego users organize their pieces and keep track of their collection, a very useful tool for those with the house full of legos"
  }
]

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Project.create(projects)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })