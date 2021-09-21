import React from 'react';
import { useEffect } from 'react';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

/* const DUMMY_QUOTES = [
    { id: 'q1', author: 'kike', text: 'Ca va, ca bien'},
    { id: 'q2', author: 'lichi', text: 'Easy come, easy go'},
    { id: 'q3', author: 'emma', text: 'All things must pass!'},
]; */

const AllQuotes = () => {
    const { sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className='centered focused'>{error}</p>;
    }

    if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
       return <NoQuotesFound />; 
    }

    return (
        <QuoteList quotes={loadedQuotes} />
    );
};

export default AllQuotes;