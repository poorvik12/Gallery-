import React from 'react'
import { ArrowDownToLine } from 'lucide-react';

const Card = (props) => {
    
const download = async (e) =>{
    e.preventDefault()

    const response = await fetch(props.elem.download_url)
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download=`${props.elem.author}.jpg`

    document.body.appendChild(link)
    link.click()
    link.remove()

    window.URL.revokeObjectURL(url)
}

    return (
        <div className='break-inside-avoid mb-4'>
            <a href={props.elem.url} target="_blank">
                <div className=" w-full overflow-hidden rounded-xl">
                    <img className="h-auto w-full  object-cover rounded-xl transition-transform duration-300 hover:scale-110" src={props.elem.download_url} alt="img" />
                </div>
                <div className='flex justify-between'>
                    <h2 style={{ fontFamily: "Times New Roman" }} className="text-lg font-bold ">{props.elem.author}</h2>
                    <button onClick={download} className='font-bold hover:-translate-y-0.5 active:scale-95'><ArrowDownToLine /></button>
                </div>
            </a>
        </div>
    )
}

export default Card;