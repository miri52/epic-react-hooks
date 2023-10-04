// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// BASIC SOLUTION

// function Greeting({initialName = ''}) {
//   // 🐨 initialize the state to the value from localStorage
//   console.log('rendering')
//   const [name, setName] = React.useState(window.localStorage.getItem('name') ?? initialName)

//   // 🐨 Here's where you'll use `React.useEffect`.
//   // The callback should set the `name` in localStorage.
//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   })

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// 1. EXTRA - LAZY STATE INITIALIZATION
// only for stuff that is computationally expensive
// in this case we would probably only care about the initial name, not the local storage update, so this would be an overkill


// function Greeting({initialName = ''}) {

//   function getInitialNameValue() {
//     console.log('getting initial value')
//     return window.localStorage.getItem('name') ?? initialName
//   }
//   console.log('rendering')
//   const [name, setName] = React.useState(() => getInitialNameValue())

//   // 2. EXTRA - DEPENDENCY ARRAY
//   // [name]
//   // values passed in the dependency array are compared as if using === or Object.is(), so careful when passing objects or arrays

//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   }, [name])

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// 3. custom hook
// function that uses hooks
// logic that could be reused in another component

// function useLocalStorageState(key, defaultValue = ''){
//   const [state, setState ] = React.useState(
//     () => window.localStorage.getItem(key) ?? defaultValue
//   ) 

//   console.log('custom hook')
//   React.useEffect(() => {
//     window.localStorage.setItem(key, state)
//   }, [key, state])

//   return [state, setState]
// }

// function Greeting({initialName = ''}) {

//   console.log('rendering')
//   const [name, setName] = useLocalStorageState('name', initialName)
  

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// 4. EXTRA - flexible localStorage hook, supports any data type
// first step - convert to JSON within the hook
// second step - provide an options object to let the user of the hook choose their own way how to serialize and deserialize data
// third step - if the default value provided by the user of the hook is computationally expensive, they shouldn't have to pass that every time -> we make the default value optionally a function 
// fourth step - if they want to save the value under a different key -> we need to remove the value from the old key and set the new key -> to keep track of prevValue we use useRef, so that we don't trigger re-renders. We pass the key as the initial value.

function useLocalStorageState(key, defaultValue = '', {
  serialize = JSON.stringify,
  deserialize = JSON.parse
} = {}){
  const [state, setState ] = React.useState(
    () => {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage)
      }
       return typeof defaultValue === 'function' ? defaultValue() : defaultValue}
    ) 

    const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key){
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {

  console.log('rendering')
  const [name, setName] = useLocalStorageState('name', initialName) // custom hook logic
  // const [name, setName] = React.useState(initialName) // basic useState hook

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
