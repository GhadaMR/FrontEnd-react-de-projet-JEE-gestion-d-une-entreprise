import { BrowserRouter } from 'react-router-dom'
import NavbarComponent from './components/Navbar/NavbarComponent'

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
    </BrowserRouter>
  )
}

export default App