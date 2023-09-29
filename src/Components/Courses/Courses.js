import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import CoursesView from '../CoursesView/CoursesView'
import './Courses.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loader: 'LOADER',
}

class Courses extends Component {
  state = {coursesDatalist: [], apiViewStatus: apiStatus.initial}

  componentDidMount() {
    this.getCoursesList()
  }

  renderSuccessView = () => {
    const {coursesDatalist} = this.state
    return (
      <>
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <div className="courses-container">
          <h1 className="courses-heading">Courses</h1>
          <ul className="course-view-container">
            {coursesDatalist.map(eachCourse => (
              <CoursesView CourseDetails={eachCourse} key={eachCourse.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

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

  onClickRetry = () => this.renderSuccessView()

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

  getCoursesList = async () => {
    this.setState({apiViewStatus: apiStatus.loader})
    const fetchData = await fetch('https://apis.ccbp.in/te/courses')
    const coursesData = await fetchData.json()
    const updatedCourserData = coursesData.courses.map(eachCourse => ({
      id: eachCourse.id,
      name: eachCourse.name,
      logoUrl: eachCourse.logo_url,
    }))
    if (fetchData.ok === true) {
      this.setState({
        coursesDatalist: updatedCourserData,
        apiViewStatus: apiStatus.success,
      })
    } else {
      this.setState({apiViewStatus: apiStatus.failure})
      console.log('error')
    }
  }

  render() {
    return <>{this.renderCoursePageView()}</>
  }
}
export default Courses
