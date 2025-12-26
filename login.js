import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from './firebase-config.js';

const form = document.getElementById('authForm');
const title = document.getElementById('formTitle');
const subtitle = document.getElementById('formSubtitle');
const submitBtn = document.getElementById('submitBtn');
const toggleText = document.getElementById('toggleText');
const toggleBtn = document.querySelector('.toggle-btn');
const errorMsg = document.getElementById('errorMsg');

let isLogin = true;

// Toggle between Login and Sign Up
window.toggleMode = () => {
    isLogin = !isLogin;
    if (isLogin) {
        title.innerText = 'Welcome Back';
        subtitle.innerText = 'Login to access your account';
        submitBtn.innerText = 'Login';
        toggleText.innerText = 'New here?';
        toggleBtn.innerText = 'Create Account';
    } else {
        title.innerText = 'Create Account';
        subtitle.innerText = 'Sign up to track your requests';
        submitBtn.innerText = 'Sign Up';
        toggleText.innerText = 'Already have an account?';
        toggleBtn.innerText = 'Login';
    }
    errorMsg.style.display = 'none';
};

// Handle Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    errorMsg.style.display = 'none';
    submitBtn.innerText = 'Processing...';

    try {
        let userCredential;
        if (isLogin) {
            userCredential = await signInWithEmailAndPassword(auth, email, password);
        } else {
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
        }

        const user = userCredential.user;
        console.log("Logged in:", user.email);

        // Redirect logic
        // NOTE: In a real app, you'd check a custom claim or database field for admin role.
        // For this simple project, we'll hardcode the admin email check.
        const ADMIN_EMAIL = 'admin@rlamsal.com'; // Change this to your preferred admin email

        if (user.email === ADMIN_EMAIL) {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }

    } catch (error) {
        console.error(error);
        let msg = "Authentication failed.";
        if (error.code === 'auth/wrong-password') msg = "Incorrect password.";
        if (error.code === 'auth/user-not-found') msg = "No account found with this email.";
        if (error.code === 'auth/email-already-in-use') msg = "Email already registered.";
        if (error.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";

        errorMsg.innerText = msg;
        errorMsg.style.display = 'block';
        submitBtn.innerText = isLogin ? 'Login' : 'Sign Up';
    }
});
