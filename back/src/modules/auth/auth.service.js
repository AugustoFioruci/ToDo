import bcrypt from 'bcrypt';
import {prisma } from '../../config/database.js';
import {generateAcessToken} from '../../utils/jwt.js';

export class AuthService {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }
    async registerAsync(email, password, name) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        const token = generateAcessToken(user);
        return {user: {id: user.id, email: user.email, name: user.name}, token};
    }
    async loginAsync(email, password) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = generateAcessToken(user);
        return {user: {id: user.id, email: user.email, name: user.name}, token};
    }
}