import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import Home from "./components/Home"
import PersonalDetailsForm from "./components/PersonalDetailsForm"
import MhtResults from "./components/MhtResults"

function App() {
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/questionaire">Questionaire</Link>
        <Link style={padding} to="/results">Results</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionaire" element={<PersonalDetailsForm />} />
        <Route path="/results" element={<MhtResults />} />
      </Routes>
      <div>
        <i>PreMeno: The MHT Risk Assessment Tool</i>
      </div>
    </Router>
  )
}

export default App
