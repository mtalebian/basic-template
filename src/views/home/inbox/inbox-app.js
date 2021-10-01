import React, { useEffect, useState } from "react";
import * as bs from "react-basic-design";

import accountManager from "../../../app/account-manager";

export function InboxApp() {
    const [, setUser] = useState({});

    useEffect(() => accountManager.bind(setUser).remove, []);

    return (
        <div className="container p-3">
            <bs.Card>
                <bs.CardBody>INBOX</bs.CardBody>
            </bs.Card>
        </div>
    );
}
