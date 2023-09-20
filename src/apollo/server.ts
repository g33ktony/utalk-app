import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql' // Replace with your actual GraphQL server URL
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: httpLink,
  cache
})

export default client
