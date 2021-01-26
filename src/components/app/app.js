import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import NewsList from '../news-list/news-list';
import newsApiService from '../../services/newsApiService';
import NewsPage from '../news-page/news-page';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';



function App() {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [paginationsLength, setPaginationsLength] = useState(10)
    const [curentPage, setCurentPage] = useState(1)
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        setError(false)
        setLoading(true)
        new newsApiService().getAllNews()
            .then(res => {
                setData(res.articles)
                setLoading(false);
            })
            .catch(err => {
                setLoading(false)
                setError(true)
            })
    }, []);

    let content = '';

    if (!error) {
        content = (
            <>
                <Route exact path='/'>
                    <NewsList
                        data={data}
                        loading={loading}
                        filteredData={filteredData}
                        setFilteredData={setFilteredData}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        paginationsLength={paginationsLength}
                        setPaginationsLength={setPaginationsLength}
                        curentPage={curentPage}
                        setCurentPage={setCurentPage}
                        searching={searching}
                        setSearching={setSearching}
                    />
                </Route>
                <Route path='/page/:id'>
                    <NewsPage data={data} loading={loading} />
                </Route>
            </>
        )
    } else {
        content = (
            <p>Error...</p>
        )
    }


    return content;
}

export default App;