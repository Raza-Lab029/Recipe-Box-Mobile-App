import { Client, Databases, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://YOUR_APPWRITE_ENDPOINT')  // Replace with your Appwrite endpoint
  .setProject('YOUR_PROJECT_ID');                  // Replace with your project ID

export const databases = new Databases(client);
export const account = new Account(client);
