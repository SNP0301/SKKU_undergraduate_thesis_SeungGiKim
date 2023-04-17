const NftPaper = artifacts.require("NftPaper");

module.exports = function(deployer) {
  deployer.deploy(NftPaper);
};
