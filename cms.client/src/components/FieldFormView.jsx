import { useLoaderData } from "react-router-dom";
import "./../App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
import React, { useId } from 'react'
import { GridViewComponent, GridRefresh } from './../components/GridView.jsx';

export function FieldFormViewComponent({ dataSource, model, config }) {
    var [dataSource, setDataSource] = useState();
    const id = useId();

    function selectORinput(field) {
        if (field.populateDataSource !== undefined)
        {
            return (<select key={field.field + '-' + id} id={field.field + '-' + id + '24216'} name={field.field}>
                {(field.populateDataSource !== undefined) ? field.populateDataSource(field) : null}
            </select>);
        }
        else {
            return (<input key={field.field + '-' + id} type={(field.field == 'id') ? 'hidden' : (field.type == 'date' ? 'date' : (field.type == 'datetime') ? 'datetime-local' : 'text')} id={field.field + '-' + id + '24213'} name={field.field} />);
        }

    }

    const dataItemsView = model === undefined
        ? <p><em>Loading... Please assign a model to the current field form view.</em></p>
        : <div>
            <form action={model.controllers.create.url} method={model.controllers.create.actionType}>
                {model.fields.map(field => (
                    <div>
                        <label htmlFor={field.field}>{ (field.field=='id')?'' : field.fieldName +':'}</label>
                        { selectORinput(field) }
                            
                    </div>
                ))}
                <br />
                <button type="button" id="submitPage" onClick={function (e) {
                    console.log("submitting...");
                    var childInputs = $(e.currentTarget).parent().find('input');
                    var childSelects = $(e.currentTarget).parent().find('select');
                    var objJSON = {};
                    childInputs.map(function(childInput, index, array){
                        var name = $(index).attr('name');
                        var selectedValue = $(index).val();
                        if (name == 'id') {
                            selectedValue = -1;
                        }
                        if (name == 'isDeleted') {
                            selectedValue = false;
                        }
                        objJSON[name] = selectedValue;
                    }); 
                    childSelects.map(function (childSelect, index, array) {
                        var name = $(index).attr('name');
                        var selectedValue = $(index).val();
                        if (name == 'id') {
                            selectedValue = -1;
                        }
                        if (name == 'isDeleted') {
                            selectedValue = false; // HACK: TODO: Remove and utilise field type system.
                        }
                        objJSON[name] = selectedValue;
                    }); 
                    $.ajax({
                        type: model.controllers.create.actionType,
                        url: model.controllers.create.url,
                        data: JSON.stringify(objJSON),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            //console.log(data);
                            //alert(data);
                            //GridViewComponent.onRefresh();
                            GridRefresh();
                        },
                        error: function (errMsg) {
                            alert(errMsg);
                        }
                    });

                }}>Submit</button>
            </form>
        </div>;

    return (
        <section className="fieldformview">
            {dataItemsView}
        </section>
    );
}