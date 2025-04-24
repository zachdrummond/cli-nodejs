export default async function github_api(commands: string[]) {
  const username = commands[1];
  if (!username) {
    console.error("Please provide a GitHub username.");
    return;
  }
  const api_url = "https://api.github.com";

  const fetch_activity = async (
    username: string
  ): Promise<{ status?: string; message?: string; data?: Event[] }> => {
    const response = await fetch(`${api_url}/users/${username}/events`);

    switch (response.status) {
      case 200:
        return { status: "Success", data: await response.json() };
      case 404:
      default:
        return { status: "Error", message: "Username Not Found" };
    }
  };

  const do_something = async () => {
    const response = await fetch_activity(username);

    if (response.status === "Success" && response.data) {
      const api_data = response.data;
      const num_events: number = api_data.length;
      const repo_event_list: RepositoryEventList = {};

      const date = {
        starting: new Date(
          api_data[num_events - 1].created_at
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        ending: new Date(api_data[0].created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
      };
      console.log(
        `Showing ${num_events} public events from the user, ${username}, between ${date.starting} and ${date.ending}`
      );

      for (let i = 0; i < num_events; i++) {
        const repo_name = api_data[i].repo.name;

        repo_event_list[`${repo_name}`] = {
          event_type: api_data[i].type,
          commits: 0,
        };

        if (api_data[i].type === "PushEvent")
          repo_event_list[`${repo_name}`].commits +=
            api_data[i].payload?.size ?? 0;
      }
      for (const repo in repo_event_list) {
        if (repo_event_list[repo].event_type === "PushEvent")
          console.log(
            "- Pushed",
            repo_event_list[repo].commits,
            "commits to",
            repo
          );
        if (repo_event_list[repo].event_type === "IssuesEvent")
          console.log("- Opened a new issue in", repo);
      }
    } else {
      console.error(response.message);
    }
  };

  await do_something();
}
