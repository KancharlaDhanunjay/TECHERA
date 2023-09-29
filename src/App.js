import {Switch, Route} from 'react-router-dom'
import Courses from './Components/Courses/Courses'
import CourseDetails from './Components/CourseDetails/CourseDetails'
import NotFound from './Components/NotFound/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Courses} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
