import React, { useState, useEffect } from 'react';

const VATTable = ({ data = [] }) => {
    const [tableData, setTableData] = useState(data);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const calculateTotal = (key) => {
        return tableData.reduce((sum, row) => sum + (parseFloat(row[key]) || 0), 0);
    };

    const formatCurrency = (value) => {
        const numValue = parseFloat(value) || 0;
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numValue);
    };

    const getComparisonClass = (difference) => {
        if (difference === 0) return 'text-green-600';
        if (difference < 0) return 'text-red-600';
        return 'text-red-600';
    };

    const handleTaxableSalesChange = (index, value) => {
        const numValue = parseFloat(value) || 0;
        const newData = [...tableData];
        newData[index].taxableSales = parseFloat(numValue.toFixed(2));
        newData[index].vat = parseFloat((numValue * 0.13).toFixed(2));
        setTableData(newData);
    };

    const handleTaxableSalesBlur = (index) => {
        const newData = [...tableData];
        newData[index].taxableSales = parseFloat(newData[index].taxableSales.toFixed(2));
        newData[index].vat = parseFloat((newData[index].taxableSales * 0.13).toFixed(2));
        setTableData(newData);
    };

    const handlePortalSalesChange = (index, value) => {
        const numValue = parseFloat(value) || 0;
        const newData = [...tableData];
        newData[index].portalSales = parseFloat(numValue.toFixed(2));
        newData[index].portalVat = parseFloat((numValue * 0.13).toFixed(2));
        setTableData(newData);
    };

    const handlePortalSalesBlur = (index) => {
        const newData = [...tableData];
        newData[index].portalSales = parseFloat(newData[index].portalSales.toFixed(2));
        newData[index].portalVat = parseFloat((newData[index].portalSales * 0.13).toFixed(2));
        setTableData(newData);
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-sm leading-none">
                <thead>
                    <tr className="bg-white">
                        <th rowSpan={2} className="px-4 py-1.5 text-left text-xs font-semibold text-blue-900 bg-blue-50 uppercase tracking-wide border-b border-r border-blue-200 shadow-sm">
                            Month (BS)
                        </th>
                        <th colSpan="2" className="px-4 py-1.5 text-center text-xs font-semibold text-gray-800 uppercase tracking-wide border-b border-r border-gray-300 bg-slate-200">
                            As Per Ledger
                        </th>
                        <th colSpan="2" className="px-4 py-1.5 text-center text-xs font-semibold text-blue-700 uppercase tracking-wide border-b border-r border-gray-300 bg-blue-100">
                            As Per VAT Return
                        </th>
                        <th rowSpan={2} className="px-4 py-1.5 text-right text-xs font-semibold text-amber-900 uppercase tracking-wide border-b border-gray-300 bg-amber-100">
                            Difference
                        </th>
                    </tr>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-1 text-right text-xs font-semibold text-gray-700 uppercase border-b border-r border-gray-300 bg-slate-200">Taxable Sales</th>
                        <th className="px-4 py-1 text-right text-xs font-semibold text-gray-700 uppercase border-b border-r border-gray-300 bg-slate-200">VAT 13%</th>
                        <th className="px-4 py-1 text-right text-xs font-semibold text-blue-600 uppercase border-b border-r border-gray-300 bg-blue-100">Taxable Sales</th>
                        <th className="px-4 py-1 text-right text-xs font-semibold text-blue-600 uppercase border-b border-r border-gray-300 bg-blue-100">VAT 13%</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {tableData.map((row, index) => {
                        const difference = row.portalVat - row.vat;
                        
                        return (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-blue-50/30"
                            >
                                <td className="px-4 py-1 text-xs font-semibold text-blue-900 bg-blue-50 border-r border-blue-200">{row.month}</td>
                                <td className="px-4 py-1 text-xs text-gray-700 text-right border-r border-gray-200">
                                    <input
                                        type="number"
                                        value={row.taxableSales || '0'}
                                        onChange={(e) => handleTaxableSalesChange(index, e.target.value)}
                                        onBlur={() => handleTaxableSalesBlur(index)}
                                        className="w-full h-7 text-right px-2 py-0.5 border-0 bg-transparent focus:outline-none text-xs font-medium"
                                        placeholder="0"
                                        step="0.01"
                                        min="0"
                                    />
                                </td>
                                <td className="px-4 py-1 text-xs text-gray-700 text-right border-r border-gray-200 bg-gray-50 font-semibold">{formatCurrency(row.vat)}</td>
                                <td className="px-4 py-1 text-xs text-gray-700 text-right border-r border-gray-200">
                                    <input
                                        type="number"
                                        value={row.portalSales || '0'}
                                        onChange={(e) => handlePortalSalesChange(index, e.target.value)}
                                        onBlur={() => handlePortalSalesBlur(index)}
                                        className="w-full h-7 text-right px-2 py-0.5 border-0 bg-transparent focus:outline-none text-xs font-medium"
                                        placeholder="0"
                                        step="0.01"
                                        min="0"
                                    />
                                </td>
                                <td className="px-4 py-1 text-xs text-blue-600 text-right font-semibold border-r border-gray-200">{formatCurrency(row.portalVat)}</td>
                                <td className={`px-4 py-1 text-xs text-right font-semibold flex items-center justify-end gap-1.5`}>
                    {difference === 0 ? (
                                        <>
                                            <span className="text-green-600">0.00</span>
                                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </>
                                    ) : (
                                        <>
                                            <span className={getComparisonClass(difference)}>
                                                ({formatCurrency(Math.abs(difference))})
                                            </span>
                                            {difference < 0 && (
                                                <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr className="bg-slate-800 text-white font-semibold text-xs">
                        <td className="px-4 py-1.5 uppercase border-r border-gray-600">Total Summary</td>
                        <td className="px-4 py-1.5 text-right border-r border-gray-600">{formatCurrency(calculateTotal('taxableSales'))}</td>
                        <td className="px-4 py-1.5 text-right border-r border-gray-600">{formatCurrency(calculateTotal('vat'))}</td>
                        <td className="px-4 py-1.5 text-right border-r border-gray-600">{formatCurrency(calculateTotal('portalSales'))}</td>
                        <td className="px-4 py-1.5 text-right border-r border-gray-600">{formatCurrency(calculateTotal('portalVat'))}</td>
                        <td className="px-4 py-1.5 text-right flex items-center justify-end gap-1.5">
                            <span className="text-orange-400">({formatCurrency(Math.abs(calculateTotal('portalVat') - calculateTotal('vat')))})</span>
                            <svg className="w-3 h-3 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default VATTable;
