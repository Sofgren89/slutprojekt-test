//mainpage

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, set, push , get} from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase'; 


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



const postRef = ref(db, `posts/`);
onValue(postRef, (snapshot) => {
  const posts = snapshot.val();

  const postContent = document.querySelector('.posts') as HTMLElement
  postContent.innerHTML = '';
  
  for (const postId in posts) {
    const users = snapshot.val()
    console.log(users)
    const post = posts[postId];
    const content = post.content;
    // display the content on your page
    const postElement = document.createElement('div');
    postElement.textContent = content;
    postContent.appendChild(postElement);
  }
});



















