export const activities = [
    {
        id: 'a1',
        title: 'New incident flagged',
        actor: 'Aaliyah Shaw',
        channel: 'Slack #alerts',
        timestamp: Date.now() - 1000 * 60 * 14
    },
    {
        id: 'a2',
        title: 'Dashboard shared with Finance',
        actor: 'Marco Velasquez',
        channel: 'Email',
        timestamp: Date.now() - 1000 * 60 * 60 * 2
    },
    {
        id: 'a3',
        title: 'Usage spike detected',
        actor: 'System',
        channel: 'PagerDuty',
        timestamp: Date.now() - 1000 * 60 * 60 * 6
    },
    {
        id: 'a4',
        title: 'Quarterly review drafted',
        actor: 'Priya Raman',
        channel: 'Notion',
        timestamp: Date.now() - 1000 * 60 * 60 * 18
    }
];
