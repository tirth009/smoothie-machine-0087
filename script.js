// The Smoothie Machine - Full Version
// -----------------------------------
// Features:
// - Smoothie class with description + pricing
// - Reads form input and creates a Smoothie object
// - Displays a description and total price
// - Updates a simple smoothie cup visual
// - Handles reset cleanly

/**
 * Smoothie class to represent a customer's smoothie order.
 */
class Smoothie {
  /**
   * @param {Object} options - smoothie configuration
   * @param {string} options.size
   * @param {string} options.base
   * @param {string[]} options.fruits
   * @param {string[]} options.extras
   * @param {string} options.sweetener
   * @param {string} options.customerName
   * @param {string} options.notes
   */
  constructor(options) {
    this.size = options.size;
    this.base = options.base;
    this.fruits = options.fruits;
    this.extras = options.extras;
    this.sweetener = options.sweetener;
    this.customerName = options.customerName;
    this.notes = options.notes;
  }

  /**
   * Calculate smoothie price based on size, fruits and extras.
   * You can customize these amounts if you want.
   * @returns {number}
   */
  calculatePrice() {
    let price = 0;

    // Base price by size
    switch (this.size) {
      case "small":
        price += 4.0;
        break;
      case "medium":
        price += 5.0;
        break;
      case "large":
        price += 6.0;
        break;
      default:
        price += 0;
    }

    // Each fruit adds $0.75
    price += this.fruits.length * 0.75;

    // Each extra adds $0.80
    price += this.extras.length * 0.8;

    // Sweetener adds a small amount (except "none")
    if (this.sweetener && this.sweetener !== "none") {
      price += 0.3;
    }

    // Round to 2 decimals
    return Number(price.toFixed(2));
  }

  /**
   * Return a human-readable description of the smoothie.
   * @returns {string}
   */
  getDescription() {
    const sizeLabel = this.capitalize(this.size);
    const baseLabel = this.base;
    const fruitList = this.fruits.join(", ");
    const extrasList = this.extras.length ? this.extras.join(", ") : "no extras";
    const sweetenerLabel =
      this.sweetener === "none" ? "no added sweetener" : this.sweetener;

    return `${sizeLabel} smoothie with ${baseLabel}, featuring ${fruitList}; ` +
      `${extrasList}; and ${sweetenerLabel}.`;
  }

  /**
   * Simple helper to capitalize a word.
   */
  capitalize(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

// DOM wiring and full behaviour
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("smoothieForm");
  const summaryText = document.getElementById("summaryText");
  const cupLiquid = document.getElementById("cupLiquid");
  const resetBtn = document.getElementById("resetBtn");

  // Handle smoothie order submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form values
    const customerName = document.getElementById("customerName").value.trim();
    const size = document.getElementById("size").value;
    const base = document.getElementById("base").value;
    const sweetener = document.getElementById("sweetener").value;
    const notes = document.getElementById("notes").value.trim();

    // Fruits (required)
    const fruitCheckboxes = document.querySelectorAll(
      'input[name="fruit"]:checked'
    );
    const fruits = Array.from(fruitCheckboxes).map((cb) => cb.value);

    // Validate required fields
    if (!size || !base || fruits.length === 0) {
      summaryText.textContent =
        "Please choose a size, a base, and at least one fruit to order your smoothie.";
      return;
    }

    // Extras (optional)
    const extraCheckboxes = document.querySelectorAll(
      'input[name="extra"]:checked'
    );
    const extras = Array.from(extraCheckboxes).map((cb) => cb.value);

    // Create Smoothie instance
    const smoothie = new Smoothie({
      size,
      base,
      fruits,
      extras,
      sweetener,
      customerName,
      notes,
    });

    const price = smoothie.calculatePrice();
    const description = smoothie.getDescription();

    // Build output text
    let intro = customerName
      ? `Thanks, ${customerName}! `
      : "Thanks for your order! ";

    let fullText = `${intro}${description} `;
    fullText += `Your total is $${price.toFixed(2)}.`;

    if (notes) {
      fullText += ` Special instructions: "${notes}".`;
    }

    summaryText.textContent = fullText;

    // Update visual cup based on size
    updateCupVisual(cupLiquid, size);
  });

  // Reset button behaviour
  resetBtn.addEventListener("click", function () {
    summaryText.textContent =
      'Fill in the form and click "Order smoothie" to see your custom blend and price.';
    updateCupVisual(cupLiquid, null);
  });

  // Initialize visual
  updateCupVisual(cupLiquid, null);

  console.log("Smoothie Machine JS fully loaded.");
});

/**
 * Update the smoothie cup visual depending on size.
 * @param {HTMLElement} cupLiquid
 * @param {string|null} size
 */
function updateCupVisual(cupLiquid, size) {
  if (!size) {
    cupLiquid.style.height = "0%";
    return;
  }

  // Different fill levels/colors by size
  if (size === "small") {
    cupLiquid.style.height = "50%";
    cupLiquid.style.background =
      "linear-gradient(180deg, #ffd5e8, #ff9ec4)";
  } else if (size === "medium") {
    cupLiquid.style.height = "65%";
    cupLiquid.style.background =
      "linear-gradient(180deg, #ffe0b2, #ffb74d)";
  } else if (size === "large") {
    cupLiquid.style.height = "80%";
    cupLiquid.style.background =
      "linear-gradient(180deg, #c5e1a5, #8bc34a)";
  }
}
