const databaseId = '6825746300122ba54a41'; 
const collectionId = '6825747a003a01222e2d'; 

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
      [`user:${userId}`], 
      [`user:${userId}`]  
    );
    return res;
  } catch (error) {
    throw error;
  }
};
