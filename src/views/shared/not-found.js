import React from "react";
import { messages } from "../../components/messages";

export default function NotFound() {
    return <div className="container-fluid h-100 d-flex justify-content-center align-items-center text-center" >
        <div className="p-4 text-warning " style={{ maxWidth: 500, borderRadius: 10 }}>
            <h2 className="text-dark" style={{ fontWeight: 'bold', maxWidth: 500, borderRadius: 10, textShadow: '1px 1px 3px #000', fontSize: 80 }}>{messages.PageNotFoundTitle}</h2>
            <p className="text-dark" style={{ fontSize: 22 }}>{messages.PageNotFoundDescription}</p>
        </div>
    </div>;
}
