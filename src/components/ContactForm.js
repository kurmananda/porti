"use client";

const input =
  "mt-2 block w-full border-b-[1.5px] border-ink/50 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-stone/70 focus:border-clay";

// Opens the visitor's own mail app with the enquiry filled in, so no message
// is ever stored or sent by this site.
export default function ContactForm({ email, seriesTitles }) {
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `${data.get("topic")} — ${data.get("name")}`;
    const body = `${data.get("message")}\n\n${data.get("name")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label text-stone">
            Your name
          </label>
          <input id="contact-name" name="name" required autoComplete="name" className={input} />
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
          placeholder="Tell me a little about what you have in mind…"
          className={input}
        />
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          className="btn label bg-ink text-paper"
          style={{ "--btn-fill": "var(--clay)" }}
        >
          Write the email <span className="arrow">→</span>
        </button>
        <p className="text-base text-stone">Opens in your mail app, addressed to the studio.</p>
      </div>
    </form>
  );
}
