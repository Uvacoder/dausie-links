import prisma from "../lib/prisma"

export const resolvers = {
    Query: {
        links: async (_parent: any, args: any, context: any) => await prisma.link.createMany(),
    },

}