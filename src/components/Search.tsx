// import from node modules
import React, { useState } from "react"
import { useLazyQuery } from "@apollo/client"

// import from local components
import Link from "./Link"

// import from api actions
import { FEED_SEARCH_QUERY } from "../api/Queries"

// component function
const Search: React.FC = () => {
  // init state
  const [searchFilter, setSearchFilter] = useState("")

  // setup lazy search query
  const [executeSearchQuery, { data }] = useLazyQuery(FEED_SEARCH_QUERY)

  return (
    <>
      <div>
        Search
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button
          onClick={() =>
            executeSearchQuery({
              variables: {
                filter: searchFilter,
              },
            })
          }
        >
          OK
        </button>
      </div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  )
}

export default Search
