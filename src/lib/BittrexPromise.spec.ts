import {BittrexPromise, Ticker, MarketSummary, CoinBalance} from './BittrexPromise';
import {assert} from 'chai';


describe('BittrexPromise', ()=>{

    describe('getBalances', ()=>{
        it('should get the users balance from bittrex', (done)=>{
            BittrexPromise.getBalances().then((data)=>{
                assert.isArray(data);
                assert.isAbove(data.length,0);
                done();
            });
        });
    });

    describe('getMarketSummaries', ()=>{
        it('should get the market summaries from bittrex', (done)=>{
            BittrexPromise.getMarketSummaries().then((data)=>{
                assert.isArray(data);
                assert.isAbove(data.length,0);
                done();
            });
        });
    });

    describe('getTicker', ()=>{
        it('should get the ticker from bittrex', (done)=>{
            BittrexPromise.getTicker('BTC-LTC').then((data)=>{
                assert.hasAllKeys(data,['Bid', 'Ask','Last']);
                done();
            });
        });
    });

});