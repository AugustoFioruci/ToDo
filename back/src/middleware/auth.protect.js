import jwt from 'jsonwebtoken';
import {config} from '../config/env.js';

const ALLOWED_ALGS = ['HS256'];

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token ausente ou mal formatado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.accessSecret, {
      algorithms: ALLOWED_ALGS,
      ignoreExpiration: false,
    });

    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    console.error('JWT verify error:', err);
    return res.status(401).json({ error: 'Falha na autenticação' });
  }
};