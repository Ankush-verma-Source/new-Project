import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaEnvelope, FaSearch, FaSignOutAlt, FaTrashAlt, FaDownload, FaFilter, FaClock, FaSync } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' or 'enquiries'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  
  // Delete Modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // { id, type }

  // Silent sync / Real-time states
  const [syncing, setSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState('');
  const [newAlert, setNewAlert] = useState(null); // { message, type }

  const prevAppsCount = useRef(0);
  const prevEnqsCount = useRef(0);
  const isInitialFetch = useRef(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  }, [navigate]);

  const triggerNotification = (message, type) => {
    setNewAlert({ message, type });
    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setNewAlert(null);
    }, 6000);
  };

  const fetchDashboardData = useCallback(async (silent = false) => {
    if (!token) return;
    
    if (!silent) {
      setLoading(true);
    } else {
      setSyncing(true);
    }
    setError('');

    try {
      const appResponse = await fetch('/api/admin/applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const enqResponse = await fetch('/api/admin/enquiries', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (appResponse.status === 401 || enqResponse.status === 401) {
        handleLogout();
        return;
      }

      const appData = await appResponse.json();
      const enqData = await enqResponse.json();

      if (appData.success) {
        const newApps = appData.data;
        if (!isInitialFetch.current && newApps.length > prevAppsCount.current) {
          const diff = newApps.length - prevAppsCount.current;
          triggerNotification(`${diff} new scholarship application${diff > 1 ? 's' : ''} received!`, 'applications');
        }
        setApplications(newApps);
        prevAppsCount.current = newApps.length;
      }
      if (enqData.success) {
        const newEnqs = enqData.data;
        if (!isInitialFetch.current && newEnqs.length > prevEnqsCount.current) {
          const diff = newEnqs.length - prevEnqsCount.current;
          triggerNotification(`${diff} new contact enquiry${diff > 1 ? 'ies' : ''} received!`, 'enquiries');
        }
        setEnquiries(newEnqs);
        prevEnqsCount.current = newEnqs.length;
      }

      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      isInitialFetch.current = false;

    } catch (err) {
      console.error(err);
      if (!silent) {
        setError('Failed to fetch dashboard data. Please make sure the backend is running.');
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
      setSyncing(false);
    }
  }, [token, handleLogout]);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // Initial fetch (shows loading spinner)
    fetchDashboardData(false);

    let intervalId;

    const startPolling = () => {
      // 5 seconds silent poll
      intervalId = setInterval(() => {
        fetchDashboardData(true);
      }, 5000);
    };

    const stopPolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };

    // Page Visibility API support
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        fetchDashboardData(true);
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startPolling();

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [token, navigate, fetchDashboardData]);

  // Open Delete Confirmation Modal
  const openDeleteModal = (id, type) => {
    setItemToDelete({ id, type });
    setDeleteModalOpen(true);
  };

  // Confirm Delete Action
  const handleDelete = async () => {
    if (!itemToDelete) return;
    const { id, type } = itemToDelete;

    try {
      const response = await fetch(`/api/admin/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (response.ok && data.success) {
        if (type === 'applications') {
          setApplications(applications.filter(item => item._id !== id));
        } else {
          setEnquiries(enquiries.filter(item => item._id !== id));
        }
      } else {
        alert(data.message || 'Failed to delete record.');
      }
    } catch (err) {
      console.error(err);
      alert('A network error occurred while trying to delete.');
    } finally {
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  // Export List to CSV File
  const handleExportCSV = () => {
    const list = activeTab === 'applications' ? filteredApplications : filteredEnquiries;
    if (!list || list.length === 0) return;

    let headers = [];
    let rows = [];

    if (activeTab === 'applications') {
      headers = ['Name', 'Email', 'Phone', 'Course Chosen', 'Submitted Date'];
      rows = list.map(item => [
        item.name,
        item.email,
        item.phone,
        item.course,
        new Date(item.createdAt).toLocaleString()
      ]);
    } else {
      headers = ['Name', 'Email', 'Phone', 'Message', 'Submitted Date'];
      rows = list.map(item => [
        item.name,
        item.email,
        item.phone,
        item.message,
        new Date(item.createdAt).toLocaleString()
      ]);
    }

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(val => `"${(val || '').toString().replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `globaledu_${activeTab}_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering Logic
  const filteredApplications = applications.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm);
    const matchesCourse = courseFilter === '' || item.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const filteredEnquiries = enquiries.filter(item => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="admin-dashboard-container">
      {/* Dashboard Header Bar */}
      <header className="dashboard-header">
        <div className="dashboard-title-area">
          <h1>Dashboard</h1>
          <div className="dashboard-subtitle-wrapper">
            <p>Manage applications and enquiries</p>
            <div className={`sync-status-badge ${syncing ? 'is-syncing' : ''}`}>
              <span className={`sync-dot ${!syncing ? 'syncing' : ''}`}></span>
              <span>
                {syncing ? 'Syncing...' : lastSyncedTime ? `Live (Updated ${lastSyncedTime})` : 'Live Sync Active'}
              </span>
              <button 
                className={`manual-sync-btn ${syncing ? 'spinning' : ''}`} 
                onClick={() => fetchDashboardData(true)} 
                title="Sync now"
                disabled={syncing}
              >
                <FaSync />
              </button>
            </div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Sign Out
        </button>
      </header>

      {/* Summary Statistics Panel */}
      <section className="stats-grid">
        <div className="stat-card" onClick={() => { setActiveTab('applications'); setSearchTerm(''); setCourseFilter(''); }}>
          <div className="stat-icon-wrapper app-icon">
            <FaGraduationCap />
          </div>
          <div className="stat-details">
            <h3>Scholarship Applications</h3>
            <p className="stat-number">{applications.length}</p>
          </div>
        </div>
        <div className="stat-card" onClick={() => { setActiveTab('enquiries'); setSearchTerm(''); setCourseFilter(''); }}>
          <div className="stat-icon-wrapper enq-icon">
            <FaEnvelope />
          </div>
          <div className="stat-details">
            <h3>Contact Enquiries</h3>
            <p className="stat-number">{enquiries.length}</p>
          </div>
        </div>
      </section>

      {/* Data Views & Table Section */}
      <section className="dashboard-content-card">
        {/* Navigation Tabs */}
        <div className="content-nav-tabs">
          <button 
            className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => { setActiveTab('applications'); setSearchTerm(''); setCourseFilter(''); }}
          >
            <FaGraduationCap /> Scholarship Form Submissions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => { setActiveTab('enquiries'); setSearchTerm(''); setCourseFilter(''); }}
          >
            <FaEnvelope /> Contact Us Submissions
          </button>
        </div>

        {/* Dashboard Operations Toolbar (Search, Filter, Export) */}
        <div className="toolbar-container">
          <div className="toolbar-left">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder={activeTab === 'applications' ? "Search by Name, Email, Phone..." : "Search by Name, Email, Message..."} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {activeTab === 'applications' && (
              <div className="filter-dropdown">
                <FaFilter className="filter-icon" />
                <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
                  <option value="">All Courses</option>
                  <option value="medical">Medical</option>
                  <option value="engineering">Engineering</option>
                  <option value="management">Management</option>
                  <option value="law">Law</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}
          </div>
          <div className="toolbar-right">
            <button 
              className="export-btn" 
              onClick={handleExportCSV}
              disabled={(activeTab === 'applications' ? filteredApplications.length : filteredEnquiries.length) === 0}
            >
              <FaDownload /> Export to CSV
            </button>
          </div>
        </div>

        {/* Database List rendering */}
        {loading ? (
          <div className="dashboard-loading-state">
            <div className="dashboard-spinner"></div>
            <p>Loading records...</p>
          </div>
        ) : error ? (
          <div className="dashboard-error-state">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchDashboardData}>Try Again</button>
          </div>
        ) : activeTab === 'applications' ? (
          /* Scholarship Applications List View */
          <div className="table-responsive">
            {filteredApplications.length === 0 ? (
              <div className="empty-table-state">
                <p>No scholarship applications found.</p>
              </div>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Course Chosen</th>
                    <th>Submission Date</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((item) => (
                    <tr key={item._id}>
                      <td className="font-semibold">{item.name}</td>
                      <td>
                        <a href={`mailto:${item.email}`} className="table-email-link">{item.email}</a>
                      </td>
                      <td>
                        <a href={`tel:${item.phone}`} className="table-tel-link">{item.phone}</a>
                      </td>
                      <td>
                        <span className={`course-pill pill-${item.course}`}>
                          {item.course.charAt(0).toUpperCase() + item.course.slice(1)}
                        </span>
                      </td>
                      <td className="table-date">
                        <FaClock style={{ marginRight: '5px', fontSize: '12px' }} />
                        {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          className="action-delete-btn" 
                          onClick={() => openDeleteModal(item._id, 'applications')}
                          title="Delete application"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          /* Contact Us Enquiries List View */
          <div className="table-responsive">
            {filteredEnquiries.length === 0 ? (
              <div className="empty-table-state">
                <p>No contact inquiries found.</p>
              </div>
            ) : (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Enquiry Message</th>
                    <th>Submission Date</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.map((item) => (
                    <tr key={item._id}>
                      <td className="font-semibold" style={{ whiteSpace: 'nowrap' }}>{item.name}</td>
                      <td>
                        <a href={`mailto:${item.email}`} className="table-email-link">{item.email}</a>
                      </td>
                      <td>
                        <a href={`tel:${item.phone}`} className="table-tel-link">{item.phone}</a>
                      </td>
                      <td className="table-message-cell">
                        <div className="message-text-bubble">{item.message}</div>
                      </td>
                      <td className="table-date" style={{ whiteSpace: 'nowrap' }}>
                        <FaClock style={{ marginRight: '5px', fontSize: '12px' }} />
                        {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          className="action-delete-btn" 
                          onClick={() => openDeleteModal(item._id, 'enquiries')}
                          title="Delete enquiry"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal Overlay */}
      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Record Deletion</h3>
            <p>Are you sure you want to permanently delete this form submission? This action is irreversible.</p>
            <div className="modal-actions">
              <button className="modal-btn-cancel" onClick={() => setDeleteModalOpen(false)}>
                Cancel
              </button>
              <button className="modal-btn-confirm" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Notification Toast */}
      {newAlert && (
        <div className={`realtime-toast ${newAlert.type}`} onClick={() => { setActiveTab(newAlert.type); setNewAlert(null); }}>
          <div className="toast-icon">
            {newAlert.type === 'applications' ? <FaGraduationCap /> : <FaEnvelope />}
          </div>
          <div className="toast-content">
            <h4>Real-time Update</h4>
            <p>{newAlert.message}</p>
          </div>
          <button className="toast-close" onClick={(e) => { e.stopPropagation(); setNewAlert(null); }}>&times;</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
