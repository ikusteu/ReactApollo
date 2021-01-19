// import from node modules
import { gql } from "@apollo/client"

export const FEED_QUERY = gql`
  query FeedQuery($skip: Int, $take: Int) {
    feed(skip: $skip, take: $take) {
      count
      links {
        id
        url
        description
        votes {
          id
          user {
            id
          }
        }
        postedBy {
          id
          name
        }
        createdAt
      }
    }
  }
`

// search query
export const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`
