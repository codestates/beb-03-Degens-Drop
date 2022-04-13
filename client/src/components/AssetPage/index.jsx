import CellImage from 'components/Cell/CellImage';
import React, { useEffect, useState } from 'react';
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
import Contract from './Contract';
import Notifications from './Notification';

import Owner from './Owner';

const AssetPage = ({ data }) => {
    const { owner, creator: { profile_img_url } = {}, asset_contract = {}, image_url, image_original_url, name = "", description = "" } = data;
    return (<>
        <div className="content">
            <Row>
                <Col md="4">
                    <Card className="card-user">
                        <CardBody>
                            <CardText />
                            <div className="author">
                                <div className="block block-one" />
                                <div className="block block-two" />
                                <div className="block block-three" />
                                <div className="block block-four" />
                                <a href="#pablo" style={{ position: "relative" }} onClick={(e) => e.preventDefault()}>
                                    <CellImage
                                        image_original_url={image_original_url}
                                        image_url={image_url}
                                        name={name}
                                    />
                                    <h1 className="title pt-4">{name}</h1>
                                </a>
                            </div>
                            <div className="card-description pr-4 pl-4">
                                {description}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="8">
                    <Owner owner={owner} />
                    <Contract asset_contract={asset_contract} />
                </Col>
            </Row>
        </div>
    </>
    );
};
export default AssetPage;