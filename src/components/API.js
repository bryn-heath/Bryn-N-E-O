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
    return resp;
  } catch (e) {
    console.log(e);
  }
};
