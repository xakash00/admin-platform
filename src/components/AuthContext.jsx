import { createContext, useEffect, useState, useRef, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../apis/axiosInstance';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );
    const interceptorRef = useRef(null);
    const isLoggingOutRef = useRef(false);

    const clearAuthState = useCallback(() => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        navigate('/login');
    }, [navigate]);

    const login = useCallback(async () => {
        try {
            const response = await api({
                method: 'post', url: "/login", withCredentials: true, data: { email: "omdevsinh@krishaweb.com", password: "11111111" }
            })
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(response.data?.data));
            toast.success(response?.data?.message)
            setIsAuthenticated(true);
            const role = response.data?.data?.role;
            if (role !== 'admin') {
                window.location.href = 'https://marketing-platform-sigma.vercel.app/';
            } else {
                window.location.href = '/';
            }
            return true;
        } catch (error) {
            toast.error(error?.message)
            console.log('Login failed:', error);
            return false;
        }
    }, []);

    const logout = useCallback(async () => {
        if (isLoggingOutRef.current) return; // Prevent recursive calls

        isLoggingOutRef.current = true;

        try {
            clearAuthState();
            await api({
                url: "/logout",
                method: "POST",
                withCredentials: true
            });
            console.log('Logout API called successfully');
        } catch (err) {
            console.log('Logout API error:', err);
        } finally {
            isLoggingOutRef.current = false;
        }
    }, [clearAuthState]);

    useEffect(() => {
        if (!interceptorRef.current) {
            interceptorRef.current = api.interceptors.response.use(
                res => res,
                err => {
                    console.log({ err })
                    if (err.response?.status === 401 && !isLoggingOutRef.current) {
                        if (isAuthenticated) {
                            console.log("401 detected, clearing auth state");
                            clearAuthState();
                        }
                    }
                    return Promise.reject(err);
                }
            );
        }
        return () => {
            if (interceptorRef.current) {
                api.interceptors.response.eject(interceptorRef.current);
                interceptorRef.current = null;
            }
        };
    }, [isAuthenticated, clearAuthState]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
