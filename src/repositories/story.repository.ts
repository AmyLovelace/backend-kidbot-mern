import { Service } from "typedi";
import { Story } from "./types/story.type";
import { storyModel } from "../entities/story.entity";
import dotNotation from 'mongo-dot-notation';


@Service()
class StoryRepository {
    async findById(id: string): Promise<Story> {
        return await storyModel().findOne({id});
    }
    async find(): Promise<Story[]> {
        return await storyModel().find();
    }

    async create(story: Story): Promise<Story> {
        return await storyModel().create(story);
    }
    async update(id: string, story: Story): Promise<Story> {
        const data: any = dotNotation.flatten(story);
        return storyModel().findOneAndUpdate({ id }, data, {
            new: true,
            useFindAndModify: false,
        });
    }
    async delete(id: string): Promise<Story | null>  {
        return storyModel().findOneAndDelete({ id })
    }
    async findBy(filterType: string, filterValue: string): Promise<any>{
        const queryString: string = `{"${filterType}":"${filterValue}"}`;
        const query: any = JSON.parse(queryString);
        return storyModel().find(query)
    }


}
export default StoryRepository;