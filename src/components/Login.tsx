// import from node modules
import React, { useState } from "react"
import { useHistory } from "react-router"
import { useMutation } from "@apollo/client"

// import mutations
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../api/Mutations"

// import constants
import { AUTH_TOKEN } from "../lib/constants"

// component function
const Login: React.FC = () => {
  // map to react router
  const history = useHistory()

  // init state
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    name: "",
    password: "",
  })

  // get signup function
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      ...formState,
    },
    onCompleted: ({ signup }: { signup: Record<string, string> }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token)
      history.push("/new")
    },
  })

  // get login function
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      ...formState,
    },
    onCompleted: ({ login }: { login: Record<string, string> }) => {
      localStorage.setItem(AUTH_TOKEN, login.token)
      history.push("/new")
    },
  })

  // universal handle change function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    })
  }

  // toggle between login and sign up screen
  const toggleLogin = () => {
    setFormState({
      ...formState,
      login: !formState.login,
    })
  }

  // return component
  return (
    <div>
      <h4 className="mv3">{formState.login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) => handleChange(e, "name")}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) => handleChange(e, "email")}
          type="text"
          placeholder="Your email"
        />
        <input
          value={formState.password}
          onChange={(e) => handleChange(e, "password")}
          type="password"
          placeholder="Password..."
        />
      </div>
      <button
        className="pointer mr2 button"
        onClick={() => (formState.login ? login() : signup())}
      >
        {formState.login ? "login" : "create account"}
      </button>
      <button className="pointer button" onClick={toggleLogin}>
        {formState.login ? "need an account?" : "already have an account?"}
      </button>
    </div>
  )
}

export default Login
