import { Request, Response } from 'express';
import pool from '../database';
class UserController {
    public index(req: Request, res: Response) {
        pool.query('DESCRIBE dbo.users'),
        res.json('users')
    }
    public async getUsers(req: Request, res: Response) {
        await pool.query('SELECT * FROM `dbo.users`', function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    }
    public async getUsersDetail(req: Request, res: Response) {
        await pool.query('SELECT * FROM `dbo.users.detail`', function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    }
    public async getAccounts(req: Request, res: Response) {
        await pool.query('SELECT * FROM `dbo.cuentas`', function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    }
    public async login (req: Request, res : Response): Promise<any> {
        const { email } = req.params;
        const { password } = req.params;
        await pool.query('SELECT * FROM `dbo.users` WHERE email = ? AND password = ?;',[email,password], function(err, result) {
            if (err) throw err;
            if(result.lenght<0){
                res.json(result)
            }else{
                res.json(result)
            }
        });

    }
    public async saveUser (req: Request, res : Response):Promise<void> {
        console.log(req.body);
        await pool.query('INSERT INTO `dbo.users.detail` set ?',[req.body], function(err, result) {
            if (err) throw err;
            if(result.lenght<0){
                res.json({"Respuesta":"Usuario guardado"});
            }else{
                res.json(result)
            }
        });
    }
    public async saveAccount (req: Request, res : Response):Promise<void> {
        console.log(req.body);
        await pool.query('INSERT INTO `dbo.cuentas` set ?',[req.body], function(err, result) {
            if (err) throw err;
            if(result.lenght<0){
                res.json({"Respuesta":"Cuenta guardada"});
            }else{
                res.json(result)
            }
        });
    }
    public async deleteUser (req: Request, res : Response):Promise<void> {
        console.log(req.body);
        const { idUser } = req.params;
        await pool.query('DELETE FROM `dbo.users.detail` WHERE idUser = ?',[idUser], function(err, result) {
            if (err) throw err;
            if(result){
                res.json({"Respuesta":"Usuario eliminado"});
            }else{
                res.json(result)
            }
        });
    }     
}

const userController = new UserController();
export default userController;