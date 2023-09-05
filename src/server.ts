import { app } from './app'

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`🚀Server listening on port http://localhost:3333 🚀`)
  })
  .catch((err) => {
    console.log(`Error: ${err}`)
  })
