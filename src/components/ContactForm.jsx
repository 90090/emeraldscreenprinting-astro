import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    apparel: "",
    quantity: 0,
    inkColor: "",
    shirtColor: "",
    ownArtwork: "",
    specialNotes: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch("/contact-proxy.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          apparel: "",
          quantity: 0,
          inkColor: "",
          shirtColor: "",
          ownArtwork: "",
          specialNotes: "",
          deadline: "",
        });
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black shadow rounded p-4 px-4 md:px-8 lg:px-16">
      <form onSubmit={handleSubmit} className="mx-auto max-w-6xl grid gap-4 md:grid-cols-2">
  {/* Row 1 */}
  <div className="flex flex-col">
    <label className="mb-1 font-medium">Name:</label>
    <input
      type="text"
      name="name"
      value={form.name}
      onChange={handleChange}
      className="w-full border border-gray-300 p-2 rounded"
      required
    />
  </div>
  
  <div className="flex flex-col">{/* Empty to balance the row */}</div>

  {/* Row 2 */}
  <div className="flex flex-col">
    <label className="mb-1 font-medium">Email:</label>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      className="w-full border border-gray-300 p-2 rounded"
      required
    />
  </div>
  <div className="flex flex-col">
    <label className="mb-1 font-medium">Do you have your own artwork?</label>
    <div className="flex gap-4">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="ownArtwork"
          value="Yes"
          checked={form.ownArtwork === "Yes"}
          onChange={handleChange}
        />
        Yes
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="ownArtwork"
          value="No"
          checked={form.ownArtwork === "No"}
          onChange={handleChange}
        />
        No
      </label>
    </div>
  </div>
  

  {/* Row 3 */}
  <div className="flex flex-col">
    <label className="mb-1 font-medium">Apparel:</label>
    <textarea
      name="apparel"
      value={form.apparel}
      onChange={handleChange}
      className="w-full border border-gray-300 p-2 rounded"
      rows={4}
      required
    />
  </div>
  <div className="flex flex-col">
    <label className="mb-1 font-medium">Any special notes or requests?</label>
    <textarea
      name="specialNotes"
      value={form.specialNotes}
      onChange={handleChange}
      className="w-full border border-gray-300 p-2 rounded"
      rows={4}
    />
  </div>
  

  {/* Row 4 */}
  <div className="flex flex-col">
    <label className="mb-1 font-medium">Quantity:</label>
    <input
      type="number"
      name="quantity"
      value={form.quantity}
      onChange={handleChange}
      className="w-full border border-gray-300 p-2 rounded"
      min={0}
      step={1}
      required
    />
  </div>
  <div className="flex flex-col">
    <label className="mb-1 font-medium">Deadline/Event Date:</label>
    <input
      type="date"
      name="deadline"
      value={form.deadline}
      onChange={handleChange}
      className="w-full border border-gray-300 p-2 rounded"
      required
    />
  </div>
  

  {/* Row 5 */}
  <div className="flex flex-col">
    <label className="mb-1 font-medium">Ink Color:</label>
    <input
      type="text"
      name="inkColor"
      value={form.inkColor}
      onChange={handleChange}
      className="w-full border border-gray-300 p-2 rounded"
      placeholder="e.g. White, Black, Red"
    />
  </div>
  <div className="flex flex-col">
    <label className="mb-1 font-medium">Shirt Color:</label>
    <input
      type="text"
      name="shirtColor"
      value={form.shirtColor}
      onChange={handleChange}
      className="w-full border border-gray-300 p-2 rounded"
      placeholder="e.g. Navy, Gray, Green"
    />
  </div>
  

  {/* Submit Button (spans both columns) */}
  <div className="md:col-span-2">
    <button
      type="submit"
      className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? "Sending..." : "Send"}
    </button>
  </div>
</form>


      {success === true && (
        <p className="mt-4 text-green-600">
          Message sent successfully! You'll hear back within 24 hours.
        </p>
      )}
      {success === false && (
        <p className="mt-4 text-red-600">
          Failed to send message. Please try again.
        </p>
      )}
    </div>
  );
}
