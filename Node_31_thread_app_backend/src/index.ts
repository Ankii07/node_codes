import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from '@apollo/server/express4'

async function init(){
const app = express();
const PORT = Number(process.env.PORT) || 8000;

// agr koi bhi request ya response json ke form mai aata hai to use parse krna hoga..
app.use(express.json());

// create GraphQL server

const gqlServer = new ApolloServer({
    typeDefs: `
  type Query {
    hello: String
    
  }
`,
    resolvers: {
        Query: {
            hello: () => `Hey there, I am a GraphQL Server`,
          },
  
    },
});

// start gql server
await gqlServer.start();


app.get("/", (req,res) =>{
    res.json({message: "Server is running"});
});

// graphql server jitna bhi response aur request krta hai wh hota hai json format me
app.use(
    "/graphql",
    expressMiddleware(gqlServer, {
        context: async ({ req }) => ({ token: req.headers.authorization }),
    })
);
app.listen(PORT, ()=> console.log(`Server started at PORT:${PORT}`));

// kyuki yh typescroipt file hai hume run krne ke liye use compile krna padega
}

init();