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
      const num_events = response.data.length;
      const date = {
        starting: new Date(response.data[num_events - 1].created_at).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }
        ),
        ending: new Date(
          response.data[0].created_at
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
      };
      console.log(
        `Showing ${num_events} public events from the user, ${username}, between ${date.starting} and ${date.ending}`
      );

      for (let i = 0; i < num_events; i++) {
        switch (response.data[i].type) {
          case "CommitCommentEvent":
            console.log("Commit Comment Event");
            break;
          case "CreateEvent":
            console.log("Create Event");
            break;
          case "DeleteEvent":
            console.log("Delete Event");
            break;
          case "ForkEvent":
            console.log("Fork Event");
            break;
          case "GollumEvent":
            console.log("Gollum Event");
            break;
          case "IssueCommentEvent":
            console.log("Issue Comment Event");
            break;
          case "IssuesEvent":
            console.log("Issues Event");
            break;
          case "MemberEvent":
            console.log("Member Event");
            break;
          case "PublicEvent":
            console.log("Public Event");
            break;
          case "PullRequestEvent":
            console.log("Pull Request Event");
            break;
          case "PullRequestReviewEvent":
            console.log("Pull Request Review Event");
            break;
          case "PullRequestReviewCommentEvent":
            console.log("Pull Request Review Comment Event");
            break;
          case "PullRequestReviewThreadEvent":
            console.log("Pull Request Review Thread Event");
            break;
          case "PushEvent":
            console.log("Push Event");
            break;
          case "ReleaseEvent":
            console.log("Release Event");
            break;
          case "SponsorshipEvent":
            console.log("Sponsorship Event");
            break;
          case "WatchEvent":
            console.log("Watch Event");
            break;
          default:
            console.log("Unknown Event Type");
            break;
        }
      }
    } else {
      console.error(response.message);
    }
  };

  await do_something();
}
