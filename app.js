const fees = {
  "Member": "NGN 80,000",
  "Non-member": "NGN 100,000",
  "Online": "NGN 50,000",
  "Student": "NGN 30,000"
};

const form = document.querySelector("#registrationForm");
const selectedFee = document.querySelector("#selectedFee");
const formStatus = document.querySelector("#formStatus");
const confirmationScreen = document.querySelector("#confirmationScreen");
const registrationId = document.querySelector("#registrationId");
const closeConfirmation = document.querySelector("#closeConfirmation");

document.querySelectorAll("input[name='Registration category']").forEach((input) => {
  input.addEventListener("change", () => {
    const category = input.value;
    selectedFee.textContent = `${category} registration fee: ${fees[category]}`;
    const paymentCategory = form.elements["Ticket category selected"];
    paymentCategory.value = category;
  });
});

form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    form.reportValidity();
    return;
  }

  const receipt = form.elements.attachment.files[0];
  if (!receipt) {
    event.preventDefault();
    formStatus.textContent = "Please upload payment receipt before submitting.";
    return;
  }

  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  const allowedExtensions = /\.(pdf|jpg|jpeg|png)$/i;
  if (!allowedTypes.includes(receipt.type) && !allowedExtensions.test(receipt.name)) {
    event.preventDefault();
    formStatus.textContent = "Receipt must be a PDF, JPG, JPEG, or PNG file.";
    return;
  }

  const id = createRegistrationId();
  document.querySelector("#registrationIdField").value = id;
  formStatus.textContent = "Submitting registration securely...";
});

closeConfirmation.addEventListener("click", () => {
  confirmationScreen.classList.remove("is-visible");
  confirmationScreen.setAttribute("aria-hidden", "true");
});

function createRegistrationId() {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `AIMP-${year}${month}${day}-${random}`;
}
