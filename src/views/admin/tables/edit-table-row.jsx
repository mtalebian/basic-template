import React from "react";
import * as bd from "react-basic-design";
import { Text } from "../../../components/basic/text";
import * as icons from "../../../assets/icons";
import { useShell } from "../../shared/use-shell";

export const EditTableRow = ({ table, onGoBack, row }) => {
    const insertMode = row === null;
    useShell().setApp("edit-table-row", onGoBack);

    return (
        <>
            <div className="">
                <div className="border-bottom py-2">
                    <bd.Toolbar className="container">
                        <h4>
                            {table.title}
                            <span className="px-2 size-sm">
                                <icons.ArrowForward />
                            </span>
                            <Text>{insertMode ? "INSERT" : "EDIT"}</Text>
                        </h4>
                        <div className="flex-grow-1"></div>
                        <bd.Button color="primary">
                            <Text>save</Text>
                        </bd.Button>
                        <bd.Button variant="text" color="primary" onClick={onGoBack}>
                            <Text>cancel</Text>
                        </bd.Button>
                    </bd.Toolbar>
                    <div className="container"></div>
                </div>
            </div>
        </>
    );
};
