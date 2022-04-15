import React, { useRef } from "react";

import { FormGroup, Label, Input, Card, CardBody, Button } from "reactstrap";
import useStores from "hooks/useStore";
const SellModal = ({ address, tokenId, onClickSellHandler }) => {
  const priceEl = useRef(null);
  const { blockchainStore } = useStores();

  const addToMarket = async (e) => {
    e.preventDefault();

    const price = blockchainStore.blockchain.web3.utils.toWei(
      priceEl.current.value,
      "ether"
    );
    console.log(
      address,
      tokenId,
      price,
      blockchainStore.blockchain.marketContract,
      blockchainStore.blockchain.account
    );
    await blockchainStore.blockchain.marketContract.methods
      .addNftToMarket(address, tokenId, price)
      .send({ from: blockchainStore.blockchain.account });
    onClickSellHandler();
  };
  return (
    <Card>
      <CardBody>
        <h1>판매하기</h1>
        <form>
          <FormGroup>
            <Label for='name'>가격</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='ETH'
              innerRef={priceEl}
            />
          </FormGroup>
          <Button type='button' onClick={addToMarket}>
            등록하기
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default SellModal;
