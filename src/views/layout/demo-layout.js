import React, { useState } from "react";
import BasicLayout from "../../components/layout/basic-layout";
import Header from "./../shared/header";
import Footer from "./../shared/footer";
import Sidebar from "./../shared/sidebar";
import DemoLayoutContent from "./demo-layout-content";

import "./index.scss";


export default function DemoLayout() {
    const [layout, setLayout] = useState("s.hmf");
    const [rtl, setRtl] = useState(false);
    const [scrollableContent, setScrollableContent] = useState(false);

    return (
        <BasicLayout
            layout={layout}
            header={Header}
            content={DemoLayoutContent}
            sidebar={Sidebar}
            footer={Footer}
            breakPoint="lg"
            rtl={rtl}
            scrollableContent={scrollableContent} 
            onSetRtl={setRtl}
            onSetLayout={setLayout}
            onSetScrollableContent={setScrollableContent}
        />
    );
}
