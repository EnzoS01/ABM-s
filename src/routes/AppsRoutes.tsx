import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Componentes from "../pages/Componentes"
import Administracion from "../pages/Administracion"

const AppsRoutes: React.FC = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<HomePage/>}> </Route>
          <Route path='/componentes' element={<Componentes/>}> </Route>
          <Route path='/administracion' element={<Administracion/>}> </Route>
        </Routes>
    </>
  )
}

export default AppsRoutes