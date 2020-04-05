module.exports = function(controller) {
    const { Botkit, BotkitConversation } = require('botkit');

    // DIALOG DECLRATION
    const MY_DIALOG_ID = 'my-dialog-name-constant';
    let convo = new BotkitConversation(MY_DIALOG_ID, controller);
    convo.say('Hello!');
    convo.say('Welcome to the world of bots!');
    convo.ask('What is your name?', async(answer) => { 
        // do nothing.
    }, {key: 'name'});
    
    convo.ask('What is the leave type?\n1- normal leave\n2- emergency leave\n3-sick leave\n4- other', [ // collect a value with conditional actions
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
                convo.setVar('reason', '4'); //todo kinda no need for it, might skip it, and for the if condition for it?
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

    convo.ask("please state it", async(answer, convo, bot) => {
        // leaving it empty, gave me stall status, which needed Ctrl + C to solve it.
        await convo.gotoThread('recieved');
    }, {key: 'reasonx'});

    convo.addMessage('roger!', 'recieved'); // define a 'recieved' thread
    convo.addQuestion('What is the start date of your vacation?', async(answer, convo, bot) => {    //  todo Handle with valdiation 
    }, {key: 'start_date'}, 'recieved');
    convo.addQuestion('What is the end date of your vacation?', async(answer, convo, bot) => {  // async(answer) => todo Handle with valdiation & db call
    }, {key: 'end_date'}, 'recieved');
    convo.addQuestion('what is the alt emp name/id?', async(answer, convo, bot) => {    // async(answer) => todo Handle with valdiation & db call
    }, {key: 'end_date'}, 'recieved');


    convo.after(async(results, bot) => {        // handle the end of the conversation
        const name = results.name;
        const reason = results.reasonx || results.reason;
        console.log(results);    //todo debuggin
    });
    controller.addDialog(convo);



    // HEARS
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

    controller.hears('hello','message',async(bot, message) => {
        await bot.reply(message, 'Hello back at you, '+global.name);
    });


    // HEARS - DIALOG
    controller.hears('creata', 'message', async(bot, message) => {
        await bot.beginDialog(MY_DIALOG_ID);
    });

    controller.hears('request-leave', 'message,direct_message', async(bot, message) => {
        // Different dialog ids depends on the siutation, if condition here!
        await bot.beginDialog(MY_DIALOG_ID);
    });

   


    //INTTERUPTS
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
}
