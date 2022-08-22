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

const cardholder_error = document.querySelector(".name_container .error");
const card_number_error = document.querySelector(".card_num_container .error");
const exp_date_error = document.querySelector(".exp_container .error");
const cvc_error = document.querySelector(".cvc_container .error");

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

const errorOutputHandler = (
  input,
  cardText,
  error,
  isNumberValue,
  isCardFormat
) => {
  if (isCardFormat) cardText.innerText = formatCardNumber(input.value);
  else cardText.innerText = input.value;

  if (input.value != 0) error.classList.add("hidden");

  if (isNumberValue) {
    if (!Number(input.value)) {
      error.innerText = "Wrong format, numbers only";
      error.classList.remove("hidden");
    }
  }

  if (!isNumberValue) {
    if (/\d/.test(input.value)) {
      error.innerText = "Wrong format, letters only";
      error.classList.remove("hidden");
    }
  }

  if (input.value == 0) {
    error.classList.remove("hidden");
    error.innerText = "Can't be blank";
  }
};

// EVENTS

cvc_input.oninput = () => {
  errorOutputHandler(cvc_input, cvc_card_back, cvc_error, true, false);
};

cardholder_input.oninput = () => {
  errorOutputHandler(
    cardholder_input,
    card_front_name,
    cardholder_error,
    false,
    false
  );
};

card_number_input.oninput = () => {
  errorOutputHandler(
    card_number_input,
    card_front_number,
    card_number_error,
    true,
    true
  );
};

mm_input.oninput = () => {
  errorOutputHandler(mm_input, card_front_date_mm, exp_date_error, true, false);
};

yy_input.oninput = () => {
  errorOutputHandler(yy_input, card_front_date_yy, exp_date_error, true, false);
};

submit_btn.addEventListener("click", submitForm);
