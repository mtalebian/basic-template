import React, { useRef } from "react";
import { AppbarShell } from "./appbar-shell";

export function MainLayout({ component: Comp, ...props }) {
    const setAppRef = useRef(null);

    const shellApi = { setApp: (title, goBack, buttons) => setAppRef.current && setAppRef.current(title, goBack, buttons) };

    return (
        <div className="d-flex flex-column h-100">
            <AppbarShell setAppRef={setAppRef} />

            <main className="content flex-grow-1">
                <Comp {...props} shell={shellApi} />
            </main>
        </div>
    );
}
