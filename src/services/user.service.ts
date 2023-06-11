import { Service } from 'typedi';
import { User } from '../controllers/types/user.type';
import UserRepository from '../repositories/user.repository';

@Service()
export default class UserService {
  constructor(private readonly userRepository: UserRepository){ }
  
  
  async create(user: User): Promise<any> {
    return await this.userRepository.create(user);
  }

  async findById(id: string): Promise<any> {
    return await this.userRepository.findById(id);
  }

  async update(id: string, user: User): Promise<any> {
    return await this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<any| null>  {
     return await this.userRepository.delete(id);
  }

  async find(): Promise<any> {
    return await this.userRepository.find();
  }
}
