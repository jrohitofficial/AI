export const engagementHubData = {
    client: {
        name: 'Everest Trading Co. Ltd',
        pan: 'PAN: 302456789',
        email: 'info@everesttrading.com',
        status: 'ACTIVE'
    },
    metrics: [
        {
            id: 1,
            title: 'Total Assets',
            value: 'NPR 45.2M',
            change: '+29% vs LY',
            icon: 'wallet',
            trend: 'up'
        },
        {
            id: 2,
            title: 'Net Profit',
            value: 'NPR 8.4M',
            change: 'Margin: 18.2%',
            icon: 'chart',
            trend: 'up'
        },
        {
            id: 3,
            title: 'Working Papers',
            value: '75% Complete',
            change: '18 of 24 items done',
            icon: 'document',
            trend: 'progress'
        }
    ],
    auditChecklist: [
        {
            id: 1,
            title: 'Planning & Risk Assessment',
            status: 'COMPLETED',
            progress: 100,
            dueDate: '2025-01-15',
            assignedTo: 'Deepak K.',
            tasks: [
                { name: 'Initial Assessment', status: 'COMPLETED' },
                { name: 'Risk Mapping', status: 'COMPLETED' },
                { name: 'Scope Planning', status: 'COMPLETED' }
            ]
        },
        {
            id: 2,
            title: 'VAT & Tax Reconciliation',
            status: 'IN PROGRESS',
            progress: 85,
            dueDate: '2025-01-28',
            assignedTo: 'Priya Sharma',
            tasks: [
                { name: 'VAT Documents Review', status: 'COMPLETED' },
                { name: 'Tax Compliance Check', status: 'IN PROGRESS' },
                { name: 'Reconciliation', status: 'PENDING' }
            ]
        },
        {
            id: 3,
            title: 'Disclosure Notes Preparation',
            status: 'NOT STARTED',
            progress: 15,
            dueDate: '2025-02-10',
            assignedTo: 'Unassigned',
            tasks: [
                { name: 'Prepare Draft', status: 'PENDING' },
                { name: 'Review & Feedback', status: 'PENDING' },
                { name: 'Finalize', status: 'PENDING' }
            ]
        }
    ],
    quickActions: [
        { id: 1, title: 'Jump to VAT Beacon', icon: '🔗' },
        { id: 2, title: 'Open PPE Schedule', icon: '📑' },
        { id: 3, title: 'Review Ratio Summary', icon: '📊' },
        { id: 4, title: 'Verify Cash & Bank', icon: '💳' }
    ],
    recentComments: [
        {
            id: 1,
            author: 'Subedi B. (Tax Lead)',
            role: 'Tax Lead',
            comment: 'Please check VAT ledger mismatch in Bharatpur',
            timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
            avatar: 'SB'
        },
        {
            id: 2,
            author: 'Deepak K. (Manager)',
            role: 'Manager',
            comment: 'Good progress so far! We need to complete working papers update',
            timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
            avatar: 'DK'
        }
    ]
};
