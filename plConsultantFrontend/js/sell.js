const sellForm = document.getElementById("sellForm")

sellForm.addEventListener("submit", function(event){

    event.preventDefault()

    const name =
        document.getElementById("name").value

    const phone =
        document.getElementById("phone").value

    const brand =
        document.getElementById("brand").value

    const model =
        document.getElementById("model").value

    const year =
        document.getElementById("year").value

    const price =
        document.getElementById("price").value

    const description =
        document.getElementById("description").value


    const sellReq = {

        name: name,

        phone: phone,

        brand: brand,

        model: model,

        year: Number(year),

        price: Number(price),

        description: description

    }


    fetch("http://localhost:8080/api/sellReq", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(sellReq)

    })
    .then(response => {

        if(!response.ok){
            throw new Error("Request could not be submitted")
        }

        return response.json()

    })
    .then(data => {

        sellForm.reset()

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

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("active")
            navLinks.classList.remove("active")

        })

    })

}