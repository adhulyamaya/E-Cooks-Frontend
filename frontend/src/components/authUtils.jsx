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
  // checks if a user is authenticated based on the presence of an access token either in localStorage or in cookies. 
  