import React from "react";
import { Card, CardImg, CardText } from 'reactstrap';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/fontawesome-free-solid'
import SimpleBarReact from 'simplebar-react';
import "simplebar/src/simplebar.css";


fontawesome.library.add(faImage);

const Cell = ({ asset: { image_url, name, description } }) => {
    return (
        <Card className='ml-4' style={{ width: '23rem', height: "28rem" }}>
            {image_url !== null && <CardImg top src={image_url} alt={name} style={{ width: '23rem', height: "23rem" }} />}
            {image_url === null && <div style={{ textAlign: "center", verticalAlign: "center", width: '23rem', height: "23rem" }}>
                <FontAwesomeIcon icon={faImage} style={{ width: '20rem', height: "20rem" }} />
            </div>}
            <SimpleBarReact className="p-1" style={{ maxHeight: "5rem" }}>
                <CardText >{name === null ? `이름없음` : name}</CardText>
                <CardText >{description === null ? `설명없음` : description}</CardText>
            </SimpleBarReact>
        </Card >
    );
}
export default Cell;