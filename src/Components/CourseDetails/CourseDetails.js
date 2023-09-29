import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './CourseDetails.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADER',
}

class CourseDetails extends Component {
  state = {courseDetailsList: [], apiViewStatus: apiStatus.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  renderSuccessView = () => {
    const {courseDetailsList} = this.state
    return (
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
        <div className="course-details-container">
          <img
            src={courseDetailsList.imageUrl}
            alt={courseDetailsList.name}
            className="details-image"
          />
          <div className="description-container">
            <h1 className="name">{courseDetailsList.name}</h1>
            <p className="description">{courseDetailsList.description}</p>
          </div>
        </div>
      </>
    )
  }

  onClickRetry = () => this.renderSuccessView()

  renderFailureView = () => (
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
      <div className="failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-text">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" onClick={this.onClickRetry}>
          Retry
        </button>
      </div>
    </>
  )

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCoursePageView = () => {
    const {apiViewStatus} = this.state
    switch (apiViewStatus) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.loader:
        return this.renderLoader()
      default:
        return null
    }
  }

  getCourseDetails = async () => {
    this.setState({apiViewStatus: apiStatus.loader})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const fetchUrl = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const courseDetails = await fetchUrl.json()
    const updatesCourseDetails = {
      id: courseDetails.course_details.id,
      description: courseDetails.course_details.description,
      imageUrl: courseDetails.course_details.image_url,
      name: courseDetails.course_details.name,
    }
    if (fetchUrl.ok === true) {
      this.setState({
        courseDetailsList: updatesCourseDetails,
        apiViewStatus: apiStatus.success,
      })
    } else {
      this.setState({apiViewStatus: apiStatus.failure})
    }
  }

  render() {
    return <>{this.renderCoursePageView()}</>
  }
}
export default CourseDetails
