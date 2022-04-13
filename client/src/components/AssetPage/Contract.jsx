import React, { useState } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";

import Modal from 'react-modal';

const customStyles = {
    overlay: {
        opacity: 0,
        background: "black"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Contract = ({ asset_contract: { address, name, created_date, schema_name } }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const onClickEtherscanHandler = (uri) => {
        const etherscanAddress = `https://rinkeby.etherscan.io/address/${address}`;
        window.location.href = etherscanAddress;
    }
    const onClickReportHandler = () => {
        setModalIsOpen(prev => !prev);
    }

    return <>
        <Card>
            <CardHeader>
                <h5 className="title">Contract : {address}</h5>
                <div className="button-container">
                    <Button onClick={onClickEtherscanHandler} className="btn-icon btn-round" color="google">
                        <svg className="" fill="#E5E8EB" height="18" viewBox="0 0 293.775 293.671" width="18" xmlns="http://www.w3.org/2000/svg"><g id="etherscan-logo-circle" transform="translate(-219.378 -213.33)"><path d="M280.433,353.152A12.45,12.45,0,0,1,292.941,340.7l20.737.068a12.467,12.467,0,0,1,12.467,12.467v78.414c2.336-.692,5.332-1.43,8.614-2.2a10.389,10.389,0,0,0,8.009-10.11V322.073a12.469,12.469,0,0,1,12.468-12.47h20.778a12.469,12.469,0,0,1,12.467,12.467v90.279s5.2-2.106,10.269-4.245a10.408,10.408,0,0,0,6.353-9.577V290.9a12.466,12.466,0,0,1,12.466-12.467h20.778A12.468,12.468,0,0,1,450.815,290.9v88.625c18.014-13.055,36.271-28.758,50.759-47.639a20.926,20.926,0,0,0,3.185-19.537,146.6,146.6,0,0,0-136.644-99.006c-81.439-1.094-148.744,65.385-148.736,146.834a146.371,146.371,0,0,0,19.5,73.45,18.56,18.56,0,0,0,17.707,9.173c3.931-.346,8.825-.835,14.643-1.518a10.383,10.383,0,0,0,9.209-10.306V353.152" data-name="Path 1" id="Path_1"></path><path d="M244.417,398.641A146.808,146.808,0,0,0,477.589,279.9c0-3.381-.157-6.724-.383-10.049-53.642,80-152.686,117.4-232.79,128.793" data-name="Path 2" id="Path_2" transform="translate(35.564 80.269)"></path></g></svg>
                    </Button>
                    <Button onClick={onClickReportHandler} className="btn-icon btn-round" color="google">
                        <i className="icon-alert-circle-exc tim-icons" />
                    </Button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={onClickReportHandler}
                        style={customStyles}
                        contentLabel="Example Modal"
                    ></Modal>
                </div>
            </CardHeader>
            <CardBody>
                <Col>
                    <h5>name: {name}</h5>
                    <h5>created_date: {created_date}</h5>
                    <h5>schema_name: {schema_name}</h5>
                </Col>
            </CardBody>
            <CardFooter>
                <Button className="btn-fill" color="primary" type="submit">
                    buy
                </Button>
                <Button className="btn-fill" color="primary" type="submit">
                    sell
                </Button>
            </CardFooter>
        </Card>
    </>
}

export default Contract;