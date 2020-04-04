

module.exports = function(controller) {
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
            pattern: '1',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('recieved');
            }
        },
        {
            pattern: '2',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('recieved');
            }
        },
        {
            pattern: '3',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('recieved');
            }
        },
        {
            pattern: '4',
            handler: async function(answer, convo, bot) {
                convo.setVar('reason', '4');
            }
        },
        {
            default: true,
            handler: async(answer, convo, bot, full_message) => {
                await bot.say('I do not understand your response!');
                return await convo.repeat();
            }
        }
    ],{key: 'reason'});
    ConAbsLeaving.ask("please state it", async(answer, convo, bot) => {
        // leaving it empty, gave me stall status, which needed Ctrl + C to solve it.
        await convo.gotoThread('recieved');
    }, {key: 'reasonx'});

    // define a 'likes_tacos' thread
    ConAbsLeaving.addMessage('roger!', 'recieved');

    // if (convo.vars != '4'){
    //     convo.ask('what is the reason?', [],'reasonx');
    // }
    
    // handle the end of the conversation
    ConAbsLeaving.after(async(results, bot) => {
        const name = results.name;
        const reason = results.reasonx || results.reason;
        // const reasonx = reslts.reasonx;
        // it refused to summarize it reasonx into reason, in one line so gotta use this format
        // console.log(results);
        // console.log(reason);
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

    controller.interrupts('help', 'message,direct_message', async(bot, message) => { 
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
}