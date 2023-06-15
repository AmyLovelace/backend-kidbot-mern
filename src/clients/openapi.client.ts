import axios from 'axios';

export default class OpenAIApiClient {

  // Se define la clase OpenAIApiClient para interactuar con la API de OpenAI

  private apiKey: string = process.env.OPENAI_API_KEY || ''; // Clave de la API de OpenAI
  private endpoint: string = process.env.OPENAI_ENDPOINT || ''; // Punto final de la API de OpenAI

  // Método para generar una historia basada en un prompt dado
  async generateStory(storyPrompt: string): Promise<string> {
    const requestBody = {
      model: 'text-davinci-003', // El modelo de lenguaje a utilizar
      prompt: storyPrompt, // El prompt construido con el input del usuario desde el front
      max_tokens: 2046, // El máximo número de tokens que se generarán en la historia
      temperature: 0, // El nivel de aleatoriedad en la generación del texto 
    };

    const headersConfig = {
      headers: {
        'Content-Type': 'application/json', // Configuración de las headers de la solicitud
        Authorization: `Bearer ${this.apiKey}`, // Autorización utilizando la Apikey
      },
    };

    try {
      const response = await axios.post(this.endpoint, requestBody, headersConfig); // Realizar la solicitud a la API de OpenAI
      const responseBody = response.data; // Obtener la respuesta de la API
      const storyText = responseBody.choices[0].text; // Extraer el texto generado de la respuesta

      return storyText; // Devolver la historia generada
    } catch (error) {
      console.error('Error al generar la historia:', error); // Manejar cualquier error ocurrido durante la solicitud
      throw new Error('Error al generar la historia');
    }
  }
}
