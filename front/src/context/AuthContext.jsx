import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tenta recuperar o token ao iniciar
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Aqui idealmente teríamos uma rota /users/me no backend para validar o token e pegar dados do usuário.
          // Como não temos certeza se existe, vamos apenas assumir que o token é válido para o escopo do frontend.
          // Se o token for inválido, o interceptor do axios fará o logout na primeira requisição que falhar.
          setUser({ token });
        } catch (error) {
          console.error("Token inválido", error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data; // Supondo que retorne { token, user }
      
      localStorage.setItem('token', token);
      setUser(userData || { token }); 
      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error);
      return { 
        success: false, 
        message: error.response?.data?.error || "Erro ao fazer login" 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      await api.post('/auth/register', { name, email, password });
      return { success: true };
    } catch (error) {
      console.error("Erro no registro:", error);
      return { 
        success: false, 
        message: error.response?.data?.error || "Erro ao registrar usuário" 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
