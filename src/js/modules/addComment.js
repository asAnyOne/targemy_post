const addComments = (url, inputSelector) => {
  const refresh_token = sessionStorage.getItem("refresh");
  const input = document.querySelector(inputSelector);

  input.addEventListener("change", (e) => {
    const inpValue = e.target.value.trim();
    if (inpValue.length) {
      const data = {
        type: "post",
        post_id: 113,
        card_id: 1,
      };
      data.content = inpValue;
      data.refresh_token = sessionStorage.getItem("refresh");

      fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          Authorization: refresh_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(console.log)
        .catch(console.log);
    }
  });
};

export default addComments;
