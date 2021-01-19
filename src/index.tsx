// import from node modules
import "regenerator-runtime/runtime"
import React from "react"
import ReactDOM from "react-dom"
import { ApolloProvider } from "@apollo/client"
import { BrowserRouter as Router } from "react-router-dom"

// import from local components
import App from "./components/App"

// import apollo client instance
import client from "./app/client"

// render app to the dom
ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById("app")
)
