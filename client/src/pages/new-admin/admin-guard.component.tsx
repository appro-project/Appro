import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { axiosCheckToken } from "@/services/server-data";

const AdminGuard: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['JWT']);
  const location = useLocation();

  useEffect(() => {

    const checkAuth = async () => {
      if (!cookies) {
        setIsAuth(false);
        return;
      }

      try {
        const response = await axiosCheckToken();
        if (response.status === 200) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
      } catch (error) {
        console.error('Error during token check:', error);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [cookies, location]); 
  
  if (isAuth === null) {
    return <div>Загрузка...</div>; 
  }

  return isAuth ? <Outlet /> : <Navigate to="/login?redirect=/admin" />;
};

export default AdminGuard;