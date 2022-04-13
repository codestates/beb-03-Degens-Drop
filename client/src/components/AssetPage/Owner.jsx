import CellImage from 'components/Cell/CellImage';
import CopyButton from 'components/CopyButton';
import React from 'react';
import { Button, Card, CardBody, CardFooter, CardText } from 'reactstrap';
const Owner = ({ owner: { profile_img_url, address, name } }) => {
    return <Card>
        <Card className="card-user">
            <CardBody>
                <CardText />
                <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                            alt="..."
                            className="avatar"
                            src={profile_img_url}
                        />
                        <h3 className="title">{name === undefined ? "Unnamed" : name}</h3>
                    </a>
                    <CopyButton text={address}></CopyButton>
                </div>
            </CardBody>
            <CardFooter>
                <div className="button-container">
                    <Button className="btn-icon btn-round" color="google">
                        <i className="fab fa-google-plus" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    </Card>
}
export default Owner;