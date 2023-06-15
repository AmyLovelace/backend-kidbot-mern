import { Service } from "typedi";
import dotNotation from 'mongo-dot-notation';
import { userModel } from "../entities/user.entity";
import { User } from "../controllers/types/user.type";


@Service()
class UserRepository {
    async findById(id: string): Promise<any> {
        return await userModel().findOne({id});
    }
    async find(): Promise<any> {
        return await userModel().find();
    }

    async create(user: User): Promise<any> {
        return await userModel().create(user);
    }
    async update(id: string, user: User): Promise<any> {
        const data: any = dotNotation.flatten(user);//actualiza un user desde su id "aplanando" los datos en la BD
        return userModel().findOneAndUpdate({ id }, data, {
            new: true,
            useFindAndModify: false,
        });
    }
    async delete(id: string): Promise<any| null>  {
        return userModel().findOneAndDelete({ id })
    }

}
export default UserRepository;