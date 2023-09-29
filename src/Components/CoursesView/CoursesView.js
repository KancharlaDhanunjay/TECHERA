import {Link} from 'react-router-dom'
import './CoursesView.css'

const CoursesView = props => {
  const {CourseDetails} = props
  const {id, logoUrl, name} = CourseDetails
  return (
    <Link to={`/courses/${id}`} className="nav-link">
      <li className="course-view">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}
export default CoursesView
