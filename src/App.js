import HomePage from "./containers/HomePage";
import SigninPage from "./containers/SigninPage";
import SignupPage from "./containers/SignupPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Router>
            <Route path="/" exact component={HomePage} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
        </Router>
    );
}

export default App;
