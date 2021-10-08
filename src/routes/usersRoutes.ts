import { Router } from 'express';
import userController from '../controllers/usersController'
class UsersRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', userController.index);
        this.router.get('/users', userController.getUsers);
        this.router.get('/accounts', userController.getAccounts);
        this.router.get('/:email/:password', userController.login);
        this.router.get('/users-detail', userController.getUsersDetail);
        this.router.post('/users-detail-register', userController.saveUser);
        this.router.post('/accounts-register', userController.saveAccount);
        this.router.delete('/:idUser', userController.deleteUser);
    }

}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;