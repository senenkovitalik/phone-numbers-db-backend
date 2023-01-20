import { Op, Sequelize, Utils } from "sequelize";
import { FilterId } from "../__generated/graphql";
import { CalcOptsI, OptionsType, WhereOptsI } from "./types";

const isEmptyObject = (obj: unknown) => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

const processWhereArgs = (
  where: WhereOptsI,
  fulltextIndexFields?: string[]
) => {
  return Object.entries(where).reduce((accumulator, currentValue) => {
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

    // fulltext search
    if (
      key === "q" &&
      value &&
      typeof value._eq === "string" &&
      fulltextIndexFields
    ) {
      return {
        ...accumulator,
        [key]: Sequelize.literal(
          `MATCH (${fulltextIndexFields.join(",")}) AGAINST ('${
            value._eq
          }*' IN BOOLEAN MODE)`
        ),
      };
    }

    // find text values using LIKE %query_value%
    if (typeof value?._eq === "string") {
      return {
        ...accumulator,
        [key]: {
          [Op.like]: `%${value?._eq ? value?._eq : ""}%`,
        },
      };
    }

    return {
      ...accumulator,
      [key]: value?._eq,
    };
  }, {});
};

export function calculateOptions(
  { limit, offset, order_by, where }: CalcOptsI,
  fulltextIndexFields?: string[]
): OptionsType {
  let whereClauseObj: { [key: string]: unknown } & { q?: Utils.Literal } = {};
  let whereClause = {};

  if (where) {
    whereClauseObj = processWhereArgs(where, fulltextIndexFields);

    const { q, ...rest } = whereClauseObj;

    const isFulltextArgEmpty = isEmptyObject(q);
    const isRestArgsEmpty = isEmptyObject(rest);

    if (!isFulltextArgEmpty && !isRestArgsEmpty) {
      whereClause = {
        [Op.and]: [rest, Sequelize.where(q as Utils.Literal, Op.not, null)],
      };
    } else if (isFulltextArgEmpty && !isRestArgsEmpty) {
      whereClause = rest;
    } else if (!isFulltextArgEmpty && isRestArgsEmpty) {
      whereClause = q as Utils.Literal;
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
