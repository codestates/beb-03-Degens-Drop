import React from "react";
import { Card, CardImg, CardBody, CardText } from 'reactstrap';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faImage);

const Cell = ({ imageSrc, imageTitle, name, imageDescription }) => {
    return (
        <Card className='ml-4' style={{ width: '23rem', height: "28rem" }}>
            {imageSrc !== null && <CardImg top src={imageSrc} alt={imageTitle} />}
            {imageSrc === null && <div style={{ textAlign: "center", verticalAlign: "center", width: '23rem', height: "28rem" }}>
                <FontAwesomeIcon icon={faImage} style={{ width: '20rem', height: "20rem" }} />
            </div>}

            <CardBody className="overflow-hidden" >
                <CardText >{name === null ? `이름없음` : name}</CardText>
                <CardText >{imageDescription === null ? `설명없음` : imageDescription}</CardText>
            </CardBody>
        </Card>
    );
}
export default Cell;