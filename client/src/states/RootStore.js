import { BlockchainStore } from "./BlockchainStore";

export class RootStore {
  blockchainStore;

  constructor() {
    this.blockchainStore = new BlockchainStore(this);
  }
}
