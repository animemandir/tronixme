import { useEffect } from "react";
import axios from "redaxios";

export default function Index() {
    useEffect(() => {
        axios.get("/api/recently/sub").then(({ data }) => console.log(data));
    }, []);

    return <div>Hello</div>;
}
