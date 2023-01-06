import { FilterId } from "../__generated/graphql";
import { CalcOptsI, OptionsType } from "./types";

// prettier-ignore
export function calculateOptions<T extends CalcOptsI>({ limit, offset, order_by, where }: T): OptionsType {
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

        return {
          ...accumulator,
          [key]: value?._eq,
        };
      }, {}),
    }),
  };
}
