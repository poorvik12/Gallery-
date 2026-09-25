import axios from "axios"
import { useEffect, useState } from "react"
import Card from "./components/Card"
const App = () => {

  const [userdata, setUserdata] = useState([])
  const [index, setIndex] = useState(1)
  const [nextData, setNextData] = useState([])
  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=20`)
    setUserdata(response.data)
    setNextData([])

  }

  useEffect(() => {
    getData()

    axios.get(`https://picsum.photos/v2/list?page=${index + 1}&limit=20`)
      .then(response => setNextData(response.data))
  }, [index])

  let printUserData = Array.from({ length: 12 }).map((_, i) => (
    <div key={i} className="mb-4 break-inside-avoid">
      <div style={{height:`${Math.floor(Math.random()*100)+150}px`}} className="w-full rounded-xl bg-gray-800 animate-pulse"></div>
      <div className="h-5 w-24 mt-2 rounded bg-gray-800 animate-pulse"></div>
    </div>
  ))
  if (userdata.length > 0) {
    printUserData = userdata.map(function (elem, idx) {
      return <div key={idx}>
        <Card elem={elem} />
      </div>
    })
  }

  return (
    <div className="bg-black h-screen p-4 text-white overflow-auto">
      <div >
        <h1 style={{ fontFamily: "Times New Roman", textShadow: "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.5)", textShadow: '0px 0px 8px rgba(255, 255, 255, 0.6)' }} className="h-[33%] w-full flex flex-col items-center justify-center text-9xl md:text-[9rem] font-extralight tracking-wide text-center mb-46 mt-30 ">Gallery
          <span className="mt-6 h-0.5 bg-white w-120 bg-gradient-r via-purple-400 to-transparent shadow-[0_0_12px_4px_rgba(168,85,247,0.5)]"></span></h1>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 ">{printUserData}</div>
      </div>

      <div className="flex justify-center items-center gap-4 md:gap-10 p-4">
        <button style={{ opacity: index == 1 ? 0.5 : 1 }} onClick={() => { if (index > 1) { setIndex(index - 1); } else { alert('You are alrady in the first page') } }} className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded-lg md:px-4 md:py-2 p-4 py-2 font-bold">Prev</button>
        <h1 className=" flex text-2xl">Page {index}</h1>
        <button onClick={() => { setIndex(index + 1); setUserdata(nextData) }} className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded p-4 py-2 md:px-4 md:py-2 font-bold">Next</button>
      </div>
    </div>
  )
}

export default App