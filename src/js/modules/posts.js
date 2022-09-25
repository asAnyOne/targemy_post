import { getData } from "../services/requests";
import serchPanel from "./search-panel";

const posts = ({ url, parentSelector }) => {
  const parent = document.querySelector(parentSelector);

  const rndPostId = (Math.random() * 100).toFixed(0);
  const showPost = (data, value) => {
    if (data.photo_cover) {
      const img = document.createElement("img");
      img.setAttribute("src", data.photo_cover);
      img.setAttribute("alt", "postImage");
      img.classList.add("post-img");
      parent.appendChild(img);
    } else {
      const message = document.createElement("p");
      message.style.cssText =
        "color:gray; font-size:2rem;margin:40px;line-height:2rem;";
      message.textContent = `У поста с ID номером ${
        value || rndPostId
      } нет фото`;
      parent.appendChild(message);
    }
  };

  serchPanel({
    url,
    inputSelector: ".search__panel-input",
    searchIcon: ".search__panel-icon",
    callback: showPost,
  });

  getData(`${url}/post/${rndPostId}`).then(showPost);
};

export default posts;
