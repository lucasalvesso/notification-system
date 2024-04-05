import React from "react";
import './Table.css'

interface TableProps {tableName: string, columns: string[], data: Array<Record<string, any>>}

const Table:React.FC<TableProps> = ({tableName, columns, data}) => {
    return (
        <div className="table-container">
            <h4>{tableName}</h4>
            <table>
                <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {columns.map(column => (
                            <td key={column}>{item[column]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
