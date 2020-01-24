import React, { Component, useState, useEffect } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// page
import Home from './views/Home'
import About from './views/About'
import Record from './views/Record'
import Renamer from './views/Renamer'
import Graph from './views/Graph'

import Page from './components/Page'


import './reset.css'
import './App.css'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/records" component={Record} />
                    <Route path="/renamer" component={Renamer} />
                    <Route path="/graph" component={Graph} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
