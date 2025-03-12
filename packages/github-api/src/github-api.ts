
    export default function github_api(commands: string[]) {
      const username = commands[1];

      console.log(`Username: ${username}`);

      const fetch_activity = async (username: string) => {
        const response = await fetch(`https://api.github.com/users/${username}/events`);
        const activity = await response.json();
        console.log(activity);
      }

      fetch_activity(username);
    }