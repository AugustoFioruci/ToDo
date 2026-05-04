import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async findAll() {
        return await this.userRepository.findAll();
    }
    async findById(id) {
        return await this.userRepository.findById(id);
    }
    async update(id, user) {
        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        }
        return await this.userRepository.update(id, user);
    }
    async delete(id) {
        return await this.userRepository.delete(id);
    }
}
