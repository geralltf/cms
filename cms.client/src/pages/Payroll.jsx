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

    async function populateEmployees() {
        const response = await fetch('employee');
        const data = await response.json();
        setEmployees(data);
    }

    useEffect(() => {
        populateEmployees();
    }, []);

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
        </div>
    );
}

Component.displayName = "PayrollPage";


export default Component;