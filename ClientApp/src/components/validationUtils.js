export const validateField = (field, value) => {
    switch (field) {
        case 'name':
            if (!value) {
                return 'Name is required';
            }
            return '';
        case 'age':
            if (!value) {
                return 'Age is required';
            }
            if (isNaN(value) || Number(value) <= 0) {
                return 'Age must be a positive number';
            }
            return '';
        case 'gender':
            if (!value) {
                return 'Gender is required';
            }
            return '';
        case 'mobile':
            if (!value) {
                return 'Mobile is required';
            }
            if (!/^\d{10}$/.test(value)) {
                return 'Invalid mobile number';
            }
            return '';
        case 'password':
            if (!value) {
                return 'Password is required';
            }
            return '';
        case 'email':
            if (!value) {
                return 'Email is required';
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return 'Invalid email address';
            }
            return '';
        default:
            return '';
    }
};