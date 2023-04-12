//mainpage

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push , get, child} from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase'; 
import { deleteUser } from './firebase'; 
import { signOut } from './firebase'; 


const myUpdateButton = document.querySelector('#my-update-btn');
// const outputDiv = document.querySelector('#output'); 

// function getTextFromInputElement(input: HTMLInputElement): string {
//   return input.value;
// }


// myUpdateButton?.addEventListener('click', () => {
//   const text = getTextFromInputElement(myUpdate);

//   const p = document.createElement('p');
//   p.textContent = text;
//   if (outputDiv) {
//     outputDiv.appendChild(p);
//   }

// });
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

interface UserData {
  name: string;
  profilePicture: string;
}

interface Post {
  content: string;
}

const main = () => {

    onAuthStateChanged(auth, (user) => {
        console.log('auth state changed', user);
        if (user) {
          const userId = user.uid;
          const db = getDatabase();
          const userRef = ref(db, `users/${userId}`);

          onValue(userRef, (snapshot) =>{
            const userData = snapshot.val();
            console.log('userData', userData);
            console.log(userData.profilePicture);
            console.log(userData.username);
            const username = document.querySelector('#username') as HTMLElement
            const pic = document.querySelector('#pic') as HTMLImageElement
            username.innerHTML = userData.username
            pic.src = userData.profilePicture

          })
          
          displayUserPosts()
        }
        
    })
}
//knappfunktion
myUpdateButton?.addEventListener('click', async (event) => {
  event.preventDefault();

  // const post: Post = {
  //   content: myUpdate.value
  // };

  createPost()
})
//Skapa inlägg

const createPost =  () => {
  const myUpdate = document.querySelector('#my-update') as HTMLInputElement
  onAuthStateChanged(auth, async (user)  => {
    if (user) {
      const productsRef = ref(db, 'users');
      const productsSnapshot = await get(productsRef);
      const users = productsSnapshot.val();
      console.log(users)

      const uid = user.uid
      const userRef = ref(db, `posts/`);
      const newPost= push (userRef)
      // push(userRef, content);
   set(newPost,{
    userId : uid, 
    content : myUpdate.value,
    
   
   })
    }
  });
}







window.addEventListener('load', main);

//visa inlägg


const displayUserPosts = () => {
  const db = getDatabase();
  const postsRef = ref(db, 'posts');
  const usersRef = ref(db, 'users');

  onValue(postsRef, async (snapshot) => {
    const posts = snapshot.val();
    const postContent = document.querySelector('.posts') as HTMLElement;
    postContent.innerHTML = '';

    for (const postId in posts) {
      const post = posts[postId];
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
//radera
const delButton = document.getElementById('delete') as HTMLElement
delButton.addEventListener('click', async () => {
  try {
    await deleteUser();
    alert('User account and data deleted');
    // Redirect or update the UI as needed
  } catch (error) {
    console.error('Error deleting user and data:', error);
  }
});

//logga ut
const logOutBtn = document.getElementById('loggOut') as HTMLElement
logOutBtn.addEventListener('click', async () => {
  await signOut()
});
















