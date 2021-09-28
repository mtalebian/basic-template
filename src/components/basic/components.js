import React, { Component } from "react";
import classNames from 'classnames'
import { Redirect, Route } from "react-router-dom";




export class ProtectedRoute extends Component {
    render() {
        const { component: Component, ...props } = this.props
        return (
            <Route {...props}
                render={props => (
                    this.state.authenticated ?
                        <Component {...props} /> :
                        <Redirect to='/login' />
                )}
            />
        )
    }
}



export class ProgressBar extends Component {
    render() {
        var text = !!this.props.title ? <b>{this.props.title}</b> : null;
        var details = !!this.props.details ? <i>{this.props.details}</i> : null;
        return <div className="prime-progressbar">
            {text}
            <div>
                <div className={this.props.className} style={{ width: this.props.percent + "%" }}></div>
            </div>
            {details}
        </div>;
    }
}




export const Div = ({
    className, flex, column, row, grow, shrink, center,
    jcBetween, jcCenter,
    h100, w100,
    tag, ...props }) => {

    var cn = classNames(className, {
        "d-flex": flex,
        "flex-column": column,
        "row": row,
        "flex-row": flex && row,
        "flex-grow-1": grow,
        "flex-shrink-1": shrink,
        "align-items-center justify-content-center": center,
        "justify-content-between": jcBetween,
        "justify-content-center": jcCenter,
        "h-100": h100,
        "w-100": w100,
    });
    switch (tag) {
        case "header": return <header className={cn} {...props}>{{ ...props }.children}</header>;
        case "footer": return <footer className={cn} {...props}>{{ ...props }.children}</footer>;
        default: return <div className={cn} {...props}>{{ ...props }.children}</div>;
    }
}


export const FormGroup = ({ hasRow, ...props }) => {
    var children = { ...props }.children;
    if (hasRow) children = <div className="row">{children}</div>;

    return <div className="form-group" {...props}>
        {children}
    </div>;
}


