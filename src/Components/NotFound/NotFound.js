import {Link} from 'react-router-dom'
import './NotFound.css'

const NotFound = () => (
  <>
    <div className="website-logo-container">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
    </div>
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-text">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)
export default NotFound
