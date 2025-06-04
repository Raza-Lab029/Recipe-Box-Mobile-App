const databaseId = '6825746300122ba54a41'; // Example: real ID from Appwrite
const collectionId = '6825747a003a01222e2d'; // Example: real collection ID

export const addRecipe = async (
  title: string,
  ingredients: string,
  steps: string,
  userId: string
) => {
  try {
    const res = await databaseId.createDocument(
      databaseId,
      collectionId,
      'unique()',
      {
        title,
        ingredients,
        steps,
        createdBy: userId,
      },
      [`user:${userId}`], // read permission
      [`user:${userId}`]  // write permission
    );
    return res;
  } catch (error) {
    throw error;
  }
};
