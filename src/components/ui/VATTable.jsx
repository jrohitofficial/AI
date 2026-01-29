import React from 'react';

const VATTable = ({ data = [] }) => {
    const calculateTotal = (key) => {
        return data.reduce((sum, row) => sum + (parseFloat(row[key]) || 0), 0);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const getComparisonClass = (difference) => {
        if (difference === 0) return 'text-green-600';
        if (difference < 0) return 'text-red-600';
        return 'text-red-600';
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-white">
                        <th rowSpan={2} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-r border-gray-200">
                            MONTH (BS)
                        </th>
                        <th colSpan="2" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-r border-gray-200 bg-gray-200">
                            AS PER LEDGER (BOOK VALUE)
                        </th>
                        <th colSpan="2" className="px-6 py-3 text-center text-xs font-medium text-blue-600 uppercase tracking-wider border-b border-r border-gray-200 bg-gray-200">
                            AS PER VAT RETURN (IRD PORTAL)
                        </th>
                        <th rowSpan={2} className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            DIFFERENCES
                        </th>
                    </tr>
                    <tr className="bg-white">
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider border-b-2 border-r border-gray-300 bg-gray-50">TAXABLE SALES</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider border-b-2 border-r border-gray-300 bg-gray-50">VAT (13%)</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider border-b-2 border-r border-gray-300 bg-blue-50">TAXABLE SALES</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider border-b-2 border-r border-gray-300 bg-blue-50">VAT (13%)</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {data.map((row, index) => {
                        const difference = row.portalVat - row.vat;
                        
                        return (
                            <tr
                                key={index}
                                className="border-b border-gray-100 hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">{row.month}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 text-right border-r border-gray-200">{formatCurrency(row.taxableSales)}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 text-right border-r border-gray-200">{formatCurrency(row.vat)}</td>
                                <td className="px-6 py-4 text-sm text-blue-600 text-right font-medium border-r border-gray-200">{formatCurrency(row.portalSales)}</td>
                                <td className="px-6 py-4 text-sm text-blue-600 text-right font-medium border-r border-gray-200">{formatCurrency(row.portalVat)}</td>
                                <td className={`px-6 py-4 text-sm text-right font-medium flex items-center justify-end gap-2`}>
                                    {difference === 0 ? (
                                        <>
                                            <span className="text-green-600">0.00</span>
                                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </>
                                    ) : (
                                        <>
                                            <span className={getComparisonClass(difference)}>
                                                ({formatCurrency(Math.abs(difference))})
                                            </span>
                                            {difference < 0 && (
                                                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
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
                    <tr className="bg-slate-800 text-white font-semibold">
                        <td className="px-6 py-4 text-sm uppercase border-r border-gray-600">TOTAL<br/>SUMMARY</td>
                        <td className="px-6 py-4 text-sm text-right border-r border-gray-600">{formatCurrency(calculateTotal('taxableSales'))}</td>
                        <td className="px-6 py-4 text-sm text-right border-r border-gray-600">{formatCurrency(calculateTotal('vat'))}</td>
                        <td className="px-6 py-4 text-sm text-right border-r border-gray-600">{formatCurrency(calculateTotal('portalSales'))}</td>
                        <td className="px-6 py-4 text-sm text-right border-r border-gray-600">{formatCurrency(calculateTotal('portalVat'))}</td>
                        <td className="px-6 py-4 text-sm text-right flex items-center justify-end gap-2">
                            <span className="text-orange-400">({formatCurrency(Math.abs(calculateTotal('portalVat') - calculateTotal('vat')))})</span>
                            <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
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
