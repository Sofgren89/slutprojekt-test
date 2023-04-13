//mainpage
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push, get, child } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';
import { deleteUser } from './firebase';
import { signOut } from './firebase';
const myUpdateButton = document.querySelector('#my-update-btn');
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const main = () => {
    onAuthStateChanged(auth, async (user) => {
        console.log('auth state changed', user);
        if (user) {
            const userIdFromUrl = getUserIdFromUrl();
            const userId = userIdFromUrl ? userIdFromUrl : user.uid;
            const db = getDatabase();
            const userRef = ref(db, `users/${userId}`);
            onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                console.log('userData', userData);
                console.log(userData.profilePicture);
                console.log(userData.username);
                const username = document.querySelector('#username');
                const pic = document.querySelector('#pic');
                username.innerHTML = userData.username;
                pic.src = userData.profilePicture;
            });
            displayUserPosts();
            const database = getDatabase();
            const usersRef = ref(database, 'users');
            const usersSnapshot = await get(usersRef);
            const usersData = usersSnapshot.val();
            console.log(usersData);
            const userContainer = document.querySelector("#user-container");
            Object.entries(usersData).forEach(([userId, user]) => {
                const typedUser = user;
                console.log(typedUser.username);
                const p = document.createElement('p');
                p.setAttribute('data-user-id', userId);
                p.innerHTML = typedUser.username;
                userContainer.append(p);
                p.addEventListener('click', () => {
                    window.location.href = `./profile.html?userId=${userId}`;
                });
            });
        }
    });
};
//knappfunktion
myUpdateButton?.addEventListener('click', async (event) => {
    event.preventDefault();
    createPost();
});
//Skapa inlägg
const createPost = () => {
    const myUpdate = document.querySelector('#my-update');
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const productsRef = ref(db, 'users');
            const productsSnapshot = await get(productsRef);
            const users = productsSnapshot.val();
            console.log(users);
            const uid = user.uid;
            const userRef = ref(db, `posts/`);
            const newPost = push(userRef);
            set(newPost, {
                userId: uid,
                content: myUpdate.value,
            });
        }
    });
};
window.addEventListener('load', main);
//visa inlägg
const displayUserPosts = () => {
    const userIdFromUrl = getUserIdFromUrl();
    const db = getDatabase();
    const postsRef = ref(db, 'posts');
    const usersRef = ref(db, 'users');
    onValue(postsRef, async (snapshot) => {
        const posts = snapshot.val();
        const postContent = document.querySelector('.posts');
        postContent.innerHTML = '';
        for (const postId in posts) {
            const post = posts[postId];
            if (userIdFromUrl && post.userId !== userIdFromUrl) {
                continue;
            }
            const content = post.content;
            const postUserId = post.userId;
            const userSnapshot = await get(child(usersRef, postUserId));
            const user = userSnapshot.val();
            if (user) {
                const postElement = document.createElement('div');
                postElement.className = 'post-item';
                postElement.innerHTML = `
          <h3 class="postName">${user.username}</h3>
          <p class="postContent">${content}</p>
        `;
                postContent.appendChild(postElement);
            }
        }
    });
};
//visa andra användare
function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('userId');
}
//radera
const delButton = document.getElementById('delete');
delButton.addEventListener('click', async () => {
    try {
        await deleteUser().then(() => {
            window.location.assign('../index.html');
        });
    }
    catch (error) {
        console.error('Error deleting user and data:', error);
    }
});
//logga ut
const logOutBtn = document.getElementById('logOut');
logOutBtn.addEventListener('click', async () => {
    await signOut().then(() => {
        window.location.assign('../index.html');
    });
});
//# sourceMappingURL=mainpage.js.map