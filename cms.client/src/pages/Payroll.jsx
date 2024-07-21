import { useLoaderData } from "react-router-dom";
import "./../App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
import { IsLoggedIn } from "./Dashboard.jsx";

export async function loader() {
    await new Promise((r) => setTimeout(r, 500));
    return "I came from the About.tsx loader function!";
}

export function Component() {
    let data = useLoaderData();

    const [employees, setEmployees] = useState();
    const [payrollEntries, SetPayrollEntries] = useState();

    async function populateEmployees() {
        const response = await fetch('employee');
        const data = await response.json();
        setEmployees(data);
    }

    async function populatePayrollEntries() {
        const response = await fetch('payrollEntry');
        const data = await response.json();
        SetPayrollEntries(data);
    }

    useEffect(() => {
        populateEmployees();
        populatePayrollEntries();
    }, []);

    const contentsPayrollEntries = payrollEntries === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
            <div>
                <form action="/payrollEntry" method="POST">
                    <label htmlFor="usualWorkingHoursPerDay">Usual Working Hours Per Day:</label>
                    <input type="text" id="usualWorkingHoursPerDay" name="usualWorkingHoursPerDay" />
                    <br /><br />
                    <label htmlFor="overTimePerHour">Over Time Per Hour:</label>
                    <input type="text" id="overTimePerHour" name="overTimePerHour" />
                    <br /><br />
                    <label htmlFor="basicSalaryPerHour">Basic Salary Per Hour:</label>
                    <input type="text" id="basicSalaryPerHour" name="basicSalaryPerHour" />
                    <br /><br />
                    <button type="button" id="submitEmployee" onClick={function (e) {
                        console.log("submitting...");
                        var usualWorkingHoursPerDay = $("#usualWorkingHoursPerDay").val();
                        var overTimePerHour = $("#overTimePerHour").val();
                        var basicSalaryPerHour = $("#basicSalaryPerHour").val();

                        var payrollEntry =
                        {
                            "employeeID": 0,
                            "employmentStartDate": "2024-07-21T06:20:02.307Z",
                            "employmentClassification": 0,
                            "usualWorkingHoursPerDay": usualWorkingHoursPerDay,
                            "jobStatus": 0,
                            "reference": "string",
                            "leaveEntitlements": 0,
                            "wageSupplements": 0,
                            "basicSalaryPerHour": basicSalaryPerHour,
                            "overTimePerHour": overTimePerHour,
                            "grossPay": 0,
                            "netPay": 0,
                            "tax": 0,
                            "pensionAndSuperannuation": 0,
                            "studentLoan": 0,
                            "insurancePay": 0,
                            "deductions": 0,
                            "grade": 0,
                            "department": 0,
                            "payDate": "2024-07-21T06:20:02.307Z",
                            "taxPeroid": "string",
                            "insuranceNumber": "string",
                            "superannuationRate": 0,
                            "taxiblePay": 0,
                            "medicareDeduction": 0,
                            "otherDeductions": 0,
                            "payGWitholdingNumber": "string",
                            "employerCompany": 0
                        };

                        $.ajax({
                            type: "POST",
                            url: "/payrollEntry",
                            data: JSON.stringify(payrollEntry),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                populatePayrollEntries();

                                alert(data);

                            },
                            error: function (errMsg) {
                                alert(errMsg);
                            }
                        });

                    }}>Submit</button>
                </form>
            </div>
            <table className="table table-striped" aria-labelledby="tabelLabel2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee ID</th>
                        <th>Reference</th>
                        <th>Usual Working Hours Per Day</th>
                        <th>Basic Salary Per Hour</th>
                        <th>Over Time Per Hour</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {payrollEntries.map(p =>
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.employeeID}</td>
                            <td>{p.reference}</td>
                            <td>{p.usualWorkingHoursPerDay}</td>
                            <td>{p.basicSalaryPerHour}</td>
                            <td>{p.overTimePerHour}</td>
                            <td>{p.isDeleted ? "Deleted" : "Available"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>;

    const contentsEmployees = employees === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
            <div>
                <form action="/employee" method="POST">
                    <label htmlFor="pageName">Employee First Name:</label>
                    <input type="text" id="employeeFirstName" name="employeeFirstName" />
                    <br /><br />
                    <label htmlFor="employeeMiddleName">Employee Middle Name:</label>
                    <input type="text" id="employeeMiddleName" name="employeeMiddleName" />
                    <br /><br />
                    <label htmlFor="employeeLastName">Employee Last Name:</label>
                    <input type="text" id="employeeLastName" name="employeeLastName" />
                    <br /><br />
                    <button type="button" id="submitEmployee" onClick={function (e) {
                        console.log("submitting...");
                        var employeeFirstName = $("#employeeFirstName").val();
                        var employeeMiddleName = $("#employeeMiddleName").val();
                        var employeeLastName = $("#employeeLastName").val();

                        var employee =
                        {
                            "id": 0,
                            "firstName": employeeFirstName,
                            "middleName": employeeMiddleName,
                            "lastName": employeeLastName,
                            "streetAddress": "",
                            "suburb": "",
                            "city": "",
                            "state": "",
                            "country": "",
                            "postcode": "",
                            "email": "",
                            "dob": '1992-10-01',
                            "gender": "",
                            "tfn": "",
                            "abn": ""
                        };

                        $.ajax({
                            type: "POST",
                            url: "/employee",
                            data: JSON.stringify(employee),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                populateEmployees();

                                alert(data);

                            },
                            error: function (errMsg) {
                                alert(errMsg);
                            }
                        });

                    }}>Submit</button>
                </form>
            </div>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Street Address</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.middleName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.streetAddress}</td>
                            <td>{employee.isDeleted ? "Deleted" : "Available"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>;

    return (
        <div>
            <div>
                <IsLoggedIn></IsLoggedIn>
            </div>
            <div>
                <h1 id="tabelLabel">Employees</h1>
                <p>This employees section manages employees for payroll.</p>
                {contentsEmployees}
            </div>
            <div>
                <h1 id="tabelLabel2">Payroll Entries</h1>
                <p>This section manages entries for payroll.</p>
                {contentsPayrollEntries}
            </div>
        </div>
    );
}

Component.displayName = "PayrollPage";


export default Component;