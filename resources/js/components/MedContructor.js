import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import App from './App'
import AddDocumentForm from './AddDocumentForm'
import AddDocumentTypeForm from './AddDocumentTypeForm'
import Landos from './Landos'
import Navbar from './Navbar'

class MedConstructor extends React.Component {

    render() {
        return <Router>
            <Navbar />
            <div className="container">
                <Route exact path="/" component={Landos} />
                <Route exact path="/add-document" component={AddDocumentForm} />
                <Route exact path="/add-document-type" component={AddDocumentTypeForm} />
                <Route exact path="/my-documents" component={App} />
            </div>
        </Router>
    }

}

export default MedConstructor