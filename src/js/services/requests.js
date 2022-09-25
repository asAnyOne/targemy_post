export const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    body: data,
  });
  return await res.text();
};

export const getData = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};
