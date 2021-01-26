import React from 'react';
import NewsItem from '../news-item/news-item';
import { Row, Col, Container, Collection, Pagination, Icon, ProgressBar } from 'react-materialize';

const NewsList = (props) => {
    const { data,
        loading,
        filteredData,
        setFilteredData,
        searchQuery,
        setSearchQuery,
        paginationsLength,
        setPaginationsLength,
        curentPage,
        setCurentPage,
        searching,
        setSearching } = props;

    const onchangePage = (page) => {
        setCurentPage(page)
    }

    const onSearch = (e) => {
        const term = e.target.value;
        setSearchQuery(term);
        const searchData = data.filter(item => item.title.toLowerCase().indexOf(term.toLowerCase()) > -1);
        if (term.length > 1) {
            setSearching(true)
            setFilteredData(searchData);
            setCurentPage(1)
            setPaginationsLength(Math.ceil(searchData.length / 10))
        } else {
            setSearching(false)
            setPaginationsLength(10);
        }
    }

    let content = null;
    let start = 0;
    let end = 10;
    
    if (loading) {
        content = <ProgressBar />
    } else {
        end = end * curentPage;
        start = end - 10;
        const renderData = (arr) => {
            content = arr.slice(start, end).map((item, i) => {
                const id = item.title;
                return (
                    <NewsItem key={id} title={item.title} imgUrl={item.urlToImage} text={item.description} id={id} />
                )
            })
        }
        if (!searching) {
            renderData(data);
        } else {
            renderData(filteredData)
        }
    }


    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <div className="input-field">
                            <input value={searchQuery} onChange={onSearch} id="search" type="search" required />
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i onClick={() => { 
                                setSearchQuery(''); 
                                setSearching(false); 
                                setPaginationsLength(10);
                                setCurentPage(1);
                             }
                            } className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>

            <Container>
                <Row>
                    <Col s={12}>
                        <Collection>
                            {content}
                        </Collection>
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                        <Pagination
                            onSelect={onchangePage}
                            className='center'
                            activePage={curentPage}
                            items={paginationsLength}
                            leftBtn={<Icon>chevron_left</Icon>}
                            rightBtn={<Icon>chevron_right</Icon>}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default NewsList;