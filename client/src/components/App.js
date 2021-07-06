import React, { useContext } from 'react'
import '../App.css';
import { Alert } from '@material-ui/lab';
import { DingtalkOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './Home.js';
import Recipe from './Recipe';
import Login from './Login'
import Signup from './Signup'
import AuthRoute from './AuthRoute'
import { AuthContext } from '../context/auth';
import SinglePost from './SinglePost'
function App() {
    const { user } = useContext(AuthContext);
    const context = useContext(AuthContext);
    console.log(user)
    return (
        // <AuthProvider>
        <Router>
            <div className="App" style={{height:(window.screen.availHeight-50)+'px'}}>
                <nav id="navbar" className="">
                    <div className="nav-wrapper">
                        <div className="logo">
                            <a href="#home"><b>CookIt</b></a>
                        </div>
                        <ul id="menu">
                            {user !== null && (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/recipes">Recipes</Link></li>
                                    <li><Link to="/login"  onClick={() => context.logout()}>Sign Out</Link></li>
                                </>
                            )}
                            {user === null && (
                                <>
                                    <li><Link to="/login">Sign in</Link></li>
                                    <li><Link to="/signup">Sign up</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
                {/* <AuthProvider> */}
                <div className="App-body">
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/recipes" component={Recipe}></Route>
                        <AuthRoute exact path="/login" component={Login} />
                        <AuthRoute exact path="/signup" component={Signup} />
                        <Route exact path="/recipes/:postId" component={SinglePost} />
                        <Route path="*" component={Error404} />
                    </Switch>
                </div>
                {/* </AuthProvider> */}
            </div>


        </Router>
        // </AuthProvider>
    );
}

function Error404() {
    return (
        <Alert severity="error" className="alert error">
            404: Resource Not Found
        </Alert>
    )
}

export default App;
