import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getData(): Promise<{
    "userId": number,
    "id": number,
    "title": string,
    "completed": boolean
  }> {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return response.data;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
