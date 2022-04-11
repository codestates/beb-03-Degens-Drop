import React, { useState, useRef, useEffect } from "react";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import { abi, address } from "../../erc721Abi";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { FormGroup, Label, Input, Card, CardBody, Button } from "reactstrap";
import Notify from "react-notification-alert";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const MintPage = observer(() => {
  const [image, setImage] = useState(undefined);
  const [nftContract, setNftContract] = useState(undefined);
  const nameEl = useRef(null);
  const descEl = useRef(null);
  const notiRef = useRef(null);
  const { blockchainStore } = useStores();
  console.log("blockchainStore here: ", blockchainStore);

  const getImage = (e) => {
    setImage(e.target.files[0]);
    console.log(nftContract);
  };

  const mintNFT = async (e) => {
    e.preventDefault();

    const options = {
      place: "br",
      type: "danger",
      icon: "",
      autoDismiss: 5,
    };

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
        notiRef.current.notificationAlert({
          ...options,
          message: (
            <div>
              <div>
                IPFS에 이미지 업로드 중에 에러가 발생했습니다. 다시
                시도해주시기바랍니다.
              </div>
            </div>
          ),
        });
        return;
      }
      let resultMetadata;
      //upload metadata to IPFS
      try {
        resultMetadata = await client.add(
          JSON.stringify({ name, description, image: uploadedImage })
        );
      } catch (err) {
        notiRef.current.notificationAlert({
          ...options,
          message: (
            <div>
              <div>
                IPFS에 메타데이터 업로드 중에 에러가 발생했습니다. 다시
                시도해주시기바랍니다.
              </div>
            </div>
          ),
        });
        return;
      }

      try {
        const uri = `https://ipfs.infura.io/ipfs/${resultMetadata.path}`;

        const tokenId = await nftContract.methods
          .mintNFT(blockchainStore.blockchain.account, uri)
          .send({ from: blockchainStore.blockchain.account });
        notiRef.current.notificationAlert({
          ...options,
          type: "success",
          message: (
            <div>
              <div>NFT 민팅에 성공했습니다!.</div>
            </div>
          ),
        });
        console.log(tokenId);
      } catch (err) {
        notiRef.current.notificationAlert({
          ...options,
          message: (
            <div>
              <div>
                NFT를 민팅하는 중에 에러가 발생했습니다. 다시
                시도해주시기바랍니다.
              </div>
            </div>
          ),
        });
        return;
      }
    }
    notiRef.current.notificationAlert({
      ...options,
      message: (
        <div>
          <div>NFT 이름, 설명과 파일을 다시 확인해주세요.</div>
        </div>
      ),
    });
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
      <Notify ref={notiRef} />
    </Card>
  );
});

export default MintPage;
