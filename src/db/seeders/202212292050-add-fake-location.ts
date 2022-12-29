import type { InferAttributes } from "sequelize";
import { Location } from "../models";

const locationData: InferAttributes<Location, { omit: "id" }> = {
  country: "Ukraine",
  region: "Zhytomir",
  city: "Yaropovichi",
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: () => {
    return Location.create(locationData);
  },
  down: () => {
    return Location.destroy({
      where: {
        country: locationData.country,
        region: locationData.region as string,
        city: locationData.city as string,
      },
    });
  },
};
