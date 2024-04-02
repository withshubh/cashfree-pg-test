document.addEventListener("DOMContentLoaded", function () {
  const cashfree = new Cashfree({
    mode: "sandbox",
  });

  const newTabButton = document.getElementById("newTab");
  const inTabButton = document.getElementById("inTab");
  const paymentSessionInput = document.getElementById("payment_session_id");

  newTabButton.disabled = true;
  inTabButton.disabled = true;

  function createAndFillOrder() {
    fetch("/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_amount: 100.0,
        order_currency: "INR",
        order_id: `order_${Math.floor(Math.random() * 900) + 100}`,
        customer_details: {
          customer_id: "customer123",
          customer_phone: "8182004700",
          customer_name: "Shubhendra",
          customer_email: "shubhendra.cashfree@cf.com",
        },
        order_meta: {
          return_url: "http://localhost:3000/?order_id={order_id}",
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.payment_session_id) {
          paymentSessionInput.value = data.payment_session_id;
          newTabButton.disabled = false;
          inTabButton.disabled = false;
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  createAndFillOrder();

  newTabButton.addEventListener("click", function () {
    let checkoutOptions = {
      paymentSessionId: paymentSessionInput.value.trim(),
      redirectTarget: "_blank",
    };
    cashfree.checkout(checkoutOptions);
  });

  inTabButton.addEventListener("click", function () {
    let checkoutOptions = {
      paymentSessionId: paymentSessionInput.value.trim(),
      redirectTarget: "checkoutIframe",
    };
    cashfree.checkout(checkoutOptions);
  });
});
