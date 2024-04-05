import React, {useEffect, useState} from "react";
import './Message.css'
import {FetchData} from "../../util/FetchData";
import {CategoryData} from "../../interface/CategoryData";
import {SendData} from "../../util/SendData";

function Message() {

    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const dataResult = await FetchData('categories')
            setData(dataResult)
            setLoading(false);
        };

        fetchData();
    }, []);


    const handleInputChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleSelectChange = (event: any) => {
        setCategory(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!message || !category) {
            setError('Please fill the fields');
            return;
        }

        const anyErrors = await SendData('notifications', 'POST', {message, category})

        if (anyErrors) {
            setError(anyErrors[0])
        } else {
            setMessage('');
            setCategory('');
            setError('');
        }

    };

    return (
        <>
            {loading ?     <div>loading...</div> :
                <form onSubmit={handleSubmit} className="message-form">
                    <h4>Send a message right now</h4>
                    <textarea
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Type your message"
                        rows={15}
                    />
                    <select value={category} onChange={handleSelectChange}>
                        <option value="">Select an option</option>
                        {data.map(i => (
                            <option key={i.id} value={i.name}>{i.name}</option>
                        ))}
                    </select>
                    <button type="submit">Send message</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            }
        </>
    );
}

export default Message;
