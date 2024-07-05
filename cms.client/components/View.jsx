import { useState } from "react";
import { useAuth } from "../src/AuthProvider";
import axios from "axios";
export default function View() {
    const { logoutAuth, screen } = useAuth();
    const [data, setData] = useState();

    const getData = async () => {
        try {
            const res = await axios.get("/api/get-data");
            console.log(res);
            setData(res.data);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <p>{screen}</p>
            <p>{data}</p>
            <button onClick={getData}>Get Data</button>
            <button onClick={logoutAuth}>Logout</button>
        </div>
    );
}