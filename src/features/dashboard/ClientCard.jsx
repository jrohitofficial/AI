import React from 'react';
import { Card, Button, Icon } from '../../components';
import { STATUS_COLORS, CLIENT_STATUS } from '../../constants';

const ClientCard = ({ client, onAction }) => {
    const colors = STATUS_COLORS[client.status];

    return (
        <Card className="relative">
            {/* Status Badge */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`${colors.iconBg} ${colors.iconText} p-3 rounded-lg flex items-center justify-center`}>
                        <img src={client.icon} alt={client.name} className="w-6 h-6" />
                    </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                    {client.status}
                </span>
            </div>

            {/* Client Info */}
            <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">{client.name}</h4>
                <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Icon name="document" className="w-4 h-4" />
                        <span>PAN: {client.pan}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Icon name="building" className="w-4 h-4" />
                        <span>Sector: {client.sector}</span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Audit Progress</span>
                    <span className="text-sm font-bold text-gray-800">{client.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full ${colors.progress}`}
                        style={{ width: `${client.progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Action Button */}
            <Button
                onClick={() => onAction && onAction(client)}
                variant={client.status === CLIENT_STATUS.COMPLETED ? 'secondary' : 'primary'}
                className="w-full"
            >
                {client.status === CLIENT_STATUS.COMPLETED ? 'View Report' : 'Enter Workspace'}
            </Button>
        </Card>
    );
};

export default ClientCard;
