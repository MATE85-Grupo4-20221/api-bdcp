import {createConnection, getConnection, getConnectionOptions} from 'typeorm';
require('dotenv').config()

const connection = {
  async create(){
    process.env.DB_NAME = process.env.DB_TEST_NAME;
    
    await getConnectionOptions()
    .then(async options => {
        return createConnection({ ...options, dropSchema:true, migrationsRun:true });
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
  },

  async close(){
    await getConnection().close(); 
  },

  async clear(){
    // Fetch all the entities
    const entities = getConnection().entityMetadatas;

    for (const entity of entities) {
        const repository = getConnection().getRepository(entity.name); // Get repository
        await repository.delete({})// Clear each entity table's content
    }
  },
};
export default connection;