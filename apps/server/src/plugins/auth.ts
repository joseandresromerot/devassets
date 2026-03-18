import type { FastifyInstance } from "fastify"
import jwt from "@fastify/jwt"

export const authPlugin = async (app: FastifyInstance) => {
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || "dev-secret",
  })
}
