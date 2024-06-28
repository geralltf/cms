import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [timesheets, setTimesheets] = useState();
    const [companies, setCompanies] = useState();

    useEffect(() => {
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
                    <button type="button" id="submitTimesheet" onClick={function (e) {
                        console.log("submitting...");
                        var desc = $("#timesheetDescription").val();
                        var selectedCompany = $("#companies").find(":selected").val();;
                        var timesheet = {
                            "id": 0,
                            "timesheetCategory": 0,
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
                            success: function (data) { alert(data); },
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
                            <td>{timesheet.timesheetCompanyID}</td>
                            <td>{timesheet.isDeleted?"Deleted":"Available"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>;

    return (
        <div>
            <h1 id="tabelLabel">Timesheet Recorder</h1>
            <p>This timesheet recorder saves entries to a secure database.</p>
            {contents}

            <div id="example">
                <div id="grid"></div>
            </div>
        </div>
    );

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
}

export default App;