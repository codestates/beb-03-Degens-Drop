import React, { useState, useRef, useEffect } from "react";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import { abi, address } from "../../erc721Abi";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { FormGroup, Label, Input, Card, CardBody, Button } from "reactstrap";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const MintPage = observer(() => {
  const [image, setImage] = useState(undefined);
  const [nftContract, setNftContract] = useState(undefined);
  const nameEl = useRef(null);
  const descEl = useRef(null);
  const { blockchainStore } = useStores();
  console.log("blockchainStore here: ", blockchainStore);

  const getImage = (e) => {
    setImage(e.target.files[0]);
    console.log(nftContract);
  };

  const mintNFT = async (e) => {
    e.preventDefault();
    const nftContract = new blockchainStore.blockchain.web3.eth.Contract(
      abi,
      address
    );

    const name = nameEl.current.value;
    const description = descEl.current.value;
    if (
      name !== "" &&
      description !== "" &&
      image !== undefined &&
      blockchainStore.blockchain.account !== ""
    ) {
      //upload image to IPFS
      let uploadedImage;
      try {
        const resultImage = await client.add(image);
        uploadedImage = `https://ipfs.infura.io/ipfs/${resultImage.path}`;
      } catch (err) {
        console.log("Uploading image to IPFS error");
        return;
      }
      let resultMetadata;
      //upload metadata to IPFS
      try {
        resultMetadata = await client.add(
          JSON.stringify({ name, description, image: uploadedImage })
        );
      } catch (err) {
        console.log("Uploading metadata to IPFS error");
        return;
      }

      try {
        const uri = `https://ipfs.infura.io/ipfs/${resultMetadata.path}`;

        const tokenId = await nftContract.methods
          .mintNFT(blockchainStore.blockchain.account, uri)
          .send({ from: blockchainStore.blockchain.account });
        console.log(tokenId);
      } catch (er) {
        console.log("Minting error");
        return;
      }
    }
  };

  return (
    <Card>
      <CardBody>
        <h1>민팅</h1>
        <form>
          <FormGroup>
            <Label for='name'>이름</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='NFT 이름'
              ref={nameEl}
            />
          </FormGroup>
          <FormGroup>
            <Label for='description'>설명</Label>
            <Input type='textarea' name='text' id='description' ref={descEl} />
          </FormGroup>
          <FormGroup>
            <Label for='collection'>컬렉션</Label>
            <Input
              type='text'
              name='collection'
              id='collection'
              placeholder='default'
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for='amount'>수량</Label>
            <Input
              type='text'
              name='amount'
              id='amount'
              placeholder='1'
              disabled
            />
          </FormGroup>
          <div className='mb-3'>
            <label className='form-label' htmlFor='customFile'>
              이미지:
            </label>
            <input
              type='file'
              className='form-control'
              id='customFile'
              onChange={getImage}
            />
          </div>
          <Button type='button' color='primary' onClick={mintNFT}>
            민팅
          </Button>
        </form>
      </CardBody>
    </Card>
  );
});

export default MintPage;
