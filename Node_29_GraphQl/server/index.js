// Rest APi mai yeh ke problem hai ki agr hume sirf ek specific data value jaise ki maan lo user ka title hi chahiye..
// pr rest Api koi bhi aisa method nhi deta hai jisse ki hum ek specific value ko target kr ske..
// is problem ko solve krta hai GraphQl..

// graphQl multiple back and forth request ke sath deal krne mai bhi madad krta hai..

// appolo ek api hai jo hume graphql implement krne mai madad krta hai..

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
// axios helps to make api calls
const axios = require("axios");

async function startServer() {
  const app = express();

  // graphql server ko use krne ke liye graphql ko pata hona chahiye ki tum uspe kya kya
  // functions perform kroge..
  // jo tumhe server ko inialtize krte waqt dena hoga..

  // GraphQL type definitions
  // ! means that these values can't be null
  const typeDefs = `
       
      type User{
      id: ID!
      name: String!
      email: String!
      phone: String!
      website: String!
      }
      

        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            userId: ID!
            user: User
        }

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
        }
    `;

  // Resolvers for GraphQL queries
  const resolvers = {
    // usually yha pe database operations hote hai..
    // jis order mai data mangta hu usi order mai data aata hai..
    Todo:{
      user: async(todo) =>  (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
    },
    Query: {
      getTodos: async () =>
        (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        
      getAllUsers: async () =>
        (await axios.get("https://jsonplaceholder.typicode.com/users")).data,

      getUser: async (parent, {id}) => 
        (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data

    },
  };

  const server = new ApolloServer({
    // typeDefs dena compulsory hai..
    // agr tumhe graphql server se khuch bhi fetch krna hai to tum query krte ho..
    // aur agr graphql ko khuch dena hai to tum mutation krte ho..
    typeDefs,
    resolvers,
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  // agr koi bhi request /graphql pe aati hai usko ek graphql server handle krega..
  // Attach Apollo middleware to Express
  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("Server started at PORT 8000"));
}

startServer().catch((err) => console.error("Error starting server:", err));
