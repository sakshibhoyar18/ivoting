/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'hardhat',
    networks: {
      hardhat: {},
      tBNB: {
        url: 'https://rpc.ankr.com/bsc_testnet_chapel',
        chainId: 97,
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
      // goerli: {
      //   url: 'https://rpc.ankr.com/eth_goerli',
      //   accounts: [`0x${process.env.PRIVATE_KEY}`]
      // }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};