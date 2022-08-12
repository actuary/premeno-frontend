import { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

import Navbar from "./Navbar"
import Footer from "./components/Footer"
import About from "./components/About"
import Home from "./components/Home"
import Questionnaire from "./components/forms/Questionnaire"
import MhtResults from "./components/MhtResults"

const App = () => {
  const [formValues, setFormValues] = useState({})

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(formValues))
  }, [formValues])

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/questionnaire" element={<Questionnaire setValues={setFormValues}/>} />
        <Route path="/results" element={<MhtResults values={formValues}/>} />
        <Route path="/symptoms" element={<MhtResults values={formValues}/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
