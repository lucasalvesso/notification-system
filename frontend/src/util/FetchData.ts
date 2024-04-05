export const FetchData = async (path: string) => {
    try {
        const response = await fetch(`http://localhost:3003/${path}`);
        if (!response.ok) {
            return []
        }
        const responseData = await response.json();
        return responseData
    } catch (error) {
        console.error('Error while fetching data');
        return []
    }
};