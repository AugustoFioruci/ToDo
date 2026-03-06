import jwt from 'jsonwebtoken';
import {config} from '../config/env.js';

export const generateAcessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, 
        config.accessSecret,
         { expiresIn: config.accessExpiration, algorithm: 'HS256' });
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.accessSecret, {
      algorithms: ['HS256'],
      complete: false,                
      ignoreExpiration: false
    });
  } catch (err) {
    console.error('JWT verify error:', err.name, err.message);
    return null;
  }
};