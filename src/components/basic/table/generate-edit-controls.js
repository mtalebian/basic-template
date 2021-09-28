import React from "react";
//import * as bs from "react-basic-design";
import { FinalCheck, FinalField, FinalRadio, FinalSelect } from "../final-form";

export function GenerateEditControls({ columns, data, insertMode, size }) {
    if (!data) return <></>;
    const lb_size = 3;
    var controls = null;
    for (var i = 0; i < columns.length; i++) {
        var c = columns[i];
        var autoFocus = i === 0 ? { autoFocus: true } : {};
        var is_readonly = c._editor === "label" || (!insertMode && c._isKey);
        var cn = {
            ltr: c._dir === "ltr",
            rtl: c._dir === "rtl",
        };
        /*
        if (c._editor === 'label' || (!insertMode && c._isKey)) {
            controls = <>{controls}
                <div className="mb-3 row">
                    <label className={`col-md-${lb_size} col-form-label`}>{c.Header}</label>
                    <div className={`col-md-${12 - lb_size}`}>
                        <input type="text" readOnly className="form-control-plaintext" value={data[c.accessor]} />
                    </div>
                </div>
            </>
        }
        else*/
        if (c._editor === "select") {
            if (is_readonly)
                controls = (
                    <>
                        {controls}
                        <FinalField
                            name={c.accessor}
                            label={c.Header}
                            labelSize={lb_size}
                            {...autoFocus}
                            size={size}
                            readonly={is_readonly}
                            controlClassName={cn}
                        />
                    </>
                );
            else
                controls = (
                    <>
                        {controls}
                        <FinalSelect
                            name={c.accessor}
                            label={c.Header}
                            labelSize={lb_size}
                            values={c._validValues}
                            placeholder="..."
                            size={size}
                            readonly={is_readonly}
                            controlClassName={cn}
                        />
                    </>
                );
        } else if (c._editor === "checkbox") {
            controls = (
                <>
                    {controls}
                    <FinalCheck
                        name={c.accessor}
                        label={c.Header}
                        labelSize={lb_size}
                        {...autoFocus}
                        size={size}
                        readonly={is_readonly}
                        controlClassName={cn}
                    />
                </>
            );
        } else if (c._editor === "radio") {
            controls = (
                <>
                    {controls}
                    <FinalRadio
                        name={c.accessor}
                        label={c.Header}
                        labelSize={lb_size}
                        values={c._validValues}
                        {...autoFocus}
                        size={size}
                        readonly={is_readonly}
                        controlClassName={cn}
                    />
                </>
            );
        } else if (c._editor === "number") {
            controls = (
                <>
                    {controls}
                    <FinalField
                        name={c.accessor}
                        label={c.Header}
                        labelSize={lb_size}
                        {...autoFocus}
                        type="number"
                        size={size}
                        readonly={is_readonly}
                        controlClassName={cn}
                    />
                </>
            );
        } else if (c._editor === "url") {
            controls = (
                <>
                    {controls}
                    <FinalField
                        name={c.accessor}
                        label={c.Header}
                        labelSize={lb_size}
                        {...autoFocus}
                        type="url"
                        size={size}
                        readonly={is_readonly}
                        controlClassName={cn}
                    />
                </>
            );
        } else if (c._editor === "email") {
            controls = (
                <>
                    {controls}
                    <FinalField
                        name={c.accessor}
                        label={c.Header}
                        labelSize={lb_size}
                        {...autoFocus}
                        type="email"
                        size={size}
                        readonly={is_readonly}
                        controlClassName={cn}
                    />
                </>
            );
        } else {
            controls = (
                <>
                    {controls}
                    <FinalField
                        name={c.accessor}
                        label={c.Header}
                        labelSize={lb_size}
                        {...autoFocus}
                        size={size}
                        readonly={is_readonly}
                        controlClassName={cn}
                    />
                </>
            );
        }
    }

    return controls;
}
