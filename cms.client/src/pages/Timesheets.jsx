import { useLoaderData } from "react-router-dom";
import "./../App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
import { IsLoggedIn } from "./Dashboard.jsx";
import { GridViewComponent } from './../components/GridView.jsx';
import { FieldFormViewComponent } from './../components/FieldFormView.jsx';

export function FieldFormViewComponentTimesheets({ dataSource }) {
    var model = {
        fields: [
            {
                "fieldName": "ID",
                "field": "id",
                "type": "number",
                defaultValue: function () {
                    return 0;
                }
            },
            {
                "fieldName": "Timesheet Category",
                "field": "timesheetCategory",
                "type": "number",
                defaultValue: function () {
                    return 0;
                },
                dataSource: [{ optionValue: '1', optionText: 'Software Development' }]
            },
            {
                "fieldName": "Description",
                "field": "timesheetDescription",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Time Begin",
                "field": "timesheetTimeSpanBegin",
                "type": "datetime",
                defaultValue: function () {
                    return '2024-07-24T07:16:04.397Z';
                }
            },
            {
                "fieldName": "Time End",
                "field": "timesheetTimeSpanEnd",
                "type": "datetime",
                defaultValue: function () {
                    return '2024-07-24T07:16:04.397Z';
                }
            },
            {
                "fieldName": "Company ID",
                "field": "timesheetCompanyID",
                "type": "string",
                defaultValue: function () {
                    return 0;
                }
            },
            {
                "fieldName": "Company Name",
                "field": "companyName",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Availability",
                "field": "isDeleted",
                "type": "boolean",
                defaultValue: function () {
                    return false;
                }
            }
        ],
        controllers: {
            create: {
                url: './timesheet',
                actionType: 'POST'
            },
            read: {
                url: './timesheet',
                actionType: 'GET'
            },
            update: {
                url: './timesheet',
                actionType: 'PUT'
            },
            delete: {
                url: './timesheet',
                actionType: 'DELETE'
            }
        }
    };

    var config = {
        pages: 20,
        currentPage: 1
    };
    return (
        <FieldFormViewComponent dataSource={dataSource} model={model} config={config}>
        </FieldFormViewComponent>
    );
}

export function GridViewDataViewTimesheets({ dataSource }) {
    var model = {
        fields: [
            {
                "fieldName": "ID",
                "field": "id",
                "type": "number",
                defaultValue: function () {
                    return 0;
                }
            },
            {
                "fieldName": "Timesheet Category",
                "field": "timesheetCategory",
                "type": "number",
                defaultValue: function () {
                    return 0;
                }
            },
            {
                "fieldName": "Description",
                "field": "timesheetDescription",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Time Begin",
                "field": "timesheetTimeSpanBegin",
                "type": "datetime",
                defaultValue: function () {
                    return '2024-07-24T07:16:04.397Z';
                }
            },
            {
                "fieldName": "Time End",
                "field": "timesheetTimeSpanEnd",
                "type": "datetime",
                defaultValue: function () {
                    return '2024-07-24T07:16:04.397Z';
                }
            },
            {
                "fieldName": "Company ID",
                "field": "timesheetCompanyID",
                "type": "string",
                defaultValue: function () {
                    return 0;
                }
            },
            {
                "fieldName": "Company Name",
                "field": "companyName",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Availability",
                "field": "isDeleted",
                "type": "boolean",
                defaultValue: function () {
                    return false;
                }
            }
        ],
        controllers: {
            create: {
                url: './timesheet',
                actionType: 'POST'
            },
            read: {
                url: './timesheet',
                actionType: 'GET'
            },
            update: {
                url: './timesheet',
                actionType: 'PUT'
            },
            delete: {
                url: './timesheet',
                actionType: 'DELETE'
            }
        }
    };

    var config = {
        pages: 20,
        currentPage: 1
    };
    return (
        <GridViewComponent dataSource={dataSource} model={model} config={config}>
        </GridViewComponent>
    );
}

export async function loader() {
    await new Promise((r) => setTimeout(r, 500));
    return "I came from the About.tsx loader function!";
}

export function Component() {
    let data = useLoaderData();

    const [timesheets, setTimesheets] = useState();
    const [companies, setCompanies] = useState();
    const [timesheetCategories, setTimesheetCategories] = useState();

    async function populateTimesheetData() {
        const response = await fetch('timesheet');
        const data = await response.json();
        setTimesheets(data);
    }

    async function populateCompaniesData() {
        const response = await fetch('company');
        const data = await response.json();
        setCompanies(data);
    }

    async function populateTimesheetCategories() {
        const response = await fetch('category');
        const data = await response.json();
        setTimesheetCategories(data);
    }

    useEffect(() => {
        populateTimesheetCategories();
        populateCompaniesData();
        populateTimesheetData();
    }, []);

    return (
        <div>
            <div>
                <IsLoggedIn></IsLoggedIn>
            </div>
            <div>
                <h1 id="tabelLabel">Timesheet Recorder</h1>
                <p>This timesheet recorder saves entries to a secure database.</p>
                <FieldFormViewComponentTimesheets dataSource={timesheets}></FieldFormViewComponentTimesheets>
                <GridViewDataViewTimesheets dataSource={timesheets}></GridViewDataViewTimesheets>
            </div>
        </div>
    );
}

Component.displayName = "TimesheetPage";


export default Component;