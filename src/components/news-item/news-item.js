import React from 'react';
import {useHistory} from 'react-router-dom';
import {CollectionItem, Col, Row} from 'react-materialize';

import './news-item.css'

const NewsItem = ({imgUrl, title, text, id}) =>{
    let history = useHistory();
    return (
        <CollectionItem>
            <Row>
            <Col s={4} l={2}>
                <div onClick={()=>history.push(`/page/${id}`)} className="news-img"><img src={imgUrl} alt=""></img></div>
            </Col>
            <Col s={8} l={10}>
                <div className="news-wrapper">
                    <div className="news-title">{title}</div>
                    <div className="news-text">{text}</div>
                </div> 
            </Col>
            </Row>
        </CollectionItem>
    )
}

export default NewsItem;