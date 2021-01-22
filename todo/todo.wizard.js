const WizardScene = require("telegraf/scenes/wizard");
const Extra = require('telegraf/extra');
const Composer = require('telegraf/composer');
const Todo = require('./todo.model');
const { MainButtons, DeleteButton, RetryButton } = require('./todo.buttons')

// Last Step
const stepHandler = new Composer();
stepHandler.action('ADD_TODO', async (ctx) => {
    await ctx.answerCbQuery();
    ctx.scene.enter('TODO_WIZARD');
});
stepHandler.action('VIEW_TODOS', async (ctx) => {
    await ctx.answerCbQuery();
    ctx.scene.enter('TODO_SCENE');
});
stepHandler.use( (ctx) => {
    ctx.wizard.state.due = ctx.message.text;

    let todo = new Todo({
        userId: ctx.from.id,
        note: ctx.wizard.state.note,
        due: ctx.wizard.state.due
    });

    todo.save((err, newTodo) => {
        if (err) ctx.reply(err.message, RetryButton);
        ctx.reply(`Thank you created ✅ new todo: ${newTodo.note}!`, MainButtons);
    });
    return ctx.scene.leave();
});

// Main Todo Wizard
let wizard = new WizardScene('TODO_WIZARD',
    ctx => {
        ctx.reply("Please enter todo note");
        return ctx.wizard.next();
    },
    ctx => {
        ctx.wizard.state.note = ctx.message.text;
        ctx.reply("Please enter due date");
        return ctx.wizard.next();
    },
    stepHandler
);

module.exports = wizard;