function Rest({ item: elem, generateSentence }) {
    const Tag = `${elem.tagName}`;
    return (
        <Tag>
            {elem.sentences.map(snt => generateSentence(snt))}
        </Tag>
    );
}

export default Rest;