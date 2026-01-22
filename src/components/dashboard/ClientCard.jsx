import React from 'react';

const ClientCard = ({ client }) => {
    const statusColors = {
        ACTIVE: 'bg-green-100 text-green-700',
        'IN PLANNING': 'bg-orange-100 text-orange-700',
        COMPLETED: 'bg-blue-100 text-blue-700',
    };

    const progressColors = {
        ACTIVE: 'bg-blue-600',
        'IN PLANNING': 'bg-orange-500',
        COMPLETED: 'bg-green-600',
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            {/* Status Badge */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`${client.status === 'ACTIVE' ? 'bg-blue-100 text-blue-600' : 
                                      client.status === 'IN PLANNING' ? 'bg-orange-100 text-orange-600' : 
                                      'bg-green-100 text-green-600'} p-3 rounded-lg`}>
                        {client.icon}
                    </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[client.status]}`}>
                    {client.status}
                </span>
            </div>

            {/* Client Info */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{client.name}</h3>
                <div className="space-y-1 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <span>📋</span>
                        <span>PAN: {client.pan}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>🏢</span>
                        <span>Sector: {client.sector}</span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                        {client.status === 'COMPLETED' ? 'Audit Progress' : 'Audit Progress'}
                    </span>
                    <span className="text-sm font-bold text-gray-800">{client.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full ${progressColors[client.status]}`}
                        style={{ width: `${client.progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Action Button */}
            <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    client.status === 'COMPLETED'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
            >
                {client.status === 'COMPLETED' ? 'View Report 📄' : 'Enter Workspace →'}
            </button>
        </div>
    );
};

export default ClientCard;
