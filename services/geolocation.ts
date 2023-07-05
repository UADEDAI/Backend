import { createClient, ClientResponse, GeocodingResponse, Client, AddressComponent } from '@google/maps';

console.log('APIKEY' + process.env.GOOGLE_MAPS_API_KEY);
// Create a client
const googleMapsClient: Client = createClient({
  key: 'AIzaSyDxc_387lQc-rD1r4DwUVUcmSsNaQycCps',
  Promise: Promise
});

export async function getGeocode(address: string): Promise<{ lat: number, lng: number }> {
  const response: ClientResponse<GeocodingResponse> = await googleMapsClient.geocode({ address }).asPromise();

  if (response.json.status === 'OK') {
    const { lat, lng } = response.json.results[0].geometry.location;
    return { lat, lng };
  } else {
    throw new Error('Invalid address');
  }
}