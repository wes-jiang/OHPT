import { NavLink } from "react-router-dom"

export default function NotFound() {
  return (
    <div>
      <h2>Page not found!</h2>
      <p>You have somehow reached this page. Insert sad face.</p>

      <p>Go to the <NavLink to="/">Homepage</NavLink>.</p>
    </div>
  )
}