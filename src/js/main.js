import addComments from "./modules/addComment";
import commentsList from "./modules/comments-list";
import forms from "./modules/forms";
import modals from "./modules/modal";
import posts from "./modules/posts";

window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  const url = "https://api.stage.targemy.com/v1";

  commentsList({ url, parentSelector: ".comment__block-cards" });
  posts({ url, parentSelector: ".post" });
  modals();
  forms(url);
  addComments(`${url}/auth/login`, ".comment__block-input");
});
