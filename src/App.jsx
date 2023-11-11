import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length , setLength] = useState(8)
  const [numberAllowed , setnumber] = useState(false)
  const [character , setchar] = useState(false)
  const [password , setpassword] = useState("")
  // use refhook
  const passwordref = useRef(null)
  // password generator  jitna part memory me use rakhe rho aur dubara call hone pe reuse krlo usecallback
  const passwordgenrtor = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "012346789"
    if(character) str +="!@#!#$%&)(()*(&*(^&"
    for(let i =0;i<=length;i++){
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }
    setpassword(pass)

  },[length,numberAllowed,character,setpassword])

  const copytoclipborad = useCallback(()=>{
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,10);
    window.navigator.clipboard.writeText(password)
  },[password])

  // use effect  40:00for revison 
  // if any method change rereder passwordgerator
  useEffect(()=>{
    passwordgenrtor()
  },[length,numberAllowed,character,passwordgenrtor])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
               <h1 className='text-white text-center'>password generator</h1>
               <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                 <input type='text'
                  value={password}
                  className='outline-none w-full py-1 px-3'
                  placeholder='password'
                  readOnly
                  ref={passwordref}
                 />
                 <button onClick={copytoclipborad} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> copy </button>
      
               </div>
               <div className='flex text-sm gap-x-2'>
                    <div className='flex items-center gap-x-1'>
                      <input 
                        type='range'
                        min={6}
                        max={100}
                        value={length}
                        className='cursor-pointer'
                        onChange={(e)=>{setLength(e.target.value)}}
                      />
                      <label>length{length}</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                       <input
                        type='checkbox'
                        defaultChecked={numberAllowed}
                        id='numberInput'
                        onChange={()=>{
                          setnumber((prev) => !prev);
                        }}
                       />
                       <label htmlFor='numberInput'>Numbers</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                       <input
                        type='checkbox'
                        defaultChecked={character}
                        id='numberInput'
                        onChange={()=>{
                          setchar((prev) => !prev);
                        }}
                       />
                       <label htmlFor='charachterInput'>character</label>
                    </div>
               </div>
    </div>
  )
}

export default App