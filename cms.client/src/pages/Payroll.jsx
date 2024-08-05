import { useLoaderData } from "react-router-dom";
import "./../App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
import { IsLoggedIn } from "./Dashboard.jsx";
import { GridViewComponent } from './../components/GridView.jsx';
import { FieldFormViewComponent } from './../components/FieldFormView.jsx';

export function FieldFormViewComponentPayrollEmployee({ dataSource }) {
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
                "fieldName": "First Name",
                "field": "firstName",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Middle Name",
                "field": "middleName",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Last Name",
                "field": "lastName",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Street Address",
                "field": "streetAddress",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "ABN",
                "field": "abn",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "TFN",
                "field": "tfn",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Email Address",
                "field": "email",
                "type": "email",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "State",
                "field": "state",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Gender",
                "field": "gender",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Suburb",
                "field": "suburb",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "City",
                "field": "city",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Country",
                "field": "country",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Postcode",
                "field": "postcode",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Email Address",
                "field": "email",
                "type": "email",
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
                url: './employee',
                actionType: 'POST'
            },
            read: {
                url: './employee',
                actionType: 'GET'
            },
            update: {
                url: './employee',
                actionType: 'PUT'
            },
            delete: {
                url: './employee',
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

export function GridViewDataViewEmployees({ dataSource }) {
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
                "fieldName": "First Name",
                "field": "firstName",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Middle Name",
                "field": "middleName",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Last Name",
                "field": "lastName",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Street Address",
                "field": "streetAddress",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "ABN",
                "field": "abn",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "TFN",
                "field": "tfn",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Email Address",
                "field": "email",
                "type": "email",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "State",
                "field": "state",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Gender",
                "field": "gender",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Suburb",
                "field": "suburb",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "City",
                "field": "city",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Country",
                "field": "country",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Postcode",
                "field": "postcode",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Email Address",
                "field": "email",
                "type": "email",
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
                url: './employee',
                actionType: 'POST'
            },
            read: {
                url: './employee',
                actionType: 'GET'
            },
            update: {
                url: './employee',
                actionType: 'PUT'
            },
            delete: {
                url: './employee',
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
export function FieldFormViewComponentPayroll({ dataSource }) {
    var [data, setData] = useState();
    var [dataModel, setDataModel] = useState();

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
                "fieldName": "Employee ID",
                "field": "employeeID",
                "type": "number",
                defaultValue: function () {
                    return 0;
                }
            },
            {
                "fieldName": "Reference",
                "field": "reference",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Usual Working Hours Per Day",
                "field": "usualWorkingHoursPerDay",
                "type": "number",
                defaultValue: function () {
                    return 7.5;
                }
            },
            {
                "fieldName": "Basic Salary Per Hour",
                "field": "basicSalaryPerHour",
                "type": "number",
                defaultValue: function () {
                    return 0.0;
                }
            },
            {
                "fieldName": "Over Time Per Hour",
                "field": "overTimePerHour",
                "type": "number",
                defaultValue: function () {
                    return 0.0;
                }
            },
            {
                "fieldName": "Tax Peroid",
                "field": "taxPeroid",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Insurance Number",
                "field": "insuranceNumber",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "PayG Witholding Number",
                "field": "payGWitholdingNumber",
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
                url: './payrollEntry',
                actionType: 'POST'
            },
            read: {
                url: './payrollEntry',
                actionType: 'GET'
            },
            update: {
                url: './payrollEntry',
                actionType: 'PUT'
            },
            delete: {
                url: './payrollEntry',
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
export function GridViewDataViewPayroll({ dataSource }) {
    var [data, setData] = useState();
    var [dataModel, setDataModel] = useState();

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
                "fieldName": "Employee ID",
                "field": "employeeID",
                "type": "number",
                defaultValue: function () {
                    return 0;
                }
            },
            {
                "fieldName": "Reference",
                "field": "reference",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Usual Working Hours Per Day",
                "field": "usualWorkingHoursPerDay",
                "type": "number",
                defaultValue: function () {
                    return 7.5;
                }
            },
            {
                "fieldName": "Basic Salary Per Hour",
                "field": "basicSalaryPerHour",
                "type": "number",
                defaultValue: function () {
                    return 0.0;
                }
            },
            {
                "fieldName": "Over Time Per Hour",
                "field": "overTimePerHour",
                "type": "number",
                defaultValue: function () {
                    return 0.0;
                }
            },
            {
                "fieldName": "Tax Peroid",
                "field": "taxPeroid",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "Insurance Number",
                "field": "insuranceNumber",
                "type": "string",
                defaultValue: function () {
                    return '';
                }
            },
            {
                "fieldName": "PayG Witholding Number",
                "field": "payGWitholdingNumber",
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
                url: './payrollEntry',
                actionType: 'POST'
            },
            read: {
                url: './payrollEntry',
                actionType: 'GET'
            },
            update: {
                url: './payrollEntry',
                actionType: 'PUT'
            },
            delete: {
                url: './payrollEntry',
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

    const [employees, setEmployees] = useState();
    const [payrollEntries, setPayrollEntries] = useState();

    async function populateEmployees() {
        const response = await fetch('employee');
        const data = await response.json();
        setEmployees(data);
    }

    async function populatePayrollEntries() {
        const response = await fetch('payrollEntry');
        const data = await response.json();
        setPayrollEntries(data);
    }

    useEffect(() => {
        populateEmployees();
        populatePayrollEntries();
    }, []);

    return (
        <div>
            <div>
                <IsLoggedIn></IsLoggedIn>
            </div>
            <div>
                <h1 id="tabelLabel">Employees</h1>
                <p>This employees section manages employees for payroll.</p>
                <FieldFormViewComponentPayrollEmployee dataSource={employees}></FieldFormViewComponentPayrollEmployee>
                <GridViewDataViewEmployees dataSource={employees}></GridViewDataViewEmployees>
            </div>
            <div>
                <h1 id="tabelLabel2">Payroll Entries</h1>
                <p>This section manages entries for payroll.</p>
                <FieldFormViewComponentPayroll dataSource={payrollEntries}></FieldFormViewComponentPayroll>
                <GridViewDataViewPayroll dataSource={payrollEntries}></GridViewDataViewPayroll>
            </div>
        </div>
    );
}

Component.displayName = "PayrollPage";


export default Component;