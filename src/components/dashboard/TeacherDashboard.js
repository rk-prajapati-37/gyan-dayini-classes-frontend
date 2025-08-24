// src/components/dashboard/TeacherDashboard.js
import React, { useState, useEffect } from "react";
import { studentAPI } from "../../services/api";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    pendingFees: 0,
    newMessages: 0,
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const tabs = [
    { id: "students", label: "Students", icon: "👥" },
    { id: "fees", label: "Fee Management", icon: "💰" },
    { id: "results", label: "Results", icon: "📊" },
    { id: "attendance", label: "Attendance", icon: "📅" },
    { id: "messages", label: "Messages", icon: "📧" },
  ];

  useEffect(() => {
    if (activeTab === "students") {
      fetchStudents();
    }
  }, [activeTab]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      console.log("Fetching students...");
      const data = await studentAPI.getAllStudents();
      console.log("API Response:", data);

      let studentsArray = [];
      if (data && data.students && Array.isArray(data.students)) {
        studentsArray = data.students;
      } else if (Array.isArray(data)) {
        studentsArray = data;
      } else {
        console.log("Unexpected data structure:", data);
        studentsArray = [];
      }

      setStudents(studentsArray);
      setStats((prev) => ({ ...prev, totalStudents: studentsArray.length }));
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="teacher-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-top">
          <h1>🎓 Teacher Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user.name}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <span className="stat-number">{stats.totalStudents}</span>
              <span className="stat-label">Total Students</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <span className="stat-number">{stats.presentToday}</span>
              <span className="stat-label">Present Today</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <span className="stat-number">{stats.pendingFees}</span>
              <span className="stat-label">Pending Fees</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📧</div>
            <div className="stat-content">
              <span className="stat-number">{stats.newMessages}</span>
              <span className="stat-label">New Messages</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        {activeTab === "students" && (
          <StudentsSection
            students={students}
            loading={loading}
            onRefresh={fetchStudents}
          />
        )}
        {activeTab === "fees" && <FeesSection />}
        {activeTab === "results" && <ResultsSection />}
        {activeTab === "attendance" && <AttendanceSection />}
        {activeTab === "messages" && <MessagesSection />}
      </main>
    </div>
  );
};

// Students Section Component
const StudentsSection = ({ students, loading, onRefresh }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const classes = ["6th", "7th", "8th", "9th", "10th", "11th", "12th"];

  return (
    <div className="students-section">
      {/* Controls */}
      <div className="section-controls">
        <div className="controls-left">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="class-filter"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <div className="controls-right">
          <button
            onClick={onRefresh}
            className="refresh-btn"
            disabled={loading}
          >
            🔄 Refresh
          </button>
          <button onClick={() => setShowAddModal(true)} className="add-btn">
            ➕ Add Student
          </button>
        </div>
      </div>

      {/* Students List */}
      <div className="students-container">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading students...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Students Found</h3>
            <p>Add some students to get started!</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="add-first-btn"
            >
              Add First Student
            </button>
          </div>
        ) : (
          <div className="students-grid">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student._id || student.id}
                student={student}
                onRefresh={onRefresh}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            onRefresh();
          }}
        />
      )}
    </div>
  );
};

// Student Card Component
const StudentCard = ({ student, onRefresh }) => {
  return (
    <div className="student-card">
      <div className="student-avatar">
        <div className="avatar-placeholder">
          {student.name?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <div className="student-status online"></div>
      </div>

      <div className="student-info">
        <h3 className="student-name">{student.name}</h3>
        <p className="student-details">
          <span className="class-badge">{student.class}</span>
          <span className="roll-number">Roll: {student.rollNumber}</span>
        </p>
        <p className="student-email">{student.email || "No email"}</p>
        <p className="student-phone">{student.phone || "No phone"}</p>
      </div>

      <div className="student-actions">
        <button className="action-btn view-btn" title="View Profile">
          👁️
        </button>
        <button className="action-btn edit-btn" title="Edit Student">
          ✏️
        </button>
        <button className="action-btn attendance-btn" title="Mark Attendance">
          📅
        </button>
        <button className="action-btn results-btn" title="Add Results">
          📊
        </button>
      </div>
    </div>
  );
};

// Add Student Modal Component
const AddStudentModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    section: "",
    rollNumber: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const classes = ["6th", "7th", "8th", "9th", "10th", "11th", "12th"];
  const sections = ["A", "B", "C", "D"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Form Data:", formData);

      if (!formData.name || !formData.class || !formData.rollNumber) {
        setError("Name, Class, and Roll Number are required");
        setLoading(false);
        return;
      }

      const result = await studentAPI.addStudent(formData);
      console.log("Submit Result:", result);

      if (result && result.success !== false) {
        alert("Student added successfully!");
        onSuccess();
      } else {
        setError(result.message || "Failed to add student");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError("Network error. Please check your connection and try again.");
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Student</h2>
          <button onClick={onClose} className="close-btn">
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="add-student-form">
          <div className="form-section">
            <h3>Student Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Enter student's full name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Class *</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="">Select Class</option>
                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Section</label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select Section</option>
                  {sections.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Roll Number *</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Enter roll number"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Parent Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Parent Name</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter parent's name"
                />
              </div>
              <div className="form-group">
                <label>Parent Email</label>
                <input
                  type="email"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter parent's email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Parent Phone</label>
                <input
                  type="tel"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter parent's phone"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  disabled={loading}
                  placeholder="Enter address"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Adding Student..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ FIXED: Complete FeesSection with proper data handling
const FeesSection = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalAmount: 0,
    paidAmount: 0,
    pendingAmount: 0,
    totalFees: 0,
  });
  const [filters, setFilters] = useState({
    month: "",
    year: new Date().getFullYear(),
    isPaid: "",
    search: "",
  });
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  // ✅ FIXED: Enhanced data fetching with comprehensive debugging
  const fetchFees = async () => {
    setLoading(true);
    try {
      console.log("🔄 Fetching fees with filters:", filters);

      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        if (filters[key] && filters[key] !== "") {
          queryParams.append(key, filters[key]);
        }
      });

      const url = `/api/fees${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      console.log("📡 Fetching from URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Raw API response:", data);

      if (data.success) {
        const feesArray = Array.isArray(data.fees) ? data.fees : [];
        console.log("📋 Fees array:", feesArray);
        console.log("📊 Summary data:", data.summary);
        
        setFees(feesArray);

        const statsData = data.summary || {};
        const newStats = {
          totalAmount: statsData.totalAmount || 0,
          paidAmount: statsData.paidAmount || 0,
          pendingAmount: statsData.pendingAmount || (statsData.totalAmount || 0) - (statsData.paidAmount || 0),
          totalFees: statsData.totalFees || feesArray.length,
        };
        
        console.log("📈 Setting stats:", newStats);
        setStats(newStats);
      } else {
        console.warn("❌ API returned success: false");
        setFees([]);
        setStats({ totalAmount: 0, paidAmount: 0, pendingAmount: 0, totalFees: 0 });
      }
    } catch (error) {
      console.error("💥 Error fetching fees:", error);
      setFees([]);
      setStats({ totalAmount: 0, paidAmount: 0, pendingAmount: 0, totalFees: 0 });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on component mount and when filters change
  useEffect(() => {
    console.log("🎯 useEffect triggered, fetching fees...");
    fetchFees();
  }, [JSON.stringify(filters)]);

  // ✅ Debug current state
  useEffect(() => {
    console.log("📊 Current stats state:", stats);
    console.log("📋 Current fees state:", fees);
  }, [stats, fees]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="fees-section">
      {/* Stats Cards - ✅ Enhanced with debugging */}
      <div className="fee-stats">
        <div className="stat-card total">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <span className="stat-number">
              ₹{(stats.totalAmount || 0).toLocaleString()}
            </span>
            <span className="stat-label">Total Amount</span>
          </div>
        </div>
        <div className="stat-card paid">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <span className="stat-number">
              ₹{(stats.paidAmount || 0).toLocaleString()}
            </span>
            <span className="stat-label">Collected</span>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <span className="stat-number">
              ₹{(stats.pendingAmount || 0).toLocaleString()}
            </span>
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

      {/* Debug Info */}
      <div style={{padding: '10px', background: '#f0f0f0', margin: '10px 0', fontSize: '12px'}}>
        <strong>🔍 Debug Info:</strong><br/>
        Stats: {JSON.stringify(stats)}<br/>
        Fees Count: {fees.length}<br/>
        Loading: {loading.toString()}
      </div>

      {/* Filters */}
      <div className="fee-filters">
        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by student name, roll number..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="search-input"
          />

          <select
            value={filters.month}
            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
          </select>

          <select
            value={filters.isPaid}
            onChange={(e) => setFilters({ ...filters, isPaid: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="true">Paid</option>
            <option value="false">Pending</option>
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
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading fees...</p>
          </div>
        ) : fees.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💰</div>
            <h3>No Fee Records Found</h3>
            <p>Generate monthly fees or adjust your filters</p>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="generate-btn"
            >
              📄 Generate First Fee Invoice
            </button>
          </div>
        ) : (
          <div className="fee-table">
            <table>
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Student</th>
                  <th>Month/Year</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr
                    key={fee._id}
                    className={fee.isPaid ? "paid" : "pending"}
                  >
                    <td>{fee.invoiceNumber || "N/A"}</td>
                    <td>
                      <div className="student-info">
                        <span className="name">
                          {fee.studentId?.name || "Unknown"}
                        </span>
                        <span className="details">
                          {fee.studentId?.class || "N/A"} -{" "}
                          {fee.studentId?.rollNumber || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td>
                      {fee.month} {fee.year}
                    </td>
                    <td>
                      ₹{(fee.finalAmount || fee.amount || 0).toLocaleString()}
                    </td>
                    <td>
                      {fee.dueDate
                        ? new Date(fee.dueDate).toLocaleDateString("en-IN")
                        : "N/A"}
                    </td>
                    <td>
                      <span
                        className={`status ${fee.isPaid ? "paid" : "pending"}`}
                      >
                        {fee.isPaid ? "✅ Paid" : "⏳ Pending"}
                      </span>
                    </td>
                  </tr>
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


// ✅ Generate Fee Modal Component with Enhanced Error Handling
const GenerateFeeModal = ({ onClose, onSuccess }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const [formData, setFormData] = useState({
    month: months[new Date().getMonth()],
    year: new Date().getFullYear(),
    amount: 5000,
    feeType: "tuition",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("📤 Generating fees with data:", formData);

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.id) {
        throw new Error("User not found. Please login again.");
      }

      const response = await fetch("/api/fees/generate-monthly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          generatedBy: user.id,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ Generate fees response:", result);

      if (result.success) {
        alert(
          `Success! Generated ${result.generated} fee invoices for ${formData.month} ${formData.year}`
        );
        onSuccess();
      } else {
        setError(result.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("❌ Generate fees error:", error);
      setError(error.message || "Error generating fees");
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Generate Monthly Fees</h2>
          <button onClick={onClose} className="close-btn">
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Month</label>
            <select
              value={formData.month}
              onChange={(e) =>
                setFormData({ ...formData, month: e.target.value })
              }
              required
              disabled={loading}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: parseInt(e.target.value) })
              }
              min="2020"
              max="2030"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Fee Type</label>
            <select
              value={formData.feeType}
              onChange={(e) =>
                setFormData({ ...formData, feeType: e.target.value })
              }
              required
              disabled={loading}
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
              onChange={(e) =>
                setFormData({ ...formData, amount: parseInt(e.target.value) })
              }
              min="1"
              required
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Generating..." : "Generate Fees"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Other sections remain the same
const ResultsSection = () => (
  <div className="coming-soon">
    <h2>📊 Results Management</h2>
    <p>Coming Soon...</p>
  </div>
);

const AttendanceSection = () => (
  <div className="coming-soon">
    <h2>📅 Attendance Management</h2>
    <p>Coming Soon...</p>
  </div>
);

const MessagesSection = () => (
  <div className="coming-soon">
    <h2>📧 Messages</h2>
    <p>Coming Soon...</p>
  </div>
);

export default TeacherDashboard;
