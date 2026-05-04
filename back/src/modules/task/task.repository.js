import {prisma} from '../../config/database.js';

class TaskRepository {

    async findAll(){
        return await prisma.event.findMany();
    }
    async findById(id){
        return await prisma.event.findUnique({
            where: {id},
        });
    }
    async create(task, userId){
        return await prisma.event.create({
            data: {
                ...task,
                userId
            }
        });
    }
    async update(id, task, userId){
        return await prisma.event.update({
            where: {id},
            data: {
                ...task,
                userId
            }
        });
    }
    async delete(id){
        return await prisma.event.delete({
            where: {id}
        });
    }
}
export default TaskRepository;