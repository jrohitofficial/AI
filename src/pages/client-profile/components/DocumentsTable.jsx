import React, { useState } from 'react';

const DocumentsTable = ({ documents = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadType, setUploadType] = useState('Contract');
  const [uploadedBy, setUploadedBy] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const documentStats = [
    {
      label: 'Contacts',
      value: '1200',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      iconPaths: [
        'M17 20h5v-2a4 4 0 00-5-3.87',
        'M9 20H4v-2a4 4 0 015-3.87',
        'M16 3.13a4 4 0 010 7.75',
        'M8 3.13a4 4 0 100 7.75',
        'M12 12a4 4 0 100-8 4 4 0 000 8z'
      ]
    },
    {
      label: 'Invoices',
      value: '500',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      iconPaths: [
        'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      ]
    },
    {
      label: 'Reports',
      value: '1231',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      iconPaths: [
        'M11 3a1 1 0 011 1v16a1 1 0 11-2 0V4a1 1 0 011-1z',
        'M5 9a1 1 0 011 1v10a1 1 0 11-2 0V10a1 1 0 011-1z',
        'M17 13a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1z',
        'M3 21h18'
      ]
    },
    {
      label: 'Others',
      value: '100+',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      iconPaths: [
        'M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z'
      ]
    }
  ];

  const mockDocuments = documents.length > 0 ? documents : Array(8).fill(null).map((_, idx) => ({
    id: idx + 1,
    name: 'Service Agreement 2016.pdf',
    type: ['Contract', 'Invoice', 'Image', 'Files', 'Pdf', 'PPT', 'Image', 'Invoices'][idx],
    size: '2.5 MB',
    uploadedBy: 'Rohit Jha',
    date: 'Jan 21, 2025'
  }));

  const allDocuments = [...mockDocuments, ...uploadedDocuments];

  const handleUploadDocument = () => {
    if (uploadFile) {
      const newDocument = {
        id: allDocuments.length + 1,
        name: uploadFile.name,
        type: uploadType,
        size: (uploadFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadedBy: uploadedBy || 'You',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      };
      setUploadedDocuments([newDocument, ...uploadedDocuments]);
      setShowUploadModal(false);
      setUploadFile(null);
      setUploadType('Contract');
      setUploadedBy('');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Documents</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Documents
          </button>
        </div>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {documentStats.map((stat, idx) => (
          <div key={idx} className={`${stat.bgColor} rounded-lg p-4 border border-gray-200`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center`}>
                <svg className={`w-6 h-6 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {stat.iconPaths.map((path, pathIdx) => (
                    <path key={pathIdx} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                  ))}
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Documents Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Document Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Size</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Uploaded By</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {allDocuments.map((doc, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{doc.type}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{doc.size}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{doc.uploadedBy}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{doc.date}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors" title="Download">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-green-600 transition-colors" title="Preview">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-600">Showing 1 of 2222 Transaction</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Next</button>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {/* Document Type */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Document Type</label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option>Contract</option>
                  <option>Invoice</option>
                  <option>Report</option>
                  <option>Image</option>
                  <option>PDF</option>
                  <option>Other</option>
                </select>
              </div>

              {/* File Upload */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Select File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center hover:border-blue-400 transition">
                  <input
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files?.[0])}
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer block">
                    <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      {uploadFile ? uploadFile.name : 'Drag and drop or click to select'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Uploaded By */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Uploaded By</label>
                <input
                  type="text"
                  value={uploadedBy}
                  onChange={(e) => setUploadedBy(e.target.value)}
                  placeholder="Enter uploader name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description (Optional)</label>
                <textarea
                  placeholder="Add document description..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  rows="2"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={handleUploadDocument}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Upload
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsTable;
