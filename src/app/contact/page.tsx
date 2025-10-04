import sendContactEmail from "@/src/actions/contact";
import ContactForm from "@/src/components/ContactForm";

export default function contactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Contact Us</h1>
      <p className="text-gray-300 mb-6">
        Have a question or feedback? Fill out the form below to get in touch
        with out team.
      </p>
      <ContactForm />
    </main>
  );
}
