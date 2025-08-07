import React from 'react';

// Dummy data (replace with real data or props)
const students = [{}, {}, {}];
const parents = [{}, {}];

// StatCard component (simple version)
const StatCard = ({ title, value, icon }) => (
  <div className="p-4 bg-white rounded shadow flex items-center gap-2">
    <span style={{ fontSize: 24 }}>{icon}</span>
    <div>
      <div className="font-bold">{title}</div>
      <div>{value}</div>
    </div>
  </div>
);

// 📊 Analytics Section
const AnalyticsCards = () => (
  <div className="grid grid-cols-4 gap-4 mb-6">
    <StatCard title="Total Students" value={students.length} icon="👥" />
    <StatCard title="Total Parents" value={parents.length} icon="👪" />
    <StatCard title="Pending Fees" value="₹50,000" icon="💰" />
    <StatCard title="This Month Collection" value="₹2,00,000" icon="📈" />
  </div>
);

// 📊 Fee Collection Chart
const FeeCollectionChart = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3>Monthly Fee Collection</h3>
    {/* Chart component यहाँ add करें */}
  </div>
);

const TeacherDashboard = () => (
  <div className="p-6">
    <h2>Welcome, Teacher!</h2>
    <AnalyticsCards />
    <FeeCollectionChart />
    {/* WhatsApp & Email integration functions yahan rakh sakte hain */}
  </div>
);

export default TeacherDashboard;
