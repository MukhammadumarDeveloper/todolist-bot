const Scene = require('telegraf/scenes/base');
const Todo = require('./todo.model');
const { MainButtons, DeleteButton } = require('./todo.buttons')

// 
const scene = new Scene('TODO_SCENE');

// 
scene.enter(ctx => ctx.reply(`Hi ✋🏻 ${ctx.from.username}, Welcome! to my bot 🤖`, MainButtons));

// 
scene.action('VIEW_TODOS', async (ctx) => {
    await ctx.answerCbQuery();
    let todos = await Todo.find({
        userId: ctx.from.id
    }).exec();
    if (todos.length > 0) {
        todos.forEach(todo => {
            let todoView = todo.note + ' - ' + todo.due;
            ctx.reply(todoView, DeleteButton(todo._id));
        });
    } else {
        ctx.reply('Empty todo list 😔', MainButtons);
    }

})

// 
scene.action('ADD_TODO', async ctx => {
    await ctx.answerCbQuery();
    ctx.scene.enter('TODO_WIZARD');
})

// 
scene.on('callback_query', (ctx) => {
    Todo.findByIdAndDelete(ctx.update.callback_query.data,
        (err, res) => {
            if (err) ctx.reply('Cant delete! :(', MainButtons)
            ctx.reply('successfully deleted!', MainButtons);
        })
});


module.exports = scene;