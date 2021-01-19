// import api actions
import { FEED_QUERY } from "./Queries"

// import types
import { Cache } from "../app/client"

// local types and interfaces
interface Vote {
  id: string
  user: {
    id: string
  }
  link: {
    id: string
  }
}

interface UpdateFunction {
  (
    cache: Cache,
    payload: {
      data: {
        vote?: Vote
      }
    }
  ): void
}

// update cache after post
export const postUpdate: UpdateFunction = (
  cache: Cache,
  { data: { vote } }
) => {
  // read feed from feed query
  const { feed } = cache.readQuery({
    query: FEED_QUERY,
  })

  // save current vote to current link in cache
  const updatedLinks = feed.links.map((feedLink) => {
    if (feedLink === id) {
      return {
        ...feedLink,
        votes: [...feedLink.votes, vote],
      }
    }
    return feedLink
  })

  // update cache
  cache.writeQuery({
    query: FEED_QUERY,
    data: {
      feed: {
        links: updatedLinks,
      },
    },
  })
}

export const voteUpdate = () => {}
