const settings = {
  businessName: "JECS Quick Wash",
  phone: "+6153487683",
  displayPhone: "(615) 348-7683",
  email: "Contact@jubileeexecutivecarservice.com",
  formspreeEndpoint: "https://formspree.io/f/xqewgnbb",
  supabaseUrl: "",
  supabaseAnonKey: "",
};

const washForm = document.getElementById("washForm");
const formMessage = document.getElementById("formMessage");
const yearLabel = document.getElementById("year");
const businessNameLabel = document.getElementById("businessName");
const addressInput = document.getElementById("address");
const latInput = document.getElementById("lat");
const lngInput = document.getElementById("lng");
const placeIdInput = document.getElementById("placeId");
const locationHint = document.getElementById("locationHint");

if (yearLabel) yearLabel.textContent = String(new Date().getFullYear());
if (businessNameLabel) businessNameLabel.textContent = settings.businessName;
if (washForm) washForm.action = settings.formspreeEndpoint;

function getLocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition((position) => {
    if (latInput) latInput.value = String(position.coords.latitude);
    if (lngInput) lngInput.value = String(position.coords.longitude);
  });
}

getLocation();

window.initGooglePlaces = function initGooglePlaces() {
  if (!window.google?.maps?.places || !addressInput) {
    if (locationHint) locationHint.textContent = "Google Places unavailable. Enter your full location manually.";
    return;
  }

  const autocomplete = new google.maps.places.Autocomplete(addressInput, {
    fields: ["formatted_address", "geometry", "place_id"],
    types: ["address"],
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place?.formatted_address) return;
    addressInput.value = place.formatted_address;
    if (placeIdInput) placeIdInput.value = place.place_id || "";
    if (place.geometry?.location) {
      if (latInput) latInput.value = String(place.geometry.location.lat());
      if (lngInput) lngInput.value = String(place.geometry.location.lng());
    }
  });
};

async function sendToSupabase(payload) {
  if (!settings.supabaseUrl || !settings.supabaseAnonKey) return;
  await fetch(`${settings.supabaseUrl}/rest/v1/wash_requests`, {
    method: "POST",
    headers: {
      apikey: settings.supabaseAnonKey,
      Authorization: `Bearer ${settings.supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });
}

if (washForm) {
  washForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!washForm.checkValidity()) {
      washForm.reportValidity();
      return;
    }

    const formData = new FormData(washForm);
    const payload = Object.fromEntries(formData.entries());

    if (formMessage) formMessage.textContent = "Submitting request...";

    try {
      await Promise.all([
        fetch(settings.formspreeEndpoint, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        }),
        sendToSupabase(payload),
      ]);

      if (formMessage) formMessage.textContent = "Request received. Our team will route your wash stop shortly.";
      washForm.reset();
      getLocation();
    } catch (error) {
      if (formMessage) formMessage.textContent = "Could not submit right now. Please try again.";
    }
  });
}
