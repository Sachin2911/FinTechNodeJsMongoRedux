import { useMemo } from "react"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Box } from "@mui/material"
import Navbar from "@/scenes/navbar"
import Dashboard from "@/scenes/dashboard"
import Predictions from "@/scenes/predictions"

function App() {
  const theme = useMemo(()=>createTheme(themeSettings), [])
  return (
    <div className="app">
      <BrowserRouter>
      {/* Gives the theme settings we created */}
      <ThemeProvider theme={theme}>
        {/* Removes the default styling */}
        <CssBaseline/>
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/predictions" element={<Predictions/>}/>
          </Routes>
        </Box>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
