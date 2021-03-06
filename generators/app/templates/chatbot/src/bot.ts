'use strict';

import builder = require('botbuilder');
import SampleDialog = require('./dialogs/sample');
import config = require('./config');

/**
 * Represents a Bot
 * @class
 */
class Bot {
    /**
     * Connector to use
     * @type {(builder.ConsoleConnector | builder.ChatConnector)}
     * @memberOf Bot
     */
    public connector: builder.ConsoleConnector | builder.ChatConnector;

    private bot: builder.UniversalBot;
    private recognizer: builder.LuisRecognizer;
    private dialog: builder.IntentDialog;

    /**
     * Initializes the bot for use with a framework such as restify or express
     * @memberOf Bot
     */
    public initializeForWeb() {
        if (!config.bot.key) {
            this.connector = new builder.ChatConnector();
            console.log('WARNING: Starting bot without ID or Secret');
        } else {
            this.connector = new builder.ChatConnector({ appId: config.bot.app, appPassword: config.bot.key });
            console.log('Bot started with App Id %s', config.bot.app);
        }
        this.init();
    }

    /**
     * Initializes the bot for converations over the console (dev only)
     * @memberOf Bot
     */
    public initializeForConsole() {
        this.connector = new builder.ConsoleConnector();
        this.init();
    }

    /**
     * Registers the dialog interactions with the bot.
     * @private
     */
    private registerDialogs() {
        this.bot.dialog('/', this.dialog);
        (new SampleDialog()).register(this.bot, config.dialogs.paths.sample); // Add a line like this for every dialog
    }

    /**
     * Binds the dialogs to intents
     * @private
     */
    private bindDialogs() {
        this.dialog.matches('favoriteFood', config.dialogs.paths.sample); // Add a line like this for every intent
    }

    /**
     * Initializes the bot
     * @private
     */
    private init() {
        this.bot = new builder.UniversalBot(this.connector);
        const url = config.luis.url.replace('##APP##', config.luis.app).replace('##KEY##', config.luis.key);
        this.recognizer = new builder.LuisRecognizer(url);
        this.dialog = new builder.IntentDialog({ recognizers: [this.recognizer] });

        console.log('Initialize defaults...');
        this.dialog.onDefault(builder.DialogAction.send(config.dialogs.speech.iDontUnderstand));

        console.log('Creating dialogs...');
        this.registerDialogs();

        console.log('Binding dialogs to intents...');
        this.bindDialogs();
    }
}

export = Bot;
