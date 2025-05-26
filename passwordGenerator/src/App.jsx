import { useCallback, useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAlllowed, setNumberAllowed] = useState(false)
  const [charAlllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAlllowed) str+="0123456789"
    if(charAlllowed) str+="!@#$%^&*(){}[]-_+=~"

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char) 
    }
    setPassword(pass)
  },[length,numberAlllowed,charAlllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
      passwordGenerator()
  },[length,numberAlllowed,charAlllowed,passwordGenerator])

  return (
    <>
    <div className='w-full h-screen flex flex-col justify-center items-center bg-black'>
      <h1 className='text-white text-4xl bg-'>Password Generator</h1>
      <div className='w-full max-w-lg shadow-md rounded-3xl px-6 my-8 py-3 text-black bg-gray-800'>
      <div className='flex shadow rounded-xl overflow-hidden  my-4 '>
        <input 
        type="text" 
        value={password} 
        className='outline-none w-full py-2 px-3 bg-amber-300'
        placeholder='Password'
        readOnly
        ref={passwordRef} />
        <button className='bg-amber-500 px-4 text-white outline-none shrink-0 hover:bg-amber-700 duration-250' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex justify-around text-md gap-5  text-amber-600'>
        <div className='flex items-center gap-1'>
          <input 
          type="range"
          min={8}
          max={100}
          value={length}
          className='cursor-pointer' 
          onChange={(e)=>{
            setLength(e.target.value)
          }}/>
          <label htmlFor="">Length : {length}</label>
        </div>
        <div className='flex items-center gap-1'>
          <input 
          type="checkbox"
          defaultChecked={numberAlllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev) => !prev)
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
         <div className='flex items-center gap-1'>
          <input 
          type="checkbox"
          defaultChecked={charAlllowed}
          id='charInput'
          onChange={()=>{
            setCharAllowed(prev => !prev)
          }} />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
    </div> 
    </>
  )
}

export default App
