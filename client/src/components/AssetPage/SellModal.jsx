import React, { useRef, useState } from "react";

import { FormGroup, Label, Input, Card, CardBody, Button } from "reactstrap";
import useStores from "hooks/useStore";
const SellModal = ({ address, tokenId, onClickSellHandler }) => {
  const { blockchainStore } = useStores();
  const [priceEl, setPriceEl] = useState();
  const onChangeInputHandler = (e) => {
    setPriceEl(e.target.value);
  }

  const addToMarket = async (e) => {
    e.preventDefault();
    // console.log(priceEl)
    const price = blockchainStore.blockchain.web3.utils.toWei(
      priceEl,
      "ether"
    );
    // console.log(
    //   address,
    //   tokenId,
    //   price,
    //   blockchainStore.blockchain.marketContract,
    //   blockchainStore.blockchain.account
    // );
    await blockchainStore.blockchain.marketContract.methods
      .addNftToMarket(address, tokenId, price)
      .send({ from: blockchainStore.blockchain.account });
    onClickSellHandler();
  };
  return (
    <Card>
      <CardBody>
        <h1>판매하기</h1>
        <h4>가격</h4>
        <Input
          type='text'
          value={priceEl}
          placeholder='ETH'
          onChange={onChangeInputHandler}
        />
        <Button type='button' onClick={addToMarket}>
          등록하기
        </Button>
      </CardBody>
    </Card>
  );
};

export default SellModal;
