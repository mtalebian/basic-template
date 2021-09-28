import React from 'react';

export const GlobalFilter = ({ filter, setFilter, messages }) => {

    return (
        <input type="search"
            className="form-control form-control-sm"
            value={filter || ''}
            onChange={e => setFilter(e.target.value)}
            placeholder={messages.Search} />
    )
}

