import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';
import Cors from 'micro-cors';
import { createContext } from '../../graphql/context';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';

const cors = Cors();

const apolloServer = new ApolloServer({schema, resolvers, context: createContext});

const startServer = apolloServer.start();

const handler = cors( async (req: MicroRequest, res: ServerResponse) => {
    if (req.method == 'OPTIONS') {
        res.end()
        return false;
    }
    await startServer;

    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
});

export const config = {
    api: {
        bodyParser: false,
    }
}

export default handler;