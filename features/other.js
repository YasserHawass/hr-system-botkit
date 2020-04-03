// listen for a message containing the word "hello", and send a reply
module.exports = function(controller) {
    controller.hears('hello','message',async(bot, message) => {
    // do something!
    await bot.reply(message, 'Hello human')
    });

    
}