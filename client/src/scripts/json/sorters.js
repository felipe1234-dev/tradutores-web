const sorters = [
    {
        label: "Most recent",
        value: "CreatedAt",
        mustLogIn: false
    },
    {
        label: "Most upvoted",
        value: "Upvotes",
        mustLogIn: false
    },
    {
        label: "Most popular",
        value: "LastUpdate",
        mustLogIn: false
    },
    /* ----------------------- */
    {
        label: "Your edits",
        value: "Your edits",
        mustLogIn: true
    },
    {
        label: "Your uploads", 
        value: "Your uploads",
        mustLogIn: true
    }
]

export default sorters;