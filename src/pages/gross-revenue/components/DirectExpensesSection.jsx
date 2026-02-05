import React, { useState, useEffect } from 'react';

const DirectExpensesSection = ({ onChange }) => {
  const [expenses, setExpenses] = useState([
    { id: 1, type: '', amount: '850,000.00' }
  ]);

  // Helper function to format numbers with commas
  const formatNumberWithCommas = (value) => {
    if (!value) return '';
    // Remove all non-numeric characters except decimal point
    const cleaned = value.replace(/[^0-9.]/g, '');
    // Split by decimal
    const parts = cleaned.split('.');
    // Format the integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Rejoin
    return parts.join('.');
  };

  const handleAddExpense = () => {
    const newId = Math.max(...expenses.map(e => e.id), 0) + 1;
    setExpenses([...expenses, { id: newId, type: '', amount: '' }]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleExpenseChange = (id, field, value) => {
    if (field === 'amount') {
      value = formatNumberWithCommas(value);
    }
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, [field]: value } : expense
    ));
  };

  // Calculate total expenses and notify parent
  useEffect(() => {
    const total = expenses.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount.replace(/,/g, '') || 0);
      return sum + amount;
    }, 0);
    if (onChange) {
      onChange(total.toFixed(2));
    }
  }, [expenses, onChange]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-xs font-semibold text-teal-600 tracking-wider mb-3">DIRECT EXPENSES (TRADING)</h2>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-2 pb-2 border-b border-gray-100">
          <span className="text-xs font-semibold text-gray-600 flex-1">EXPENSE TYPE</span>
          <span className="text-xs font-semibold text-gray-600 w-32 text-right">AMOUNT</span>
          <div className="w-12"></div>
        </div>

        {/* Expense Rows */}
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center gap-3">
            <input 
              type="text" 
              placeholder="e.g., Wages & Salaries"
              value={expense.type}
              onChange={(e) => handleExpenseChange(expense.id, 'type', e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-sm"
            />
            <input 
              type="text" 
              placeholder="0.00"
              value={expense.amount}
              onChange={(e) => handleExpenseChange(expense.id, 'amount', e.target.value)}
              className="w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 font-semibold text-sm"
            />
            <button 
              onClick={() => handleDeleteExpense(expense.id)}
              className="px-2 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}

        {/* Add Row Button */}
        <button 
          onClick={handleAddExpense}
          className="w-full py-2 px-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-blue-600 font-medium text-sm mt-3"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Another Expense Row
        </button>
      </div>
    </div>
  );
};

export default DirectExpensesSection;
