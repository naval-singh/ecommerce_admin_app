import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, isUserLoggedIn } from "./actions";
import Router from "./Router";

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        !auth.authenticate && dispatch(isUserLoggedIn());
        auth.authenticate && dispatch(getInitialData());
    }, [auth.authenticate]);

    return <Router />;
}

export default App;
