const { assert } = require("chai");

const NftPaper = artifacts.require("./NftPaper");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("NftPaper", (accounts) => {
  let contract;
  before(async () => {
    contract = await NftPaper.deployed();
  });

  describe("deployment", async () => {
    it("[DEPLOYMENT]", async () => {
      //contract = await NftPaper.deployed();
      const address = contract.address;
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });

    it("[VERIFYING] verify name", async () => {
      const name = await contract.name();
      assert.equal(name, "Seung_Gi_Kim");
    });

    it("[VERIFYING] verify student number", async () => {
      const studentNumber = await contract.studentNumber();
      assert.equal(studentNumber, "2017314243");
    });
  });

  describe("minting", async () => {
    it("[MINTING] creates a new token", async () => {
      const result = await contract.mint("https...1");
      const totalSupply = await contract.totalSupply();

      assert.equal(totalSupply, 1);
      const event = result.logs[0].args;
      assert.equal(
        event._from,
        "0x0000000000000000000000000000000000000000",
        "from is the contract"
      );
      assert.equal(event._to, accounts[0], "to is msg.sender");

      await contract.mint("https...1").should.be.rejected;
    });
  });

  describe("indexing", async () => {
    it("[INDEXING] published papers", async () => {
      await contract.mint("https...2");
      await contract.mint("https...3");
      await contract.mint("https...4");
      const totalSupply = await contract.totalSupply();

      let result = [];
      let NftPaper;
      let i;

      for (i = 1; i <= totalSupply; i++) {
        NftPaper = await contract.nftPapers(i - 1);
        result.push(NftPaper);
      }

      let expected = ["https...1", "https...2", "https...3", "https...4"];
      assert.equal(result.join(","), expected.join(","));
    });
  });
});
