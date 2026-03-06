import {Response, Request} from 'express';
import {AuthService} from './auth.service';

export class AuthController {
    constructor() {
        this.authService = new AuthService();
    }
    async register(req, res) {
        try {
            const {email, password, name} = req.body;
            const result = await this.authService.registerAsync(email, password, name);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
    async login(req, res) {
        try {
            const {email, password} = req.body;
            const result = await this.authService.loginAsync(email, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}