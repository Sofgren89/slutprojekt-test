import { login } from "./firebase";

const formElement = document.querySelector('form');

if (formElement) {
  formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    console.log(`Email: ${email}, Password: ${password}`);
    
    try {
      console.log('Attempting login...');
      await login(email, password);
      console.log('Login successful, redirecting...');
      window.location.assign('./html/mainpage.html');
    } catch (error) {
      console.error('Error during login:', error);
      alert('No account found. Please check your email and password.');
    }
  });
} else {
  console.error('Form not found');
}


  



