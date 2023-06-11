import { Service } from 'typedi';
import { Story } from '../controllers/types/story.type';
import StoryRepository from '../repositories/story.repository';

@Service()
export default class StoryService {
  constructor(private readonly storyRepository: StoryRepository){ }
  
  
  async create(story: Story): Promise<any> {
    
    return await this.storyRepository.create(story);
  }

  async findById(id: string): Promise<any> {
    return await this.storyRepository.findById(id);
  }

  async update(id: string, story: Story): Promise<any> {
    return await this.storyRepository.update(id, story);
  }

  async delete(id: string): Promise<any| null>  {
     return await this.storyRepository.delete(id);
  }

  async find(): Promise<any> {
    return await this.storyRepository.find();
  }
  async findBy(filterType: string, filterValue: string): Promise<any>{
    return await this.storyRepository.findBy(filterType, filterValue);
  }
}