

module.exports = function(controller) {
    /*
    const { BotkitConversation } = require('botkit'); //don't remove from here Yaser

    // please put only dialogues here
    // Create a very simple dialog with 2 messages.
    let ABS_DIALOG_ID = process.env.ABS_DIALOG_ID || 'abs_dialog_1';
    let ConAbsLeaving = new BotkitConversation(ABS_DIALOG_ID, controller);

    
    ConAbsLeaving.say('Hello!');
    ConAbsLeaving.say('Welcome to the automated HR System');
    // collect a value with no conditions
    ConAbsLeaving.ask('What is your name?', async(answer) => { 
        // do nothing.
    }, {key: 'name'});
    // collect a value with conditional actions
    ConAbsLeaving.ask('What is the leave type?\n1- normal leave\n2- emergency leave\n3-sick leave\n4- other', [
        {
            pattern: '[1normal]{1,7}',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('likes_tacos');
            }
        },
        {
            pattern: '[2emergency]{1,7}',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('likes_tacos');
            }
        },
        {
            pattern: '[3sick]{1,7}',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('likes_tacos');
            }
        },
        {
            pattern: '[4other]{1,7}',
            handler: async function(answer, convo, bot) {
                convo.setVar('reason', '4');
            }
        },
        {
            default: true,
            handler: async(response_text, convo, bot, full_message) => {
                await bot.say('I do not understand your response!');
                return await convo.repeat();
            }
        }
    ],{key: 'reason'});
    ConAbsLeaving.ask("please state it", async(res, convo, bot) => {}, {key: 'reasonx'});

    // define a 'likes_tacos' thread
    ConAbsLeaving.addMessage('HOORAY TACOS', 'likes_tacos');

    // if (convo.vars != '4'){
    //     convo.ask('what is the reason?', [],'reasonx');
    // }

    // handle the end of the conversation
    ConAbsLeaving.after(async(results, bot) => {
        const name = results.name;
        console.log(results);
    });
    // Add the dialog to the bot
    controller.addDialog(ConAbsLeaving);


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

    controller.hears('[help]{4}', 'message,direct_message', async(bot, message) => { 
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
        await bot.beginDialog(ABS_DIALOG_ID);
    });
    */
}