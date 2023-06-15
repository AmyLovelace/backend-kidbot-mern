import { Story } from "./types/story.type";
import { storyModel } from "../entities/story.entity";
import dotNotation from 'mongo-dot-notation';


class StoryRepository {
    // Encuentra una historia por su ID
    async findById(id: string): Promise<Story> {
        return await storyModel().findOne({id});
    }

    // Encuentra todas las historias
    async find(): Promise<Story[]> {
        return await storyModel().find();
    }

    // Crea una nueva historia
    async create(story: Story): Promise<Story> {
        return await storyModel().create(story);
    }

    // Actualiza una historia por su ID
    async update(id: string, story: Story): Promise<Story> {
        const data: any = dotNotation.flatten(story);
        return storyModel().findOneAndUpdate({ id }, data, {
            new: true,
            useFindAndModify: false,
        });
    }

    // Elimina una historia por su ID
    async delete(id: string): Promise<Story | null>  {
        return storyModel().findOneAndDelete({ id });
    }

    // Encuentra historias por un tipo y valor de filtro específico
    async findBy(filterType: string, filterValue: string): Promise<any>{
        const queryString: string = `{"${filterType}":"${filterValue}"}`;
        const query: any = JSON.parse(queryString);
        return storyModel().find(query);
    }
}
export default StoryRepository;
