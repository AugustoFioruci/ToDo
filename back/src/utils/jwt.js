import jwt from 'jsonwebtoken';
import {config} from '../config/env.js';

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, config.accessSecret, { expiresIn: config.accessExpiration });
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.accessSecret);
    } catch (err) {
        return null;
    }
}