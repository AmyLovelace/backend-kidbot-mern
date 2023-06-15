import { Request, Response } from 'express';
import StoryService from '../services/story.service';
import { StoryPrompt } from './types/storyprompt.type';

export default class StoryController {
  constructor(private readonly storyService: StoryService) { }
/*
 */
  async create(req: Request, res: Response): Promise<void> {
    const storyPrompt: StoryPrompt = req.body;

    try {
      const createdStory = await this.storyService.create(storyPrompt);
      res.status(201).json(createdStory); // Devuelve la historia creada en la respuesta con código 201 (creado)
    } catch (err) {
      console.error('Error al crear la historia:', err);
      res.status(500).json({ error: 'Error al crear la historia' }); 
      // Devuelve un mensaje de error en la respuesta con código 500 (error interno del servidor)
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    const storyId = req.params.id;

    try {
      const story = await this.storyService.findById(storyId);
      res.json(story); // Devuelve la historia encontrada en la respuesta
    } catch (err) {
      console.error('Error al obtener la historia:', err);
      res.status(500).json({ error: 'Error al obtener la historia' });
    }
  }

  async find(req: Request, res: Response): Promise<any> {
    try {
      const stories = await this.storyService.find();
      res.json(stories); // Devuelve todas las historias encontradas en la respuesta
    } catch (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }

  async findBy(req: Request, res: Response): Promise<any> {
    const userId: string = req.query.userId as string;

    try {
      const stories = await this.storyService.findBy("userId", userId); // Busca las historias por el ID del usuario
      res.json(stories); // Devuelve las historias encontradas en la respuesta
    } catch (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }

  /*
  async update(req: Request, res: Response): Promise<any> {
    const storyId = req.params.id;

    try {
      const updatedStory = await StoryService.updateStory(storyId, data);
      res.json(updatedStory);
    } catch (err) {
      console.error('Error al actualizar la historia:', err);
      res.status(500).json({ error: 'Error al actualizar la historia' });
    }
  }
  */

  async delete(req: Request, res: Response): Promise<any> {
    const storyId = req.params.id;

    try {
      await this.storyService.delete(storyId); // Elimina la historia por su ID
      res.sendStatus(204); // Devuelve un código 204 (sin contenido) en la respuesta para indicar que la operación se realizó con éxito
    } catch (err) {
      console.error('Error al eliminar la historia:', err);
      res.status(500).json({ error: 'Error al eliminar la historia' });
    }
  }
}
