"use client";

import { useActionState } from "react";
import { login } from "@/app/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, {});

  return (
    <form action={action} className="mt-10">
      <label htmlFor="password" className="label text-stone">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        aria-describedby={state.error ? "login-error" : undefined}
        className="mt-2 block w-full border-b-2 border-ink bg-transparent py-3 text-xl outline-none transition-colors focus:border-clay"
      />
      {state.error && (
        <p id="login-error" role="alert" className="mt-3 text-base font-medium text-clay">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="label mt-8 h-14 w-full rounded-full bg-ink text-paper transition-colors duration-300 hover:bg-clay disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
