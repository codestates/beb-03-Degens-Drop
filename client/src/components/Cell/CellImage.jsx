import React from 'react';
import { CardImg } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/fontawesome-free-solid'

const CellImage = ({ image_original_url, image_url, name }) => {
    if (image_original_url === null && image_url === null) {
        return <div style={{ textAlign: "center", verticalAlign: "center", width: '23rem', height: "23rem" }}>
            <FontAwesomeIcon icon={faImage} style={{ width: '20rem', height: "20rem" }} />
        </div>
    }
    else {
        return <CardImg top src={image_url || image_original_url} alt={name} style={{
            minWidth: '23rem',
            minHeight: "23rem"
        }} />
    }
}
export default CellImage;