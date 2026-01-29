export const monthlyVatReconciliationData = [
    {
        month: 'Shrawan',
        taxableSales: 1200500.00,
        vat: 156065.00,
        portalSales: 1200500.00,
        portalVat: 156065.00,
    },
    {
        month: 'Bhadra',
        taxableSales: 980000.00,
        vat: 127400.00,
        portalSales: 980000.00,
        portalVat: 127400.00,
    },
    {
        month: 'Ashwin',
        taxableSales: 1450200.00,
        vat: 188526.00,
        portalSales: 1437700.00,
        portalVat: 186901.00,
    },
    {
        month: 'Kartik',
        taxableSales: 850000.00,
        vat: 110500.00,
        portalSales: 850000.00,
        portalVat: 110500.00,
    },
    {
        month: 'Mangshar',
        taxableSales: 1050000.00,
        vat: 136500.00,
        portalSales: 1050000.00,
        portalVat: 136500.00,
    },
    {
        month: 'Poush',
        taxableSales: 1120000.00,
        vat: 145600.00,
        portalSales: 1120000.00,
        portalVat: 145600.00,
    },
    {
        month: 'Magh',
        taxableSales: 0.00,
        vat: 0.00,
        portalSales: 0.00,
        portalVat: 0.00,
    },
    {
        month: 'Falgun',
        taxableSales: 0.00,
        vat: 0.00,
        portalSales: 0.00,
        portalVat: 0.00,
    },
    {
        month: 'Chaitra',
        taxableSales: 0.00,
        vat: 0.00,
        portalSales: 0.00,
        portalVat: 0.00,
    },
    {
        month: 'Baishakh',
        taxableSales: 0.00,
        vat: 0.00,
        portalSales: 0.00,
        portalVat: 0.00,
    },
    {
        month: 'Jestha',
        taxableSales: 0.00,
        vat: 0.00,
        portalSales: 0.00,
        portalVat: 0.00,
    },
    {
        month: 'Ashadh',
        taxableSales: 0.00,
        vat: 0.00,
        portalSales: 0.00,
        portalVat: 0.00,
    },
];

export const vatReconciliationMetrics = [
    {
        label: 'Total Taxable Sales',
        value: 8650700.00,
        color: 'blue',
        icon: 'sales',
    },
    {
        label: 'Total VAT Collected',
        value: 1124591.00,
        color: 'green',
        icon: 'vat',
    },
    {
        label: 'Portal VAT Return',
        value: 1110966.00,
        color: 'purple',
        icon: 'return',
    },
    {
        label: 'Difference (Discrepancy)',
        value: 13625.00,
        color: 'orange',
        icon: 'warning',
        isWarning: true,
    },
];

export const reconciliationInsights = {
    discrepancies: [
        {
            month: 'Ashwin',
            amount: 12.5,
            reason: 'Possible invoice mismatch',
            severity: 'low',
        },
    ],
    syncStatus: {
        lastSync: new Date(Date.now() - 3600000), // 1 hour ago
        status: 'synchronized',
    },
    suggestedActions: [
        'Review Ashwin sales invoices',
        'Verify portal return filing',
        'Check for missing invoices',
    ],
};
