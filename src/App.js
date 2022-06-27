import { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

import Navbar from "./Navbar"
import Home from "./components/Home"
import PersonalDetails from "./components/PersonalDetails"
import MhtResults from "./components/MhtResults"

const App = () => {
  const [formValues, setFormValues] = useState({})
  
  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(formValues))
  }, [formValues])

  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<Home />} />
        <Route path="/questionnaire" element={<PersonalDetails setValues={setFormValues}/>} />
        <Route path="/results" element={<MhtResults values={formValues}/>} />
      </Routes>
      <div>
        <i>PreMeno: The MHT Risk Assessment Tool</i>
      </div>
    </Router>
  )
}

export default App
