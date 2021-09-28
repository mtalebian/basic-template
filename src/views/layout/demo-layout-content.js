import React from "react";
import BasicLayout from "../../components/layout/basic-layout";


export default function DemoLayoutContent({
    onCollapse,
    onToggle,
    rtl,
    onSetRtl,
    scrollableContent,
    onSetScrollableContent,
    layout,
    onSetLayout
}) {

    function changeLayoutTo(newLayout) {
        return function (e) {
            e.preventDefault();
            e.stopPropagation();
            onSetLayout(newLayout);
            return false;
        }
    }

    return (
        <div className="container-fluid p-4">
            <div className="card">
                <h4 className="p-3">Change layout:</h4>
                <div>
                    <label className="p-3">
                        <input type="checkbox" checked={rtl} onChange={() => onSetRtl(!rtl)} />
                        {" RTL"}
                    </label>

                    <label className="p-3">
                        <input type="checkbox" checked={scrollableContent} onChange={() => onSetScrollableContent(!scrollableContent)} />
                        {" Scrollable Content"}
                    </label>
                    <button className="btn btn-sm btn-dark mx-3" onClick={() => onCollapse()}>Collapse</button>
                    <button className="btn btn-sm btn-secondary mx-3" onClick={() => onToggle()}>Toggle</button>
                </div>

                <div className="layout-selector">
                    <button href="#" onClick={changeLayoutTo("hmf")} >
                        <BasicLayout layout="hmf" header="HEADER" content="layout = hmf" footer="FOOTER" aside="SIDEBAR" />
                    </button>

                    <button href="#" onClick={changeLayoutTo("h.sm.f")} >
                        <BasicLayout layout="h.sm.f" header="FIEXD-HEADER" content="layout = h.sm.f" footer="FOOTER" aside="SIDEBAR" />
                    </button>

                    <button href="#" onClick={changeLayoutTo("s.hm.f")} >
                        <BasicLayout layout="s.hm.f" header="HEADER" content="layout = s.hm.f" footer="FOOTER" aside="SIDEBAR" />
                    </button>

                    <button href="#" onClick={changeLayoutTo("h.s.mf")} >
                        <BasicLayout layout="h.s.mf" header="FIEXD-HEADER" content="layout = h.s.mf" footer="FOOTER" aside="SIDEBAR" />
                    </button>

                    <button href="#" onClick={changeLayoutTo("s.hmf")} >
                        <BasicLayout layout="s.hmf" header="HEADER" content="layout = s.hmf" footer="FOOTER" aside="SIDEBAR" />
                    </button>
                </div>

                <hr />

                <h4 className="p-3">How to use:</h4>
                <code>
                    <pre className="ps-5 py-3">
                        {"<BasicLayout\r\n"}
                        {"             layout={'hmf' | 'h.sm.f' | 's.hm.f' | 'h.s.mf' | 's.hmf'}\r\n"}
                        {"             header={ComponentName}\r\n"}
                        {"             content={ComponentName}\r\n"}
                        {"             sidebar={ComponentName}\r\n"}
                        {"             footer={ComponentName}\r\n"}
                        {"             breakPoint={xs | sm | md | lg | xl | xxl}\r\n"}
                        {"             rtl={true | false}\r\n"}
                        {"             scrollableContent={true | false}\r\n"}
                        {" />"}

                    </pre>
                </code>
            </div>
        </div>
    );
}
