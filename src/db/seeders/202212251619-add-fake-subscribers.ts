import type { CreationAttributes, QueryInterface } from "sequelize";
import { Subscriber } from "../models";

const TABLE_NAME = "subscriber";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const subscribers = [...Array(34)]
  .map((_, index) => ({
    humanId: (index + 1) as number | null,
    position: null as string | null,
    createdAt: new Date(),
    updateAt: new Date(),
  }))
  .concat([
    {
      humanId: null,
      position: "duty officer 1",
      createdAt: new Date(),
      updateAt: new Date(),
    },
    {
      humanId: null,
      position: "duty officer 2",
      createdAt: new Date(),
      updateAt: new Date(),
    },
  ]) as CreationAttributes<Subscriber>[];

module.exports = {
  up: () => {
    return Subscriber.bulkCreate(subscribers);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(TABLE_NAME, {}, {});
  },
};
