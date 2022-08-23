import { BrowserRouter, Routes, Route } from "react-router-dom"

import { ThemeProvider } from "@mui/material"

import About from "./components/About"
import Home from "./components/Home"
import Questionnaire from "./components/Questionnaire"
import MhtResults from "./components/MhtResults"
import SymptomQuestionnaire from "./components/SymptomQuestionnaire"

import Navbar from "./components/common/Navbar"
import Disclaimer from "./components/common/Disclaimer"
import Footer from "./components/common/Footer"
import theme from "./components/common/theme"

const App = () => {
  const Pages = [
    {route: "/", Page: Home},
    {route: "/about", Page: About},
    {route: "/questionnaire", Page: Questionnaire},
    {route: "/results", Page: MhtResults},
    {route: "/symptoms", Page: SymptomQuestionnaire},
  ]

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Disclaimer />
        <Routes>
          {Pages.map( ({ route, Page}) => 
            <Route key={route} path={route} element={<Page />}/>) 
          }
        </Routes>
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
