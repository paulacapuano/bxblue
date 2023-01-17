
# Pokemon Wallet

This project is to manage acquisitions and sales of pokemon as well as to verify how much your wallet is worth

## API Reference

#### Post Register Pokemon

```http
  POST localhost:3000/register
```

Register a pokemon to the wallet. Body required.

Body example:

{
    "name": "pikachu"
}

#### Get Wallet

```http
  GET localhost:3000/wallet
```

Show all pokemons on wallet.

#### Get value

```http
  GET localhost:3000/wallet/value
```

Return the wallet value in USD.

#### Delete pokemon

```http
  DELETE localhost:3000/sell
```

Delete a pokemon from wallet. Body required.

Body example:

{
    "name": "pikachu"
}

#### Get history

```http
  GET localhost:3000/history
```
Return all acquired and sold pokemons.
## Installation

Install my-project with npm

```bash
  npm install 
  cd bxblue
  cd app
  npm start
```
Node version v18.11.0