<script lang="ts">
  import { fly } from "svelte/transition";
  import Button from "@lib/components/Button.svelte";

  interface Coordinates {
    latitude: number;
    longitude: number;
  }

  export let latitude: number;
  export let longitude: number;

  let loading = false;
  let message = "";

  const position_options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 100,
  };

  function deg2rad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  function compute_distance(
    startCoords: Coordinates,
    destCoords: Coordinates,
  ): number {
    const startLatRads = deg2rad(startCoords.latitude);
    const startLongRads = deg2rad(startCoords.longitude);
    const destLatRads = deg2rad(destCoords.latitude);
    const destLongRads = deg2rad(destCoords.longitude);
    const radius = 6371; // radius of Earth in km
    return (
      Math.acos(
        Math.sin(startLatRads) * Math.sin(destLatRads) +
          Math.cos(startLatRads) *
            Math.cos(destLatRads) *
            Math.cos(startLongRads - destLongRads),
      ) * radius
    );
  }

  function display_distance(position: { coords: Coordinates }): void {
    const my_coordinates = { latitude, longitude };
    const km = compute_distance(position.coords, my_coordinates);
    let msg = `By the magic of the internet, it looks like we are
      <b>${Math.round(km)} km (aka ${Math.round(km / 1.609)} mi)</b> apart! `;

    const distance_apart_messages = [
      "Wait a sec...that means we are practically right next to each other right now!",
      "Whoa, we are super close...perhaps we should meet up for a coffee sometime?",
      "We are not exactly neighbors, but perhaps we are close enough to run into each other one day?",
      "Seems like we are pretty far apart!",
    ];

    if (km < 1) msg = msg + distance_apart_messages[0];
    else if (km < 20) msg = msg + distance_apart_messages[1];
    else if (km < 160) msg = msg + distance_apart_messages[2];
    else msg = msg + distance_apart_messages[3];

    position_options.timeout = 100;
    message = msg;
    loading = false;
  }

  function display_error(error: { code: number }): void {
    const error_messages: [string, string, string, string] = [
      "Sorry, an unknown error has occurred so it cannot be determined how far apart we are right now. 😟",
      "Hmm, it looks like permission to use your location to see how far apart we are was denied. 😟",
      "Sorry, your location is unavailable at the moment to calculate how far apart we are. 😟",
      "Calculating how far apart we are. Hang tight...",
    ];

    if (error.code === 0 || error.code === 1 || error.code === 2) {
      position_options.timeout = 100;
      message = error_messages[error.code];
      loading = false;
    } else if (error.code === 3 && position_options.timeout < 2000) {
      position_options.timeout += 100;
      navigator.geolocation.getCurrentPosition(
        display_distance,
        display_error,
        position_options,
      );
      message = error_messages[error.code] + position_options.timeout / 100;
    } else {
      position_options.timeout = 100;
      message = `Sorry, looks like this is taking longer than expected.
      Please feel free to try again later if you really want to know how far
      apart we are... 😅`;
      loading = false;
    }
  }

  function handle_click(): void {
    loading = true;
    navigator.geolocation.getCurrentPosition(
      display_distance,
      display_error,
      position_options,
    );
  }
</script>

<p>
  If you'd like you know exactly how far apart we are, click the following
  button :)
</p>

<Button {loading} onClick={handle_click} width={120}>CLICK HERE...</Button>

{#if message}
  <p
    transition:fly={{ y: 20, duration: 1000 }}
    class="bg-surface rounded p-4"
    aria-live="assertive"
  >
    {@html message}
  </p>
{/if}
