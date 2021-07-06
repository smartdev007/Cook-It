import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'antd/dist/antd.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { AuthProvider } from './context/auth';
import 'semantic-ui-css/semantic.min.css'
const httpLink = createHttpLink({
    uri: 'http://localhost:5000/'
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});




ReactDOM.render(

    <ApolloProvider client={client}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ApolloProvider>,
    document.getElementById('root')
);


// ReactDOM.render(<App />, document.querySelector('#root'));