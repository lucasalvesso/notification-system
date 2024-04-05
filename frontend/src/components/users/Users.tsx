import React, {useEffect, useState} from "react";
import Table from "../table/Table";
import {FetchData} from "../../util/FetchData";
import {UserData} from "../../interface/UserData";

function Users() {
    const [data, setData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const dataResult = await FetchData('users')
            setData(dataResult)
            setLoading(false);
        };

        fetchData();
    }, []);

    const userData = data.map(i => ({
        'Id': i.id,
        'Name': i.name,
        'E-mail': i.email,
        'Phone Number': i.phoneNumber,
        'Types': i.notificationTypes.map((x: any) => x.name).join(','),
        'Categories': i.categories.map((x: any) => x.name).join(','),
    }))

    return (
        <>
            {loading ?
                <div>loading...</div> :
                <Table tableName="Users" columns={['Id', 'Name', 'E-mail', 'Phone Number', 'Types', 'Categories']} data={userData}></Table>
            }
        </>
    );
}

export default Users;
