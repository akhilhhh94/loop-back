import {
  get,
  response,
  ResponseObject
} from '@loopback/rest';


const HELO_RESPONSE: ResponseObject = {
  description: 'Helloo Response',
  content: {
    'text/plain': {
      schema: {

      },
    },
  },
};



export class HelloController {
  @get('/hello')
  @response(200, HELO_RESPONSE)
  hello(): string {
    return 'Hello world!';
  }
}
