"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions";

const input =
  "mt-2 block w-full border-b-[1.5px] border-ink/50 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-stone/70 focus:border-clay";

export default function ContactForm({ seriesTitles }) {
  const [state, action, pending] = useActionState(submitContact, {});

  return (
    <form action={action} className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label text-stone">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            className={input}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="label text-stone">
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            className={input}
          />
        </div>
        <div>
          <label htmlFor="contact-topic" className="label text-stone">
            I’m writing about
          </label>
          <select id="contact-topic" name="topic" className={input}>
            <option>A commission</option>
            <option>Available work</option>
            <option>An exhibition</option>
            {seriesTitles.map((title) => (
              <option key={title}>{`The series “${title}”`}</option>
            ))}
            <option>Something else</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="label text-stone">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="Tell me a little about what you have in mind…"
          className={input}
        />
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="btn label"
          style={{ "--btn-fill": "var(--clay)" }}
        >
          {pending ? "Sending…" : "Send message"} <span className="arrow">→</span>
        </button>
        <p className="text-base text-stone">
          Your message will be saved for the studio.
        </p>
      </div>
      {state.error && <p role="alert" className="text-base text-clay">{state.error}</p>}
      {state.message && <p role="status" className="text-base text-stone">{state.message}</p>}
    </form>
  );
}
