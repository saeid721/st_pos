import React, { useEffect } from 'react';
import { formatDate } from '../../../lib/format';

const ReusablePdfGenerator = ({ title, columns, data, fileName, setPdfButtonClick }) => {
    useEffect(() => {
        if (data && Array.isArray(data)) {
            generatePdf(data);
        } else {
            console.error('No valid data to generate PDF.');
            setPdfButtonClick(false);
        }
    }, [data]);

    const loadImageAsBase64 = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = url;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const base64 = canvas.toDataURL('image/jpeg');
                resolve(base64);
            };

            img.onerror = (err) => {
                reject(err);
            };
        });
    };

    const generatePdf = async (dataToExport) => {
        try {
            const doc = new jsPDF({ orientation: 'landscape' });
            const backendUrl = import.meta.env.VITE_LOCAL_API_URL;

            const pageWidth = doc.internal.pageSize.getWidth();
            const textWidth = doc.getTextWidth(title);
            const textX = (pageWidth - textWidth) / 2;
            doc.setFontSize(18);
            doc.text(title, textX, 20);

            const filteredColumns = columns.filter(
                col => col.Header && !['actions', 'serial'].includes(col.id)
            );

            const tableHeaders = filteredColumns.map(col => col.Header);

            const tableBody = dataToExport.map(row =>
                filteredColumns.map(col => {
                    if (col.accessor === 'date' || col.accessor === 'created_at' || col.accessor === 'updated_at' || col.accessor === 'invoice_date' || col.accessor === 'transaction_at' || col.accessor === 'salary_date' || col.accessor === 'increment_date' || col.accessor === 'appointment_date' || col.accessor === 'joining_date' || col.accessor === 'birth_date') {
                        return formatDate(row[col.accessor]);
                    }

                    if (col.accessor === 'image_path' || col.accessor === 'main_image') {
                        return {
                            content: '', // Prevent [object Object]
                            imageUrl: backendUrl + row[col.accessor]
                        };
                    }

                    if (col.accessor === 'photo' || col.accessor === 'main_image') {
                        return {
                            content: '', // Prevent [object Object]
                            imageUrl: backendUrl + row[col.accessor]
                        };
                    }

                    if (col.accessor && typeof col.accessor === 'string') {
                        if (col.accessor.includes('.')) {
                            return col.accessor.split('.').reduce((acc, key) => acc?.[key], row) ?? '';
                        }

                        const value = row[col.accessor];
                        return typeof value === 'boolean' ? (value ? 'Active' : 'Inactive') : value ?? '';
                    }

                    return '';
                })
            );

            await autoTable(doc, {
                startY: 30,
                head: [tableHeaders],
                body: tableBody,
                theme: 'grid',
                styles: {
                    fontSize: 8,
                    cellPadding: 3,
                    valign: 'middle',
                    halign: 'center',
                    lineWidth: 0.1,
                    lineColor: [0, 0, 0]
                },
                headStyles: {
                    fillColor: [242, 242, 242],
                    textColor: [0, 0, 0],
                    fontStyle: 'bold',
                    halign: 'center'
                },
                alternateRowStyles: {
                    fillColor: [249, 249, 249]
                },
                margin: { top: 10, right: 10, bottom: 10, left: 10 },

                didDrawCell: async function (data) {
                    const columnIndex = data.column.index;
                    const column = filteredColumns[columnIndex];

                    if (column?.accessor === 'image_path') {
                        const { imageUrl } = data.cell.raw || {};

                        if (imageUrl) {
                            try {
                                const base64Image = await loadImageAsBase64(imageUrl);
                                doc.addImage(
                                    base64Image,
                                    'JPEG',
                                    data.cell.x + 2,
                                    data.cell.y + 2,
                                    16,
                                    16
                                );
                            } catch (err) {
                                console.warn('Failed to load image:', imageUrl);
                            }
                        }
                    }
                }
            });

            doc.save(fileName || 'report.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setPdfButtonClick(false);
        }
    };

    return null;
};

export default ReusablePdfGenerator;
