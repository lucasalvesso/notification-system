import React, {useEffect, useState} from "react";
import Table from "../table/Table";
import {FetchData} from "../../util/FetchData";
import {NotificationsData} from "../../interface/NotificationsData";

function Logs() {
    const [data, setData] = useState<NotificationsData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const dataResult = await FetchData('notifications')
            setData(dataResult)
            setLoading(false);
        };

        fetchData();
    }, []);

    const userData = data.map(i => ({
        'Id': i.id,
        'Category': i.category.name,
        'E-mail': i.user.email,
        'Status': i.status ? 'Sent' : 'Failed',
        'Message': i.message,
        'Date': i.createdAt,
    }))

    return (
        <>
            {loading ?
                <div>loading...</div> :
                <Table tableName="Notifications" columns={['Id', 'Category', 'E-mail', 'Status', 'Message', 'Date']} data={userData}></Table>
            }
        </>
    );
}

export default Logs;
