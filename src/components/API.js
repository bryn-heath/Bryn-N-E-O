export const singleCallSearchById = async (id) => {
  try {
    const resp = await fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=wq6CVTNwrDLBATNEc8oDjfcq4baCXxIlJoLPNJGe`
    ).then((res) => res.json());
    return resp;
  } catch (e) {
    console.log(e);
  }
};

export const fetchNeoFeedDateSearch = async (startDate, endDate) => {
  try {
    const resp = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=wq6CVTNwrDLBATNEc8oDjfcq4baCXxIlJoLPNJGe`
    ).then((res) => res.json());
    return await formatTenCloseDates(resp.near_earth_objects, startDate);
  } catch (e) {
    return 'Error wrong dates';
  }
};

function formatTenCloseDates(obj, firstDate) {
  let tenResults = [];
  Object.keys(obj).forEach(function (key) {
    tenResults.push(obj[key]);
  });
  tenResults = tenResults.flat();

  tenResults = tenResults.sort(
    (a, b) =>
      a.close_approach_data[0].epoch_date_close_approach -
      b.close_approach_data[0].epoch_date_close_approach
  );
  return tenResults.splice(0, 10);
}
