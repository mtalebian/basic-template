import React, { useEffect, useState } from "react";
import * as bs from "react-basic-design";

import procurement from "../../../assets/bg/procurement.png";
import { messages } from "../../../components/messages";
import accountManager from "../../../app/account-manager";

export function DashboardApp() {
    const [, setUser] = useState({});

    useEffect(() => accountManager.bind(setUser).remove, []);

    return (
        <div className="container p-3">
            <div className="row">
                <div className="col-lg-12">
                    <bs.Card>
                        <bs.CardBody>
                            <div className="d-flex p-3">
                                <img src={procurement} style={{ maxWidth: 200 }} alt="" />
                                <div className="flex-grow-1 p-3">
                                    <h2>{messages.Welcome}</h2>
                                    <p>{messages.WelcomeText}</p>
                                </div>
                            </div>
                        </bs.CardBody>
                    </bs.Card>
                    <div className="row my-3">
                        <div className="col-4">
                            <bs.Card>
                                <bs.CardBody>INBOX</bs.CardBody>
                            </bs.Card>
                        </div>
                        <div className="col-4">
                            <bs.Card>
                                <bs.CardBody>ORDEERS</bs.CardBody>
                            </bs.Card>
                        </div>
                        <div className="col-4">
                            <bs.Card>
                                <bs.CardBody>ORDEERS</bs.CardBody>
                            </bs.Card>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4"></div>
            </div>
        </div>
    );
}
