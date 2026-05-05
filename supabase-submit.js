import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://rtbfevqhjsiqmtfrxdbd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0YmZldnFoanNpcW10ZnJ4ZGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MDg4NDMsImV4cCI6MjA5MzQ4NDg0M30.ASbGycrTfL1REEdF1D-Wg0ko6CrZh5rt9eDpO2WDi4Q";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const form = document.getElementById("customerForm");
const formMessage = document.getElementById("formMessage");
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqewgnbb";
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = {
      name: form.name?.value || null,
      email: form.email?.value || null,
      phone: form.phone?.value || null,
      service: form.service?.value || null,
      notes: form.notes?.value || null,
      address: form.address?.value || null,
      latitude: form.latitude?.value ? Number(form.latitude.value) : null,
      longitude: form.longitude?.value ? Number(form.longitude.value) : null,
      place_id: form.place_id?.value || null,
    };

    if (formMessage) formMessage.textContent = "Submitting request...";

    const formspreePromise = fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    const supabasePromise = supabase
      .from("customers")
      .insert(payload)
      .select("*")
      .single();

    const [formspreeRes, supabaseRes] = await Promise.allSettled([formspreePromise, supabasePromise]);

    if (formspreeRes.status === "rejected") {
      if (formMessage) formMessage.textContent = "Could not submit to Formspree. Please retry.";
      return;
    }

    if (supabaseRes.status === "rejected" || supabaseRes.value.error) {
      const message = supabaseRes.status === "rejected" ? "Supabase request failed." : supabaseRes.value.error.message;
      if (supabaseRes.status !== "rejected") {
        console.log("status:", supabaseRes.value.error.status);
        console.log("error details:", supabaseRes.value.error);
      }
      if (formMessage) formMessage.textContent = `Saved to Formspree, but Supabase failed: ${message}`;
      return;
    }

    if (formMessage) formMessage.textContent = `Saved! Request ID: ${supabaseRes.value.data.id}`;
    form.reset();
  });
}
