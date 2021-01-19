// import from node modules
import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { useHistory } from "react-router"

// import from mutations
import { CREATE_LINK_MUTATION } from "../api/Mutations"
import { FEED_QUERY } from "../api/Queries"
import { LINKS_PER_PAGE } from "../lib/constants"

// component function
const CreateLink: React.FC = () => {
  // map to react router
  const history = useHistory()

  // init state
  const [formState, setFormState] = useState({
    url: "",
    description: "",
  })

  // get create link function from useMutation hook
  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      ...formState,
    },
    update: (cache, { data: { post } }) => {
      // set query params
      const skip = 0
      const take = LINKS_PER_PAGE
      // const orderBy = { createdAt: "desc" }

      // read cache
      const data = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          skip,
          take,
        },
      })
      console.log(data)
      const feed = data.feed
      // update cache
      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...feed.links],
          },
        },
        variables: {
          skip,
          take,
        },
      })
    },
    onCompleted: () => history.push("/new"),
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createLink()
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateLink
