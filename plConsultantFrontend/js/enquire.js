const params =
    new URLSearchParams(window.location.search)

const vehicleId =
    params.get("vehicleId")


const enquiryForm =
    document.getElementById("enquiryForm")


enquiryForm.addEventListener("submit", function(event){

    event.preventDefault()


    const name =
        document.getElementById("name").value

    const phone =
        document.getElementById("phone").value

    const email =
        document.getElementById("email").value

    const message =
        document.getElementById("message").value


    const enquiry = {

        name: name,

        phone: phone,

        email: email,

        message: message,

        vehicle: {
            id: Number(vehicleId)
        }

    }


    fetch("http://localhost:8080/api/enquiries", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(enquiry)

    })

    .then(response => {

        if(!response.ok){
            throw new Error("Enquiry could not be submitted")
        }

        return response.json()

    })

    .then(data => {

        enquiryForm.reset()

        document
            .getElementById("successBox")
            .style.display = "flex"

    })

    .catch(error => {

        console.log(
            "Error : " + error
        )

        alert("Something went wrong")

    })

})


function closeSuccessBox(){

    document
        .getElementById("successBox")
        .style.display = "none"

}
const menuToggle = document.getElementById("menuToggle")
const navLinks = document.getElementById("navLinks")

if(menuToggle && navLinks){

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active")

        navLinks.classList.toggle("active")

    })

    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active")

                navLinks.classList.remove("active")

            })

        })

}