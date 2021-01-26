import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Navbar, Container, Button, ProgressBar } from 'react-materialize';

import './news-page.css'

const NewsPage = ({ data, loading }) => {
    let { id } = useParams();

    let content = ''

    if (loading) {
        content = <ProgressBar />;
    } else {
        const curentNews = data.find(item => item.title === id);

        const imgUrl = curentNews.urlToImage;
        const title = curentNews.title;
        const text = curentNews.content;
        const author = curentNews.author;
        const url = curentNews.url;

        content = (
            <div className="news-page row">
                <div className="news-page__img col l6"><img src={imgUrl} alt={title}></img></div>
                <div className="news-page__content col l6">
                    <div className="news-page__title">{title}</div>
                    <div className="news-page__author">{author}</div>
                    <div className="news-page__descr">{text}</div>
                    <Button
                        href={url}
                        node="a"
                        waves="light">
                        Открыть источник
                    </Button>
                </div>
            </div>
        )
    }



    return (
        <>
            <Navbar/>
            <Container>
                <Link to='/'>
                    <Button>
                        назад
                    </Button>
                </Link>
                {content}
            </Container>
        </>
    )
}

export default NewsPage;