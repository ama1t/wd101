document.addEventListener("DOMContentLoaded", () => {
  const email = document.getElementById("email");
  email.addEventListener("input", () => validate(email));

  const submit = document.getElementById("submit");
  submit.addEventListener("click", () => validate(email));

  function validate(ele) {
    if (ele.validity.typeMismatch) {
      ele.setCustomValidity("The email is not in the right format!!!");
      ele.reportValidity();
    } else {
      ele.setCustomValidity("");
    }
  }
  
  const dob = document.getElementById("dob");

dob.addEventListener("input", () => valage(dob.value));

function valage(dobValue) {
  const birthDate = new Date(dobValue);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust age if the birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  console.log("Exact Age:", age);

  const dobInput = document.getElementById("dob");

  if (age < 18 || age > 55) {
    dobInput.setCustomValidity("Age must be between 18 and 55");
    dobInput.reportValidity();
  } else {
    dobInput.setCustomValidity("");
  }
}

  let userentries = retrieveEntries();

  const form = document.getElementById("regform");

  const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const terms = document.getElementById("radio").checked;


    const entry = {
      name,
      email,
      password,
      dob,
      terms,
    };

    userentries.push(entry);
    localStorage.setItem("userentries", JSON.stringify(userentries));
    displayEntries();
    form.reset(); 
  };

  form.addEventListener("submit", saveUserForm);

  function retrieveEntries() {
    let entries = localStorage.getItem("userentries");
    return entries ? JSON.parse(entries) : [];
  }

  function displayEntries() {
    const entries = retrieveEntries();
    const tableEntries = entries
      .map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const termsCell = `<td class="border px-4 py-2">${entry.terms}</td>`;
        return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${termsCell}</tr>`;
      })
      .join("\n");

    const table = tableEntries;

    document.getElementById("entries").innerHTML = table;
  }

  displayEntries();
});
