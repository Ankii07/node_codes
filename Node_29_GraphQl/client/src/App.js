import logo from './logo.svg';
import './App.css';
import {gql, useQuery} from "@apollo/client"

const query = gql`
   
   query GetTodosWithUser{
    //jo hum data maang rhe whi data mil rha hai.. 
    getTodos{
      id
      title
      completed
      user{
        id
        name
      }
    }
   }
`



// client ko use krne ke liye hume apollo/client graphql ka use krna hoga..
function App() {
  const {data, loading} = useQuery(query);
   
  if(loading) return <h1>Loading....</h1>

  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
