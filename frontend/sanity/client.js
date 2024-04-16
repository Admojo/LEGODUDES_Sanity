import {createClient} from '@sanity/client'

export const client = createClient({
  //Hvis du har hentet dette prosjektet fra GitHub, må du endre
  //projectId til din egen prosjektid fra sanity.io/manage
  projectId: "4w6xlb78",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-03-07"
})

// skVW3QYMCN61PLq4P9RV4CyrXtAETCHfVYFoIo8Eb6eyOjwBu1BSE9bRiMQkCff8j5JfPqXMa4jS9xsViBUICXAdk0VBavAqlOAhFDUqnDJZUo9YibfC8lQS8tBgbhjO8ECyHKuF3exjZluo7gCjk8C1Bav6XRyVAu14cO2kO8yYMs0Gm2w9

export const writeClient = createClient ({
  projectId: "4w6xlb78",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-03-07",
  token: 
  "skVW3QYMCN61PLq4P9RV4CyrXtAETCHfVYFoIo8Eb6eyOjwBu1BSE9bRiMQkCff8j5JfPqXMa4jS9xsViBUICXAdk0VBavAqlOAhFDUqnDJZUo9YibfC8lQS8tBgbhjO8ECyHKuF3exjZluo7gCjk8C1Bav6XRyVAu14cO2kO8yYMs0Gm2w9"

})

