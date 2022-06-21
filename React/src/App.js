import React, {Component} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Admin";
import { Spin, } from 'antd';
import PageLoading from './component/Loading'

Spin.setDefaultIndicator(<PageLoading />);

class App extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" component={Index}/>
                    <Redirect to="/admin"/>
                </Switch>
            </>
        );
    }
}

export default App;