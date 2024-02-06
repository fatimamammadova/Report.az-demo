export const getValutes = async () => {
    try {
        const res = await fetch(`http://localhost:4000/valutes`)

        return res.json()
    }
    catch(err) {
        console.error('Something went wrong!', err);
    }
}