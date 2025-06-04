import { Client, Databases, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://YOUR_APPWRITE_ENDPOINT')  
  .setProject('YOUR_PROJECT_ID');                 

export const databases = new Databases(client);
export const account = new Account(client);
