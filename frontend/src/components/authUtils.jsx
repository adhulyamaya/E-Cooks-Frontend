import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  
    const localStorageToken = localStorage.getItem('accessToken');
    if (localStorageToken) {
      return true;
    }
  
    const cookieToken = Cookies.get('accessToken');
    if (cookieToken) {
      return true;
    }
  
    
    return false;
  };
  
  