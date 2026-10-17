import React from 'react'
import { ArrowDownToLine } from 'lucide-react';

const Card = (props) => {
    const download = async (e) => {
        e.preventDefault()

        const response = await fetch(props.elem.download_url)
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")

        link.href = url
        link.download = `${props.elem.author}.jpg`

        document.body.appendChild(link)
        link.click()
        link.remove()

        window.URL.revokeObjectURL(url)
    }

    return (
        <div className='mb-6'>
            <a href={props.elem.url} target="_blank" rel="noopener noreferrer" className="block bg-neutral-900/40 rounded-2xl p-2.5 border border-white/5 transition-all duration-300 hover:border-white/20 group">
                <div className="w-full overflow-hidden rounded-xl bg-neutral-800">
                    <img 
                        className="h-auto w-full object-cover rounded-xl transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.02]" 
                        src={props.elem.download_url} 
                        alt="img" 
                        loading="lazy" 
                    />
                </div>
                <div className='flex items-center justify-between mt-3 px-1'>
                    <h2 style={{ fontFamily: "Times New Roman" }} className="text-base sm:text-lg font-medium text-gray-200 truncate pr-2">{props.elem.author}</h2>
                    <button 
                        onClick={download} 
                        className='p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all text-white flex items-center justify-center shrink-0'
                        title="Download Image"
                    >
                        <ArrowDownToLine size={18} />
                    </button>
                </div>
            </a>
        </div>
    )
}

export default Card;