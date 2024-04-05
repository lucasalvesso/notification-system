export const SendData = async(path: string, method: 'POST', content: Record<string, any>) => {
    try {
        debugger
        const response = await fetch(`http://localhost:3003/${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
        });

        if (!response.ok) {
            return ['Error sending data']
        }

        return

    } catch (error) {
        console.error('Error sending data', error);
        return ['Error sending data']
    }
}