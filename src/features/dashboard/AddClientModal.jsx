import React, { useState, useEffect } from 'react';
import {
    Modal,
    ConfirmDialog,
    SuccessNotification,
    FormInput,
    FormSelect,
    InfoBanner,
    Button,
} from '../../components';

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

        // Registration Number validation - only numbers (optional but numeric)
        if (formData.registrationNumber && formData.registrationNumber.trim() && !/^\d+$/.test(formData.registrationNumber.trim())) {
            newErrors.registrationNumber = 'Registration should contain only numbers';
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
                <InfoBanner
                    icon="/icon/ri_ai.png"
                    text="Enter PAN number and I will try to fetch Company details from the IRD database"
                    className="mb-4"
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                {/* COMPANY DETAILS Section */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">COMPANY DETAILS</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="PAN Number"
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleChange}
                            placeholder="eg. 1073000038"
                            error={errors.panNumber}
                            inputMode="numeric"
                        />

                        <FormInput
                            label="Registration Number"
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            placeholder="Company Registration number"
                            error={errors.registrationNumber}
                            inputMode="numeric"
                        />
                    </div>

                    {/* Company Name */}
                    <div className="mt-4">
                        <FormInput
                            label="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Full company name"
                            error={errors.companyName}
                        />
                    </div>

                    {/* Industry Type and Fiscal Year */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormSelect
                            label="Industry Type"
                            name="industryType"
                            value={formData.industryType}
                            onChange={handleChange}
                            options={industriesOptions}
                            placeholder="Select Industry Type"
                            error={errors.industryType}
                        />

                        <FormSelect
                            label="Fiscal Year"
                            name="fiscalYear"
                            value={formData.fiscalYear}
                            onChange={handleChange}
                            options={[
                                { label: 'FY 2080/81', value: 'FY 2080/81' },
                                { label: 'FY 2081/82', value: 'FY 2081/82' },
                                { label: 'FY 2082/83', value: 'FY 2082/83' },
                            ]}
                        />
                    </div>

                    {/* Business Structure and Registered in PAN/VAT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormSelect
                            label="Business Structure"
                            name="businessStructure"
                            value={formData.businessStructure}
                            onChange={handleChange}
                            options={businessStructures}
                        />

                        <FormSelect
                            label="Registered in PAN/VAT"
                            name="registeredInPANVAT"
                            value={formData.registeredInPANVAT}
                            onChange={handleChange}
                            options={[
                                { label: 'PAN', value: 'PAN' },
                                { label: 'VAT', value: 'VAT' },
                                { label: 'Both', value: 'Both' },
                            ]}
                        />
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
                        <FormInput
                            label="Contact Person"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            placeholder="Full name"
                            error={errors.contactPerson}
                        />

                        <FormInput
                            label="Contact Email"
                            name="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            placeholder="email@company.com"
                            error={errors.contactEmail}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleCancel}
                        className="px-6"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="px-6"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Create Client
                    </Button>
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
