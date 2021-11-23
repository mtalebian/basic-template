import React, { useState } from "react";
import { apiConfig } from "../../api/config";
import { BasicInput } from "../../components/basic-form/basic-input";

export const Captcha = ({ counter }) => {
    const captcha = React.createRef();
    const [uid, setUID] = useState(Date.now());

    function refreshCaptcha() {
        setUID(Date.now());
        captcha.current.focus();
    }

    return (
        <div className="middle gap-3 mb-2">
            <BasicInput
                className="form-control ltr"
                maxLength="5"
                name="captcha"
                placeholder="Security Code"
                type="text"
                autoComplete="off"
                autoFocus
            />
            <img
                className="cur-pointer border rounded"
                alt="Captcha"
                src={`${apiConfig.baseUrl}/captcha?${uid}_${counter}`}
                onClick={refreshCaptcha}
            />
        </div>
    );
};
