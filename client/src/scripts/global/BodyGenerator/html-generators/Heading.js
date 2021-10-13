function Heading({ item: h, generateSentence }) {
    const Heading = `${h.tagName}`;

    let title = "";

    h.sentences.forEach(snt => {
        title += ` ${snt.innerText}`;
    });

    title = title.trim();

    return (
        <Heading id={title}>
            {h.sentences.map(snt => generateSentence(snt))}
        </Heading>
    );
}

export default Heading;