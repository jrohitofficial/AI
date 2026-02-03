import React from 'react';

const ActivityTimeline = ({ activities = [] }) => {
  const defaultActivities = [
    { title: 'Payment Received', desc: 'Payment of Rs8,500 received for Invoice-IH by Kohli', status: 'Completed', type: 'payment' },
    { title: 'Invoice Generated', desc: 'Invoice for Q1 Software License of Software License', status: 'Completed', type: 'invoice' },
    { title: 'Email Sent', desc: 'Quarterly advance sent to john.smith@invoice.com', status: 'Completed', type: 'email' },
    { title: 'Phone Call', desc: 'Follow-up call regarding overdue invoice Invoice-1039', status: 'Completed', type: 'phone' },
    { title: 'Payment Received', desc: 'Payment of Rs8,500 received for Invoice-IH by Kohli', status: 'Completed', type: 'payment' },
    { title: 'Document Uploaded', desc: 'Service Agreement 2016.pdf is uploaded', status: 'Completed', type: 'document' },
    { title: 'Contact Updated', desc: 'Contact information updated for more Johnn', status: 'Completed', type: 'contact' },
    { title: 'Profile Updated', desc: 'Credit limit increased from Rs7,5000 to Rs10,0000', status: 'Completed', type: 'profile' },
    { title: 'Payment Overdue', desc: 'Invoice IN-1025 is now 5 days overdue', status: 'Alert', type: 'alert' },
    { title: 'Contract Signed', desc: 'Annual services agreement signed for 2026', status: 'Completed', type: 'contract' },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  const getIconAndColor = (type) => {
    const configs = {
      payment: { 
        bg: 'bg-green-100', 
        icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
        color: 'text-green-600'
      },
      invoice: { 
        bg: 'bg-blue-100', 
        icon: 'M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6l4-4V4a2 2 0 00-2-2H7zm8 12H9a1 1 0 110-2h6v-2H9a1 1 0 110-2h6V6l-2-2H7v12h8v-2z',
        color: 'text-blue-600'
      },
      email: { 
        bg: 'bg-pink-100', 
        icon: 'M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2-.5l6 3.75 6-3.75H4z',
        color: 'text-pink-600'
      },
      phone: { 
        bg: 'bg-orange-100', 
        icon: 'M2 3.5A1.5 1.5 0 013.5 2h2A1.5 1.5 0 017 3.5V6a1.5 1.5 0 01-1.5 1.5h-.86a9.96 9.96 0 006.86 6.86v-.86A1.5 1.5 0 0113.5 12h2A1.5 1.5 0 0117 13.5v2A1.5 1.5 0 0115.5 17h-.5C7.163 17 2 11.837 2 5.5v-2z',
        color: 'text-orange-600'
      },
      document: { 
        bg: 'bg-blue-100', 
        icon: 'M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414a2 2 0 00-.586-1.414l-3.414-3.414A2 2 0 0010.586 2H6zm6 1.414L16.586 8H12V3.414z',
        color: 'text-blue-600'
      },
      contact: { 
        bg: 'bg-teal-100', 
        icon: 'M10 10a4 4 0 100-8 4 4 0 000 8zm-6 6a6 6 0 1112 0H4z',
        color: 'text-teal-600'
      },
      profile: { 
        bg: 'bg-purple-100', 
        icon: 'M4 13.5V16h2.5l7.379-7.379-2.5-2.5L4 13.5zm10.793-8.207a1 1 0 010 1.414l-1.086 1.086-2.5-2.5 1.086-1.086a1 1 0 011.414 0l1.086 1.086z',
        color: 'text-purple-600'
      },
      alert: {
        bg: 'bg-red-100',
        icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 8a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z',
        color: 'text-red-600'
      },
      contract: {
        bg: 'bg-green-100',
        icon: 'M9 2a2 2 0 00-2 2v2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2v-3h-2v3H6V8h1v1a2 2 0 104 0V8h3v2h2V6a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H9zm0 2h2v3a1 1 0 11-2 0V4z',
        color: 'text-green-600'
      }
    };
    return configs[type] || configs.payment;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Activity Timeline</h2>
      <div className="space-y-6">
        {displayActivities.map((item, idx) => {
          const config = getIconAndColor(item.type);
          return (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                  <svg className={`w-4 h-4 ${config.color}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d={config.icon} clipRule="evenodd" />
                  </svg>
                </div>
                {idx < displayActivities.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>3 days ago</span>
                      <span>•</span>
                      <span>System</span>
                    </div>
                  </div>
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                    item.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : item.status === 'Alert'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 hover:border-blue-300 flex items-center gap-2">
          View More Activities
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ActivityTimeline;
