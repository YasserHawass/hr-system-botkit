// listen for a message containing the word "hello", and send a reply
module.exports = function(controller) {
    let name = '';
    controller.hears('hello','message',async(bot, message) => {
    // do something!
    await bot.reply(message, 'Hello back at you, '+ name);
    });

    
}