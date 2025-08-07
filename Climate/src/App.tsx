import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import { ThemeProvider } from './context/theme-provide'
import WeatherDashboard from "./pages/weatherDashboard"
import CityPage from './pages/cityPage'

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme='dark'>
        <Layout>
          <Routes>
            <Route path='/' element={<WeatherDashboard />} />
            <Route path='/city/:cityName' element={<CityPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
