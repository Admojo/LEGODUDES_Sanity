import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '4w6xlb78', //Fikk feilmelding React has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
    dataset: 'production'
  }
})
