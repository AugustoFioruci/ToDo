import {prisma} from '../../config/database.js';

class UserRepository {

    async findAll(){
        return await prisma.user.findMany();
    }
    async findById(id){
        return await prisma.user.findUnique({
            where: {id}
        });
    }
    async update(id, user){
        return await prisma.user.update({
            where: {id},
            data: user
        });
    }
    async delete(id){
        return await prisma.user.delete({
            where: {id}
        });
    }
}
export default UserRepository;