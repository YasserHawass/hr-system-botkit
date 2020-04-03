

module.exports = function(controller) {
    const { BotkitConversation } = require('botkit');

    // please put only dialogues here
    // Create a very simple dialog with 2 messages.
    let DIALOG_ID = 'my_dialog_1';
    let myDialog = new BotkitConversation(DIALOG_ID, controller);
    myDialog.say('Hello!');
    myDialog.say('Welcome to the world of bots!');
    // Add the dialog to the bot
    controller.addDialog(myDialog);


    // only put hearings here (dialogues and direct replies here)
    controller.hears('menu', 'message,direct_message', async(bot, message) => { 

        await bot.reply(message, {
            text: 'Here is a menu!\nPick any (link: placeholder.gg)',
            quick_replies: [
                {
                    title: "Main",
                    payload: "main-menu",
                },
                {
                    title: "Help",
                    payload: "help"
                }
            ]
        });
    });

    controller.hears('help', 'message,direct_message', async(bot, message) => { 
        await bot.reply(message, {
            text: 'here\'s available commands',
            quick_replies: [
                {
                    title: "Main",
                    payload: "main-menu",
                },
                {
                    title: "request leave",
                    payload: "request-leave",
                },
                {
                    title: "Help",
                    payload: "help"
                }
            ]
        });
    });
    
    // Later, trigger the dialog
    controller.hears('request-leave', 'message,direct_message', async(bot, message) => {
        // Different dialog ids depends on the siutation, if condition here!
        await bot.beginDialog(DIALOG_ID);
    });
}