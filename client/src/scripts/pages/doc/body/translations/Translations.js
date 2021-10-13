import React, { useState, useEffect } from 'react';

import { Drawer, Button } from 'rsuite';

function TranslationList({ ...props}) {
    const [list, setList] = useState([]);

    /*useEffect(() => {
        const fetchData = () => {
            fetch(URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    
                })
            })
            .then(res => res.json())
            .then(res => setList(res))
            .catch(err => console.log(err));
        }

        fetchData();
    }, []);*/
    
    return (
        <Drawer { ...props }>
            <Drawer.Header>
                <Drawer.Title>
                    Translate
                </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>

            </Drawer.Body>
            <Drawer.Footer>
                <Button appearance="primary">
                    Confirm
                </Button>
                <Button appearance="subtle">
                    Cancel
                </Button>
            </Drawer.Footer>
        </Drawer>
    );
}

export default TranslationList;