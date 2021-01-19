// import from node modules
import React from "react"
import { useMutation } from "@apollo/client"

// import from constants
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../lib/constants"

// import util functions and types
import { timeDifferenceForDate } from "../lib/utils"

// import from api actions
import { VOTE_MUTATION } from "../api/Mutations"
import { FEED_QUERY } from "../api/Queries"

// declare local types
export interface LinkEntry {
  id: string
  description: string
  url: string
  createdAt: string
  votes: Record<string, any>[]
  postedBy: Record<string, string>
}

interface LinkProps {
  link: LinkEntry
  index: number
}

// component function
const Link: React.FC<LinkProps> = ({ link, index }) => {
  // extract main info from props
  const { id, description, url, votes, createdAt, postedBy } = link

  // get auth token from local storage
  const authToken = localStorage.getItem(AUTH_TOKEN)

  // links query params
  const take = LINKS_PER_PAGE
  const skip = 0
  const orderBy = { createdAt: "desc" }

  // create vote mutation dispatch
  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: Number(id),
    },
    // update: (cache, { data: { vote } }) => {
    //   // read feed from feed query
    //   const { feed } = cache.readQuery({
    //     query: FEED_QUERY,
    //     variables: {
    //       skip,
    //       take,
    //     },
    //   }) as Record<string, any>

    //   // save current vote to current link in cache
    //   const updatedLinks = feed.links.map((feedLink: LinkEntry) => {
    //     if (feedLink.id === id) {
    //       return {
    //         ...feedLink,
    //         votes: [...feedLink.votes, vote],
    //       }
    //     }
    //     return feedLink
    //   })

    //   // update cache
    //   cache.writeQuery({
    //     query: FEED_QUERY,
    //     data: {
    //       feed: {
    //         links: updatedLinks,
    //       },
    //       variables: { skip, take },
    //     },
    //   })
    // },
  })

  // return component
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => vote()}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
        </div>
        {authToken && (
          <div className="f6 lh-copy gray">
            {votes.length} votes | by {postedBy ? postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(Number(createdAt))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Link
