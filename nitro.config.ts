import { defineNitroConfig } from 'nitro/config'

export default defineNitroConfig({
  // Include the content directory in the server output
  serverAssets: [
    {
      baseName: 'content',
      dir: './content',
    },
  ],
})
