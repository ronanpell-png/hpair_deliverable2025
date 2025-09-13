import React from 'react';

const PersonalInfoStep = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Personal Information</h2>
      <p>Please provide your basic personal details.</p>
      
      <div className="form-group">
        <label className="form-label">First Name *</label>
        <input 
          type="text" 
          name="firstName"
          value={formData.firstName || ''}
          onChange={handleInputChange}
          className="form-input" 
          placeholder="Enter your first name" 
        />
      </div>

      <div className="form-group">
        <label className="form-label">Last Name *</label>
        <input 
          type="text" 
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleInputChange}
          className="form-input" 
          placeholder="Enter your last name" 
        />
      </div>

      <div className="form-group">
        <label className="form-label">Date of Birth *</label>
        <input 
          type="date" 
          name="dateOfBirth"
          value={formData.dateOfBirth || ''}
          onChange={handleInputChange}
          className="form-input" 
        />
      </div>

      <div className="form-group">
        <label className="form-label">Gender *</label>
        <select 
          name="gender"
          value={formData.gender || ''}
          onChange={handleInputChange}
          className="form-input"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
