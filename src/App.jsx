import axios from "axios"
import { useEffect, useState, useRef } from "react"
import Card from "./components/Card"

const App = () => {
  const [userdata, setUserdata] = useState([])
  const [index, setIndex] = useState(1)
  const [loading, setLoading] = useState(false)
  const fetchingRef = useRef(false)

  const getData = async () => {
    if (loading || fetchingRef.current) return
    fetchingRef.current = true
    setLoading(true)
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=20`)
      setUserdata((prev) => {
        const existingIds = new Set(prev.map(item => item.id))
        const newItems = response.data.filter(item => !existingIds.has(item.id))
        return [...prev, ...newItems]
      })
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
      fetchingRef.current = false
    }
  }

  useEffect(() => {
    getData()
  }, [index])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300) {
            if (!loading) {
              setIndex((prevIndex) => prevIndex + 1)
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading])

  let printUserData = Array.from({ length: 12 }).map((_, i) => (
    <div key={i} className="mb-4 sm:mb-6 break-inside-avoid bg-neutral-900/40 rounded-2xl p-2.5 border border-white/5">
      <div style={{ height: `${Math.floor(Math.random() * 100) + 150}px` }} className="w-full rounded-xl bg-neutral-800 animate-pulse"></div>
      <div className="flex items-center justify-between mt-3 px-1">
        <div className="h-4 w-28 rounded bg-neutral-800 animate-pulse"></div>
        <div className="h-8 w-8 rounded-full bg-neutral-800 animate-pulse"></div>
      </div>
    </div>
  ))

  if (userdata.length > 0) {
    printUserData = userdata.map(function (elem, idx) {
      return (
        <div key={`${elem.id}-${idx}`} className="mb-4 sm:mb-6 break-inside-avoid">
          <Card elem={elem} />
        </div>
      )
    })
  }

  const paginationSkeletons = Array.from({ length: 4 }).map((_, i) => (
    <div key={`skeleton-${i}`} className="mb-4 sm:mb-6 break-inside-avoid bg-neutral-900/40 rounded-2xl p-2.5 border border-white/5">
      <div style={{ height: `${Math.floor(Math.random() * 80) + 160}px` }} className="w-full rounded-xl bg-neutral-800 animate-pulse"></div>
      <div className="flex items-center justify-between mt-3 px-1">
        <div className="h-4 w-24 rounded bg-neutral-800 animate-pulse"></div>
        <div className="h-8 w-8 rounded-full bg-neutral-800 animate-pulse"></div>
      </div>
    </div>
  ))

  return (
    <div className="bg-black min-h-screen p-2 sm:p-4 text-white overflow-auto">
      <div>
        <h1 
          style={{ 
            fontFamily: "Times New Roman", 
            textShadow: '0px 0px 8px rgba(255, 255, 255, 0.6)' 
          }} 
          className="w-full flex flex-col items-center justify-center text-6xl sm:text-8xl md:text-[9rem] font-extralight tracking-wide text-center my-12 md:my-30"
        >
          Gallery
          <span className="mt-4 sm:mt-6 h-0.5 w-32 sm:w-80 md:w-120 bg-linear-to-r via-purple-400 to-transparent shadow-[0_0_12px_4px_rgba(168,85,247,0.5)]"></span>
        </h1>
        
        {/* Main Feed Grid - Denser multi-column layout */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3 sm:gap-6 px-1 sm:px-0">
          {printUserData}
        </div>
      </div>

      {/* Show pagination skeletons at the bottom when loading next pages */}
      {loading && userdata.length > 0 && (
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3 sm:gap-6 px-1 sm:px-0 mt-6">
          {paginationSkeletons}
        </div>
      )}
    </div>
  )
}

export default App