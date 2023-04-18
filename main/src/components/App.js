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
      console.log("ethereum wallet is connected");
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

  // with minting we are sending information and we need to specify the account

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

  // BUILDING THE MINTING FORM
  // 1. Create a text input with a place holder
  //'add file location'
  // 2. Create another input button with the type submit

  render() {
    return (
      <div className="container-filled">
        {console.log(this.state.nftPapers)}
        <nav
          className="navbar navbar-dark fixed-top 
                bg-dark flex-md-nowrap p-0 shadow"
        >
          <div
            className="navbar-brand col-sm-3 col-md-3 
                mr-0"
            style={{ color: "white" }}
          >
            Krypto Birdz NFTs (Non Fungible Tokens)
          </div>
          <ul className="navbar-nav px-3">
            <li
              className="nav-item text-nowrap
                d-none d-sm-none d-sm-block
                "
            >
              <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
        </nav>

        <div className="container-fluid mt-1">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div
                className="content mr-auto ml-auto"
                style={{ opacity: "0.8" }}
              >
                <h1 style={{ color: "black" }}>
                  NFT Paper: publish paper using NFT!
                </h1>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const nftPaper = this.nftPaper.value;
                    this.mint(nftPaper);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add a file location"
                    className="form-control mb-1"
                    ref={(input) => (this.nftPaper = input)}
                  />
                  <input
                    style={{ margin: "6px" }}
                    type="submit"
                    className="btn btn-primary btn-black"
                    value="MINT"
                  />
                </form>
              </div>
            </main>
          </div>
          <hr></hr>
          <div className="row textCenter">
            {this.state.nftPapers.map((nftPaper, key) => {
              return (
                <div>
                  <div>
                    <MDBCard
                      className="token img"
                      style={{ maxWidth: "22rem" }}
                    >
                      <MDBCardImage
                        src={nftPaper}
                        //<a href="https://ibb.co/PmbKgNH"><img src="https://i.ibb.co/ngV9jbJ/20230112-142007.jpg" alt="20230112-142007" border="0"></a>
                        //<a href="https://ibb.co/swsC3CP"><img src="https://i.ibb.co/tsYzCzh/Screen-Shot-2022-12-23-at-12-49-21-PM.png" alt="Screen-Shot-2022-12-23-at-12-49-21-PM" border="0"></a>

                        //minting contract adress:     0x6cCcaDB2263Dd3555734C66073979B92Bea403C9
                        position="top"
                        height="250rem"
                        style={{ marginRight: "4px" }}
                      />
                      <MDBCardBody>
                        <MDBCardTitle> NFT paper </MDBCardTitle>
                        <MDBCardText>
                          {" "}
                          The KryptoBirdz are 20 uniquely generated KBirdz from
                          the cyberpunk cloud galaxy Mystopia! There is only one
                          of each bird and each bird can be owned by a single
                          person on the Ethereum blockchain.{" "}
                        </MDBCardText>
                        <MDBBtn href={nftPaper}>Download</MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
