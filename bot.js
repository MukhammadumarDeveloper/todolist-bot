        require('dotenv').config();

const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const todoWizard = require('./todo/todo.wizard');
const todoScene = require('./todo/todo.scene');

const session = require('telegraf/session');
const mongoose = require('mongoose');

// --------------------- Mongoose Connection -------------------
mongoose.connect(`${process.env.DATABASE_HOST}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

mongoose.connection.on('error', err => {
    console.log(
        undefined,
        `Error occurred during an attempt to establish connection with the database: %O`,
        err
    );
    process.exit(1);
});

mongoose.connection.on('open', () => {
    console.log('MongoDB is on!')
});

// ------------------------------------------------------

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Stage([todoScene, todoWizard], { default: 'TODO_SCENE' });

bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => ctx.scene.enter('TODO_SCENE'))

bot.launch();
