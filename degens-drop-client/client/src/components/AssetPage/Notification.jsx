/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
    Alert,
    UncontrolledAlert,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

function Notifications({ AlertText }) {
    const notificationAlertRef = React.useRef(null);
    const notify = (place, type = "success") => {
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    {AlertText}
                </div>
            ),
            type: type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7,
        };
        notificationAlertRef.current.notificationAlert(options);
    };
    return (
        <>
            <div className="content">
                <div className="react-notification-alert-container">
                    <NotificationAlert ref={notificationAlertRef} />
                </div>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <Col md="4">
                                    <Button
                                        block
                                        color="primary"
                                        onClick={() => notify("br")}
                                    >
                                        Bottom Right
                                    </Button>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Notifications;
