import React, { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import SuccessNotification from '../../components/ui/SuccessNotification';

const AddClientModal = ({ isOpen, onClose, onAddClient, variant = 'drawer' }) => {
    const [formData, setFormData] = useState({
        panNumber: '',
        registrationNumber: '',
        companyName: '',
        industryType: '',
        fiscalYear: 'FY 2080/81',
        businessStructure: 'Sole Proprietorship',
        registeredInPANVAT: 'VAT',
        accountingStandard: 'NFRS for SMEs',
        contactPerson: '',
        contactEmail: ''
    });

    const [errors, setErrors] = useState({});
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [pendingClientData, setPendingClientData] = useState(null);

    // Reset all states when modal closes
    useEffect(() => {
        if (!isOpen) {
            // Reset all dialog and notification states
            const timer = setTimeout(() => {
                setShowConfirmDialog(false);
                setShowSuccessNotification(false);
                setPendingClientData(null);
                setErrors({});
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const industriesOptions = [
        'Manufacturing',
        'Trading & Distribution',
        'Energy & Utilities',
        'IT & Software',
        'Real Estate',
        'Healthcare',
        'Education',
        'Finance & Banking',
        'Hospitality',
        'Agriculture',
        'Other'
    ];

    const businessStructures = [
        'Sole Proprietorship',
        'Partnership',
        'Private Limited Company',
        'Public Limited Company',
        'Non-Profit Organization',
        'Cooperative'
    ];

    const accountingStandards = [
        { label: 'NFRS for SMEs', desc: 'Applicable for Small to Medium entities not having public accountability' },
        { label: 'NAS for MEs', desc: 'For Large Entities or those with public accountability requirements, other trading or service.' },
        { label: 'NAS for NPOs', desc: 'Applicable for Small to Medium Non Profit Organizations or service org with profit objectives' },
        { label: 'NAS for SMEs', desc: 'Applicable for Small to Medium entities not having public accountability with timeless revenue' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Apply real-time validation based on field type
        let filteredValue = value;
        
        // Only numbers allowed for these fields
        if (name === 'panNumber' || name === 'registrationNumber') {
            filteredValue = value.replace(/[^\d]/g, '');
        }
        
        // Only letters and spaces for contact person
        if (name === 'contactPerson') {
            filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
        }
        
        // Only letters, numbers and spaces for company name
        if (name === 'companyName') {
            filteredValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: filteredValue
        }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // PAN Number validation - only numbers
        if (!formData.panNumber.trim()) {
            newErrors.panNumber = 'PAN Number is required';
        } else if (!/^\d+$/.test(formData.panNumber.trim())) {
            newErrors.panNumber = 'PAN Number should contain only numbers';
        }

        // Company Name validation - only alphabets or alphanumeric
        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company Name is required';
        } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.companyName.trim())) {
            newErrors.companyName = 'Company Name should contain only letters and numbers';
        }

        if (!formData.industryType) newErrors.industryType = 'Industry Type is required';

        // Contact Person validation - only alphabets
        if (!formData.contactPerson.trim()) {
            newErrors.contactPerson = 'Contact Person is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.contactPerson.trim())) {
            newErrors.contactPerson = 'Contact Person should contain only letters';
        }

        // Contact Email validation
        if (!formData.contactEmail.trim()) {
            newErrors.contactEmail = 'Contact Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
            newErrors.contactEmail = 'Invalid email format';
        }

        // Registration Number validation - only numbers
        if (formData.registeredInPANVAT && formData.registeredInPANVAT.trim() && !/^\d+$/.test(formData.registeredInPANVAT.trim())) {
            newErrors.registeredInPANVAT = 'Registration should contain only numbers';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Create new client object
        const newClient = {
            id: Date.now(),
            name: formData.companyName,
            pan: formData.panNumber,
            sector: formData.industryType,
            status: 'ACTIVE',
            progress: 0,
            icon: '/img/store-icon.svg',
            registrationNumber: formData.registrationNumber,
            fiscalYear: formData.fiscalYear,
            businessStructure: formData.businessStructure,
            registeredInPANVAT: formData.registeredInPANVAT,
            accountingStandard: formData.accountingStandard,
            contactPerson: formData.contactPerson,
            contactEmail: formData.contactEmail,
            createdAt: new Date().toISOString()
        };

        // Store client data and show confirmation dialog
        setPendingClientData(newClient);
        setShowConfirmDialog(true);
    };

    const handleConfirmSave = () => {
        if (pendingClientData) {
            onAddClient(pendingClientData);
            setShowSuccessNotification(true);
            handleReset();
            setPendingClientData(null);
        }
    };

    const handleSuccessClose = () => {
        // Close the modal immediately when success notification closes
        onClose();
    };

    const handleReset = () => {
        setFormData({
            panNumber: '',
            registrationNumber: '',
            companyName: '',
            industryType: '',
            fiscalYear: 'FY 2080/81',
            businessStructure: 'Sole Proprietorship',
            registeredInPANVAT: 'VAT',
            accountingStandard: 'NFRS for SMEs',
            contactPerson: '',
            contactEmail: ''
        });
        setErrors({});
    };

    const handleCancel = () => {
        handleReset();
        onClose();
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleCancel} title="AI Auto-Fill" variant={variant}>
                <div className="mb-4 p-[2px] rounded-lg animate-gradient-border">
                    <div className="p-3 rounded-lg bg-white backdrop-blur-sm shadow-sm">
                        <div className="flex items-start gap-2">
                            {/* AI Icon */}
                            <div className="flex-shrink-0">
                                <img src="/icon/ri_ai.png" alt="AI" className="w-4 h-4" />
                            </div>
                            <p className="text-xs text-gray-600">
                                Enter PAN number and I will try to fetch Company details from the IRD database
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                {/* COMPANY DETAILS Section */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">COMPANY DETAILS</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* PAN Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                PAN Number
                            </label>
                            <input
                                type="text"
                                name="panNumber"
                                value={formData.panNumber}
                                onChange={handleChange}
                                placeholder="eg. 1073000038"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.panNumber ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.panNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.panNumber}</p>
                            )}
                        </div>

                        {/* Registration Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Registration Number
                            </label>
                            <input
                                type="text"
                                name="registrationNumber"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                placeholder="Company Registration number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Company Name */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Full company name"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.companyName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.companyName && (
                            <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                        )}
                    </div>

                    {/* Industry Type and Fiscal Year */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Industry Type
                            </label>
                            <select
                                name="industryType"
                                value={formData.industryType}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none cursor-pointer transition-colors hover:bg-gray-50 ${
                                    errors.industryType ? 'border-red-500' : 'border-gray-300'
                                }`}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1.25rem',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                <option value="">Select Industry Type</option>
                                {industriesOptions.map(industry => (
                                    <option key={industry} value={industry}>
                                        {industry}
                                    </option>
                                ))}
                            </select>
                            {errors.industryType && (
                                <p className="text-red-500 text-xs mt-1">{errors.industryType}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fiscal Year
                            </label>
                            <select
                                name="fiscalYear"
                                value={formData.fiscalYear}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none cursor-pointer transition-colors hover:bg-gray-50"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1.25rem',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                <option value="FY 2080/81">FY 2080/81</option>
                                <option value="FY 2081/82">FY 2081/82</option>
                                <option value="FY 2082/83">FY 2082/83</option>
                            </select>
                        </div>
                    </div>

                    {/* Business Structure and Registered in PAN/VAT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Business Structure
                            </label>
                            <select
                                name="businessStructure"
                                value={formData.businessStructure}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none cursor-pointer transition-colors hover:bg-gray-50"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1.25rem',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                {businessStructures.map(structure => (
                                    <option key={structure} value={structure}>
                                        {structure}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Registered in PAN/VAT
                            </label>
                            <select
                                name="registeredInPANVAT"
                                value={formData.registeredInPANVAT}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none cursor-pointer transition-colors hover:bg-gray-50"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1.25rem',
                                    paddingRight: '2.5rem'
                                }}
                            >
                                <option value="PAN">PAN</option>
                                <option value="VAT">VAT</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ACCOUNTING STANDARD Section */}
                <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900">ACCOUNTING STANDARD</h3>
                        <a href="#" className="text-blue-600 text-xs hover:underline">IDECompliant</a>
                    </div>

                    <div className="space-y-2">
                        {accountingStandards.map((standard) => (
                            <label key={standard.label} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                                <input
                                    type="radio"
                                    name="accountingStandard"
                                    value={standard.label}
                                    checked={formData.accountingStandard === standard.label}
                                    onChange={handleChange}
                                    className="mt-1"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{standard.label}</p>
                                    <p className="text-xs text-gray-600 mt-1">{standard.desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* PRIMARY CONTACT Section */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">PRIMARY CONTACT</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contact Person
                            </label>
                            <input
                                type="text"
                                name="contactPerson"
                                value={formData.contactPerson}
                                onChange={handleChange}
                                placeholder="Full name"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.contactPerson && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={formData.contactEmail}
                                onChange={handleChange}
                                placeholder="email@company.com"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.contactEmail && (
                                <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Create Client
                    </button>
                </div>
            </form>
            </Modal>

        {/* Confirmation Dialog - Outside Modal */}
        <ConfirmDialog
            isOpen={showConfirmDialog}
            onClose={() => setShowConfirmDialog(false)}
            onConfirm={handleConfirmSave}
            message="Confirming will create a new client and save the provided details."
            confirmText="Proceed"
            cancelText="Cancel"
        />

        {/* Success Notification - Outside Modal */}
        {showSuccessNotification && (
            <SuccessNotification
                isOpen={showSuccessNotification}
                onClose={handleSuccessClose}
                message="New client has been created successfully."
                duration={2500}
            />
        )}
        </>
    );
};

export default AddClientModal;
