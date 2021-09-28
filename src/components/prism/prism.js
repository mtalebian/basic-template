import React from "react";
import { Pre, Line, LineNo, LineContent } from "./styles";
import Highlight, { defaultProps } from "prism-react-renderer";
import * as nightOwl from "prism-react-renderer/themes/nightOwl";
import classNames from "classnames";

export const PrismCode = ({ code, lang, theme, codeClassName }) => {
    if (!theme) theme = nightOwl.default;
    if (!lang) lang = "jsx";
    return (
        <Highlight {...defaultProps} theme={theme} code={code} language={lang}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre style={style} className={classNames("overflow-auto", className, codeClassName)}>
                    {tokens.map((line, i) => (
                        <Line key={i} {...getLineProps({ line, key: i })}>
                            <LineNo>{i + 1}</LineNo>
                            <LineContent>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </LineContent>
                        </Line>
                    ))}
                </Pre>
            )}
        </Highlight>
    )
}

