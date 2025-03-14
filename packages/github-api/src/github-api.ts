
    export default function github_api(commands: string[]) {
      const username = commands[1];
      const api_url = 'https://api.github.com/';

      const fetch_activity = async (username: string): Promise<{ status?: string, message?: string, data?: any }> => {
        const response = await fetch(`${api_url}/users/${username}/events`);

        switch(response.status) {
          case 200:
            return { status: 'Success', data: await response.json() };
          case 404:
          default:
            return { status: 'Error', message: 'Username Not Found' };
        }
      }


      fetch_activity(username);
    }