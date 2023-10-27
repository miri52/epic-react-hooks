// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

// function PokemonInfo({pokemonName}) {
//   // 🐨 Have state for the pokemon (null)
//   const [pokemon, setPokemon] = React.useState(null)
//   const [error, setError] = React.useState(null)
//   // 🐨 use React.useEffect where the callback should be called whenever the
//   // pokemon name changes.
//   // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
//   // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
//   // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
//   // (This is to enable the loading state when switching between different pokemon.)
//   // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
//   //   fetchPokemon('Pikachu').then(
//   //     pokemonData => {/* update all the state here */},
//   //   )
//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     }
//     setError(null)
//     setPokemon(null)
//     fetchPokemon(pokemonName).then(pokemonData => setPokemon(pokemonData)).catch(err => setError(err) )
//   }, [pokemonName])

//   // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
//   //   1. no pokemonName: 'Submit a pokemon'
//   //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
//   //   3. pokemon: <PokemonDataView pokemon={pokemon} />

//   // 1. EXTRA CREDIT SOLUTION - ERROR HANDLING
//   if (error) {
//   return <div role="alert"> There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre></div>}

//   if (!pokemonName) {
//     return 'Submit a pokemon'
//   }

//   if (pokemonName && !pokemon) {
//     return <PokemonInfoFallback name={pokemonName} />
//   }

//   if (pokemon){
//     return <PokemonDataView pokemon={pokemon}/>
//   }
// }

// 2. EXTRA CREDIT SOLUTION
// using component states to show the correct ui

// function PokemonInfo({pokemonName}) {

//   const [pokemon, setPokemon] = React.useState(null)
//   const [error, setError] = React.useState(null)
//   const [status, setStatus] = React.useState('idle')

//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     }
//     setStatus('pending')
//     fetchPokemon(pokemonName).then(pokemonData => {
//       setPokemon(pokemonData)
//       setStatus('resolved')})
//       .catch(err => {
//         setError(err)
//          setStatus('rejected')} )
//   }, [pokemonName])

//   if (status === 'idle') {
//     return 'Submit a pokemon'
//   }

//   if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   }

//   if (status === 'resolved'){
//     return <PokemonDataView pokemon={pokemon}/>
//   }

//   if (status === 'rejected') {
//     return <div role="alert"> There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre></div>}
// }

// 3. EXTRA CREDIT SOLUTION
// storing closely related states in a single object to avoid re-renders
// an elegant and a proper way to do this would be using a reducer but this is also an option for now
// also thanks to the new batching feature, this is no longer an issue since React 18

// I could also directly destructre the object and use the same naming, so it would be used like this: setState({pokemon, status: 'resolved'})

// function PokemonInfo({pokemonName}) {

//   const [state, setState] = React.useState({status: 'idle', pokemon: null, error: null})

//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     }
//     setState({status:'pending'})
//     fetchPokemon(pokemonName).then(pokemonData => {
//       setState({pokemon: pokemonData, status: 'resolved'})
//       })
//       .catch(err => {
//         setState({status: 'rejected', error: err})
//         } )
//   }, [pokemonName])

//   if (state.status === 'idle') {
//     return 'Submit a pokemon'
//   }

//   if (state.status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   }

//   if (state.status === 'resolved'){
//     return <PokemonDataView pokemon={state.pokemon}/>
//   }

//   if (state.status === 'rejected') {
//     return <div role="alert"> There was an error: <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre></div>}
// }

// 4. EXTRA CREDIT SOLUTION - Error boundary

// it's like the JS catch{} block but for components -> they log errors and display fallback UI, instead of broken white screen UI
// runtime errors
// if we put error handling too high in the tree, we will end up replacing the whole UI with the error, so it's good to think on which level we want to put error boundaries
// they do not catch errors from event handlers - for that we still need the regular try and catch; neither for async code and server-side rendering
// there is also react-error-boundary library that eliminates the need to write class components and handle the state, more here:
// https://blog.logrocket.com/react-error-handling-with-react-error-boundary/

// class ErrorBoundary extends React.Component {
//   state = {error: null}
//   static getDerivedStateFromError(error) {
//     return {error}
//   }
//   render() {
//     const {error} = this.state
//     if (error) {
//       return <this.props.FallbackComponent error={error} />
//     }
//     return this.props.children
//   }
// }

// function PokemonInfo({pokemonName}) {
//   const [state, setState] = React.useState({
//     status: 'idle',
//     pokemon: null,
//     error: null,
//   })

//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     }
//     setState({status: 'pending'})
//     fetchPokemon(pokemonName)
//       .then(pokemonData => {
//         setState({
//           pokemon: pokemonData,
//           status: 'resolved',
//         })
//       })
//       .catch(err => {
//         setState({
//           status: 'rejected',
//           error: err,
//         })
//       })
//   }, [pokemonName])

//   if (state.status === 'idle') {
//     return 'Submit a pokemon'
//   }

//   if (state.status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   }

//   if (state.status === 'resolved') {
//     return <PokemonDataView pokemon={state.pokemon} />
//   }

//   if (state.status === 'rejected') {
//     throw state.error
//   }
// }

// // by making the ErrorBoundary component accept a FallbackComponent as a prop, we give whoever is using this error boundary flexibility to provide whatever fallback component they want
// // -> generic, reusable
// function ErrorFallaback({error}) {
//   return (
//     <div role="alert">
//       {' '}
//       There was an error:{' '}
//       <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//     </div>
//   )
// }

// 6. EXTRA CREDIT - react-error-boundary
// instead of writing the class ErrorBoundary component we can import it from react-error-boundary

import {ErrorBoundary} from 'react-error-boundary'

// 7. EXTRA CREDIT - Reset the error boundary
// when we just use the key with pokemonName and initialize the status as 'idle', the unmounting is gonna cause a rerun of the useEffect and a brief flashing of the 'idle' state
// we can solve this by initializing the status state conditionally using the pokemonName as either 'pending' or 'idle' but the core problem still exists:
// We are unmounting and remounting the Pokemon info component every time the pokemon name changes, we only want that in case of an error, otherwise it's a waste
// instead of the 'key' we can use resetErrorBoundary from react-error-boundary and add a button that prompt the user to try again
// we also use resetKeys to track specific values - if these are changed, the ErrorBoundary will reset itself and try to render its children again

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({
          pokemon: pokemonData,
          status: 'resolved',
        })
      })
      .catch(err => {
        setState({
          status: 'rejected',
          error: err,
        })
      })
  }, [pokemonName])

  if (state.status === 'idle') {
    return 'Submit a pokemon'
  }

  if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemon} />
  }

  if (state.status === 'rejected') {
    throw state.error
  }
}

function ErrorFallaback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      {' '}
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  const handleSubmit = newPokemonName => setPokemonName(newPokemonName)
  // reset the UI state
  const handleReset = () => setPokemonName('')

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallaback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
