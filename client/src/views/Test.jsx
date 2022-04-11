import React from "react";
import Erc721 from "./../components/Erc721/";
import UserProfile from "./Collected";

function Dashboard() {
    return (
        <>
            <div className="content">
                <Erc721></Erc721>
                <UserProfile></UserProfile>
            </div>
        </>
    );
}

export default Dashboard;
