import { getData } from "../services/requests";

const commentsList = ({ url, parentSelector }) => {
  const parent = document.querySelector(parentSelector);

  let count = 2,
    offset = 0;

  const createCard = (comments) => {
    document.querySelector(
      ".comment__block-text"
    ).textContent = `${comments._meta.totalCount}  комментариев`;
    comments.items.slice(offset, count).forEach((comment) => {
      const { id, user_id, type, post_id, card_id, date_create, content } =
        comment;

      getData(`${url}/user/${user_id}`).then(
        ({ first_name, last_name, updated_at }) => {
          let date = (Date.parse(new Date()) - Date.parse(date_create)) / 60000;
          let timeMessage,
            second = date == 1,
            seconds = date > 2 && date < 60,
            minute = date < 120 && date > 60,
            minutes = date >= 120 && date < 3600,
            hour = date == 3600 && date < 7200,
            hours = date / 3600 > 1 && date / 3600 < 5,
            hourss = date / 3600 >= 5 && date / 3600 < 24,
            day = date / (3600 * 24) === 1 && date / (3600 * 24) < 2,
            days = date / (3600 * 24) > 1 && date / (3600 * 24) < 5,
            dayss = date / (3600 * 24) >= 5 && date / (3600 * 24) < 30,
            month =
              date / (3600 * 24 * 30) == 1 && date / (3600 * 24 * 30) < 1.5,
            months = date / (3600 * 24 * 30) > 1 && date / (3600 * 24 * 30) < 5,
            monthss =
              date / (3600 * 24 * 30) > 4 && date / (3600 * 24 * 30) < 12,
            year =
              date / (3600 * 24 * 365) === 1 && date / (3600 * 24 * 365) < 1.5,
            years =
              date / (3600 * 24 * 365) > 1 && date / (3600 * 24 * 365) < 5,
            yearss = date / (3600 * 24 * 365) > 5;
          second && date + " секунда";
          seconds && (timeMessage = date + " секунды");
          minute && (timeMessage = (date / 60).toFixed(0) + " минутa");
          minutes && (timeMessage = (date / 60).toFixed(0) + " минуты");
          hour && (timeMessage = (date / 3600).toFixed(0) + " час");
          hours && (timeMessage = (date / 3600).toFixed(0) + " часа");
          hourss && (timeMessage = (date / 3600).toFixed(0) + " часов");
          day && (timeMessage = (date / (3600 * 24)).toFixed(0) + " день");
          days && (timeMessage = (date / (3600 * 24)).toFixed(0) + " дня");
          dayss && (timeMessage = (date / (3600 * 24)).toFixed(0) + " дней");
          month &&
            (timeMessage = (date / (3600 * 24 * 30)).toFixed(0) + " месяц");
          months &&
            (timeMessage = (date / (3600 * 24 * 30)).toFixed(0) + " месяца");
          monthss &&
            (timeMessage = (date / (3600 * 24 * 30)).toFixed(0) + " месяцев");
          year &&
            (timeMessage = (date / (3600 * 24 * 365)).toFixed(0) + " год");
          years &&
            (timeMessage = (date / (3600 * 24 * 365)).toFixed(0) + " года");
          yearss &&
            (timeMessage = (date / (3600 * 24 * 365)).toFixed(0) + " лет");

          const commentCard = document.createElement("div");
          commentCard.classList.add("comment__card");
          commentCard.innerHTML = `
        <div class="comment__card-header">
        <img
          src="assets/images/user_avatar copy 10.jpg"
          alt="user"
          class="comment__card-img"
        />
        <div class="comment__card-title">
          <div class="comment__card-username"> ${first_name} ${last_name} </div>
          <div class="comment__card-time">${timeMessage} назад</div>
        </div>
        <div class="comment__card-menu">
          <img src="assets/images/icons/menu copy 3.svg" />
        </div>
      </div>
      <div class="comment__card-text">
      ${content}
      </div> 
        `;
          parent.appendChild(commentCard);
        }
      );
    });
    offset += 2;
    count += 2;
  };

  document
    .querySelector(".comment__block-more")
    .addEventListener("click", () =>
      getData(`${url}/comments`).then(createCard)
    );

  getData(`${url}/comments`).then(createCard);
};

export default commentsList;
