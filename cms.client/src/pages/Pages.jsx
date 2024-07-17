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

    const [pages, setPages] = useState();
    const [pageCategories, setPageCategories] = useState();


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

    useEffect(() => {
        populatePageCategories();
        populatePageData();
    }, []);


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

    return (
        <div>
            <div>
                <IsLoggedIn></IsLoggedIn>
            </div>
            <div>
                <h1 id="tabelLabel">CMS Pages</h1>
                <p>This pages section manages web pages for the curent site.</p>
                {contentsPages}
            </div>
        </div>
    );
}

Component.displayName = "PagesPage";


export default Component;