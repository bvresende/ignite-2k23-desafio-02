import { app } from './app'

void app.listen({
  port: 3333
}).then(() => { console.log('Server is running in 3333') })
