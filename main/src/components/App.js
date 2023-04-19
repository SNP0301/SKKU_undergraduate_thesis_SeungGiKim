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
    return (
      <div className="container-filled">
        {console.log(this.state.nftPapers)}
        <nav
          className="navbar navbar-dark fixed-top 
                bg-dark flex-md-nowrap p-0 shadow"
        >
          <div
            className="navbar-brand col-sm- col-md-3 
                mr-0"
            id="title"
          >
            NFT Papers
          </div>
          <ul className="navbar-nav px-3">
            <ul
              className="nav-item text-nowrap
                d-none d-sm-none d-sm-block
                "
            >
              <ul>연결된 계좌: {this.state.account}</ul>
            </ul>
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
                    type="text"
                    placeholder="Write Description"
                    className="form-control mb-1"
                  />
                  <input
                    style={{ margin: "20px" }}
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
              if (true) {
                return (
                  <div id="NFTs">
                    <div>
                      <MDBCard
                        className="token img"
                        style={{ maxWidth: "22rem" }}
                      >
                        <MDBCardImage
                          src={nftPaper}
                          //<a href="https://ibb.co/vvs65Nx"><img src="https://i.ibb.co/fG8zR3Y/image.png" alt="image" border="0"></a>

                          //<a href="https://ibb.co/bFQ0Ctp"><img src="https://i.ibb.co/MfZvtdq/1.png" alt="1" border="0"></a>
                          //<a href="https://ibb.co/zHSkK95"><img src="https://i.ibb.co/JFzhX6d/2.png" alt="2" border="0"></a>
                          //<a href="https://ibb.co/rGZD7fL"><img src="https://i.ibb.co/kghNH6r/3.png" alt="3" border="0"></a>
                          //<a href="https://ibb.co/v4CBNrw"><img src="https://i.ibb.co/7txz3TY/4.png" alt="4" border="0"></a>
                          position="top"
                          height="250rem"
                          style={{ marginRight: "4px" }}
                        />
                        <MDBCardBody>
                          <MDBCardTitle> NFT paper </MDBCardTitle>
                          <MDBCardText>
                            {" "}
                            {this.state.nftPapers.totalSupply}{" "}
                          </MDBCardText>
                          <MDBBtn href={nftPaper}>Download</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
