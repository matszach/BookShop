import './ShopView.sass';
import React from 'react';
import {http} from '../http.js';
import dict from '../assets/dict.json';
import Book from './Book';


export default class ShopView extends React.Component {

    constructor() {
        super();
        this.state = { 
            page: 1,
            pageSize: 10,
            totalRecords: 0,
            totalPages: 1,
            canPageDown: true,
            canPageUp: true,
            books: []
        };
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks(page) {
        http.get(`/book?page=${page}`, response => {
            this.setState({
                page: response.metadata.page,
                canPageDown: response.metadata.page > 1,
                canPageUp: response.metadata.total_records / this.state.pageSize > response.metadata.page,
                totalRecords: response.metadata.total_records,
                totalPages: Math.ceil(response.metadata.total_records / this.state.pageSize),
                books: response.data
            });
        });
    } 

    pageDown() {
        this.fetchBooks(this.state.page - 1);
    }

    pageUp() {
        this.fetchBooks(this.state.page + 1);
    }

    render() {
        return (
            <div className="ShopView">
                <div className='Paginator'>
                    <span className=''>{dict.page} {this.state.page} {dict.of} {this.state.totalPages}</span> 
                    <button className='PaginatorButton' disabled={!this.state.canPageDown} onClick={() => this.pageDown()}>🡰</button>
                    <button className='PaginatorButton' disabled={!this.state.canPageUp} onClick={() => this.pageUp()}>🡲</button>
                </div>
                <div className='BooksGallery'>
                    {this.state.books.map(book => <Book book={book} key={book.id}></Book>)}
                </div>
            </div>
        );
    }
}