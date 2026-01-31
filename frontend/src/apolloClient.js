import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/', // MUST match the URL in your backend terminal
  cache: new InMemoryCache(),
});

export default client;