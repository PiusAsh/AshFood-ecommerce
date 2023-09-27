// import Swal from 'sweetalert2';

  // const storedData = JSON.parse(localStorage.getItem("User"));
  // const price = localStorage.getItem("price");
  
  function payWithPaystack() {
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_d7038cf5a385ea878c2345trgtry3bc9dc0ddc9fa0e861",
      email: storedData.email,
      amount: parseFloat(price) * 100,
      callback: function (response) {
        console.log(response)
        UpdateOnlinePayment(response.reference, price, response.status);
      },
      
      onClose: function () {
        Swal.fire({
          title: "Transaction Cancelled",
          text: "The transaction was not completed.",
          icon: "error",
          confirmButtonText: "OK",
        });
      },
    });
    paystack.openIframe();
  }
  
  async function UpdateOnlinePayment(reference, Amount, status) {
    var itemclass = {
      TrxRef: reference,
      Status: status,
      Email: storedData.email,
      Price: Amount,
      PreferBookingTimeDate: localStorage.getItem("bookingTime"),
      NumberOfPeople: parseInt(localStorage.getItem("guestCount")),
      ServiceName:
        localStorage.getItem("tvService") == null
          ? ""
          : localStorage.getItem("tvService"),
    };
  
    let baseUrl = localStorage.getItem("BaseUrl");
  
    try {
      const response = await fetch(`${baseUrl}api/Booking/BookApartment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(itemclass),
      });
  
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Payment Successful. Check Booking Details In Booking History",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to the /userprofile page on success
            window.location.href = "http://localhost:4200/useraccount";
          }
        });
      } else {
        Swal.fire({
          title: "Failure!",
          text: "The Operation Was Not Successful.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while processing the payment.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

