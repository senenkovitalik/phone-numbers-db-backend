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
    let subscriberWhere = {};
    let locationsWhere = {};

    if (where) {
      const { id, subscriber } = where;

      if (id) {
        if (id._eq) {
          humanWhere = { id: id._eq };
        }

        if (id._in) {
          humanWhere = { id: id._in };
        }
      }

      if (subscriber) {
        const { id, locations } = subscriber;

        if (id) {
          if (Number.isInteger(id._eq) || id._eq === null) {
            subscriberWhere = { id: id._eq };
          }

          if (id._in) {
            subscriberWhere = { id: id._in };
          }
        }

        if (locations && locations._in) {
          locationsWhere = locations._in;
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
        ...(subscriberWhere && { where: subscriberWhere }),
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
    const order: Order = [];

    let humanWhere = {};
    let subscriberWhere = {};
    let locationsWhere = {};

    if (where) {
      const { id, subscriber } = where;

      if (id) {
        if (id._eq) {
          humanWhere = { id: id._eq };
        }

        if (id._in) {
          humanWhere = { id: id._in };
        }
      }

      if (subscriber) {
        const { id, locations } = subscriber;

        if (id) {
          if (Number.isInteger(id._eq) || id._eq === null) {
            subscriberWhere = { id: id._eq };
          }

          if (id._in) {
            subscriberWhere = { id: id._in };
          }
        }

        if (locations && locations._in) {
          locationsWhere = locations._in;
        }
      }
    }

    const count = await Human.count({
      ...(order && { order }),
      ...(humanWhere && {
        where: humanWhere,
      }),
      include: {
        model: Subscriber,
        as: "subscriber",
        ...(subscriberWhere && { where: subscriberWhere }),
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
