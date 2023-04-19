import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import NftPaper from "../abis/NftPaper.json";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./App.css";

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // first up is to detect ethereum provider
  async loadWeb3() {
    const provider = await detectEthereumProvider();

    if (provider) {
      //Metamask Connection: successful
      console.log("Ethereum wallet is connected");
      window.web3 = new Web3(provider);
    } else {
      //Metamask Connection: failed
      console.log("no ethereum wallet detected");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = NftPaper.networks[networkId];

    if (networkData) {
      const abi = NftPaper.abi;
      const address = networkData.address;

      const contract = new web3.eth.Contract(abi, address);
      this.setState({ contract });
      console.log(contract);

      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });

      for (let i = 1; i <= totalSupply; i++) {
        const NftPaper = await contract.methods.nftPapers(i - 1).call();

        this.setState({
          nftPapers: [...this.state.nftPapers, NftPaper],
        });
      }
    } else {
      window.alert("Smart contract not deployed");
    }
  }

  mint = (nftPaper) => {
    this.state.contract.methods
      .mint(nftPaper)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({
          nftPapers: [...this.state.nftPapers, NftPaper],
        });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      nftPapers: [],
    };
  }

  render() {
    return <div>RESTART!</div>;
  }
}

export default App;
