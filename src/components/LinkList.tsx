// import from node modules
import React from "react"
import { useQuery } from "@apollo/client"

// import from local components
import Link, { LinkEntry } from "./Link"

// import queries
import { FEED_QUERY } from "../api/Queries"
import { LINKS_PER_PAGE } from "../lib/constants"

// declare local types
interface FeedQuery {
  id: string
  feed: {
    links: LinkEntry[]
  }
}

// component function
const LinkList: React.FC = () => {
  // links query params
  const take = LINKS_PER_PAGE
  const skip = 0
  const orderBy = { createdAt: "desc" }

  // get feed
  const { data, error } = useQuery<FeedQuery>(FEED_QUERY, {
    variables: {
      take,
      skip,
    },
  })

  // if error, fetching, log to the console
  if (error) {
    console.log(error.message)
  }

  console.log(data)

  return (
    <div>
      {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} index={index} link={link} />
        ))}
    </div>
  )
}

export default LinkList
