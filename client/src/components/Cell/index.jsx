import React from "react";
import { Card, CardImg, CardText } from 'reactstrap';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/fontawesome-free-solid'
import SimpleBarReact from 'simplebar-react';
import "simplebar/src/simplebar.css";
import CellImage from "./CellImage";

import useFromWei from 'hooks/useFromWei';


fontawesome.library.add(faImage);

const Cell = ({ asset: { tokenPrice, image_url, image_original_url, name, description } }) => {
    console.log("cell", image_url, image_original_url, name, description)
    const tokenEth = useFromWei(tokenPrice);
    return (
        <Card className='ml-4' style={{ width: '23rem', height: "28rem" }}>
            <CellImage image_original_url={image_original_url} image_url={image_url} name={name} />
            <SimpleBarReact className="p-1" style={{ width: '23rem', height: "23rem" }}>
                {tokenPrice !== undefined && <CardText>{tokenEth} ETH</CardText>}
                <CardText >{name === null ? `이름없음` : name}</CardText>
                <CardText >{description === null ? `설명없음` : description}</CardText>
            </SimpleBarReact>
        </Card >
    );
}
export default Cell;