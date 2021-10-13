import React, { useContext } from "react";
import { SessionContext, } from "src/pages/contexts";
import { HomeContext } from "src/pages/home/contexts";

function Tier() {
    const { user } = useContext(SessionContext);
    const { totalScore, tiers } = user;

    const { translate } = useContext(HomeContext);


    return (
        
    );
}