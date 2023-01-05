<script>
  import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    Timestamp
  } from "firebase/firestore";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { auth, db } from "$lib/firebase/client";
  import { fly, fade } from "svelte/transition";
  import { loginWithGoogle } from "$lib/functions/auth/google";
  import { msgCount } from "$lib/store";
  import { updateProfile } from "firebase/auth";
  import { v4 as uuidv4 } from 'uuid';
  import { loggedinUser, initial } from '$lib/store'
  import { t } from '$lib/i18n';

  let name = "";
  let email = "";
  let password = "";
  let signup = false;
  let isLogin = false;
  let result = null;
  let userRef = null;
  let errorMsg = "";

  const handleSignup = async () => {
    isLogin = true;
    errorMsg = null;

    try {
      /* add sveltechat document */
      const adminRef = doc(db, "users", "sveltechat");
      const adminSnap = await getDoc(adminRef);
      await updateDoc(adminRef, {
        contactList: [...adminSnap.data().contactList, name],
        lastMsg: [
          ...adminSnap.data().lastMsg,
          `${name}=>[NEW]`,
        ],
        lastUpdated: [
          ...adminSnap.data().lastUpdated,
          `${name}=>${new Date()}`,
        ],
        msgCount: [
          ...adminSnap.data().msgCount,
          `${name}=>0`
        ],
        unread: [
          ...adminSnap.data().unread,
          `${name}=>true`
        ]
      });
      console.log(">>> 3.maskman is added to user contact list <<<");

      /* create user document */
      userRef = doc(db, "users", name);
      await setDoc(userRef, {
        avatar:
          "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
        bgColor: "skyblue",
        contactList: ["sveltechat"],
        createdAt: Timestamp.fromDate(new Date()),
        email,
        lastMsg: ["sveltechat=>[NEW]"],
        lastUpdated: [`sveltechat=>${new Date()}`],
        msgCount: ["sveltechat=>0"],
        name,
        online: true,
        password,
        unread: ["sveltechat=>true"],
        uid: uuidv4()
      });
      console.log(`>>> ${name}'s document created <<<`);   
      
      /* sign up user */
      result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(`>>> 1.${result.user.email} signed up <<<`);
      isLogin = false;

      /* update user profile */
      await updateProfile(result.user, { displayName: name });
      console.log(`>>> 2.update ${result.user.displayName}'s profile <<<`);  
    } catch (error) {
      errorMsg = error.code;
      console.log("cannot complete signup 😅");
      console.log("error message: ", error.message);
      isLogin = false;
    }
  };

  const handleLogin = async () => {
    isLogin = true;
    errorMsg = null;    
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
      // console.log('user: ', result)
      // console.log(`${result.user.displayName} signed in successfully 😙`);

      // userRef = doc(db, "users", result.user.displayName);
      // await updateDoc(userRef, {
      //   online: true,
      // });

      console.log(`update ${result.user.displayName}'s status -> 🟢`);
      isLogin = false;
    } catch (error) {
      errorMsg = error.message;
      isLogin = false;
    }
  };

  const handleAuth = () => {
    if (signup) handleSignup();
    if (!signup) handleLogin();
  };

  const handleGoogleLogin = async () => {

  }
</script>

<section>
  <div class="main">
    <div class="logo-wrapper">
      <img
        src="https://www.hosteurope.de/blog/wp-content/uploads/2020/11/abbildung_-_das-offizielle-svelte-logo.jpg"
        alt=""
        class="logo"
      />
    </div>

    <form on:submit|preventDefault={handleAuth}>
      <div class="top">
        <div class="btn btn-login" on:click={() => (signup = false)}>{$t('menu.login')}</div>
        <div class="btn btn-signup" on:click={() => (signup = true)}>
          {$t('menu.signup')}
        </div>
      </div>
      <div class="body">
        {#if signup}
          <input
            type="text"
            class="user-name"
            placeholder="name"
            required
            bind:value={name}
          />
        {/if}
        <input
          type="email"
          class="user-email"
          placeholder="email"
          required
          bind:value={email}
        />
        <input
          type="password"
          class="user-password"
          placeholder="password"
          required
          bind:value={password}
        />
      </div>
      <button class="btn-action" type="submit">
        {signup ? "Signup" : "Login"}
      </button>
      <div class="btn-facebook" on:click={handleGoogleLogin}>
        <img
          class="icon-facebook"
          src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg"
          alt=""
        />
        <p>Login with Google</p>
      </div>
    </form>
    {#if errorMsg}
      <p class="error-message">
        {errorMsg.includes("auth/")
          ? errorMsg
              .replace("Firebase: Error", "")
              .replace("(", "")
              .replace("auth/", "")
              .replace(")", "")
              .replace("-", " ")
              .replace("-", " ")
              .replace(".", "")
          : errorMsg}
      </p>
    {/if}
    {#if isLogin}
      <div class="loading">
        <img
          src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif"
          alt=""
          width="20"
          height="20"
        />
      </div>
    {/if}
  </div>
</section>

<style>
  :root {
    --title-grey: #607d8b;
    --logo-green: #42d39b;
    --bg-red: #e91e63;
    --bg-purple: #03a9f4;
    --btn-red: #ff4584;
    --btn-red-hover: #f53677;
    --facebook-blue: #3a559f;
    --facebook-blue: #3d5998;
  }

  .loading {
    text-align: center;
    margin-top: 20px;
  }

  form {
    margin-top: 5px;
  }

  .error-message {
    text-align: center;
    color: red;
    margin-top: 20px;
  }

  .icon-facebook {
    width: 35px;
    height: 35px;
  }

  .btn {
    cursor: pointer;
  }

  .btn-facebook p {
    color: white;
    margin-left: 35px;
    font-weight: 600;
  }

  .btn-facebook {
    display: flex;
    align-items: center;
    position: relative;
    background: var(--facebook-blue);
    padding: 4px;
    margin-top: 10px;
    border-radius: 2px;
  }

  .btn,
  .btn-action {
    cursor: pointer;
  }

  .btn-action {
    padding: 12px;
    margin-top: 10px;
    text-align: center;
    color: white;
    background: rgb(187, 195, 206);
    border-radius: 2px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 600;
  }

  input {
    outline: none;
    width: 100%;
    padding: 12px 12px;
    border: 1px solid rgb(243, 242, 242);
  }

  .btn-login {
    border-top: 1px solid rgb(243, 242, 242);
    border-left: 1px solid rgb(243, 242, 242);
  }

  .btn-signup {
    color: gray;
    background: rgb(243, 242, 242);
  }

  .btn {
    width: 50%;
    text-align: center;
    padding: 10px;
  }

  .top {
    display: flex;
  }

  .logo-wrapper {
    text-align: center;
  }

  .logo {
    height: 60px;
  }

  section {
    width: 100vw;
    max-width: 1920px;
    height: 100vh;
    background: #fff;
  }

  .main {
    position: relative;
    width: 300px;
    margin: 200px auto;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
