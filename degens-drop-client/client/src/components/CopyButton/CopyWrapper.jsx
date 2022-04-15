import React from 'react';
import { Button } from 'reactstrap';
import NotificationAlert from "react-notification-alert";


const CopyButton = ({ text, children }) => {
    const notificationAlertRef = React.useRef(null);
    const onClickCopyHandler = async () => {
        try {
            await navigator.clipboard.writeText(text);
            notify("br", 'Copied!')
        } catch (err) {
            notify("br", 'Failed to copy!')
        }
    };

    const notify = (place, text, type = "success") => {
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    {text}
                </div>
            ),
            type: type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    return (
        <div>
            <div className="react-notification-alert-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            {<Button onClick={onClickCopyHandler}>
                {children}
            </Button>}
        </div>
    )
}
export default CopyButton;