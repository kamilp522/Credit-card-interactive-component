// VARIABLES

const cvc_input = document.querySelector(".cvc_input");
const cardholder_input = document.querySelector(".cardholder_input");
const card_number_input = document.querySelector(".card_number_input");
const mm_input = document.querySelector(".mm_input");
const yy_input = document.querySelector(".yy_input");

const cvc_card_back = document.querySelector(".cvc_card_back");
const card_front_number = document.querySelector(".card_front_number");
const card_front_name = document.querySelector(".card_front_name");
const card_front_date_mm = document.querySelector(".card_front_date .mm");
const card_front_date_yy = document.querySelector(".card_front_date .yy");

const cardholder_blank_error = document.querySelector(
  ".name_container .blank_error"
);
const card_number_blank_error = document.querySelector(
  ".card_num_container .blank_error"
);
const exp_date_blank_error = document.querySelector(
  ".exp_container .blank_error"
);
const cvc_blank_error = document.querySelector(".cvc_container .blank_error");

const submit_btn = document.querySelector(".card_btn");
const information_form = document.querySelector(".information_form");
const complete_details_container = document.querySelector(
  ".complete_details_container"
);

const card_form_inputs = [
  ...document.querySelectorAll(".information_form input"),
];

// FUNTIONS

const formatCardNumber = (value) => {
  const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g;
  const onlyNumbers = value.replace(/[^\d]/g, "");

  return onlyNumbers.replace(regex, (regex, $1, $2, $3, $4) =>
    [$1, $2, $3, $4].filter((group) => !!group).join(" ")
  );
};

cvc_input.oninput = () => {
  cvc_card_back.innerText = cvc_input.value;
  if (cvc_input.value != 0) cvc_blank_error.classList.add("hidden");
  if (cvc_input.value == 0) cvc_blank_error.classList.remove("hidden");
};

cardholder_input.oninput = () => {
  card_front_name.innerText = cardholder_input.value;
  if (cardholder_input.value != 0)
    cardholder_blank_error.classList.add("hidden");
  if (cardholder_input.value == 0)
    cardholder_blank_error.classList.remove("hidden");
};

card_number_input.oninput = () => {
  card_front_number.innerText = formatCardNumber(card_number_input.value);
  if (card_number_input.value != 0)
    card_number_blank_error.classList.add("hidden");
  if (card_number_input.value == 0)
    card_number_blank_error.classList.remove("hidden");
};

mm_input.oninput = () => {
  card_front_date_mm.innerText = mm_input.value;
  if (mm_input.value != 0) exp_date_blank_error.classList.add("hidden");
  if (mm_input.value == 0) exp_date_blank_error.classList.remove("hidden");
};

yy_input.oninput = () => {
  card_front_date_yy.innerText = yy_input.value;
  if (yy_input.value != 0) exp_date_blank_error.classList.add("hidden");
  if (yy_input.value == 0) exp_date_blank_error.classList.remove("hidden");
};

const submitForm = (e) => {
  e.preventDefault();

  let filled_inputs = 0;

  card_form_inputs.forEach((input) => {
    if (input.value !== "") {
      filled_inputs++;
    }
  });

  if (filled_inputs === 5) {
    information_form.classList.remove("active");
    complete_details_container.classList.add("active");
  }
};

// EVENTS

submit_btn.addEventListener("click", submitForm);
