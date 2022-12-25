import type { InferAttributes, QueryInterface } from "sequelize";
import { Subscriber } from "../models";

const TABLE_NAME = "subscriber";

const subscribers: Array<InferAttributes<Subscriber, { omit: "id" }>> = [
  {
    firstName: "James",
    middleName: "Alan",
    lastName: "Hetfield",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: "Kirk",
    middleName: "Lee",
    lastName: "Hammet",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: "Jason",
    middleName: "Curtis",
    lastName: "Newstad",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: "Lars",
    middleName: "Von",
    lastName: "Ulrich",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: () => {
    return Subscriber.bulkCreate(subscribers);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(
      TABLE_NAME,
      [{ lastname: [subscribers.map(({ lastName }) => lastName)] }],
      {}
    );
  },
};
