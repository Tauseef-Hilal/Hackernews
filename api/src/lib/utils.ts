import { IncomingMessage } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Link, User } from "../graphql/generated/types";
const APP_SECRET = process.env.APP_SECRET;

function getTokenPayload(token: string) {
  return jwt.verify(token, APP_SECRET);
}

export function getUserId(req?: IncomingMessage, authToken?: string): string {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }

      const { userId } = getTokenPayload(token) as JwtPayload;
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken) as JwtPayload;
    return userId;
  }

  throw new Error("Not authenticated");
}

export function getMockUser(): User {
  return { id: "-1", name: "A", email: "B", links: [] };
}

export function getMockLink(): Link {
  return {
    id: "-1",
    url: "A",
    createdAt: new Date(),
    description: "B",
    votes: [],
  };
}
