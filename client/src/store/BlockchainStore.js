import { action, makeObservable, observable } from "mobx";

class Blockchain {
  web3;
  account;
  nftContract;

  constructor(web3, account, nftContract) {
    this.web3 = web3;
    this.account = account;
    this.nftContract = nftContract;
  }
}

export class BlockchainStore {
  rootStore;
  blockchain = {};

  constructor(root) {
    makeObservable(this, {
      blockchain: observable,
      setWeb3: action,
      setAccount: action,
    });
    this.rootStore = root;

    //this.blockchain = new Blockchain(undefined, "", undefined);
    this.blockchain = {
      web3: undefined,
      account: "",
      nftContract: undefined,
      marketContract: undefined,
    };
  }

  setWeb3(web3) {
    //this.blockchain.web3 = web3;
    this.blockchain = { ...this.blockchain, web3 };
    // console.log(this.blockchain);
  }

  setAccount(account) {
    this.blockchain = { ...this.blockchain, account };
    // console.log(this.blockchain.account);
  }

  setMarketContract(marketContract) {
    this.blockchain = { ...this.blockchain, marketContract };
    // console.log("marketContract", this.blockchain.marketContract);
  }
}
