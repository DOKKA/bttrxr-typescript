import * as bittrex from 'node.bittrex.api';

let apiKey = process.env.BITTREX_API_KEY;
let secret = process.env.BITTREX_API_SECRET;

bittrex.options({
    apikey: apiKey,
    apisecret: secret
});

export interface CoinBalance{
    Currency: string,
    Balance: number,
    Available: number,
    Pending: number,
    CryptoAddress: string
}

export interface MarketSummary{
    MarketName: string,
    High: number,
    Low: number,
    Volume: number,
    Last: number,
    BaseVolume: number,
    TimeStamp: string,
    Bid: number,
    Ask: number,
    OpenBuyOrders: number,
    OpenSellOrders: number,
    PrevDay: number,
    Created: string
}

export interface Ticker{
    Bid: number,
    Ask: number,
    Last: number
}



export class BittrexPromise{

    public static getBalances(): Promise<CoinBalance[]> {
        return new Promise((resolve,reject) => {
            bittrex.getbalances((response)=>{
                if(response.error){
                    reject(response.error);
                } else{
                    resolve(response.result);
                }
            });
        });
    }

    public static getMarketSummaries(): Promise<MarketSummary[]>{
        return new Promise((resolve,reject) => {
            bittrex.getmarketsummaries((response)=>{
                if(response.error){
                    reject(response.error);
                } else{
                    resolve(response.result);
                }
            });
        });
    }

    public static getTicker(currencyPair: string): Promise<Ticker>{
        return new Promise((resolve,reject) => {
            bittrex.getticker({market: currencyPair},(response)=>{
                if(response.error){
                    reject(response.error);
                } else{
                    resolve(response.result);
                }
            });
        });
    }

    
    public static sellLimit(currencyPair: string, quantity: number, rate: number): Promise<any>{
        return new Promise((resolve,reject) => {
            bittrex.selllimit({market: currencyPair, quantity: quantity, rate: rate},(response)=>{
                if(response.error || response.success === false){
                    if(response.error){
                        reject(response.error);
                    } else {
                        reject(response.message);
                    }
                } else {
                    resolve(response.result);
                }
            });
        });
    }

    public static buyLimit(currencyPair: string, quantity: number, rate: number): Promise<any>{
        return new Promise((resolve,reject) => {
            bittrex.buylimit({market: currencyPair, quantity: quantity, rate: rate},(response)=>{
                if(response.error || response.success === false){
                    if(response.error){
                        reject(response.error);
                    } else {
                        reject(response.message);
                    }
                } else {
                    resolve(response.result);
                }
            });
        });
    }

    public static getOpenOrders(currencyPair: string, quantity: number, rate: number): Promise<any>{
        return new Promise((resolve,reject) => {
            bittrex.getopenorders({},(response)=>{
                if(response.error || response.success === false){
                    if(response.error){
                        reject(response.error);
                    } else {
                        reject(response.message);
                    }
                } else {
                    resolve(response.result);
                }
            });
        });
    }

    public static cancel(uuid: string): Promise<any>{
        return new Promise((resolve,reject) => {
            bittrex.cancel({uuid: uuid},(response)=>{
                if(response.error || response.success === false){
                    if(response.error){
                        reject(response.error);
                    } else {
                        reject(response.message);
                    }
                } else {
                    resolve(response.result);
                }
            });
        });
    }

}

