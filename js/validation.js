function removeFieldError(field) {
    const errorText = field.nextElementSibling;
    if (errorText !== null) {
        if (errorText.classList.contains("form-error-text")) {
            errorText.remove();
        }
    }
};

function createFieldError(field, text) {
    removeFieldError(field); //przed stworzeniem usuwam by zawsze był najnowszy komunikat

    const div = document.createElement("div");
    div.classList.add("form-error-text");
    div.innerText = text;
    if (field.nextElementSibling === null) {
        field.parentElement.appendChild(div);
    } else {
        if (!field.nextElementSibling.classList.contains("form-error-text")) {
            field.parentElement.insertBefore(div, field.nextElementSibling);
        }
    }
};
function testText(field, lng) {
    return field.value.length >= lng;
};

function testEmail(field) {
    const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
    return reg.test(field.value);
};

//---------------------------------------------
function markFieldAsError(field, show) {
    if (show) {
        field.classList.add("field-error");
    } else {
        field.classList.remove("field-error");
        removeFieldError(field);
    }
};

const form = document.querySelector("form");
const inputFirstName = form.querySelector("input[name=first-name]");
const inputLastName = form.querySelector("input[name=last-name]");
const inputEmail = form.querySelector("input[name=email]");
const formMessage = form.querySelector(".form-message");




inputFirstName.addEventListener("input", e =>markFieldAsError(e.target, !testText(e.target, 3)));
inputLastName.addEventListener("input", e => markFieldAsError(e.target, !testText(e.target, 3)));
inputEmail.addEventListener("input", e => markFieldAsError(e.target, !testEmail(e.target)));

form.addEventListener("submit", e => {
    e.preventDefault();

    let formErrors = false;

   
    for (const el of [inputFirstName, inputLastName, inputEmail]) {
        markFieldAsError(el, false);
        removeFieldError(el);
    }

    if (!testText(inputFirstName, 3)) {
        markFieldAsError(inputFirstName, true);
        createFieldError(inputFirstName, "Wpisz poprawnie imię");
        formErrors = true;
    }
    if (!testText(inputLastName, 3)) {
        markFieldAsError(inputLastName, true);
        createFieldError(inputLastName, "Wpisz poprawnie nazwisko");
        formErrors = true;
    }

    

    if (!testEmail(inputEmail)) {
        markFieldAsError(inputEmail, true);
        createFieldError(inputEmail, "Wpisz poprawnie email");
        formErrors = true;
    }

  


    if (!formErrors) {
        e.target.submit();
    }
});
