import React, { useState } from "react";

function useForceUpdate() {
    const [updates, setUpdates] = useState(0); 
    
    const forceUpdate = () => setUpdates(value => value + 1);
    
    return [updates, forceUpdate]; 
}

export default useForceUpdate;
