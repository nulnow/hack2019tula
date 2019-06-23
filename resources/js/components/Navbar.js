import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

    render() {
        return  <nav style={{backgroundColor: '#9FA8DA', color: 'white'}} class="navbar navbar-expand-lg navbar-light">
            <Link to='/' className="navbar-brand" >Главная</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to='/add-document-type' className="nav-item nav-link" >Добавить тип документа</Link>
                    <Link to='/add-document' className="nav-item nav-link" >Добавить документ</Link>
                    <Link to='/my-documents' className="nav-item nav-link" >Мои документы</Link>
                </div>
            </div>
        </nav>
    }

}

export default Navbar