
import { invalid, redirect } from '@sveltejs/kit'
//import bcrypt from 'bcrypt'
import type { Action, Actions, PageServerLoad } from './$types'
/** @type {import('./$types').Actions} */
/*

import { emailRules, passwordRules } from "$lib/utils/validation";
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import { auth } from "$lib/stores/auth";


export const show = false;


export let error = {};
export let loading = false;


export const Login: Action = async ({ cookies, request }) => {
  const data = await request.formData();
  const email = data.get('email')
  const password = data.get('password')


  try {
    loading = true;
    //localStorage.removeItem("token");
    const res = await fetch(`http://localhost:4000/api/auth/login`, { 
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              email, 
              password 
          })
      });
    const data = await res.json();

    loading = false;

      // generate new auth token just in case
    const authenticatedUser = ({
      where: { username: data.data.username },
      data:  { userAuthToken: crypto.randomUUID() },
    })


    if (res.status === 201) {
      console.log(data.data)
      //localStorage.setItem("token", data.data.token);
      cookies.set('session', authenticatedUser.userAuthToken, {
      // send cookie for every page
      path: '/',
      // server side only cookie so you can't use `document.cookie`
      httpOnly: true,
      // only requests from same site can send cookies
      // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
      sameSite: 'strict',
      // only sent over HTTPS in production
      secure: process.env.NODE_ENV === 'production',
      // set cookie to expire after a month
      maxAge: 60 * 60 * 24 * 30,
    })

      auth.setUser(data.data);
      return goto("/test");
    }

    if (res.type === "error") {
      error = data.data;
      return;
    }
  } catch (error) {
    console.log(error);
  }

  /*
  // generate new auth token just in case
  const authenticatedUser = await user.update({
    where: { username: user.username },
    data: { userAuthToken: crypto.randomUUID() },
  })

  cookies.set('session', authenticatedUser.userAuthToken, {
    // send cookie for every page
    path: '/',
    // server side only cookie so you can't use `document.cookie`
    httpOnly: true,
    // only requests from same site can send cookies
    // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
    sameSite: 'strict',
    // only sent over HTTPS in production
    secure: process.env.NODE_ENV === 'production',
    // set cookie to expire after a month
    maxAge: 60 * 60 * 24 * 30,
  })

  // redirect the user
  throw redirect(302, '/')
  */
//}

//export const actions: Actions = { Login }


