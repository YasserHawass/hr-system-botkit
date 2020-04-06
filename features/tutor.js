function validateDate(date) {
    console.log(date);
}


module.exports = function(controller) {
    const { Botkit, BotkitConversation } = require('botkit');


    var dumpInfo = {
        remaning_days:5,
        office_number:59
    };

    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'hr_bot_db'
    });
    
    let checkRemainingDays = async() => {
        const myQuery = `SELECT \`remaining_days\` FROM \`employee\` WHERE \`office_number\` = ${dumpInfo.office_number}`
        let result = await new Promise((resolve, reject) => con.query(myQuery, (err, result) => { // change the {} to phonenumber later todo
            if (err) {
                reject(err)
            } else {
                con.end();
                resolve(result[0].remaining_days);
            }
        }));
        console.log("query ready"); // todo later
        return result;
    }

    // DIALOG DECLRATION
    const MY_DIALOG_ID = 'my-dialog-name-constant';
    let convo = new BotkitConversation(MY_DIALOG_ID, controller);
    convo.say('Hello!');
    convo.say('Welcome to the world of bots HR System!');
    convo.ask('What is your name?', async(answer) => { 
        // do nothing.
    }, {key: 'name'});
    
    convo.ask('What is the leave type?\n1- normal leave\n2- emergency leave\n3-sick leave\n4- other', [ // collect a value with conditional actions
        {
            pattern: '1',
            handler: async function(answer, convo, bot) {
                return await convo.gotoThread('t_start_date');
            }
        },
        {
            pattern: '2',
            handler: async function(answer, convo, bot) {
                return await convo.gotoThread('t_start_date');
            }
        },
        {
            pattern: '3',
            handler: async function(answer, convo, bot) {
                return await convo.gotoThread('t_start_date');
            }
        },
        {
            pattern: '4',
            handler: async function(answer, convo, bot) {
                return convo.setVar('reason', '4'); //todo kinda no need for it, might skip it, and for the if condition for it?
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
        return await convo.gotoThread('t_start_date');
    }, {key: 'reasonx'});

    convo.addMessage('roger!', 't_start_date'); // define a 'recieved' thread
    convo.addQuestion('What is the start date of your vacation? please write it in y-m-d form (e.g.2020-2-1)', [   //  todo Handle with valdiation 
        {
            pattern: new RegExp(/202\d[\-]\d{1,2}[\-]\d{1,2}/), // please pass it into better date validator function //2020-2-1 and 2025/2/50 are okay here
            handler: async function(answer, convo, bot) {
                return await convo.gotoThread('t_end_date');
            }
        },
        {
            default: true,
            handler: async(answer, convo, bot, full_message) => {
                return await convo.repeat();
            }
        }
    ], {key: 'start_date'}, 't_start_date');

    convo.before('t_end_date', async(convo, bot) => { // abstract it into a func instead of copy-ing pasting it
        GivenDate = convo.vars.start_date;
        CurrentDate = new Date();
        GivenDate = new Date(GivenDate);
        if (GivenDate > CurrentDate ) {
            return await convo.gotoThread('t_end_date');
        }else{
            console.log("lol that was before dude"); //todo debugging
            return await convo.gotoThread('t_start_date');
        }
    });

    convo.addQuestion('What is the end date of your vacation? please write it in y-m-d form (e.g.2020-2-1)', [  // async(answer) => todo Handle with valdiation & db call
        {
            pattern: new RegExp(/202\d[\-]\d{1,2}[\-]\d{1,2}/),
            handler: async function(answer, convo, bot) {
                console.log("good Date, okay!");// todo check the db here when done go to next if not repeat please.
                await convo.gotoThread('t_alt_emp');
            }
        },
        {
            default: true,
            handler: async(answer, convo, bot, full_message) => {
                return await convo.repeat();
            }
        }
    ], {key: 'end_date'}, 't_end_date');

    convo.before('t_alt_emp', async(convo, bot) => { // abstract it into a func instead of copy-ing pasting it
        GivenDate = convo.vars.end_date;
        var CurrentDate = new Date(convo.vars.start_date);
        let PermittedDate = new Date(convo.vars.start_date);
        GivenDate = new Date(GivenDate);
        // message the DB and substract remaning days is +?
        let remaning_days = await checkRemainingDays();
        console.log(`hello ${remaning_days}`);
        PermittedDate.setDate(PermittedDate.getDate() + remaning_days);
        
        if (GivenDate > CurrentDate && PermittedDate >= GivenDate ) { // todo message the DB and subtract days // year first conditions looks wierd but cuz of datemodule?
            var Difference_In_Time = PermittedDate.getTime() - GivenDate.getTime(); 
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)+1; //weird check it later todo
            convo.setVar('difference_in_days',`${Difference_In_Days}`); //update the DB todo ?
            return await convo.gotoThread('t_alt_emp'); //is that even Necessary todo // nope reverse it later
        }else{
            console.log("your vacation starts before it begins?"); //todo debugging
            console.log(`hello2 ${remaning_days}`);
            return await convo.gotoThread('t_end_date');
        }
    });

    convo.addQuestion('what is the alt emp name/id?', async(answer, convo, bot) => {    // todo Handle with valdiation & db call
    }, {key: 'alt_emp_pinfo'}, 't_alt_emp');


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
