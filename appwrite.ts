// appwrite.ts
import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://[YOUR_ENDPOINT]/v1') // replace with your actual Appwrite endpoint
  .setProject('[YOUR_PROJECT_ID]'); // replace with your actual project ID

const databases = new Databases(client); // ✅ create the databases instance

export { client, databases }; // ✅ export databases here
