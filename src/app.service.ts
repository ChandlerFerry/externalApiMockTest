import { Injectable } from '@nestjs/common';
import axios from 'axios';
import jsYaml from 'js-yaml';
import fs from "node:fs";
@Injectable()
export class AppService {
  async getData(): Promise<{
    "userId": number,
    "id": number,
    "title": string,
    "completed": boolean
  }> {
    let config = {
      EXTERNAL_API: ''
    }

    if(process.env.ENVOYENABLED === "enabled") {
      config.EXTERNAL_API = 'https://jsonplaceholder.typicode.com/todos/1';
    } else {
      // Load the environment variables from /etc/config/some_partner_1.yaml
      const file = fs.readFileSync('/etc/config/some_partner_1.yaml', 'utf8');

      config = jsYaml.load(file) as {
        EXTERNAL_API: string;
      };

      if (!config.EXTERNAL_API) {
        throw new Error('EXTERNAL_API not found in some_partner_1.yaml');
      }
    }

    if(!config.EXTERNAL_API) {
      throw new Error('EXTERNAL_API not found');
    }


    const response = await axios.get(config.EXTERNAL_API);
    return response.data;
  }
  
  getHello(): string {
    return 'Hello World!';
  }
}
