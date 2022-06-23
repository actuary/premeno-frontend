import { useState } from "react"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import Home from "./components/Home"
import PersonalDetails from "./components/PersonalDetails"
import MhtResults from "./components/MhtResults"

function App() {
  const padding = {
    padding: 5
  }

  const [formValues, setFormValues] = useState({})

  return (
    <Router>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/questionaire">Questionaire</Link>
        <Link style={padding} to="/results">Results</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionaire" element={<PersonalDetails setValues={setFormValues}/>} />
        <Route path="/results" element={<MhtResults values={formValues}/>} />
      </Routes>
      <div>
        <i>PreMeno: The MHT Risk Assessment Tool</i>
      </div>
    </Router>
  )
}

export default App
