// Firebase service for form submissions
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION_NAME = 'formSubmissions';

// Submit form data to Firebase
export const submitForm = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...formData,
      submittedAt: new Date(),
      timestamp: Date.now()
    });
    
    console.log('Form submitted successfully with ID:', docRef.id);
    return { 
      success: true, 
      id: docRef.id,
      message: 'Form submitted successfully!' 
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { 
      success: false, 
      message: 'Failed to submit form. Please try again.' 
    };
  }
};

// Get all form submissions (for admin viewing)
export const getFormSubmissions = async (limitCount = 50) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      orderBy('submittedAt', 'desc'), 
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const submissions = [];
    
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { 
      success: true, 
      data: submissions 
    };
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return { 
      success: false, 
      message: 'Failed to fetch submissions' 
    };
  }
};

// Get form submission count
export const getSubmissionCount = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return { 
      success: true, 
      count: querySnapshot.size 
    };
  } catch (error) {
    console.error('Error getting submission count:', error);
    return { 
      success: false, 
      message: 'Failed to get submission count' 
    };
  }
};

const firebaseService = {
  submitForm,
  getFormSubmissions,
  getSubmissionCount
};

export default firebaseService;
