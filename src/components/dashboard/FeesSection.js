import React, { useState, useEffect } from 'react';
import { feeAPI } from '../../services/api';
import '/styles/components.css'; // Assume we have some CSS for styling

const FeesSection = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0,
    totalFees: 0
  });
  const [filters, setFilters] = useState({
    month: '',
    year: new Date().getFullYear(),
    isPaid: '',
    feeType: '',
    search: ''
  });
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  useEffect(() => {
    fetchFees();
  }, [filters]);

  const fetchFees = async () => {
    setLoading(true);
    try {
      const response = await feeAPI.getAllFees(filters);
      setFees(response.fees || []);
      setStats(response.summary || {});
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
    setLoading(false);
  };

  const handlePayment = async (feeId, paymentData) => {
    try {
      await feeAPI.markAsPaid(feeId, paymentData);
      alert('Payment recorded successfully!');
      fetchFees();
    } catch (error) {
      alert('Error recording payment: ' + error.message);
    }
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="fees-section">
      {/* Stats Cards */}
      <div className="fee-stats">
        <div className="stat-card total">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <span className="stat-number">₹{stats.totalAmount?.toLocaleString() || 0}</span>
            <span className="stat-label">Total Amount</span>
          </div>
        </div>
        <div className="stat-card paid">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-number">₹{stats.paidAmount?.toLocaleString() || 0}</span>
            <span className="stat-label">Collected</span>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <span className="stat-number">₹{stats.pendingAmount?.toLocaleString() || 0}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
        <div className="stat-card count">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <span className="stat-number">{stats.totalFees || 0}</span>
            <span className="stat-label">Total Records</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="fee-filters">
        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by student name, roll number, or invoice..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="search-input"
          />
          
          <select 
            value={filters.month}
            onChange={(e) => setFilters({...filters, month: e.target.value})}
          >
            <option value="">All Months</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>

          <select 
            value={filters.year}
            onChange={(e) => setFilters({...filters, year: e.target.value})}
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>

          <select 
            value={filters.isPaid}
            onChange={(e) => setFilters({...filters, isPaid: e.target.value})}
          >
            <option value="">All Status</option>
            <option value="true">Paid</option>
            <option value="false">Pending</option>
          </select>

          <select 
            value={filters.feeType}
            onChange={(e) => setFilters({...filters, feeType: e.target.value})}
          >
            <option value="">All Types</option>
            <option value="tuition">Tuition</option>
            <option value="admission">Admission</option>
            <option value="exam">Exam</option>
            <option value="transport">Transport</option>
            <option value="library">Library</option>
            <option value="sports">Sports</option>
          </select>
        </div>

        <div className="filter-actions">
          <button 
            onClick={() => setShowGenerateModal(true)}
            className="generate-btn"
          >
            📄 Generate Monthly Fees
          </button>
          <button onClick={fetchFees} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Fee List */}
      <div className="fee-list">
        {loading ? (
          <div className="loading">Loading fees...</div>
        ) : fees.length === 0 ? (
          <div className="empty-state">
            <h3>No Fee Records Found</h3>
            <p>Generate monthly fees or adjust your filters</p>
          </div>
        ) : (
          <div className="fee-table">
            <table>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Student</th>
                  <th>Month/Year</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fees.map(fee => (
                  <FeeRow 
                    key={fee._id} 
                    fee={fee} 
                    onPayment={handlePayment}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Generate Modal */}
      {showGenerateModal && (
        <GenerateFeeModal 
          onClose={() => setShowGenerateModal(false)}
          onSuccess={() => {
            setShowGenerateModal(false);
            fetchFees();
          }}
        />
      )}
    </div>
  );
};

// Fee Row Component
const FeeRow = ({ fee, onPayment }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN');
  };

  return (
    <>
      <tr className={fee.isPaid ? 'paid' : 'pending'}>
        <td>{fee.invoiceNumber}</td>
        <td>
          <div className="student-info">
            <span className="name">{fee.studentId?.name}</span>
            <span className="details">{fee.studentId?.class} - {fee.studentId?.rollNumber}</span>
          </div>
        </td>
        <td>{fee.month} {fee.year}</td>
        <td>
          <span className={`fee-type ${fee.feeType}`}>
            {fee.feeType.charAt(0).toUpperCase() + fee.feeType.slice(1)}
          </span>
        </td>
        <td>₹{fee.finalAmount.toLocaleString()}</td>
        <td>{formatDate(fee.dueDate)}</td>
        <td>
          <span className={`status ${fee.isPaid ? 'paid' : 'pending'}`}>
            {fee.isPaid ? '✅ Paid' : '⏳ Pending'}
          </span>
        </td>
        <td>
          {!fee.isPaid && (
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="pay-btn"
            >
              💳 Pay
            </button>
          )}
        </td>
      </tr>

      {showPaymentModal && (
        <PaymentModal
          fee={fee}
          onClose={() => setShowPaymentModal(false)}
          onSubmit={(paymentData) => {
            onPayment(fee._id, paymentData);
            setShowPaymentModal(false);
          }}
        />
      )}
    </>
  );
};

// Generate Fee Modal Component
const GenerateFeeModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    month: months[new Date().getMonth()],
    year: new Date().getFullYear(),
    amount: 5000,
    feeType: 'tuition'
  });
  const [loading, setLoading] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await feeAPI.generateMonthlyFees({
        ...formData,
        generatedBy: user.id
      });
      
      alert(`Success! Generated ${response.generated} fee invoices`);
      onSuccess();
    } catch (error) {
      alert('Error generating fees: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Generate Monthly Fees</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Month</label>
            <select 
              value={formData.month}
              onChange={e => setFormData({...formData, month: e.target.value})}
              required
            >
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <input 
              type="number" 
              value={formData.year}
              onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
              min="2020"
              max="2030"
              required
            />
          </div>

          <div className="form-group">
            <label>Fee Type</label>
            <select 
              value={formData.feeType}
              onChange={e => setFormData({...formData, feeType: e.target.value})}
              required
            >
              <option value="tuition">Tuition Fee</option>
              <option value="admission">Admission Fee</option>
              <option value="exam">Exam Fee</option>
              <option value="transport">Transport Fee</option>
              <option value="library">Library Fee</option>
              <option value="sports">Sports Fee</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>
            <input 
              type="number" 
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: parseInt(e.target.value)})}
              min="1"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Generating...' : `Generate Fees`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Payment Modal Component
const PaymentModal = ({ fee, onClose, onSubmit }) => {
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'cash',
    transactionId: '',
    remarks: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(paymentData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Record Payment</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="payment-details">
          <p><strong>Student:</strong> {fee.studentId?.name}</p>
          <p><strong>Amount:</strong> ₹{fee.finalAmount}</p>
          <p><strong>Invoice:</strong> {fee.invoiceNumber}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Payment Method</label>
            <select 
              value={paymentData.paymentMethod}
              onChange={e => setPaymentData({...paymentData, paymentMethod: e.target.value})}
              required
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>

          {paymentData.paymentMethod !== 'cash' && (
            <div className="form-group">
              <label>Transaction ID</label>
              <input 
                type="text" 
                value={paymentData.transactionId}
                onChange={e => setPaymentData({...paymentData, transactionId: e.target.value})}
                required
                placeholder="Enter transaction/reference ID"
              />
            </div>
          )}

          <div className="form-group">
            <label>Remarks (Optional)</label>
            <textarea 
              value={paymentData.remarks}
              onChange={e => setPaymentData({...paymentData, remarks: e.target.value})}
              placeholder="Any additional notes"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Record Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeesSection;
