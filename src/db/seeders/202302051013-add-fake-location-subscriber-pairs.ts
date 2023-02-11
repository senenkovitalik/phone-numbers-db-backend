import { Attributes } from "sequelize";
import { LocationsSubscribers } from "../models";

const pairs: Attributes<LocationsSubscribers>[] = [
  {
    subscriberId: 1,
    locationId: 1,
  },
  {
    subscriberId: 1,
    locationId: 3,
  },
  {
    subscriberId: 2,
    locationId: 2,
  },
  {
    subscriberId: 2,
    locationId: 4,
  },
  {
    subscriberId: 3,
    locationId: 3,
  },
  {
    subscriberId: 3,
    locationId: 4,
  },
  {
    subscriberId: 4,
    locationId: 2,
  },
  {
    subscriberId: 5,
    locationId: 4,
  },
  {
    subscriberId: 5,
    locationId: 2,
  },
  {
    subscriberId: 6,
    locationId: 1,
  },
  {
    subscriberId: 7,
    locationId: 1,
  },
  {
    subscriberId: 8,
    locationId: 1,
  },
  {
    subscriberId: 9,
    locationId: 4,
  },
  {
    subscriberId: 10,
    locationId: 3,
  },
  {
    subscriberId: 11,
    locationId: 3,
  },
  {
    subscriberId: 12,
    locationId: 4,
  },
  {
    subscriberId: 13,
    locationId: 1,
  },
  {
    subscriberId: 14,
    locationId: 1,
  },
  {
    subscriberId: 15,
    locationId: 4,
  },
  {
    subscriberId: 16,
    locationId: 4,
  },
  {
    subscriberId: 17,
    locationId: 2,
  },
  {
    subscriberId: 18,
    locationId: 4,
  },
  {
    subscriberId: 19,
    locationId: 2,
  },
  {
    subscriberId: 20,
    locationId: 1,
  },
  {
    subscriberId: 21,
    locationId: 1,
  },
  {
    subscriberId: 22,
    locationId: 2,
  },
  {
    subscriberId: 23,
    locationId: 4,
  },
  {
    subscriberId: 24,
    locationId: 2,
  },
  {
    subscriberId: 25,
    locationId: 2,
  },
  {
    subscriberId: 26,

    locationId: 1,
  },
  {
    subscriberId: 27,
    locationId: 3,
  },
  {
    subscriberId: 28,
    locationId: 4,
  },
  {
    subscriberId: 29,
    locationId: 2,
  },
  {
    subscriberId: 30,
    locationId: 3,
  },
  {
    subscriberId: 31,
    locationId: 4,
  },
  {
    subscriberId: 32,
    locationId: 1,
  },
  {
    subscriberId: 33,
    locationId: 4,
  },
  {
    subscriberId: 34,
    locationId: 3,
  },
];

module.exports = {
  up: () => {
    return LocationsSubscribers.bulkCreate(pairs);
  },
  down: () => {
    return LocationsSubscribers.destroy();
  },
};
