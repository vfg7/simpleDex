
```markdown
# SimpleDEX - DEX Descentralizada com ERC-20

Este projeto implementa uma exchange descentralizada (DEX) simples na testnet Sepolia, permitindo a troca entre dois tokens ERC-20 com funcionalidades básicas de liquidez, swap e interface modularizada.
````

## Funcionalidades

-  Criação de dois tokens ERC-20 (TokenA e TokenB)
-  Contrato `SimpleDEX` para:
  - Adicionar e remover liquidez
  - Realizar trocas A ↔ B com fórmula de produto constante
  - Consultar preços e saldos via interface pública
-  Interface `IDex` com métodos `transferTo`, `transferFrom`, `getBalance`
-  Testes completos com Hardhat
-  Deploy automatizado via script
-  Integração com **Alchemy Sepolia** para testes reais


## Arquitetura
```
.
├── contracts/
│   ├── TokenA.sol
│   ├── TokenB.sol
│   ├── SimpleDEX.sol
│   └── interfaces/
│       └── IDex.sol
├── scripts/
│   ├── deploy.js
│   └── test\_contract.js
├── test/
│   └── SimpleDEX.test.js
├── .env
├── hardhat.config.js
├── package.json
└── README.md
---
````

## Como rodar localmente

### 1. Instale dependências

```bash
npm install
````

### 2. Configure variáveis de ambiente

Crie um arquivo `.env` com:

```
PRIVATE_KEY=chave_privada_da_wallet
ALCHEMY_API_URL=https://eth-sepolia.g.alchemy.com/v2/SEU_TOKEN
```

### 3. Compile contratos

```bash
npx hardhat compile
```

### 4. Deploy para Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 5. Teste o contrato na testnet

```bash
npx hardhat run scripts/test_contract.js --network sepolia
```

### 6. Cobertura de testes

```bash
npx hardhat coverage
```

## Tecnologias

* [Solidity ^0.8.20](https://docs.soliditylang.org)
* [Hardhat](https://hardhat.org/)
* [OpenZeppelin Contracts v5](https://docs.openzeppelin.com/contracts/5.x/)
* [Alchemy Sepolia](https://alchemy.com/)
* [Ethers.js](https://docs.ethers.org)


## Licença MIT

