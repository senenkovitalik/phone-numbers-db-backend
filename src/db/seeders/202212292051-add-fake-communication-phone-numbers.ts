import type { CreationAttributes, QueryInterface } from "sequelize";
import { CommunicationPhoneNumber } from "../models";

const TABLE_NAME = "communication_phone_number";

const communicationPhoneNumbers: CreationAttributes<CommunicationPhoneNumber>[] =
  [
    {
      value: "72312",
      communicationTypeId: 1,
      locationId: 1,
      subscriberId: 30,
    },
    {
      value: "75581",
      communicationTypeId: 1,
      locationId: 1,
    },
    {
      value: "79856",
      communicationTypeId: 1,
      locationId: 2,
    },
    {
      value: "71702",
      communicationTypeId: 1,
      locationId: 3,
    },
    {
      value: "78744",
      communicationTypeId: 1,
      locationId: 2,
    },
    {
      value: "75732",
      communicationTypeId: 1,
      locationId: 4,
    },
    {
      value: "73857",
      communicationTypeId: 1,
      locationId: 1,
    },
    {
      value: "71023",
      communicationTypeId: 1,
      locationId: 1,
    },
    {
      value: "74504",
      communicationTypeId: 1,
      locationId: 1,
    },
    {
      value: "72526",
      communicationTypeId: 1,
      locationId: 1,
    },
    {
      value: "1878",
      communicationTypeId: 2,
      locationId: 3,
    },
    {
      value: "1131",
      communicationTypeId: 2,
      locationId: 2,
    },
    {
      value: "1735",
      communicationTypeId: 2,
      locationId: 4,
    },
    {
      value: "1989",
      communicationTypeId: 2,
      locationId: 2,
    },
    {
      value: "1311",
      communicationTypeId: 2,
      locationId: 3,
    },
    {
      value: "1594",
      communicationTypeId: 2,
      locationId: 2,
    },
    {
      value: "1113",
      communicationTypeId: 2,
      locationId: 2,
    },
    {
      value: "1254",
      communicationTypeId: 2,
      locationId: 4,
    },
    {
      value: "1712",
      communicationTypeId: 2,
      locationId: 2,
    },
    {
      value: "1170",
      communicationTypeId: 2,
      locationId: 1,
    },
    {
      value: "175",
      communicationTypeId: 3,
      locationId: 3,
    },
    {
      value: "152",
      communicationTypeId: 3,
      locationId: 2,
    },
    {
      value: "190",
      communicationTypeId: 3,
      locationId: 2,
    },
    {
      value: "197",
      communicationTypeId: 3,
      locationId: 4,
    },
    {
      value: "3440750",
      communicationTypeId: 4,
      locationId: 1,
    },
    {
      value: "2813167",
      communicationTypeId: 4,
      locationId: 1,
    },
    {
      value: "6523255",
      communicationTypeId: 4,
      locationId: 3,
    },
    {
      value: "8281969",
      communicationTypeId: 4,
      locationId: 1,
    },
    {
      value: "3595936",
      communicationTypeId: 4,
      locationId: 4,
    },
  ].map((item) => ({
    ...item,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

module.exports = {
  up: () => {
    return CommunicationPhoneNumber.bulkCreate(communicationPhoneNumbers);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(TABLE_NAME, {}, {});
  },
};
