import { Request, Response } from 'express';
import { Service } from 'typedi';
import StoryService from '../services/story.service';
import { Story } from './types/story.type';

@Service() 
export default class StoryController {
    constructor(private readonly storyService: StoryService) { }

async create(req: Request, res: Response): Promise<void> {
    const story: Story = req.body;

    try {
      const createdStory = await this.storyService.create(story);
      res.status(201).json(createdStory);
    } catch (err) {
      console.error('Error al crear la historia:', err);
      res.status(500).json({ error: 'Error al crear la historia' });
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    const storyId = req.params.id;

    try {
      const story = await this.storyService.findById(storyId);
      res.json(story);
    } catch (err) {
      console.error('Error al obtener la historia:', err);
      res.status(500).json({ error: 'Error al obtener la historia' });
    }
  }
  async find(req: Request, res: Response): Promise<any> {
    try {
      const stories = await this.storyService.find();
      res.json(stories);
    } catch (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }
  async findBy(req: Request, res: Response): Promise<any> {
    const userId: string = req.query.userId as string; 
    try {
      const stories = await this.storyService.findBy("userId", userId);
      res.json(stories);
    } catch (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }

   /*async update(req: Request, res: Response): Promise<any> {
    const storyId = req.params.id;
    const { storyname, email, password } = req.body;

    try {
      const updatedStory = await StoryService.updateStory(storyId, storyname, email, password);
      res.json(updatedStory);
    } catch (err) {
      console.error('Error al actualizar la historia:', err);
      res.status(500).json({ error: 'Error al actualizar la historia' });
    }
  }*/

   async delete(req: Request, res: Response): Promise<any> {
    const storyId = req.params.id;

    try {
      await this.storyService.delete(storyId);
      res.sendStatus(204);
    } catch (err) {
      console.error('Error al eliminar la historia:', err);
      res.status(500).json({ error: 'Error al eliminar la historia' });
    }
  }
}
