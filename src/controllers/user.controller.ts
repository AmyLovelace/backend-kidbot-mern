import { Request, Response } from 'express';
import { Service } from 'typedi';
import UserService from '../services/user.service';
import { User } from './types/user.type';

@Service() 
export default class UserController {
    constructor(private readonly userService: UserService) { }

async create(req: Request, res: Response): Promise<void> {
    const user: User = req.body;

    try {
      const createdUser = await this.userService.create(user);
      res.status(201).json(createdUser);
    } catch (err) {
      console.error('Error al crear el usuario:', err);
      res.status(500).json({ error: 'Error al crear el usuario' });
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    const userId = req.params.id;

    try {
      const user = await this.userService.findById(userId);
      res.json(user);
    } catch (err) {
      console.error('Error al obtener el usuario:', err);
      res.status(500).json({ error: 'Error al obtener el usuario' });
    }
  }
  async find(req: Request, res: Response): Promise<any> {
    try {
      const users = await this.userService.find();
      res.json(users);
    } catch (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }

   /*async update(req: Request, res: Response): Promise<any> {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    try {
      const updatedUser = await UserService.updateUser(userId, username, email, password);
      res.json(updatedUser);
    } catch (err) {
      console.error('Error al actualizar el usuario:', err);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  }*/

   async delete(req: Request, res: Response): Promise<any> {
    const userId = req.params.id;

    try {
      await this.userService.delete(userId);
      res.sendStatus(204);
    } catch (err) {
      console.error('Error al eliminar el usuario:', err);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  }
}
