import React, { useMemo, useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import * as yup from "yup";
import { notify } from "../../../components/basic/notify";
import { Form, Formik, FieldArray, Field } from "formik";
import { BasicInput } from "../../../components/basic-form/basic-input";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { Modal, Tab } from "react-bootstrap";
import { roleApi } from "../../../api/role-api";
import { useAccount } from "../../../app/account-context";
import { msgbox } from "react-basic-design";
import { DefaultEditor } from "../../../components/table/editors";
import { TableTitlebar } from "../../../components/table";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
  //useBlockLayout,
  useFlexLayout,
  //useRowState,
  useResizeColumns,
} from "react-table";
import { object } from "yup/lib/locale";

/*
 *
 *
 */
export const RenderAuthorizations = ({ role, onDeleteAzObject }) => {
  if (!role) return <></>;
  const inputStyle = { maxWidth: 250 };

  return (
    <FieldArray name="authorization">
      <div className="container pt-4">
        {role.authorizations.map((azObject, index) => {
          return (
            <div className="pt-4" key={azObject.id}>
              <div className="col-7">
                <bd.Toolbar className="container">
                  <h4 className="p-e-2">
                    {azObject.title} (#{azObject.id})
                  </h4>
                  <bd.Button color="secondary" variant="icon" onClick={() => onDeleteAzObject(azObject.id)} type="button">
                    <icons.Delete className="size-md" />
                  </bd.Button>
                </bd.Toolbar>
              </div>

              <dl className="pt-4">
                {azObject.fields.map((azFiled, indexField) => {
                  return (
                    <dd key={azFiled.id}>
                      <BasicInput
                        name={`authorizations[${index}].fields[${indexField}].value`}
                        label={azFiled.title}
                        placeholder="Value"
                        labelSize="2"
                        autoComplete="off"
                        style={inputStyle}
                      />
                    </dd>
                  );
                })}
              </dl>
            </div>
          );
        })}
      </div>
    </FieldArray>
  );
};
