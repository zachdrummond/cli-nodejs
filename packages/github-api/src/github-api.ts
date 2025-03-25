export default async function github_api(commands: string[]) {
  const username = commands[1];
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
      console.log("Output:");
      const num_events = response.data.length;
      for (let i = 0; i < num_events; i++) {
        console.log(`Event #${i}`, "Type:", response.data[i].type, "Actor:", response.data[i].actor.login);
      }
    } else {
      console.error(response.message);
    }
  };

  await do_something();
}
