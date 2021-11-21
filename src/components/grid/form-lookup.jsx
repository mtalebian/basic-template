import React from "react";
import * as bd from "react-basic-design";
import { Modal } from "react-bootstrap";
import * as icons from "../../assets/icons";
import { T, Text } from "../basic/text";
import { Grid } from "../grid/grid";
import { useGrid } from "../grid/use-grid";

/********/
export const FormLookup = ({ title, show, setShow, checkTable, ...props }) => {
    const [grid, loadData] = useGrid({ id: checkTable });

    const hide = () => setShow(false);
    let height = window.innerHeight - 200;
    if (height < 0) height = 0;
    if (height > 500) height = 500;
    if (window.innerWidth < 768) height = undefined;

    const okClick = () => {
        alert(110);
    };

    return (
        <>
            <Modal show={show} onHide={hide} dialogClassName="modal-1024 px-md-4" centered fullscreen="md-down" backdrop="static">
                <bd.Toolbar className="p-s-4" size="sm">
                    <h5>{title}</h5>
                </bd.Toolbar>

                <Modal.Body className="p-0 border-top bg-shade-3 overflow-auto" style={{ height }}>
                    {grid.id && <Grid grid={grid} loadData={loadData} />}
                </Modal.Body>

                <Modal.Footer className="py-2 px-4 border-top text-secondary-text d-flex">
                    <div className="flex-grow-1"></div>
                    <bd.Button color="secondary" onClick={okClick} className="compact">
                        <Text>ok</Text>
                    </bd.Button>

                    <bd.Button variant="text" onClick={hide} className="compact">
                        <Text>cancel</Text>
                    </bd.Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
