// import from node modules
import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"

// import styles
import "../styles/App.css"

// import from local components
import LinkList from "./LinkList"
import CreateLink from "./CreateLink"
import Header from "./Header"
import Login from "./Login"
import Search from "./Search"

// component functon
const App: React.FC = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route path="/new" exact component={LinkList} />
          <Route path="/login" exact component={Login} />
          <Route path="/create" exact component={CreateLink} />
          <Route path="/search" exact component={Search} />
          <Redirect to="/new" />
        </Switch>
      </div>
    </div>
  )
}

export default App
