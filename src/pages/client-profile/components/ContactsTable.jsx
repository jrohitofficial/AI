import React, { useState } from 'react';

const ContactsTable = ({ contacts = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  
  const mockContacts = contacts.length > 0 ? contacts : Array(8).fill(null).map((_, idx) => ({
    id: idx + 1,
    name: idx === 0 ? 'John Smithe' : 'Rohit Jha',
    role: idx === 0 ? 'CEO' : 'Managing Director',
    department: 'Executive',
    email: idx === 0 ? 'john.smith@company.com' : 'Rjhot2@gmail.com',
    phone: idx === 0 ? '+977(1)4567-890' : '+977-9803391234',
    isPrimary: idx === 0
  }));

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setEditData(contact);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving contact:', editData);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Contact Persons</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Clients
        </button>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {mockContacts.slice(0, 5).map((contact, idx) => (
          <div key={idx}>
            {editingId === contact.id ? (
              <div className="border border-blue-300 bg-blue-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Role</label>
                    <input
                      type="text"
                      value={editData.role}
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="flex gap-1 pt-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-600">{getInitials(contact.name)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {contact.isPrimary && (
                      <div className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Primary
                      </div>
                    )}
                    <button
                      onClick={() => handleEdit(contact)}
                      className="text-gray-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{contact.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium mb-1">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.825-8.82-2.267m19.834-6.196a23.904 23.904 0 01-36.012 0M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                  {contact.role}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-600 mb-1 cursor-pointer hover:underline truncate">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 truncate">
                  <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="truncate">{contact.phone}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contacts Table */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">See All Contacts</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockContacts.map((contact, idx) => (
                <React.Fragment key={idx}>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-700">
                          {getInitials(contact.name).charAt(0)}
                        </div>
                        <span className="text-sm text-gray-900">{contact.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{contact.role}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{contact.department}</td>
                    <td className="py-3 px-4 text-sm text-blue-600">{contact.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{contact.phone}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(contact)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                  {editingId === contact.id && (
                    <tr className="bg-blue-50 border-b border-gray-200">
                      <td colSpan="6" className="py-4 px-4">
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <label className="text-xs font-medium text-gray-700 mb-1 block">Name</label>
                            <input
                              type="text"
                              value={editData.name}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 mb-1 block">Role</label>
                            <input
                              type="text"
                              value={editData.role}
                              onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 mb-1 block">Email</label>
                            <input
                              type="email"
                              value={editData.email}
                              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-700 mb-1 block">Phone</label>
                            <input
                              type="tel"
                              value={editData.phone}
                              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={handleSave}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <button className="px-6 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 hover:border-blue-300 flex items-center gap-2">
            View More Contacts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactsTable;
