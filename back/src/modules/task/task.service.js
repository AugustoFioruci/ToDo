import { use } from "react";
import TaskRepository from "./task.repository.js";

export class TaskService {
    constructor() {
        this.taskRepository = new TaskRepository();
    }

    async findAll() {
        return await this.taskRepository.findAll();
    }

    async findById(id) {
        return await this.taskRepository.findById(id);
    }

    async create(task, userId) {
        return await this.taskRepository.create(task, userId);
    }

    async update(id, task, userId) {
        return await this.taskRepository.update(id, task, userId);
    }

    async delete(id) {
        return await this.taskRepository.delete(id);
    }
}