import { DateFunctions } from "../../functions";
// A map of functions which return data for the schema
export default {
  Query: {
    getAllEnvTest: async (_, {}, { EnvTest }) => {
      const allEnvTest = await EnvTest.find();
      return allEnvTest;
    },
    getEnvByID: async (_, { id }, { EnvTest }) => {
      const envById = await EnvTest.findById(id);
      return envById;
    },
  },
  Mutation: {
    createNewEnv: async (_, { newEnv }, { EnvTest }, info) => {
      console.log(newEnv);
      console.log(EnvTest);
      // newEnv["name"].trim()
      if (newEnv["updatedBy"] === '') {
        return null
      }

      // newEnv["name"] = newEnv["name"].toUpperCase();
      // newEnv["updatedBy"] = newEnv["updatedBy"].toLowerCase()
      const result = await EnvTest.create(newEnv);
      return result;
    },
    editEnvByID: async (_, { id, updateEnv }, { EnvTest }) => {
      if (updateEnv.updatedBy === '') {
        return null
      }
      const editedEnv = await EnvTest.findByIdAndUpdate(
        id,
        { ...updateEnv },
        { new: true }
      );
      console.log(updateEnv);
      return editedEnv;
    },
    deleteEnvByID: async (_, { id, deletedBy }, { EnvTest }) => {
      if (deletedBy === '') {
        return null
      }
      const deletedEnv = await EnvTest.findByIdAndDelete(id);

      return {
        id: deletedEnv.id,
        deletedBy: deletedBy,
        message: `L'environnement - ${deletedEnv.name} -  est supprimé`,
        success: true,
      };
    },
  },
};
