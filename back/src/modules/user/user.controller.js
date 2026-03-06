import {UserService} from './user.service.js';

const userService = new UserService();

class UserController {
    async findAll(req, res) {
        try{
            const users = await userService.findAll();
            res.json(users);
        }catch (error) {
            res.status(500).json({error: error.message});
        }
     
    }
    async findById(req, res) {
        try{
            const user = await userService.findById(req.params.id);
            if(user){
                res.json(user);
            }else{
                res.status(404).json({error: 'User not found'});
            }
        }catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async update(req, res) {
        try{
            const user = await userService.update(req.params.id, req.body);
            res.json(user);
        }catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    async delete(req, res) {
        try{
            await userService.delete(req.params.id);
            res.status(204).send();
        }catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}
export default UserController;