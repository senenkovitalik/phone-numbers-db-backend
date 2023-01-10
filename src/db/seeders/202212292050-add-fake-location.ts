import { InferCreationAttributes, Op } from "sequelize";
import { Location } from "../models";

const locationData: InferCreationAttributes<Location, { omit: "id" }>[] = [
  {
    country: "Ukraine",
    region: "Zhytomir",
    city: "Yaropovichi",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
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
  up: () => {
    return Location.bulkCreate(locationData);
  },
  down: () => {
    return Location.destroy({
      where: {
        [Op.or]: [
          {
            [Op.and]: {
              region: "Zhytomir",
              city: "Yaropovichi",
            },
          },
          {
            [Op.and]: {
              region: "Rivne",
              district: "Rivne",
              street: "Petra Mohily",
              building: "5",
            },
          },
        ],
      },
    });
  },
};
