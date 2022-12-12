import React from 'react'
import App from './App'
//import ApolloClient from 'apollo-client';
//import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
//import { ApolloClient } from '@apollo/client';
import { InMemoryCache, ApolloClient } from '@apollo/client';
import {setContext} from 'apollo-link-context';
import {createUploadLink} from 'apollo-upload-client';

const httpLink = createHttpLink({
    uri:'https://socioapp.azurewebsites.net' 
});

const piclink = createUploadLink({uri:'http://localhost:3000/graphql' });

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
    cache: new InMemoryCache(),
    piclink
  });

export default(
    <ApolloProvider client={client}><App/></ApolloProvider>
);