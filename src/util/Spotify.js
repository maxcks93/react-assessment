const clientId = ''; // Insert client ID here.
const redirectUri = 'http://localhost:3000'; // Add this to your accepted Spotify redirect URIs in your Spotify API.

let accessToken;

const Spotify = {
  async getAccessToken() {
    // Check if the access token is already available
    if (accessToken) {
      return accessToken;
    }

      // To extract access token and expiration time from the URL
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

      // If access token and expiration time are present in the URL
      if (accessTokenMatch && expiresInMatch) {
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);

        // Calculate the expiration time and store the token in localStorage
        const expirationTime = Date.now() + expiresIn * 1000;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('tokenExpiration', expirationTime);

        // Clear the URL parameters
        window.history.pushState('Access Token', null, '/');
      } else {
        // If no access token in the URL, check localStorage for a stored token
        const storedToken = localStorage.getItem('accessToken');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        // If no stored token or the stored token is expired
        if (!storedToken || Date.now() > tokenExpiration) {
          // Redirect to Spotify authorization URL
          const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
          window.location = accessUrl;
        }

        accessToken = storedToken;
      }

    return accessToken;
  },

  //function to search track from spotify
  async search(term) {
      const accessToken = await Spotify.getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const jsonResponse = await response.json();

      if (!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
  },

  //function to create playlist and save the track into playlist into spotify's account
  async savePlaylist(name, trackUris) {
      if (!name || !trackUris.length) {
        return;
      }

      const accessToken = await Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userId;

      const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
      const userJsonResponse = await userResponse.json();

      userId = userJsonResponse.id;

      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ name: name }),
      });

      const createPlaylistJsonResponse = await createPlaylistResponse.json();
      const playlistId = createPlaylistJsonResponse.id;

      await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ uris: trackUris }),
      });
  },
};

export default Spotify;