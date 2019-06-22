import React from 'react';

export default (props) => {
    const { 
        onFilterChange,
        onPerPageChange,
        onDataUrlSet,
        onCurrentPageChange,
        pages,
        onDataUrlInputChange,
        defaultDataUrl 
    } = props;

    return (<div className="data-grid__filters">
        <label className="data-grid__label" style={{width: '50%'}}>
            <span className="data-grid__label-span">Data URL:</span>
            <input
                style={{width: '100%'}}
                className="data-grid__search-input"
                defaultValue={defaultDataUrl}
                placeholder="filter items"
                onChange={onDataUrlInputChange}
            />
            <button onClick={onDataUrlSet}>Set new data url</button>
        </label>
        <label className="data-grid__label">
        <span className="data-grid__label-span">Search:</span>
        <input
            className="data-grid__search-input"
            onChange={onFilterChange}
            placeholder="filter items" />
        </label>
        <label className="data-grid__label">
        <span className="data-grid__label-span">Per page:</span>
        <select
            className="data-grid__select"
            onChange={onPerPageChange}
        >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
        </select>
        </label>
        <label className="data-grid__label">
        <span className="data-grid__label-span">Page:</span>
        <select
            className="data-grid__select"
            onChange={onCurrentPageChange}
        >
            {pages.map(page => <option value={page + 1} key={page + 1}>{page + 1}</option>)}
        </select>
        </label>
    </div>
    );
}