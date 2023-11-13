import { Route, Routes } from "react-router-dom"
import  Administracion  from "../pages/Administracion"
import HomePage from "../pages/HomePage"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/administracion" element={<Administracion/>}/>
    </Routes>
  )
}

export default AppRoutes