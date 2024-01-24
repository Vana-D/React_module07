import React from 'react'
import {createRoot} from 'react-dom/client'
// import EmployeeList from './EmployeeList.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import Page from './Page.jsx'

const root = createRoot(document.getElementById('content'))

root.render(
    <React.StrictMode>
      <Router>
            <Page />
        </Router>
    </React.StrictMode>
)