import React from 'react';
import Spinner from './Spinner';
import Table from './Table';
import Filters from './Filters';

const DEFAULT_URL = location.origin + '/documents';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataUrl: DEFAULT_URL,
      dataUrlInput: DEFAULT_URL,
      filter: '',
      perPage: 10,
      currentPage: 1,
      data: [],
      loading: false,
      loadingError: false,
      editableItem: null,
      editableItemDraft: {}
    };

    this.onCurrentPageChange = this.onCurrentPageChange.bind(this)
    this.getData = this.getData.bind(this)
    this.reloadData = this.reloadData.bind(this)
    this.onDataUrlSet = this.onDataUrlSet.bind(this)
    this.onDataUrlInputChange = this.onDataUrlInputChange.bind(this)
    this.onFilterChange = this.onFilterChange.bind(this)
    this.onPerPageChange = this.onPerPageChange.bind(this)
    this.onDocumentAdd = this.onDocumentAdd.bind(this)
    this.onPrintClick = this.onPrintClick.bind(this)
  }

  componentDidMount() {
    this.reloadData();
  }

  onDocumentAdd(document) {
    this.setState((state) => ({
      data: [...state.data, document]
    }))
  }

  getData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => data.every(item => item instanceof Object) ? resolve(data) : reject())
        .catch(err => reject(err));
    });
  }

  reloadData(url) {
    this.setState({
      loading: true,
      loadingError: false,
      data: []
    });
    this.getData(url || this.state.dataUrl)
      .then(data => {
        setTimeout(() => {
          this.setState({
            data,
            loading: false,
            currentPage: 1
          });
        }, 200)
      })
      .catch(error => {
        this.setState({
          loading: false,
          loadingError: true,
          currentPage: 1
        });
      });
  }

  onDataUrlSet() {
    this.setState((state) => ({dataUrl: state.dataUrlInput}));
    this.reloadData(this.state.dataUrlInput);
  }

  onDataUrlInputChange( event) {
    this.setState({
      dataUrlInput: event.target.value
    });
  }


  onFilterChange(event) {
    this.setState({
      filter: event.target.value,
      currentPage: 1,
      editableItem: null
    });
  }

  onPerPageChange(event) {
    this.setState({
      perPage: +event.target.value,
      currentPage: 1,
      editableItem: null
    });
  }

  onCurrentPageChange (event) {
    this.setState({
      currentPage: +event.target.value,
      editableItem: null
    });
  }
  
  onPrintClick(id) {
    fetch('/printDocument/' + id)
      .then(res => res.text())
      .then(link => {
        console.log(link)
        const imgWindow = window.open(window.location.origin + link)
        imgWindow.print()
      })
  }

  render() {
    const { data, filter, editableItem, currentPage, perPage, dataUrl } = this.state;

    const pageIndexes = {
      start: (currentPage - 1) * perPage,
      end: (currentPage - 1) * perPage + perPage - 1
    };

    const filteredData = data.filter(obj => Object.values(obj).find(value => {
      return (value || '').toString().includes(filter.toLowerCase())
    }));

    const dataOnThePage = filteredData.filter((item, i) => (i >= pageIndexes.start) && (i <= pageIndexes.end));

    const pages = Array(Math.ceil(filteredData.length / perPage))
      .fill()
      .map((item, index) => index);

    return (
      <div className="container">
        <div className="Card">
        <Filters
            onFilterChange={this.onFilterChange}
            onPerPageChange={this.onPerPageChange}
            onCurrentPageChange={this.onCurrentPageChange}
            onDataUrlInputChange={this.onDataUrlInputChange}
            pages={pages}
            defaultDataUrl={dataUrl}
          />
          <p className="data-grid__results">
            {filter ? 'Items found' : 'Total count'}:
            {filter ? filteredData.length : data.length}
          </p>
          {this.state.loadingError ? <h1>loading error</h1> : null}
          {this.state.loading ? <Spinner /> : null}
          <Table
            data={dataOnThePage}
            filter={filter}
            onPrintClick={this.onPrintClick}
          />
        </div>
      </div>
    );
  }
}

export default App;