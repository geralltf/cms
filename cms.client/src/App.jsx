import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [timesheets, setTimesheets] = useState();
    const [companies, setCompanies] = useState();
    const [pages, setPages] = useState();

    useEffect(() => {
        populatePageData();
        populateCompaniesData();
        populateTimesheetData();
    }, []);

    const contentsPages = pages === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <div>
            <div>
                <form action="/page" method="POST">
                    <label htmlFor="pageName">Page Name:</label>
                    <input type="text" id="pageName" name="pageName" />
                    <br /><br />
                    <label htmlFor="pageTitle">Page Title:</label>
                    <input type="text" id="pageTitle" name="pageTitle" />
                    <br /><br />
                    <label htmlFor="pageContent">Page Content:</label>
                    <input type="text" id="pageContent" name="pageContent" />
                    <br /><br />
                    <label htmlFor="pageCategories">Choose a page category:</label>
                    <select name="pageCategories" id="pageCategories" required="required">
                        {companies === undefined ? <option value="0">LOADING...</option> : companies.map(company => <option value={company.id} key={company.id}>{company.companyName}</option>
                        )}
                    </select>
                    <br /><br />
                    <label htmlFor="sequenceOrderID">Sequence Order ID:</label>
                    <input type="text" id="pageSequenceOrderID" name="pageSequenceOrderID" />
                    <br /><br />
                    <button type="button" id="submitPage" onClick={function (e) {
                        console.log("submitting...");
                        var pageName = $("#pageName").val();
                        var pageTitle = $("#pageTitle").val();
                        var pageContent = $("#pageContent").val();
                        var selectedCompany = $("#companies").find(":selected").val();;
                        var sequenceOrderID = $("#pageSequenceOrderID").val();

                        var timesheet =
                        {
                            "id": 0,
                            "pageName": pageName,
                            "pageTitle": pageTitle,
                            "categoryID": 0,
                            "parentID": 0,
                            "pageAreaID": 0,
                            "pageContent": pageContent,
                            "headerContent": "",
                            "footerContent": "",
                            "sequenceOrderID": sequenceOrderID,
                            "authorID": 0,
                            "dateCreated": "2024-06-29T03:18:11.429Z",
                            "dateLastModified": "2024-06-29T03:18:11.429Z",
                            "isDeleted": false,
                            "themeID": 0,
                            "siteID": 0,
                            "siteLocalityName": "string",
                            "publishVersionID": "string",
                            "isPublished": false
                        };

                        $.ajax({
                            type: "POST",
                            url: "/page",
                            data: JSON.stringify(timesheet),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                populatePageData();
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
                        <th>Page Name</th>
                        <th>Page Title</th>
                        <th>Page Content</th>
                        <th>Sequence Order ID</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map(page =>
                        <tr key={page.id}>
                            <td>{page.id}</td>
                            <td>{page.pageName}</td>
                            <td>{page.pageTitle}</td>
                            <td>{page.pageContent}</td>
                            <td>{page.sequenceOrderID}</td>
                            <td>{page.isDeleted ? "Deleted" : "Available"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>;


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
                            <td>{timesheet.isDeleted?"Deleted":"Available"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>;

    return (
        <div>
            <div>
                <button id="btnPagesView">Pages</button>
                <button id="btnTimesheetsView">Timesheets</button>
            </div>
            <div>
                <h1 id="tabelLabel">Timesheet Recorder</h1>
                <p>This timesheet recorder saves entries to a secure database.</p>
                {contents}
            </div>
            <div>
                <h1 id="tabelLabel">CMS Pages</h1>
                <p>This pages section manages web pages for the curent site.</p>
                {contentsPages}
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

    async function populatePageData() {
        const response = await fetch('page');
        const data = await response.json();
        setPages(data);
    }
}

export default App;