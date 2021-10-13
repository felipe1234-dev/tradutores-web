import React, { useEffect, useState } from "react";
import NoImage from "src/media/no_image.jpg";

function Image({ item: img, generateSentence }) {
    const [srcExists, setSrcExists] = useState(false);

    useEffect(() => {
        const checkImage = () => {
        	fetch (img.src)
            .then(res => setSrcExists(res.ok));
        }

        checkImage();
    }, [img]);

    return (
        <figure>
            <img src={srcExists ? img.src : NoImage} alt={img.alt} />
            <figcaption>
                {img.sentences.map(snt => generateSentence(snt))}
            </figcaption>
        </figure>
    );
}

export default Image;