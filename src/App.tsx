import { useState } from 'react'
import './App.css'
import Select from './Select'
import { SelectOptions } from './Types'
const options:SelectOptions[] =[
  {label:"First",value:1},
  {label:"Second",value:2},
  {label:"Third",value:3},
  {label:"Fourth",value:4},
]
function App() {
  const [value, setValue] = useState<SelectOptions[]>([options[1]])
  const [value1, setValue1] = useState<SelectOptions| undefined>(options[1])
  return (
    <div className="App">
     <Select multiple options={options} value={value} onChange={(o:SelectOptions|undefined)=>setValue(o)} />
     <Select options={options} value={value1} onChange={(o:SelectOptions|undefined)=>setValue1(o)} />

    </div>
  )
}

export default App
