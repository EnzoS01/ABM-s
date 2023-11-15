import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Componentes from "../pages/Componentes"
import Administracion from "../pages/Administracion"
import Login from "../pages/Login"
import PrivateRoutes from "../components/PrivateRoutes/PrivateRoutes"


const AppsRoutes: React.FC = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={<HomePage/>}> </Route>
          <Route path='/componentes' element={<Componentes/>}> </Route>
          <Route path='/administracion' element={<PrivateRoutes element={<Administracion/>}/>}> </Route>
          <Route path='/login' element={<Login/>}> </Route>
        </Routes>
    </>
  )
}

export default AppsRoutes