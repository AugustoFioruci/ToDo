import { TaskService} from "./task.service.js";

class TaskController {
    constructor() {
        this.taskService = new TaskService();
    }
    async findAll(req, res) {
        try{
            const tasks = await this.taskService.findAll();
            res.json(tasks);
        }catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async findById(req, res) {
        try{
            const task = await this.taskService.findById(req.params.id);
            if(task){
                res.json(task);
            }else{
                res.status(404).json({error: 'Task not found'});
            }
        }catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async create(req, res) {
        try{
            const task = await this.taskService.create(req.body, req.user.id);
            res.status(201).json(task);
        }catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async update(req, res) {
        const id = Number(req.params.id);
        try{
            const task = await this.taskService.update(id, req.body, req.user.id);
            res.json(task);
        }catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async delete(req, res) {
        const id = Number(req.params.id);
        try{
            await this.taskService.delete(id);
            res.status(204).send();
        }catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}
export default TaskController;