import React from 'react'

export const Iframe = ({iwidth , iheight , ilink}) => {
    return (
        <iframe
        title={iheight}
        width={iwidth}
        height={iheight}
        src= {ilink}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    )
}
