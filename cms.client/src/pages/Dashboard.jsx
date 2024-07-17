import { Outlet, Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from 'react';


export function IsLoggedIn() {

    const [isloggedin, setIsLoggedIn] = useState();

    async function populateIsLoggedIn() {
        const response = await fetch('https://' + location.hostname + ':' + location.port + '/Account/IsLoggedIn');
        const data = await response.json();
        setIsLoggedIn(data);
    }

    useEffect(() => {
        populateIsLoggedIn();
    }, []);

    const contents = isloggedin === undefined ? <p>Wait...</p> : <div>
        <button id="btnSignout" class={isloggedin.isloggedin ? "logged-in-signout" : "logged-out-signout"} onClick={function (e) {
        console.log("Account Signout...");

            window.location.replace('https://' + location.hostname + ":" + location.port + "/Account/Logoff/GetLogoff");

        }}>Signout {isloggedin.user}</button><button id="btnLogin" class={isloggedin.isloggedin?"logged-in-login":"logged-out-login"} onClick={function (e) {
        console.log("Account Login...");

        window.location.replace('https://' + location.hostname + ":" + location.port + "/Account/Login");

    }}>Login</button></div>;

    return (
        <div>
            {contents}
        </div>
    );
}

export function DashboardLayout() {

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/messages">Messages</Link>
                    </li>
                    <li>
                        <IsLoggedIn />
                    </li>
                </ul>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}

export function DashboardIndex() {
    return (
        <div>
            <h2>Dashboard Index</h2>
        </div>
    );
}

export async function dashboardMessagesLoader() {
    await new Promise((r) => setTimeout(r, 500));
    return {
        messages: [
            "Message 1 from Dashboard.jsx loader",
            "Message 2 from Dashboard.jsx loader",
            "Message 3 from Dashboard.jsx loader",
        ],
    };
}

export function DashboardMessages() {
    let { messages } = useLoaderData();

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.map((m) => (
                    <li key={m}>{m}</li>
                ))}
            </ul>
        </div>
    );
}
