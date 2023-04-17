/// https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-dashboard/
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Ganache default port: 7545
      network_id: "*", // Take all network ids that are enabled
    },
  },

  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",

  compilers: {
    solc: {
      version: "^0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
