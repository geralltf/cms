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

    const contentsCompanies = companies === undefined ? <p>Loading companies</p> : <p>Companies Loaded</p>;

    const contents = timesheets === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
            <div>
                <form action="/timesheet" method="POST">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="timesheetDescription" name="timesheetDescription" />
                    <br /><br />
                    <label htmlFor="timesheetTimeSpanBegin">Date Begin:</label>
                    <input type="text" id="timesheetTimeSpanBegin" name="timesheetTimeSpanBegin" />
                    <br /><br />
                    <label htmlFor="timesheetTimeSpanEnd">Date End:</label>
                    <input type="text" id="timesheetTimeSpanEnd" name="timesheetTimeSpanEnd" />
                    <br /><br />
                    <label htmlFor="companies">Choose a company:</label>
                    <select name="companies" id="companies" required="required">
                        {companies === undefined ? <option value="0">LOADING...</option> : companies.map(company => <option value={company.id} key={company.id}>{company.companyName}</option>
                        )}
                    </select>
                    <br /><br />
                    <label htmlFor="timesheetCategories">Choose a timesheet category:</label>
                    <select name="timesheetCategories" id="timesheetCategories" required="required">
                        {timesheetCategories === undefined ? <option value="0">LOADING...</option> : timesheetCategories.map(category => <option value={category.id} key={category.id}>{category.categoryID}-{category.categoryName}-{category.categoryDescription}</option>
                        )}
                    </select>
                    <br /><br />
                    <button type="button" id="submitTimesheet" onClick={function (e) {
                        console.log("submitting...");
                        var desc = $("#timesheetDescription").val();
                        var selectedCompany = $("#companies").find(":selected").val();
                        var selectedCategory = $("#timesheetCategories").find(":selected").val();
                        var timesheet = {
                            "id": 0,
                            "timesheetCategory": selectedCategory,
                            "timesheetDescription": desc,
                            "timesheetTimeSpanBegin": "2024-06-28T07:51:12.754Z",
                            "timesheetTimeSpanEnd": "2024-06-28T07:51:12.754Z",
                            "timesheetCompanyID": selectedCompany,
                            "isDeleted": false
                        };

                        $.ajax({
                            type: "POST",
                            url: "/timesheet",
                            data: JSON.stringify(timesheet),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                populateTimesheetData();
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
                        <th>Description</th>
                        <th>Date Begin</th>
                        <th>Date End</th>
                        <th>Company</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {timesheets.map(timesheet =>
                        <tr key={timesheet.id}>
                            <td>{timesheet.id}</td>
                            <td>{timesheet.timesheetDescription}</td>
                            <td>{timesheet.timesheetTimeSpanBegin}</td>
                            <td>{timesheet.timesheetTimeSpanEnd}</td>
                            <td>{timesheet.timesheetCompanyID}-{timesheet.companyName}</td>
                            <td>{timesheet.isDeleted ? "Deleted" : "Available"}</td>
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
                <h1 id="tabelLabel">Timesheet Recorder</h1>
                <p>This timesheet recorder saves entries to a secure database.</p>
                {contents}
            </div>
        </div>
    );
}

Component.displayName = "TimesheetPage";


export default Component;