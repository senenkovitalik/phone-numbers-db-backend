import _ from "lodash";
import {
  Aggregate,
  QueryHumansArgs,
  QueryHumans_AggregateArgs,
} from "../../__generated/graphql";
// import { calculateOptions } from "../utils";
import { Human, Location, Subscriber } from "../../../db/models";
import { Order } from "sequelize";

export const humans = async (_parent: unknown, args: QueryHumansArgs) => {
  try {
    const { limit, offset, order_by, where } = args;
    const order: Order = [];

    if (order_by) {
      const { field, order: orderValue } = order_by;
      order.push([field, orderValue]);
    }

    let humanWhere = {};
    let locationsWhere = {};

    if (where) {
      const { id, locations } = where;

      if (id) {
        if (id._eq) {
          humanWhere = { id: id._eq };
        }

        if (id._in) {
          humanWhere = { id: id._in };
        }
      }

      if (locations) {
        if (locations._eq) {
          locationsWhere = locations._eq;
        }
      }
    }

    return await Human.findAll({
      ...(limit && { limit }),
      ...(offset && { offset }),
      ...(order && { order }),
      ...(humanWhere && {
        where: humanWhere,
      }),
      include: {
        model: Subscriber,
        as: "subscriber",
        ...(locationsWhere && {
          include: [
            {
              model: Location,
              as: "locations",
              ...(locationsWhere && { where: locationsWhere }),
              required: false,
            },
          ],
        }),
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};

export const humans_aggregate = async (
  _parent: unknown,
  args: QueryHumans_AggregateArgs
): Promise<Aggregate> => {
  try {
    const { where } = args;

    let humanWhere = {};

    if (where) {
      const { id } = where;

      if (id) {
        if (id._eq) {
          humanWhere = { id: id._eq };
        }

        if (id._in) {
          humanWhere = { id: id._in };
        }
      }
    }

    const count = await Human.count({
      ...(humanWhere && { where: humanWhere }),
    });

    return {
      aggregate: {
        count,
      },
    };
  } catch (e) {
    console.error(e);
    throw new Error("500");
  }
};
