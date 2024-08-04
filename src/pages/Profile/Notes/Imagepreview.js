import React from 'react'
import { getUrl } from '../../../shared/functions'

const Imagepreview = ({
    title,
    src,
    onClick,
    NoteCover,
    username,
    thumbnailImg }) => {


    return (
        <div>


            {

                ((thumbnailImg === "default.png" && !src?.includes('blob:')) || src === undefined) ?
                    < img className="image-design"
                        src={NoteCover}
                        alt={title}
                        onClick={onClick}
                    />
                    :
                    <img className="image-design" alt="img"
                        onClick={onClick}
                        src={src?.includes('blob:') ? src : getUrl(src, username)}
                    />
            }
        </div>
    )
}

export default Imagepreview
