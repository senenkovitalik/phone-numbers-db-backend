import type { InferAttributes, QueryInterface } from "sequelize";
import { CommunicationPhoneNumber } from "../models";

const TABLE_NAME = "communication_phone_number";

const communicationPhoneNumbers: Array<
  InferAttributes<CommunicationPhoneNumber, { omit: "id" }>
> = [
  {
    value: "77000",
    communicationTypeId: 1,
    locationId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "77001",
    communicationTypeId: 1,
    locationId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "9000",
    communicationTypeId: 2,
    locationId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    value: "101",
    communicationTypeId: 3,
    locationId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: () => {
    return CommunicationPhoneNumber.bulkCreate(communicationPhoneNumbers);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(
      TABLE_NAME,
      [{ lastname: [communicationPhoneNumbers.map(({ value }) => value)] }],
      {}
    );
  },
};
