// listen for a message containing the word "hello", and send a reply
module.exports = function(controller) {
    controller.hears('hello','message',async(bot, message) => {
    // do something!
    await bot.reply(message, 'Hello human')
    });

    controller.hears('menu', 'message,direct_message', async(bot, message) => { 

        await bot.reply(message, {
            text: 'Here is a menu!',
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
}