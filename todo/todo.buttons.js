const Markup = require('telegraf/markup');

// 
const MainButtons = Markup.inlineKeyboard([
    Markup.callbackButton('View Todos', 'VIEW_TODOS'),
    Markup.callbackButton('Add Todo', 'ADD_TODO')
]).extra();

// 
const DeleteButton = (id) => Markup.inlineKeyboard([
    Markup.callbackButton('Delete', id)
]).extra();

// 
const RetryButton = Markup.inlineKeyboard([
    Markup.callbackButton('Retry adding new todo', 'ADD_TODO')
]).extra();

module.exports = {
    MainButtons,
    DeleteButton,
    RetryButton
}