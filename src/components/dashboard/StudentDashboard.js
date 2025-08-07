import React from 'react';

// Dummy data
const subjects = ["Math", "Science", "English"];
const availableTests = [
  { id: 1, name: "Math Test", duration: 30 },
  { id: 2, name: "Science Quiz", duration: 20 }
];

const startTest = (id) => {
  alert(`Starting test ${id}`);
};

const ProgressTracker = () => (
  <div className="bg-white p-6 rounded-lg mb-4">
    <h3>My Progress</h3>
    <div className="space-y-4">
      {subjects.map(subject => (
        <div key={subject} className="flex justify-between">
          <span>{subject}</span>
          <div className="w-32 bg-gray-200 rounded-full">
            <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OnlineTestSection = () => (
  <div className="bg-white p-6 rounded-lg">
    <h3>Available Tests</h3>
    {availableTests.map(test => (
      <button key={test.id} onClick={() => startTest(test.id)} className="block my-2 px-4 py-2 bg-blue-500 text-white rounded">
        {test.name} - {test.duration} mins
      </button>
    ))}
  </div>
);

const StudentDashboard = () => (
  <div className="p-6">
    <h2>Welcome, Student!</h2>
    <ProgressTracker />
    <OnlineTestSection />
  </div>
);

export default StudentDashboard;
