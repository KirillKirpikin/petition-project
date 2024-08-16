import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../hooks/useTypedSelector";
import Spiner from "../components/Spiner/Spiner";


interface AdminRouteProps {
    children: ReactNode;
  }

const AdminRoute = ({children}: AdminRouteProps) =>{
    const {status, isAuth} = useAppSelector(state=> state.user);
    if(status === 'loading') {
        return <Spiner/>
    }
    if (isAuth === false ) {
        return <Navigate to='/'/>;
    }
        
    return children;
}

export default AdminRoute;