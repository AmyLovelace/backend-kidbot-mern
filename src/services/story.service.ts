import { Service } from 'typedi';
import StoryRepository from '../repositories/story.repository';
import OpenAIApiClient from '../clients/openapi.client';
import { StoryPrompt } from './types/storyprompt.type';
import { Story } from './types/story.type';


export default class StoryService {
  constructor(private readonly storyRepository: StoryRepository, private readonly openApiClient: OpenAIApiClient) { }
  // Inyección de dependencias Estas dependencias se pasan al constructor de la clase mediante la técnica de inyección de dependencias

  async generateStory(prompt: string): Promise<any> {
    const response: string = await this.openApiClient.generateStory(prompt);
    return response;
  }

  async create(storyPrompt: StoryPrompt): Promise<any> {
    const prompt: string = `Crea una hermosa historia de ${storyPrompt.genre} para niños de ${storyPrompt.age} años con un protagonista llamado ${storyPrompt.characterName} sobre ${storyPrompt.themeOne} y ${storyPrompt.themeTwo}`;
    const storyTitle: string = `La historia de ${storyPrompt.characterName} sobre ${storyPrompt.themeOne} y ${storyPrompt.themeTwo}`;

    const response: string = await this.generateStory(prompt); // Generar una historia utilizando el cliente de la API de OpenAI

    const story: Story = {
      storyTitle: storyTitle,
      storyContent: response, // Asignar la respuesta generada como contenido de la historia
      userId: storyPrompt.userId, // Identificador de usuario
    };

    const createdStory: any = await this.storyRepository.create(story); // Crear la historia utilizando el storyRepository
    console.log(createdStory);
    return createdStory;
  }

  async findById(id: string): Promise<any> {
    return await this.storyRepository.findById(id); // Buscar una historia por su identificador utilizando el repositorio
  }

  async update(id: string, story: Story): Promise<any> {
    return await this.storyRepository.update(id, story); // Actualizar una historia utilizando el repositorio
  }

  async delete(id: string): Promise<any | null> {
    return await this.storyRepository.delete(id); // Eliminar una historia por su identificador utilizando el repositorio
  }

  async find(): Promise<any> {
    return await this.storyRepository.find(); // Obtener todas las historias utilizando el repositorio
  }

  async findBy(filterType: string, filterValue: string): Promise<any> {
    return await this.storyRepository.findBy(filterType, filterValue); // Buscar historias por un tipo de filtro y su valor utilizando el repositorio
  }
}
