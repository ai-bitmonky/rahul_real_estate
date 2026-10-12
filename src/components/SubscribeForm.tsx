"use client";

import { useState, type FormEvent } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setMsg(/^\S+@\S+\.\S+$/.test(email.trim()) ? "Thanks — new launches will reach your inbox." : "Please enter a valid email.");
  };
  return (
    <>
      <form className="subs" id="subs" noValidate onSubmit={submit}>
        <label className="sr" htmlFor="sE">
          Email for new launches
        </label>
        <input id="sE" type="email" placeholder="Email for new launches" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Subscribe</button>
      </form>
      <p className="subs-ok" id="subsOk" role="status">
        {msg}
      </p>
    </>
  );
}
