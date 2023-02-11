<script lang="ts">
  import { intervalToDuration, formatDuration } from "date-fns";

  export let milliseconds: number;

  const last_updated_date = new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(new Date(milliseconds));

  let time_since_updated: string;

  function format_time_since_last_updated(milliseconds: number): void {
    const start = new Date(milliseconds);
    const duration = intervalToDuration({ start, end: new Date() });
    const formattedDuration = formatDuration(duration, { delimiter: "," });
    const durationArray = formattedDuration.split(",");
    let time = "";
    durationArray.forEach((i: string, index: number): void => {
      if (durationArray.length > 1 && index + 1 === durationArray.length) {
        time = `${time} and ${i}`;
      } else if (time) {
        time = `${time}, ${i}`;
      } else {
        time = i;
      }
    });
    time_since_updated = time;
  }

  format_time_since_last_updated(milliseconds);
  setInterval((): void => format_time_since_last_updated(milliseconds), 1000);
</script>

<b>Last Updated:</b> <time>{last_updated_date}</time><br />
<small>(Or exactly <time>{time_since_updated}</time> ago)</small>
