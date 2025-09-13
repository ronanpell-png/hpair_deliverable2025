import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFormSubmissions, getSubmissionCount } from '../services/firebaseService';
import { useAuth } from '../contexts/AuthContext';
import { signOutUser } from '../services/authService';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, userId: currentUserId } = useAuth();

  const handleLogout = async () => {
    await signOutUser();
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const [submissionsResult, countResult] = await Promise.all([
        getFormSubmissions(),
        getSubmissionCount()
      ]);

      if (submissionsResult.success) {
        // Show all submissions (admin view)
        setSubmissions(submissionsResult.data);
      } else {
        setError(submissionsResult.message);
      }

      if (countResult.success) {
        setSubmissionCount(countResult.count);
      }
    } catch (err) {
      setError('Failed to load submissions');
      console.error('Error loading submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="form-container">
          <h2>Loading submissions...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Admin Panel - All Submissions</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link 
              to="/"
              className="btn btn-secondary"
              style={{ fontSize: '14px', padding: '8px 16px', textDecoration: 'none' }}
            >
              Back to Form
            </Link>
            <button 
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{ fontSize: '14px', padding: '8px 16px' }}
            >
              Logout
            </button>
          </div>
        </div>
        
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p><strong>Logged in as:</strong> {user.email}</p>
          <p><strong>Total submissions:</strong> {submissionCount}</p>
          <p><strong>Showing all submissions from all users</strong></p>
        </div>

        
        {error && (
          <div className="submit-message error">
            {error}
          </div>
        )}

        <button 
          onClick={loadSubmissions} 
          className="btn btn-primary"
          style={{ marginBottom: '20px' }}
        >
          Refresh
        </button>

        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <div className="submissions-list">
            {submissions.map((submission) => (
              <div key={submission.id} className="submission-item">
                <div className="submission-header">
                  <h3>Submission #{submission.id.slice(-8)}</h3>
                  <span className="submission-date">
                    {formatDate(submission.submittedAt)}
                  </span>
                </div>
                <div className="submission-details">
                  <p><strong>User ID:</strong> {submission.userId}</p>
                  <p><strong>Name:</strong> {submission.firstName} {submission.lastName}</p>
                  <p><strong>Date of Birth:</strong> {submission.dateOfBirth}</p>
                  <p><strong>Gender:</strong> {submission.gender}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
