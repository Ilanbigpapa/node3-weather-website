const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      const { error, location, forecast } = data;
      if (error) {
        return (messageOne.textContent = error);
      }
      messageOne.textContent = location;
      messageTwo.textContent = forecast;
    });
  });
});
