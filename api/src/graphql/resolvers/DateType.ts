import { GraphQLScalarType, Kind } from "graphql";

const DateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }

    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "string") {
      return Date.parse(value);
    }

    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return Date.parse(ast.value);
    }

    return null;
  },
});

export default DateScalar;
