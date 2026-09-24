import React from 'react'

export const Card = (props) => {
    return (
        <div >
            <a href={props.elem.url} target="_blank">
                <div className=" h-40 w-full overflow-hidden rounded-xl">
                    <img className="h-full w-full  object-cover rounded-xl transition-transform duration-300 hover:scale-110" src={props.elem.download_url} alt="img" />
                </div>
                <h2 style={{ fontFamily: "Times New Roman" }} className="text-lg font-bold ">{props.elem.author}</h2>
            </a>
        </div>
    )
}

export default Card;