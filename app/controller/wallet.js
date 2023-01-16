const axios = require('axios');
const { json } = require('express');

let walletTable = []
let historyTable = []

async function register(pokemon) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`);
        const pokemonInfo = {
            name: pokemon.name,
            baseXp: response.data.base_experience
        }
        const historyInfo = {
            name: pokemon.name,
            transactionType: 'Register',
            date: new Date()
        }
        walletTable.push(pokemonInfo);
        historyTable.push(historyInfo)
        return walletTable
      } catch (error) {
        console.log(error)
        return 'Pokemon not found!';
      }
}

function getWallet() {
    if (walletTable.length <= 0) {
        return 'Your wallet is empty!'
    }
    return walletTable
}

async function getWalletValue() {
    if (walletTable.length > 0) {
        try {
            const response = await axios.get('https://blockchain.info/ticker');
            const usd = response.data.USD.last
            const satoshi = usd * 0.00000001
            let totalAmount = 0;
            for (let i = 0; i < walletTable.length; i++){
                totalAmount += walletTable[i].baseXp * satoshi
            }
            return {
                walletValue: totalAmount.toString()
            }
          } catch (error) {
            console.log(error)
            return 'Something went wrong.';
          }
    } else {
        return 'Your wallet is empty!'
    }
    
}

function sell(pokemon) {
    let deleted = false;
    const bufferWallet = [];
    for (let i = 0; i < walletTable.length; i++) {
        if (walletTable[i].name === pokemon.name && !deleted) {
            deleted = true
            const historyInfo = {
                name: pokemon.name,
                transactionType: 'Sell',
                date: new Date()
            }
            historyTable.push(historyInfo)
        } else {
            bufferWallet.push(walletTable[i])
        }
    }
    if (!deleted) {
        return 'Pokemon not found'
    } else {
        walletTable = bufferWallet;
        return `Pokemon ${pokemon.name} was successfully sold`
    }
}

function retrieveHistory() {
    if (historyTable.length <= 0) {
        return 'No transactions to show!'
    }
    return historyTable
}

module.exports = {
    register,
    getWallet,
    getWalletValue,
    sell,
    retrieveHistory
}
