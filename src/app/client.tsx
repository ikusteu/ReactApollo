// import from node modules
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from "@apollo/client/utilities"
import { AUTH_TOKEN } from "../lib/constants"

// create link to graphql endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
})

// create authenticated context
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const Authorization = token ? `Bearer ${token}` : ""

  return {
    headers: {
      ...headers,
      Authorization,
    },
  }
})

// init an instance of memory cache
const cache = new InMemoryCache()

// define web socket link
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
})

// create final link with all middleware chained
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wsLink,
  authLink.concat(httpLink)
)

// init an instance of apollo client
const client = new ApolloClient({
  link,
  cache,
})

export default client
