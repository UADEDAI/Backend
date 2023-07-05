import { Client, GeocodeRequest } from "@googlemaps/google-maps-services-js";

const client = new Client({});

async function getGeocode(address: string): Promise<{ lat: number; lng: number }> {
  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
    });
    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching geolocation");
  }
}

export { getGeocode };
