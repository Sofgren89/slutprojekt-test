//create account
import { createAccount } from "./firebase";
document.querySelector('form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const profileImage = document.querySelector('input[name="profile-pic"]:checked').value;
    if (password === confirmPassword) {
        createAccount(email, password, username, profileImage).then(() => {
            window.location.assign('../index.html');
        });
    }
    else {
        alert('Password dosent match');
    }
});
//# sourceMappingURL=create.js.map