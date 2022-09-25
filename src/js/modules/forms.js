const forms = (url) => {
  const form = document.querySelectorAll("form");
  const inputs = document.querySelectorAll("input");

  function clearInputs() {
    inputs.forEach((input) => (input.value = ""));
  }

  const statusMessage = {
    loading: "Loading...",
    success: "Sending successfully",
    error: "Something went wrong",
    spinner: "assets/images/spinner.gif",
    ok: "assets/images/ok.png",
    fail: "assets/images/fail.png",
  };

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      const status = document.createElement("div");
      status.classList.add("status");
      item.parentNode.appendChild(status);
      setTimeout(() => {
        item.style.display = "none";
      }, 400);

      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", statusMessage.spinner);
      status.appendChild(statusImg);

      let statusText = document.createElement("div");
      statusText.textContent = statusMessage.loading;
      status.appendChild(statusText);

      const formData = new FormData(item);

      const obj = {};

      formData.forEach((val, key) => {
        obj[key] = val;
      });

      const { email, password } = obj;
      console.log(email, password);
      const key = { basic: window.btoa(`${email}:${password}`) };
      console.log(key);
      fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(key),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          (res && sessionStorage.setItem("access", res.data.access_token)) ||
            sessionStorage.setItem("refresh", res.data.refresh_token);
          statusImg.setAttribute("src", statusMessage.ok);
          statusText.textContent = statusMessage.success;
        })
        .catch(() => {
          statusImg.setAttribute("src", statusMessage.fail);
          statusText.textContent = statusMessage.error;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            status.remove();
            item.style.display = "block";
          }, 5000);
        });
    });
  });
};

export default forms;
