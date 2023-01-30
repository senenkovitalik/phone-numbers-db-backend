import type { InferAttributes, QueryInterface } from "sequelize";
import { Communication } from "../models";

const TABLE_NAME = "communication_type";

const communicationTypes: Array<
  InferAttributes<Communication, { omit: "id" }>
> = [
  {
    value: "PHONE SYSTEM ONE",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "PHONE SYSTEM TWO",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "PHONE SYSTEM THREE",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "PHONE SYSTEM FOUR",
    description: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: () => {
    return Communication.bulkCreate(communicationTypes);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(
      TABLE_NAME,
      [{ lastname: [communicationTypes.map(({ value }) => value)] }],
      {}
    );
  },
};
