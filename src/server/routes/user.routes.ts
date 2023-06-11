import express, { Request, Response } from 'express';
import UserController from '../../controllers/user.controller';
import UserRepository from '../../repositories/user.repository';
import UserService from '../../services/user.service';

const router = express.Router();

const userRepository = new UserRepository();

const userService = new UserService(userRepository)

const userController = new UserController(userService);

router.post('/', userController.create.bind(userController));
router.get('/:id', userController.findById.bind(userController));
router.get('/', userController.find.bind(userController));
// router.put('/stories/:id', userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

export default router;
