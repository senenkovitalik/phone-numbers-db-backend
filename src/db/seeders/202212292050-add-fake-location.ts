import { CreationAttributes } from "sequelize";
import { Location } from "../models";

const locationData: CreationAttributes<Location>[] = [
  {
    name: "ARRAKIS",
    country: "Ukraine",
    region: "Zhytomir",
    city: "Yaropovichi",
    street: "Sichovich Striltciv",
    building: "45",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "KALADAN",
    country: "Ukraine",
    region: "Rivne",
    district: "Rivne",
    street: "Petra Mohily",
    building: "5",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "ARRAKEEN",
    country: "Ukraine",
    region: "Poltava",
    district: "Poltava",
    street: "Bohuna",
    building: "15",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "BANDALONG",
    country: "Ukraine",
    region: "Lviv",
    district: "Lviv",
    street: "Bandery",
    building: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    floor: "3",
    room: "301",
    parentId: 1,
  },
];

module.exports = {
  up: async () => {
    return Location.bulkCreate(locationData);
  },
  down: () => {
    return Location.destroy({});
  },
};
