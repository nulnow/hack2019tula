import React from 'react'
import { Redirect } from 'react-router'

const FIELD_TEMPLATE = {
    name: makeid(10),
    label: '',
    cords: [0, 0]
}

const INITIAL_STATE = {
    doctypeName: '',
    selectedFileUrl: null,
    filedIdToChangeCords: null,
    fields: [
        JSON.parse(JSON.stringify(FIELD_TEMPLATE))
    ],
    redirectUrl: null
}

class AddDocumentTypeForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = JSON.parse(JSON.stringify(INITIAL_STATE))

        this.onFileChante = this.onFileChante.bind(this)
        this.onAddField = this.onAddField.bind(this)
        this.onDeleteField = this.onDeleteField.bind(this)
        this.onCordsChange = this.onCordsChange.bind(this)
        this.onCordsSelect = this.onCordsSelect.bind(this)
        this.onDoctypeNameChange = this.onDoctypeNameChange.bind(this)
        this.submit = this.submit.bind(this)
        this.onFieldLabelChange = this.onFieldLabelChange.bind(this)
    }

    onFieldLabelChange(i, value) {
        this.setState(state => ({
            fields: state.fields.map((field, index) => {
                if (i !== index) return field;
                else {
                    return {
                        ...field,
                        label: value
                    }
                }
            })
        }))
    }

    submit() {
        const model = {
            name: this.state.doctypeName,
            url: this.state.selectedFileUrl,
            fields: this.state.fields
        }

        if(!model.name) {
            alert('Не заполнено имя документа')
            return
        }

        if(!model.url) {
            alert('Не добавлено изображение документа')
            return
        }

        if (this.state.fields.filter(f => f.label === '').length) {
            alert('Не заполнены поля документа')
            return
        }

        if (this.state.fields.filter(f => (f.cords[0] === 0) || (f.cords[1] === 0)).length) {
            alert('Не у всех полей указаны координаты')
            return
        }

        fetch('/doctypes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        })
            .then(() => {
                this.setState({
                    redirectUrl: '/add-document'
                })
            })
            .catch(e => {
                console.log(e)
                alert('Произошла непредвиденная ошибка 😎😎😎')
            })

        
    }

    onDoctypeNameChange(event) {
        this.setState({
            doctypeName: event.target.value
        })
    }

    onCordsSelect(event) {
        if (this.state.filedIdToChangeCords === null) {
            return;
        }
        const mouseX = event.screenX
        const mouseY = event.screenY
        const offset = this.img.getBoundingClientRect()
        const imgX = mouseX - offset.left
        const imgY = mouseY - offset.top - 70
        this.setState(state => {
            const field = state.fields.find((f, i) => i === state.filedIdToChangeCords)
            return {
                fields: state.fields.map(f => {
                    if (f !== field) return f
                    else {
                        return {
                            ...f,
                            cords: [imgX, imgY]
                        }
                    }
                })
            }
        })
    }

    onCordsChange(i) {
        this.setState(state => ({
            filedIdToChangeCords: state.filedIdToChangeCords !== null ? null : i
        }))
    }

    onDeleteField(i) {
        this.setState(state => ({
            fields: state.fields.filter((f, index) => index !== i)
        }))
    }

    onAddField() {
        this.setState(state => ({
            fields: [...state.fields, JSON.parse(JSON.stringify({...FIELD_TEMPLATE, name: makeid(10)}))]
        }))
    }

    onFileChante(event) {
        const files = event.target.files
        const file = files[0]
        const fd = new FormData;
        fd.append('img', file)

        fetch('/upload-file', {
            method: 'POST',
            body: fd
        })
            .then(res => res.text())
            .then(link => {
                this.setState({
                    selectedFileUrl: link
                })
            })
    }

    render() {

        if (this.state.redirectUrl) {
            return <Redirect to={this.state.redirectUrl} />
        }

        return <div className="Card">
            <h2 style={{textAlign: 'center'}}>Добавление типа документа</h2>
            <div>
                <label>
                    <p>Название типа документа</p>
                    <div>
                        <input
                            placeholder="Введите название документа"
                            value={this.state.doctypeName}
                            onChange={this.onDoctypeNameChange}
                        />
                    </div>
                </label>
            </div>
            <div>
                <input type="file" accept=".jpg" ref={component => {this.fileInput = component}} onChange={this.onFileChante} />
            </div>
            {this.state.selectedFileUrl &&
                <img
                    style={{border: '1px solid black'}}
                    onClick={this.onCordsSelect}
                    src={`/${this.state.selectedFileUrl.replace('public', 'storage')}`}
                    ref={component => this.img = component} />
            }
            {this.state.selectedFileUrl &&
                <table>
                    <tbody>
                        <tr>
                            <td>Поля документа:</td>
                            <td>Координаты поля:</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        {this.state.fields.map((field, i) => {
                            // value={this.state.fields[i].name}
                            return <tr>
                                <td>
                                    <input value={this.state.fields[i].label} onChange={e => this.onFieldLabelChange(i, e.target.value)} placeholder='Введите название поля' />
                                </td>
                                <td>
                                    <p>{JSON.stringify(this.state.fields[i].cords)}</p>
                                </td>
                                <td>
                                    <button className="btn btn-light" onClick={() => this.onDeleteField(i)}>Удалить поле</button>
                                </td>
                                <td>
                                    <button className="btn btn-light" onClick={() => this.onCordsChange(i)}>
                                        {
                                            this.state.filedIdToChangeCords === i
                                                ? 'Сохранить'
                                                : 'Выбрать координаты'
                                        }
                                    </button>
                                </td>
                            </tr>
                        })}
                        <button className="btn btn-light" onClick={this.onAddField}>Добавить поле</button>

                    </tbody>
                </table>
            }
            <div>
                <button className="btn btn-primary" onClick={this.submit}>Добавть тип документа</button>
                {this.filedIdToChangeCords !== null && (
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        this.fileInput.value = ''
                        this.setState(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(INITIAL_STATE)))))
                    }}
                >
                    Очистить
                </button>
                )}
            </div>
            <br />
            <br />
        </div>
    }

}

export default AddDocumentTypeForm

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
