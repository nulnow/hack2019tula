import React from 'react'

export default class Add extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            json_body: ''
        }

        this.onJsonBodyChange = this.onJsonBodyChange.bind(this)
        this.onAdd = this.onAdd.bind(this)
    }

    onJsonBodyChange(event) {
        this.setState({
            json_body: event.target.value
        })
    }

    onAdd() {
        const json_body = this.state.json_body
        debugger
        fetch('/add', {
            method: 'POST',
            body: JSON.stringify({
                json_body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                return res.json()
            })
            .then(document => {
                document
                debugger
                this.props.onDocumentAdd(document)
            })
            .catch(() => alert('Произошла ошибка'))
    }

    render() {
        return <div>
            <label><h2>Добавить документ</h2> 
                <input value={this.state.json_body} onChange={this.onJsonBodyChange} />
            </label>
            <div>
                <button onClick={this.onAdd}>Add</button>
            </div>
        </div>
    }
}