"use client";

import { useRef, useTransition } from "react";
import sendContactEmail from "../actions/contact";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await sendContactEmail(formData);
      if (result?.success) {
        toast.success(result.success);
        formRef.current?.reset();
      } else if (result?.error) {
        toast.error(result.error);
      }
    });
  };
  return (
    <form
      action={clientAction}
      ref={formRef}
      className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6"
    >
      <div>
        <label
          htmlFor="senderEmail"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Your Email
        </label>
        <input
          type="email"
          name="senderEmail"
          id="senderEmail"
          required
          className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
