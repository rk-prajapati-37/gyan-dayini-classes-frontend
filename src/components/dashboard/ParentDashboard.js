import React from 'react';

// Dummy data
const notifications = [
  { id: 1, message: "Fee due soon!" },
  { id: 2, message: "Parent meeting on Friday." }
];

const initiatePayment = () => {
  // Razorpay integration yahan karein
  alert("Payment initiated!");
};

const NotificationCenter = () => (
  <div className="bg-white p-4 rounded-lg mb-4">
    <h4>Recent Notifications</h4>
    {notifications.map(notif => (
      <div key={notif.id} className="border-b py-2">
        {notif.message}
      </div>
    ))}
  </div>
);

const PaymentSection = () => (
  <div className="bg-white p-6 rounded-lg mb-4">
    <h3>Pay Fees Online</h3>
    <button onClick={initiatePayment} className="bg-green-500 text-white px-4 py-2 rounded">
      Pay Now via Razorpay
    </button>
  </div>
);

const AttendanceCalendar = () => (
  <div className="bg-white p-6 rounded-lg">
    <h3>Attendance Calendar</h3>
    {/* Calendar component यहाँ add करें */}
  </div>
);

const ParentDashboard = () => (
  <div className="p-6">
    <h2>Welcome, Parent!</h2>
    <NotificationCenter />
    <PaymentSection />
    <AttendanceCalendar />
  </div>
);

export default ParentDashboard;
