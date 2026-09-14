import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { formatDate } from '../../../lib/format';

const ReusablePrintComponent = ({ title, columns, data, setPrintButtonClick }) => {
    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        removeAfterPrint: true,
        onAfterPrint: () => setPrintButtonClick(false),
        onPrintError: (err) => {
            console.error('Print Error:', err);
            setPrintButtonClick(false);
        },
        pageStyle: `
            body {
                -webkit-print-color-adjust: exact;
                margin: 0;
                padding: 5px;
                font-family: 'Inter', sans-serif;
            }
            @page {
                size: auto;
                margin: 0mm;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                margin-top: 20px;
            }
            th, td {
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
            }
            th {
                background-color: #f2f2f2;
                font-weight: bold;
            }
            h1 {
                text-align: center;
                margin-bottom: 20px;
                color: #333;
            }
        `
    });

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            handlePrint();
        } else {
            setPrintButtonClick(false);
        }
    }, [data]);

    const resolveValue = (row, accessor) => {
        if (!accessor) return '';
        if (accessor.includes('.')) {
            return accessor.split('.').reduce((acc, key) => acc?.[key], row) ?? '';
        }
        const value = row[accessor];
        return typeof value === 'boolean' ? (value ? 'Active' : 'Inactive') : value ?? '';
    };

    const backendUrl = import.meta.env.VITE_LOCAL_API_URL;

    return (
        <div className="hidden">
            <div ref={componentRef} className="p-5 text-gray-700">
                <h1 style={{ fontSize: '22px', fontWeight: 700 }}>{title}</h1>
                <table>
                    <thead>
                        <tr>
                            {columns
                                .filter(col => col.Header && !['actions'].includes(col.id) && col.Header !== 'Image')
                                .map((col, i) => (
                                    <th key={`th-${i}`}>{col.Header}</th>
                                ))}
                        </tr>
                    </thead>


                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns
                                    .filter(col => col.Header && !['actions'].includes(col.id) && col.Header !== 'Image')
                                    .map((col, colIndex) => (
                                        <td key={`td-${rowIndex}-${colIndex}`}>
                                            {col.accessor === 'image_path' || col.accessor === 'photo' ? (
                                                <img
                                                    src={`${backendUrl}${row[col.accessor]}`}
                                                    alt={row.name}
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            ) : col.accessor === 'date' ? (
                                                <span>{formatDate(resolveValue(row, col.accessor))}</span>
                                            ) : col.accessor === 'transaction_at' ? (
                                                <span>{formatDate(resolveValue(row, col.accessor))}</span>
                                            ) : col.accessor === 'invoice_date' ? (
                                                <span>{formatDate(resolveValue(row, col.accessor))}</span>
                                            ) : col.accessor === 'salary_date' ? (
                                                <span>{formatDate(resolveValue(row, col.accessor))}</span>
                                            ) : col.accessor === 'created_at' ? (
                                                <span>{formatDate(resolveValue(row, col.accessor))}</span>
                                            ) : col.accessor === 'updated_at' ? (
                                                <span>{formatDate(resolveValue(row, col.accessor))}</span>
                                            ) : col.accessor === 'appointment_date' ? (
                                                <span>{formatDate(resolveValue(row, col.accessor))}</span>
                                            ) : col.accessor === 'joining_date' ? (
                                                <span>{formatDate(resolveValue(row, col.accessor))}</span>
                                            ) : col.accessor === 'increment_date' ? (
                                                <span>{formatDate(resolveValue(row, col.accessor))}</span>
                                            ) : col.accessor === 'birth_date' ? (
                                                <span>{formatDate(resolveValue(row, col.accessor))}</span>
                                            ) : (
                                                col.accessor === 'id' ? rowIndex + 1 : resolveValue(row, col.accessor)
                                            )}

                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReusablePrintComponent;
