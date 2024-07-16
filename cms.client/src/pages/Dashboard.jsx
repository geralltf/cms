import { Outlet, Link, useLoaderData } from "react-router-dom";

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
