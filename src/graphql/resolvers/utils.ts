import { Op } from "sequelize";
import { FilterId } from "../__generated/graphql";
import { CalcOptsI, OptionsType } from "./types";

// prettier-ignore
export function calculateOptions({ limit, offset, order_by, where }: CalcOptsI): OptionsType {
  return {
    ...(limit && { limit }),
    ...(offset && { offset }),
    ...(order_by && { order: Object.entries(order_by as object) }),
    ...(where && {
      where: Object.entries(where).reduce((accumulator, currentValue) => {
        const [key, value] = currentValue;

        if (key === "id" && value) {
          return {
            ...accumulator,
            [key]: [
              ...((value as FilterId)._eq ? [(value as FilterId)._eq] : []),
              ...(Array.isArray((value as FilterId)._in)
                ? ((value as FilterId)._in as [])
                : []),
            ],
          };
        }

        // find text values using LIKE %query_value%
        if (typeof value?._eq === "string") {
          return {
            ...accumulator,
            [key]: {
              [Op.like]: `%${value?._eq}%`
            }
          };
        }

        return {
          ...accumulator,
          [key]: value?._eq,
        };
      }, {}),
    }),
  };
}
