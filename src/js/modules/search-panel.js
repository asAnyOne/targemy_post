import { getData } from "../services/requests";

const serchPanel = ({ url, inputSelector, searchIcon, callback }) => {
  const inp = document.querySelector(inputSelector);
  const searchBtn = document.querySelector(searchIcon);
  searchBtn.addEventListener("click", (e) => {
    let input = e.target.nextElementSibling;

    if (
      input.value &&
      typeof +input.value === "number" &&
      !isNaN(+input.value)
    ) {
      getData(`${url}/post/${input.value}`).then((res) => {
        callback(res, input.value);
      });
      input.value = "";
    } else {
      input.setAttribute("placeholder", "введитe числы");
      input.value = "";
    }
  });
  inp.addEventListener("change", (e) => {
    if (typeof +e.target.value === "number" && !isNaN(+e.target.value)) {
      getData(`${url}/post/${inp.value}`)
        .then((res) => {
          callback(res, inp.value);
          inp.value = "";
        })
        .catch((e) => console.log(e));
    }
  });
};
export default serchPanel;
