import React, { useState } from "react";
import { apiConfig } from "../../api/config";
import { FinalField } from "../../components/basic/final-form";

export const Captcha = ({ counter }) => {
    const captcha = React.createRef();
    const [uid, setUID] = useState(Date.now());

    function refreshCaptcha() {
        setUID(Date.now());
        captcha.current.focus();
    }

    return (
        <>
            <div className="middle gap-3">
                <FinalField
                    name="captcha"
                    renderInput={({ input, meta }) => (
                        <>
                            <input
                                ref={captcha}
                                className="form-control ltr"
                                type="text"
                                maxLength="5"
                                autoComplete="off"
                                spellCheck="false"
                                placeholder="Security Code"
                                {...input}
                            />
                        </>
                    )}
                />

                <div className="mb-3">
                    <img
                        className="cur-pointer border rounded"
                        alt="Captcha"
                        src={`${apiConfig.baseUrl}/captcha?${uid}_${counter}`}
                        onClick={refreshCaptcha}
                    />
                </div>
            </div>
        </>
    );
};
