import "./App.css";
import AuthProvider from "./AuthProvider.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Login from "../components/Login.jsx";
import View from "../components/View.jsx";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
//function App() {
//    return (
//        <div className="App">
//            <Router>
//                <AuthProvider>
//                    <Routes>
//                        <Route path="/login" element={<Login />} />
//                        <Route element={<ProtectedRoute />}>
//                            <Route path="/view" element={<View />} />
//                        </Route>
//                    </Routes>
//                </AuthProvider>
//            </Router>
//        </div>
//    );
//}

function App() {
    const [timesheets, setTimesheets] = useState();
    const [companies, setCompanies] = useState();
    const [pages, setPages] = useState();
    const [pageCategories, setPageCategories] = useState();
    const [timesheetCategories, setTimesheetCategories] = useState();
    const [employees, setEmployees] = useState();

    useEffect(() => {
        populatePageCategories();
        populateTimesheetCategories();
        populatePageData();
        populateCompaniesData();
        populateTimesheetData();
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


    const contentsPageCategories = pageCategories === undefined ? <p>Loading page categories</p> : <p>Page Categories Loaded</p>;

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
                        {pageCategories === undefined ? <option value="0">LOADING...</option> : pageCategories.map(category => <option value={category.id} key={category.id}>{category.categoryID}-{category.categoryName}-{category.categoryDescription}</option>
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
                                populatePageCategories();
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
                <button id="btnPayrollView">Payroll</button>
                <button id="btnSignout" onClick={function (e) {
                    console.log("Account Signout...");
                    
                    window.location.replace('https://' + location.hostname + ":" + location.port + "/Account/Signout");

                }}>Sign Out</button>
                <button id="btnLogin" onClick={function (e) {
                    console.log("Account Login...");

                    window.location.replace('https://' + location.hostname + ":" + location.port + "/Account/Login");

                }}>Login</button>
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
            <div>
                <h1 id="tabelLabel">Employees</h1>
                <p>This employees section manages employees for payroll.</p>
                {contentsEmployees}
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

    async function populatePageCategories() {
        const response = await fetch('category');
        const data = await response.json();
        setPageCategories(data);
    }
    async function populateTimesheetCategories() {
        const response = await fetch('category');
        const data = await response.json();
        setTimesheetCategories(data);
    }
    async function populateEmployees() {
        const response = await fetch('employee');
        const data = await response.json();
        setEmployees(data);
    }
}

export default App;