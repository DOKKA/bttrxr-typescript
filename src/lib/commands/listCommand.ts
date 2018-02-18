import {BittrexPromise} from '../BittrexPromise';
import * as _ from 'lodash';
import * as Table from 'cli-table2';
import chalk from 'chalk';

interface MarketSummary2 {
    price: number,
    percentChange: number,
    baseVolume: number,
    baseCurrency: string,
    tradeCurrency: string
}

export function listCommand(argv) {
    let baseCurrency = argv.market.toUpperCase();
    getMarketSummaries2().then((markets) => {

        let marketArr = [];
        for (let x = 0; x < markets.length; x++) {
            var market = markets[x];
            if (market.baseCurrency === baseCurrency) {
                marketArr.push(markets[x]);
            }
        }
        let orderedArr = _.orderBy(marketArr, (market: MarketSummary2) => {
            if (argv.c) {
                return market.tradeCurrency;
            } else if (argv.r) {
                return market.price;
            } else if (argv.v) {
                return market.baseVolume;
            } else if (argv.p) {
                return market.percentChange
            } else {
                return market.baseVolume;
            }
        }, 'desc');

        makeTable(argv, orderedArr);

    });
}


function getMarketSummaries2(): Promise < MarketSummary2[] > {

    return BittrexPromise.getMarketSummaries().then((markets) => {
        return markets.map((market) => {
            let arrMarketName = market.MarketName.split('-');
            let last = market.Last;
            let prev = market.PrevDay;
            let percentChange = (last - prev) / prev * 100;

            return {
                price: last,
                percentChange: percentChange,
                baseVolume: market.BaseVolume,
                baseCurrency: arrMarketName[0],
                tradeCurrency: arrMarketName[1]
            };
        });
    });
}

function makeTable(argv, markets: MarketSummary2[]) {
    let table = new Table({
        head: ['Coin', 'Rate', 'Volume', '% Change']
    }) as Table.HorizontalTable;
    let n = argv.n || markets.length;
    for (let x = 0; x < n; x++) {
        let market = markets[x];
        let marketName = market.baseCurrency + '-' + market.tradeCurrency;
        let percentChange = market.percentChange || 0;
        let percentChange2 = '';
        if (percentChange > 0) {
            percentChange2 = chalk.green(percentChange.toFixed(2));
        } else {
            percentChange2 = chalk.red(percentChange.toFixed(2));
        }
        table.push([marketName, market.price.toFixed(8), parseFloat(market.baseVolume.toFixed(3)), percentChange2]);
    }
    console.log(table.toString());
}

