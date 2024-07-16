import {
    Outlet,
    Link,
    createBrowserRouter,
    RouterProvider,
    useNavigation,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/payroll",
                // Single route in lazy file
                lazy: () => import("./pages/Payroll.jsx"),
            },
            {
                path: "/pages",
                // Single route in lazy file
                lazy: () => import("./pages/Pages.jsx"),
            },
            {
                path: "/timesheets",
                // Single route in lazy file
                lazy: () => import("./pages/Timesheets.jsx"),
            },
            {
                path: "/dashboard",
                async lazy() {
                    // Multiple routes in lazy file
                    let { DashboardLayout } = await import("./pages/Dashboard.jsx");
                    return { Component: DashboardLayout };
                },
                children: [
                    {
                        index: true,
                        async lazy() {
                            let { DashboardIndex } = await import("./pages/Dashboard.jsx");
                            return { Component: DashboardIndex };
                        },
                    },
                    {
                        path: "/dashboard/messages",
                        async lazy() {
                            let { dashboardMessagesLoader, DashboardMessages } = await import("./pages/Dashboard.jsx");
                            return {
                                loader: dashboardMessagesLoader,
                                Component: DashboardMessages,
                            };
                        },
                    },
                ],
            },
            {
                path: "*",
                element: <NoMatch />,
            },
        ],
    },
]);

export default function Root() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

function Layout() {
    let navigation = useNavigation();

    return (
        <div>
            <h1>CMS</h1>

            <p>
                CMS, Timesheeting, Payroll, and CRM.
            </p>


            <div style={{ position: "fixed", top: 0, right: 0 }}>
                {navigation.state !== "idle" && <p>Navigation in progress...</p>}
            </div>

            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/payroll">Payroll</Link>
                    </li>
                    <li>
                        <Link to="/pages">Pages</Link>
                    </li>
                    <li>
                        <Link to="/timesheets">Timesheets</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/messages">Messages (Dashboard)</Link>
                    </li>
                </ul>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}