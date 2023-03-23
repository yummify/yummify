// Google Places API to fetch places
export const getPlaces = async (query) => {
  const location = { lat: 40.712776, lng: -74.005974 };
  const radius = 20000; // 20km radius around NYC
  const types = ["restaurant"];
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&types=${types}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const places = data.results.map(async (result) => {
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&fields=name,formatted_address,formatted_phone_number,opening_hours,website,types,photos,reviews&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    const placeDetailsResponse = await fetch(placeDetailsUrl);
    const placeDetailsData = await placeDetailsResponse.json();
    const placeDetails = placeDetailsData.result;
    return {
      id: result.place_id,
      name: result.name,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      address: placeDetails.formatted_address,
      phone: placeDetails.formatted_phone_number,
      website: placeDetails.website,
    };
  });
  return Promise.all(places);
};
