import { useParams, Route, useRouteMatch } from "react-router";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from "../components/UI/LoadingSpinner";

/* const DUMMY_QUOTES = [
    { id: 'q1', author: 'kike', text: 'Ca va, ca bien'},
    { id: 'q2', author: 'lichi', text: 'Easy come, easy go'},
    { id: 'q3', author: 'emma', text: 'All things must pass!'},
]; */

const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();

    console.log(match);

    const { quoteId } = params;

    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    //const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

    if (status === 'pending') {
        return (
        <div className='centered'>
            <LoadingSpinner />
        </div>
        );
    }

    if (error) {
        return (
        <p className='centered'>
            {error}
        </p>
        );
    }

    
    if (!loadedQuote.text) {
        return <p>No Quote Found!</p>;
    }

    return (
        <React.Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={`${match.path}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>
                        Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </React.Fragment>
    );
};

export default QuoteDetail;