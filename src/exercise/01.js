// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// 1. EXTRA SOLUTION - controlled input with initial value
// If we don't pass the initialName prop, it's gonna be undefined and we will get a warning: the component is changing an uncontrolled input of type undefined to be controlled. Input elements should not switch between these two. That can cause bugs and unexpected things.
// We need to make sure that this inputs value is not undefined at any time. What we're going to do is default that to an empty string.

function Greeting({initialName = ''}) {
  // 💣 delete this variable declaration and replace it with a React.useState call
  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
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
  return <Greeting initialName="Miri" />
}

export default App
