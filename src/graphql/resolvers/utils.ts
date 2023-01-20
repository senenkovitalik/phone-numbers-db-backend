import { Op, Sequelize, Utils } from "sequelize";
import { FilterId, InputMaybe } from "../__generated/graphql";
import { CalcOptsI, OptionsType } from "./types";

interface ProcessFieldsI {
  key: string;
  value: InputMaybe<{
    _eq?: InputMaybe<string | number>;
    _in?: InputMaybe<number[]>;
  }>;
  accumulator: Record<string, unknown>;
}

const isEmptyObject = (obj: unknown) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

const processId = ({ key, value, accumulator }: ProcessFieldsI) => {
  return {
    ...accumulator,
    [key]: [
      ...((value as FilterId)._eq ? [(value as FilterId)._eq] : []),
      ...(Array.isArray((value as FilterId)._in)
        ? ((value as FilterId)._in as [])
        : []),
    ],
  };
};

const processFullText = (
  key: string,
  value: InputMaybe<{
    _eq?: InputMaybe<string | number>;
    _in?: InputMaybe<number[]>;
  }>,
  accumulator: Record<string, unknown>,
  fulltextIndexFields: string[]
) => {
  if (value && typeof value._eq === "string") {
    return {
      ...accumulator,
      [key]: Sequelize.literal(
        `MATCH (${fulltextIndexFields.join(",")}) AGAINST ('${
          value._eq
        }*' IN BOOLEAN MODE)`
      ),
    };
  }

  return { ...accumulator };
};

const processString = (
  key: string,
  value: InputMaybe<{
    _eq?: InputMaybe<string | number>;
    _in?: InputMaybe<number[]>;
  }>,
  accumulator: Record<string, unknown>
) => {
  return {
    ...accumulator,
    [key]: {
      [Op.like]: `%${value?._eq ? value?._eq : ""}%`,
    },
  };
};

export function calculateOptions(
  { limit, offset, order_by, where }: CalcOptsI,
  fulltextIndexFields?: string[]
): OptionsType {
  let whereClauseObj: { [key: string]: unknown } & { q?: Utils.Literal } = {};

  let whereClause = {};

  if (where) {
    whereClauseObj = Object.entries(where).reduce(
      (accumulator, currentValue) => {
        const [key, value] = currentValue;

        if (key === "id" && value) {
          return processId({ key, value, accumulator });
        }

        if (key === "q" && fulltextIndexFields) {
          return processFullText(key, value, accumulator, fulltextIndexFields);
        }

        // find text values using LIKE %query_value%
        if (typeof value?._eq === "string") {
          return processString(key, value, accumulator);
        }

        return {
          ...accumulator,
          [key]: value?._eq,
        };
      },
      {}
    );

    const { q, ...rest } = whereClauseObj;

    const isQisEmpty = isEmptyObject(q);
    const isRestIsEmpty = isEmptyObject(rest);

    if (!isQisEmpty && !isRestIsEmpty) {
      if (q) {
        whereClause = {
          [Op.and]: [rest, Sequelize.where(q, Op.not, null)],
        };
      }
    } else if (isQisEmpty && !isRestIsEmpty) {
      whereClause = rest;
    } else if (!isQisEmpty && isRestIsEmpty) {
      if (q) whereClause = q;
    }
  }

  return {
    ...(limit && { limit }),
    ...(offset && { offset }),
    ...(order_by && { order: Object.entries(order_by as object) }),
    ...(whereClause && {
      where: whereClause,
    }),
  };
}
