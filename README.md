# Personal Information Form Challenge

A challenging React.js project that tests your ability to build forms with validation and proper form handling.

## 🎯 Challenge Overview

Build a personal information form application with the following features:

### Required Features (Must Implement)

1. **Form Validation**
   - Real-time validation using Formik + Yup
   - Error messages for invalid fields
   - Prevent submission with invalid data

2. **Form Fields**
   - First Name (required)
   - Last Name (required)
   - Date of Birth (required)
   - Gender (required)

3. **Form Submission**
   - Handle form data submission
   - Success/error handling for form submission
   - Display confirmation message

4. **Responsive Design**
   - Mobile-friendly layout
   - Proper form styling and UX

### Bonus Features (Optional)

1. **Advanced Validation**
   - Custom validation rules
   - Cross-field validation
   - Date validation (e.g., age restrictions)

2. **User Experience**
   - Loading states
   - Success/error notifications
   - Form auto-save
   - Keyboard navigation

3. **Form Persistence**
   - Save form data to localStorage
   - Resume form from where user left off

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── MultiStepForm.js          # Main form component
│   ├── AdminPanel.js             # Admin panel to view submissions
│   └── steps/
│       └── PersonalInfoStep.js   # Personal information form
├── firebase/
│   └── config.js                 # Firebase configuration
├── services/
│   └── firebaseService.js        # Firebase service functions
├── App.js                        # Main app component
├── App.css                       # App styles
├── index.js                      # Entry point
└── index.css                     # Global styles
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Formik** - Form handling
- **Yup** - Validation schema
- **React Icons** - Icons
- **Firebase** - Database and form submissions
- **Styled Components** - CSS-in-JS (optional)

## ✅ Implementation Checklist

### Required Features
- [ ] Form validation using Formik + Yup
- [ ] Form fields implementation (First Name, Last Name, Date of Birth, Gender)
- [ ] Form submission to Firebase
- [ ] Admin panel to view submissions
- [ ] Responsive design
- [ ] Error handling and user feedback

### Bonus Features
- [ ] Local storage persistence
- [ ] Custom validation rules
- [ ] Loading states and notifications
- [ ] Form auto-save
- [ ] Advanced date validation

## 🎨 Design Guidelines

- Use the provided CSS classes for consistent styling
- Ensure the form is accessible (proper labels, keyboard navigation)
- Make it mobile-responsive
- Follow good UX practices for form design

## 🧪 Testing

Consider adding tests for:
- Form validation logic
- File upload functionality
- Step navigation
- Form submission

## 📝 Submission

Complete the implementation and ensure:
1. All required features work correctly
2. Code is clean and well-organized
3. No console errors
4. Responsive design works on mobile
5. Form validation prevents invalid submissions

## 🎯 Challenge Goals

This challenge is designed to test:
- **React Fundamentals**: Component composition, state management, props
- **Form Handling**: Controlled components, validation, error handling
- **User Experience**: Form design, responsive layout, accessibility
- **Code Organization**: Component structure, separation of concerns
- **Problem Solving**: Implementing form validation and user interactions

Good luck! 🚀
# hpair_deliverable2025
