import * as yargs from 'yargs';
import {listCommand} from './lib/commands/listCommand';

class App {
    public static main():void{
        yargs.usage('$0 <cmd> [args]')
        .command({
            command: 'balance [args]',
            aliases: ['bal'],
            describe: 'list your balances',
            builder: (yargs) => yargs,
            handler: null
        })
        .command({
            command: 'list [market] [args]',
            aliases: ['ls'],
            describe: 'list markets',
            builder: (yargs) => yargs.default('market','BTC')
                .option('volume',{
                    alias: 'v',
                    demandOption: false,
                    describe: 'order by volume',
                    type: 'boolean'
                }).option('currencyPair',{
                    alias: 'c',
                    demandOption: false,
                    describe: 'order by coin',
                    type: 'boolean'
                }).option('rate',{
                    alias: 'r',
                    demandOption: false,
                    describe: 'order by rate',
                    type: 'boolean'
                }).option('percentChange',{
                    alias: 'p',
                    demandOption: false,
                    describe: 'order by percent change',
                    type: 'boolean'
                }).option('lines',{
                    alias: 'n',
                    demandOption: false,
                    describe: 'number of lines',
                    type: 'number'
                }),
            handler: listCommand
        })
        .command({
            command: 'buy <currencyPair> [args]',
            describe: 'buy some coins',
            builder: (yargs) => {
                return yargs.option('baseBuyPercentage',{
                    alias: 'p',
                    demandOption: false,
                    describe: 'the percentage of your base currency to use for purchasing',
                    type: 'number'
                }).option('total',{
                    alias: 't',
                    demandOption: false,
                    describe: 'total ammount in base currency to purchase',
                    type: 'number'
                }).option('amount', {
                    alias: 'a',
                    demandOption: false,
                    describe: 'amount in trade currency to purchase',
                    type: 'number'
                }).option('rate', {
                    alias: 'r',
                    demandOption: false,
                    describe: 'the price to buy the trade currency at',
                    type: 'number'
                }).option('buyLimitPercentage',{
                    alias: 'l',
                    demandOption: false,
                    describe: 'the percentage lower you want to buy the currency for',
                    type: 'number'
                }).option('dryRun',{
                    alias: 'd',
                    demandOption: false,
                    describe: 'run the command, but do not actually sell',
                    type: 'boolean'
                });
            
            },
            handler: null
        })
        .command({
            command: 'sell <currencyPair> [args]',
            describe: 'sell some coins',
            builder: (yargs) => {
                return yargs.option('baseSellPercentage',{
                    alias: 'p',
                    demandOption: false,
                    describe: 'the percentage of your trade currency to use for selling',
                    type: 'number'
                }).option('total',{
                    alias: 't',
                    demandOption: false,
                    describe: 'total ammount in base currency to sell',
                    type: 'number'
                }).option('amount', {
                    alias: 'a',
                    demandOption: false,
                    describe: 'amount in trade currency to sell',
                    type: 'number'
                }).option('rate', {
                    alias: 'r',
                    demandOption: false,
                    describe: 'the price to sell the trade currency at',
                    type: 'number'
                }).option('sellLimitPercentage',{
                    alias: 'l',
                    demandOption: false,
                    describe: 'the percentage higher you want to sell the currency for',
                    type: 'number'
                }).option('panicSell',{
                    alias: 'panic',
                    demandOption: false,
                    describe: 'sell at a slightly lower price to ensure the order fills',
                    type: 'boolean'
                }).option('dryRun',{
                    alias: 'd',
                    demandOption: false,
                    describe: 'run the command, but do not actually sell',
                    type: 'boolean'
                });
            },
            handler: null
        })
        .command({
            command: 'orders [currencyPair]',
            aliases: ['ord'],
            describe: 'list open orders',
            builder: (yargs) => yargs,
            handler: null
        })
        .command({
            command: 'cancel <uuid>',
            aliases: ['rm'],
            describe: 'cancel open orders',
            builder: (yargs) => yargs,
            handler: null
        })
        .version()
        .help().argv;
    }
}

App.main();

export default App