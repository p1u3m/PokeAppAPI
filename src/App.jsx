import { useState, useEffect } from 'react'
import './App.css'
import './index.css'
import axios from 'axios'

//components
import FavPoke from './components/FavPoke'

function App() {

  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  /*  API Call  */
  
  useEffect(() => {

    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
          signal: abortController.signal
        });

        setPoke(response.data)
        setError("");

      } catch(error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadPoke();
    
    return() => abortController.abort();

  }, [number])

  /*  API Call  */

  /*  Function  */

  const prevPoke = () => {
    setNumber((number) => number - 1)  
  }

  const nextPoke = () => {
    setNumber((number) => number + 1)
  }

  const addFav = () => {
    setFav((oldState) => [...oldState, poke])
  }

  console.log("pokemon id:", number);
  console.log("your fav pokemon:", fav);
  console.log("Loading Status :",loading);

  /*  Function  */

  return (
    
    <div className='max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
    <div>
      {loading ? <p>Loading...</p> : 
      <>
          <h1 style={{textTransform : "capitalize",}}>{poke.name}</h1>
          <button onClick={addFav} className='btn'>Add to Favourite</button>
          <br />
          <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.name}></img>
          <ul>
            {poke?.abilities?.map((abil, idx) => (
              <li key={idx}>{abil.ability?.name}</li>
            ))}
          </ul>
          <br />
          <button onClick={prevPoke} className='btn'>Previous</button>
          <button onClick={nextPoke} className='btn'>Next</button>
      </>}
    </div>
    <div>
      <h2>Your Fav Pokemon</h2>
      {fav.length > 0 ? <FavPoke fav={fav}/> : <div className='flex h-full justify-center items-center'><p>No Favourite Pokemon...</p></div>}
    </div>
    </div>
    </div>

  )
}

export default App
