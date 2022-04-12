import { BlockchainStore } from "./BlockchainStore";

class RootStore {
  blockchainStore;

  constructor() {
    this.blockchainStore = new BlockchainStore(this);
  }
}

export default new RootStore();