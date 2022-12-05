import { Link } from "react-router-dom"

function None() {
    return (
        <div className="main">
            <h1>404 Page not found</h1>
            <Link to="/">Take me home</Link>
        </div>
    )
}

export default None; 