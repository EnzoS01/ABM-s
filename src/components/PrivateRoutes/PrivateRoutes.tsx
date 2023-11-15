import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { Navigate } from "react-router-dom";

type PrivateRoutesProps= {
    element: React.ReactNode;

};

const PrivateRoutes:React.FC<PrivateRoutesProps>= ({element}) => {
    //Utils
    const isLoggedIn: boolean=useIsLoggedIn();

    //Render
    if(isLoggedIn){
        return element;
    }else{
    return <Navigate to="/Login"/>;}
}

export default PrivateRoutes;