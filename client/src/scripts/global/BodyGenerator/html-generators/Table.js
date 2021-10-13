function Table({ item: table, generateSentence }) {
    return (
        <table>
            {table.tableRows.map(row => (
                <trow>
                    {row.rowItems.map(item => {
                        const RowItem = `${item.tagName}`;
                        return (
                            <RowItem>
                                {item.sentences.map(snt => generateSentence(snt))}
                            </RowItem>
                        );
                    })}
                </trow>
            ))} 
        </table>
    );
}

export default Table;