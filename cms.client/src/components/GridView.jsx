import { useLoaderData } from "react-router-dom";
import "./../App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
//import axios from 'axios';
import React, { useId } from 'react'

import { renderToString } from 'react-dom/server';

export function GridViewComponent({ dataSource, model, config }) {
    var [data, setData] = useState();
    const id = useId();

    //const data = dataSource;
    const controllers = model.controllers;
    const fields = model.fields;
    const data_row_onload = function (element, index, array) {

        var fieldCount = fields.length;
        const children = fields.map((element2, index2, array2) => (
            <td key={fields[index2].field}>
                {element[element2.field]}
            </td>
        ));
        
        const button_canceledit_onclick = function (e) {
            console.log("canceling");
            var recordID = $(e.currentTarget).attr("id");
            var elemID = recordID.split('-:')[0].substr(7, recordID.split('-:')[0].length)
            var gridID = recordID.substr(recordID.indexOf('-:'), recordID.lastIndexOf(':'));

            var editButton = $('#' + $.escapeSelector('edit-' + elemID + gridID));
            var deleteButton = $('#' + $.escapeSelector('delete-' + elemID + gridID));
            var cancelButton = $('#' + $.escapeSelector('cancel-' + elemID + gridID));
            var saveButton = $('#' + $.escapeSelector('save-' + elemID + gridID));



            // Put record row in view mode. 
            // Manually swapping in html content of row with inputs mapped to predefined field names from model in placeholder.
            var parentTableRow = $('#' + $.escapeSelector('edit-' + elemID + gridID)).parent().parent();

            const tableRowChildren = fields.map((element2, index2, array2) => (
                <td key={fields[index2].field}>
                    {element[element2.field]}
                </td>
            ));

            const tableRow = (
                <tr>
                    {tableRowChildren}
                    <td>
                        <button id={'edit-' + element['id'] + '-' + id} onClick={function (e) {
                            button_edit_onclick(e);
                        }}>Edit</button>
                        <button className="gridview save-default-no-display" id={'save-' + element['id'] + '-' + id} onClick={function (e) {
                            button_save_onclick(e);
                        }}>Save</button>
                        <button className="gridview cancel-default-no-display" id={'cancel-' + element['id'] + '-' + id} onClick={function (e) {
                            button_canceledit_onclick(e);
                        }}>Cancel</button>
                        <button id={'delete-' + element['id'] + '-' + id} onClick={function (e) {
                            button_delete_onclick(e);
                        }}>Delete</button>
                    </td>
                </tr>
            );



            const html = renderToString(tableRow.props.children);
            parentTableRow.html(html);

            var editButton = $('#' + $.escapeSelector('edit-' + elemID + gridID));
            var deleteButton = $('#' + $.escapeSelector('delete-' + elemID + gridID));
            var cancelButton = $('#' + $.escapeSelector('cancel-' + elemID + gridID));
            var saveButton = $('#' + $.escapeSelector('save-' + elemID + gridID));

            deleteButton.show();
            editButton.show();
            cancelButton.hide();
            saveButton.hide();

            cancelButton.click(function (e) {
                button_canceledit_onclick(e);
            });
            saveButton.click(function (e) {
                button_save_onclick(e);
            });
            deleteButton.click(function (e) {
                button_delete_onclick(e);
            });
            editButton.click(function (e) {
                button_edit_onclick(e);
            });
        };
        const button_edit_onclick = function (e) {
            console.log("editing");
            var recordID = $(e.currentTarget).attr("id");
            var elemID = recordID.split('-:')[0].substr(5, recordID.split('-:')[0].length)
            var gridID = recordID.substr(recordID.indexOf('-:'), recordID.lastIndexOf(':'));

            var typeFunct = function (_type) {
                return (_type == 'number' || _type == 'string')
                    ? 'text' :
                    (_type == 'boolean')
                        ? 'checkbox' :
                        (_type == 'date') ? 'date'
                            : (_type == 'datetime') ? 'datetime-local'
                                : 'text';
            };

            var valueFunct = function (_type, value) {
                return (_type == 'boolean') ? value : value;
            };

            var checkboxValue = function (_type, fieldValue) {
                return (_type == 'boolean') ? ((fieldValue) ? 'checked' : '') : '';
            };
            // Put record row in edit mode. 
            // Manually swapping in html content of row with inputs mapped to predefined field names from model in placeholder.
            var parentTableRow = $('#' + $.escapeSelector('edit-' + elemID + gridID)).parent().parent();

            const tableRowChildren = fields.map((element3, index3, array3) => (
                <td key={fields[index3].field}>
                    {element[element3.field]}
                    <input type={typeFunct(element3.type, element[element3.field])}
                        name={'inp_' + element3.field}
                        value={valueFunct(element3.type, element[element3.field])}
                        defaultChecked={checkboxValue(element3.type, element[element3.field])} ></input>
                </td>
            ));

            const tableRow = (
                <tr>
                    { tableRowChildren }
                    <td>
                        <button id={'edit-' + element['id'] + '-' + id} onClick={function (e) {
                            button_edit_onclick(e);
                        }}>Edit</button>
                        <button className="gridview save-default-no-display" id={'save-' + element['id'] + '-' + id} onClick={function (e) {
                            button_save_onclick(e);
                        }}>Save</button>
                        <button className="gridview cancel-default-no-display" id={'cancel-' + element['id'] + '-' + id} onClick={function (e) {
                            button_canceledit_onclick(e);
                        }}>Cancel</button>
                        <button id={'delete-' + element['id'] + '-' + id} onClick={function (e) {
                            button_delete_onclick(e);
                        }}>Delete</button>
                    </td>
                </tr>
            );



            const html = renderToString(tableRow.props.children);
            parentTableRow.html(html);

            var editButton = $('#' + $.escapeSelector('edit-' + elemID + gridID));
            var deleteButton = $('#' + $.escapeSelector('delete-' + elemID + gridID));
            var cancelButton = $('#' + $.escapeSelector('cancel-' + elemID + gridID));
            var saveButton = $('#' + $.escapeSelector('save-' + elemID + gridID));

            editButton.hide();
            deleteButton.hide();
            cancelButton.show();
            saveButton.show();

            cancelButton.click(function (e) {
                button_canceledit_onclick(e);
            });
            saveButton.click(function (e) {
                button_save_onclick(e);
            });
            deleteButton.click(function (e) {
                button_delete_onclick(e);
            });
            editButton.click(function (e) {
                button_edit_onclick(e);
            });
        };

        const button_save_onclick = function (e) {
            console.log("saving...");
            var recordID = $(e.currentTarget).attr("id");
            var elemID = recordID.split('-:')[0].substr(5, recordID.split('-:')[0].length)
            var gridID = recordID.substr(recordID.indexOf('-:'), recordID.lastIndexOf(':'));

            // Put record row in view mode. 
            // Manually swapping in html content of row with inputs mapped to predefined field names from model in placeholder.
            var parentTableRow = $('#' + $.escapeSelector('edit-' + elemID + gridID)).parent().parent();

            const tableRowChildren = fields.map((element2, index2, array2) => (
                <td key={fields[index2].field}>
                    {element[element2.field]}
                </td>
            ));

            const tableRow = (
                <tr>
                    {tableRowChildren}
                    <td>
                        <button id={'edit-' + element['id'] + '-' + id} onClick={function (e) {
                            button_edit_onclick(e);
                        }}>Edit</button>
                        <button className="gridview save-default-no-display" id={'save-' + element['id'] + '-' + id} onClick={function (e) {
                            button_save_onclick(e);
                        }}>Save</button>
                        <button className="gridview cancel-default-no-display" id={'cancel-' + element['id'] + '-' + id} onClick={function (e) {
                            button_canceledit_onclick(e);
                        }}>Cancel</button>
                        <button id={'delete-' + element['id'] + '-' + id} onClick={function (e) {
                            button_delete_onclick(e);
                        }}>Delete</button>
                    </td>
                </tr>
            );

            const html = renderToString(tableRow.props.children);
            parentTableRow.html(html);

            var editButton = $('#' + $.escapeSelector('edit-' + elemID + gridID));
            var deleteButton = $('#' + $.escapeSelector('delete-' + elemID + gridID));
            var cancelButton = $('#' + $.escapeSelector('cancel-' + elemID + gridID));
            var saveButton = $('#' + $.escapeSelector('save-' + elemID + gridID));

            editButton.show();
            deleteButton.show();
            cancelButton.hide();
            saveButton.hide();

            cancelButton.click(function (e) {
                button_canceledit_onclick(e);
            });
            saveButton.click(function (e) {
                button_save_onclick(e);
            });
            deleteButton.click(function (e) {
                button_delete_onclick(e);
            });
            editButton.click(function (e) {
                button_edit_onclick(e);
            });
        };
        const button_delete_onclick = function (e) {
            console.log("deleting...");
            var recordID = $(e.currentTarget).attr("id");
            var elemID = recordID.split('-:')[0].substr(7, recordID.split('-:')[0].length); // delete-
            var gridID = recordID.substr(recordID.indexOf('-:'), recordID.lastIndexOf(':'));

            var _object =
            {
                'id': elemID,
            };

            fields.map((element3, index3, array3) => {
                _object[element3.field] = element3.defaultValue()
            });

            _object['id'] = elemID;

            //var userData = { };
            var action = controllers.delete.actionType;
            fetch(controllers.delete.url, {
                method: action,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(_object)
            })
            .then(response => response.json())
            .then(data => {
                //setData(data);
                //dataSource = data;
                controller_ajax();
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
        };

        return (<tr key={element['id']}>
            {children}
            <td>
                <button id={'edit-' + element['id'] + '-' + id} onClick={function (e) {
                    button_edit_onclick(e);
                }}>Edit</button>
                <button className="gridview save-default-no-display" id={'save-' + element['id'] + '-' + id} onClick={function (e) {
                    button_save_onclick(e);
                }}>Save</button>
                <button className="gridview cancel-default-no-display" id={'cancel-' + element['id'] + '-' + id} onClick={function (e) {
                    button_canceledit_onclick(e);
                }}>Cancel</button>
                <button id={'delete-' + element['id'] + '-' + id} onClick={function (e) {
                    button_delete_onclick(e);
                }}>Delete</button>
            </td>
        </tr>);
    };

    //async function populateEmployees() {
    //    const response = await fetch('employee');
    //    const data = await response.json();
    //    setEmployees(data);
    //}

    const controller_ajax = function () {
        //var userData = { };

        fetch(controllers.read.url, {
            method: controllers.read.actionType,
            headers: {
                'Content-Type': 'application/json',
            },
            //body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data here
            setData(data);
            dataSource = data;
        })
        .catch(error => {
            // Handle any errors
        });
    };

    useEffect(() => {
        controller_ajax();
    }, []);

    $(document).ready(function () {
        // HTTP GET request for controller read.
        //controller_ajax();
    });

    const dataItemsView = dataSource === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        {
                        fields.map((name, index) => <th key={fields[index].field}>{fields[index].fieldName}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        data === undefined ? "" : data.map((element, index, array) => data_row_onload(element, index, array))
                    }
                </tbody>
            </table>
        </div>;

    return (
        <section className="gridview">
            {dataItemsView}
        </section>
    );
}