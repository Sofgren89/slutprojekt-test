import { login } from "./firebase"


document.querySelector('form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    console.log(`Email: ${email}, Password: ${password}`);
    login(email, password)
      .then(() =>{
       window.location.assign('./html/mainpage.html');
    })
    .catch((error) => {
      alert('No account found. Please check your email and password.');
    });
});
  



