import { useRef } from "react";
import { useField } from "formik";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { T } from "../../../components/basic/text";
import { useReactTable } from "../../../components/table/use-react-table";
import { TableTitlebar } from "../../../components/table";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";

export const RenderRoles = ({ data }) => {
    const [field, _, helper] = useField({ name: "roles" });
    const gridColumns = useRef([
        { Header: <T>id</T>, accessor: "id" },
        { Header: <T>title</T>, accessor: "title" },
    ]);
    const deleteRoleFromList = (item) => {
        var list = [...field.value];
        var filtered = list.filter((x) => x.id !== item.id);
        helper.setValue(filtered);
    };
    const tableApi = useReactTable({ columns: gridColumns.current, data: data.roles, flexLayout: false });
    return (
        <div className="mt-4">
            {data.roles.length !== 0 && (
                <>
                    <TableTitlebar
                        hideSettings
                        tableApi={tableApi}
                        title="roles"
                        fixed
                        buttons={
                            <>
                                <bd.Button
                                    type="button"
                                    variant="icon"
                                    size="md"
                                    color="secondary"
                                    disabled={!tableApi.selectedFlatRows.length}
                                    onClick={() => {
                                        tableApi.selectedFlatRows.length && deleteRoleFromList(tableApi.selectedFlatRows[0].original);
                                    }}
                                    className="mx-1"
                                >
                                    <icons.Delete />
                                    <T>delete</T>
                                </bd.Button>
                            </>
                        }
                    />
                    <RenderTableDiv
                        tableApi={tableApi}
                        singleSelect
                        hideCheckbox
                        enableSorting
                        clickAction="select"
                        className="nano-scroll border"
                        hasWhitespace
                    />
                </>
            )}
        </div>
    );
};
