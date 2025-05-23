export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

  // Form validation
 export const validateForm = (formData) => {
    const newErrors = {};
    
    if (!formData.source.trim()) {
      newErrors.source = 'This field is required';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    return newErrors;
  };