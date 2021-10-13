function List({ item: list, generateSentence }) {
    const List = `${list.tagName}`;
    return (
        <List>
            {list.listItems.map(listItem => {
                const ListItem = `${listItem.tagName}`;
                return (
                    <ListItem>
                        {listItem.sentences.map(snt => generateSentence(snt))}
                    </ListItem>
                );
            })}
        </List>
    );
}

export default List;