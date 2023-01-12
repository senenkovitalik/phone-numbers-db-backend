import { CreationAttributes } from "sequelize";
import { Location } from "../models";

const locationData: CreationAttributes<Location>[] = [
  {
    name: "ARRAKIS",
    country: "Ukraine",
    region: "Zhytomir",
    city: "Yaropovichi",
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
];

module.exports = {
  up: async () => {
    return Location.bulkCreate(locationData);
  },
  down: () => {
    return Location.destroy({
      where: {
        name: locationData.map(({ name }) => name),
      },
    });
  },
};
