import React from 'react'
import { Redirect } from 'react-router'

const DOCUMENT_TEMPLATE = {
    type: null,
    fields: {}
}

export default class AddDocumentForm extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        selectedDocType: null,
        docTypes: [],
        document: JSON.parse(JSON.stringify(DOCUMENT_TEMPLATE)),
        redirectUrl: null
      }

      this.addDocument = this.addDocument.bind(this)
      this.setDocumentType = this.setDocumentType.bind(this)
      this.removeDoctype = this.removeDoctype.bind(this)
      this.onFieldInput = this.onFieldInput.bind(this)
    }

    componentDidMount() {
        fetch('/doctypes')
            .then(res => res.json())
            .then(doctypes => {
                this.setState({
                    docTypes: doctypes
                })
            })
    }

    addDocument() {
        
        if (!Object.values(this.state.document.fields).filter(v => !!v).length) {
            alert('Заполнены не все поля (если поле нужно пропустить, то введите пробел)')
            return
        }

        const model = JSON.stringify(this.state.document)
        fetch('/documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: model
        })
            .then(res => res.json())
            .then(document => {
                this.setState({
                    redirectUrl: '/my-documents'
                })
            })
            .catch(e => {
                console.log(e)
                alert('Произошла непредвиденная ошибка 😎😎😎')
            })
    }

    setDocumentType(doctype) {
        this.setState({
            selectedDocType: doctype,
            document: JSON.parse(JSON.stringify({...DOCUMENT_TEMPLATE, type: doctype.id}))
        })
    }

    removeDoctype() {
        this.setState({
            selectedDocType: null,
            document: JSON.parse(JSON.stringify(DOCUMENT_TEMPLATE))
        })
    }

    onFieldInput(name, value) {
        this.setState(state => ({
            document: {
                ...state.document,
                fields: {
                    ...state.document.fields,
                    [name]: value
                }
            }
        }))
    }
    
    render() {

        if (this.state.redirectUrl) {
            return <Redirect to={this.state.redirectUrl} />
        }

        return <div className="Card">
            <h1>Создание документа</h1>

            {this.state.selectedDocType 
                && <p>
                    Выбранный тип документа {this.state.selectedDocType.name}
                    <button onClick={this.removeDoctype}>убрать</button>
                </p>
            }

            <h2>Типы документов</h2>
            <div>
                {this.state.docTypes.map(doctype => {
                    const fields = JSON.parse(doctype.fields)
                    return <div className="doctype" key={doctype.id} onClick={() => this.setDocumentType(doctype)}>
                        <p className="doctype__title">{doctype.name}</p>

                        <p>
                            {fields.map(field => {
                                return <span key={field.label}>{field.label}</span>
                            })}
                        </p>

                    </div>
                })}
            </div>
            {this.state.selectedDocType && <div>
                {JSON.parse(this.state.selectedDocType.fields).map((field, i) => {
                    return <div key={field.name}>
                        <label>
                            {field.label}
                            <input
                                onChange={(event) => this.onFieldInput(field.name, event.target.value)}
                                value={this.state.document.fields[field]}
                            />
                        </label>
                    </div>
                })}
                <button onClick={this.addDocument}>Создать документ</button>
            </div>}
        </div>
    }
}