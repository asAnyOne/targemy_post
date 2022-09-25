const modals = () => {
  function closeModal(windows) {
    windows.forEach((item) => (item.style.display = "none"));
    document.body.style.overflow = "";
  }
  function showModal(e, windows, modal) {
    e.preventDefault();
    windows.forEach((item) => (item.style.display = "none"));
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function bindModal(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      closeBtn = modal.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]");

    trigger.forEach((item) =>
      item.addEventListener(
        "click",
        (e) =>
          e.target &&
          !sessionStorage.getItem("access") &&
          showModal(e, windows, modal)
      )
    );
    closeBtn.addEventListener("click", () => closeModal(windows));
    modal.addEventListener(
      "click",
      (e) => e.target === modal && closeModal(windows)
    );
  }
  if (!sessionStorage.getItem("access") && !sessionStorage.getItem("refresh")) {
    bindModal(".comment__block-input", ".popup", ".popup_close");
  }
};
export default modals;
