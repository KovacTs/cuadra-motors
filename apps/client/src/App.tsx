import { useState } from 'react'
import {Card, CardContent, CardTitle, CardDescription} from './components/ui/card'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Card className="w-[350px] h-[200px] flex flex-col justify-center items-center">
     <CardContent>
       <CardTitle>Vite + React + TS</CardTitle>
       <CardDescription>
         <p>Count is: {count}</p>
         <button
           className="mt-4 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
           onClick={() => setCount((count) => count + 1)}
         >
           Increment
         </button>
       </CardDescription>
     </CardContent>
   </Card>
  )
}

export default App
