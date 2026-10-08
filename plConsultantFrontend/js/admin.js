const loginForm = document.getElementById("loginForm")
const loginSection = document.getElementById("loginSection")
const adminPanel = document.getElementById("adminPanel")
const errorMessage = document.getElementById("errorMessage")
checkLogin()
function checkLogin(){
    fetch("http://localhost:8080/api/admin/check", {
        credentials: "include"
    })
    .then(response => response.text())
    .then(data => {
        if(data === "Logged in"){
            showAdminPanel()
        }else{
            showLogin()
        }
    })
    .catch(error => {
        console.log("Session check error : " + error)
        showLogin()
    })

}


function showLogin(){

    loginSection.style.display = "flex"

    adminPanel.style.display = "none"

}


function showAdminPanel(){

    loginSection.style.display = "none"

    adminPanel.style.display = "block"

    loadVehicles()

    loadEnquiries()

    loadSellRequests()

}


loginForm.addEventListener("submit", function(event){

    event.preventDefault()


    const username =
        document.getElementById("username").value

    const password =
        document.getElementById("password").value


    errorMessage.style.display = "none"


    fetch("http://localhost:8080/api/admin/login", {

        method: "POST",

        credentials: "include",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            username: username,

            password: password

        })

    })

    .then(response => {

        if(!response.ok){

            throw new Error("Login failed")

        }

        return response.text()

    })

    .then(data => {

        if(data === "Login successful"){

            showAdminPanel()

        }else{

            errorMessage.style.display = "block"

        }

    })

    .catch(error => {

        console.log(
            "Login error : " + error
        )

        errorMessage.style.display = "block"

    })

})


function loadVehicles(){

    const vehicleContainer =
        document.getElementById("vehicleContainer")


    vehicleContainer.innerHTML = ""


    fetch("http://localhost:8080/api/vehicles")

    .then(response => response.json())

    .then(vehicles => {

        vehicles.forEach(vehicle => {

            const div =
                document.createElement("div")


            div.innerHTML = `

                <div class="vehicleInfo">

                    <h3>
                        ${vehicle.brand} ${vehicle.model}
                    </h3>

                    <p>
                        Category : ${vehicle.category}
                    </p>

                    <p>
                        Year : ${vehicle.year}
                    </p>

                    <p>
                        Price :
                        ₹${vehicle.price.toLocaleString("en-IN")}
                    </p>

                    <p>
                        Kilometres :
                        ${vehicle.kmDriven.toLocaleString("en-IN")} km
                    </p>

                    <p>
                        Description :
                        ${vehicle.description}
                    </p>

                    <button
                        onclick="editVehicle(${vehicle.id})">
                        Edit
                    </button>

                    <button
                        onclick="deleteVehicle(${vehicle.id})">
                        Delete
                    </button>

                </div>

            `


            vehicleContainer.appendChild(div)

        })

    })

    .catch(error => {

        console.log(
            "Vehicle error : " + error
        )

    })

}


function editVehicle(id){

    window.location.href =
        `adminEditVeh.html?id=${id}`

}


function deleteVehicle(id){

    const result =
        confirm(
            "Are you sure you want to delete this vehicle?"
        )


    if(!result){

        return

    }


    fetch(
        `http://localhost:8080/api/vehicles/${id}`,
        {
            method: "DELETE"
        }
    )

    .then(response => {

        if(!response.ok){

            throw new Error("Delete failed")

        }

        return response.text()

    })

    .then(data => {

        alert(
            "Vehicle deleted successfully"
        )

        location.reload()

    })

    .catch(error => {

        console.log(
            "Delete vehicle error : " + error
        )

    })

}


function loadEnquiries(){

    const enquiryContainer =
        document.getElementById("enquiryContainer")


    enquiryContainer.innerHTML = ""


    fetch("http://localhost:8080/api/enquiries")

    .then(response => response.json())

    .then(enquiries => {

        enquiries.forEach(enquiry => {

            let vehicleInfo =
                "General Contact"


            if(enquiry.vehicle != null){

                vehicleInfo =
                    enquiry.vehicle.brand +
                    " " +
                    enquiry.vehicle.model

            }


            const div =
                document.createElement("div")


            div.innerHTML = `

                <h3>
                    Name : ${enquiry.name}
                </h3>

                <p>
                    Phone : ${enquiry.phone}
                </p>

                <p>
                    Email : ${enquiry.email}
                </p>

                <p>
                    Message : ${enquiry.message}
                </p>

                <p>
                    <strong>Vehicle :</strong>
                    ${vehicleInfo}
                </p>

                <button
                    onclick="deleteEnquiry(${enquiry.id})">
                    Delete
                </button>

            `


            enquiryContainer.appendChild(div)

        })

    })

    .catch(error => {

        console.log(
            "Enquiry error : " + error
        )

    })

}


function deleteEnquiry(id){

    const result =
        confirm(
            "Are you sure you want to delete this enquiry?"
        )


    if(!result){

        return

    }


    fetch(
        `http://localhost:8080/api/enquiries/${id}`,
        {
            method: "DELETE"
        }
    )

    .then(response => {

        if(!response.ok){

            throw new Error("Delete failed")

        }

        return response.text()

    })

    .then(data => {

        alert(
            "Enquiry deleted successfully"
        )

        location.reload()

    })

    .catch(error => {

        console.log(
            "Delete enquiry error : " + error
        )

    })

}


function loadSellRequests(){

    const sellContainer =
        document.getElementById("sellContainer")


    sellContainer.innerHTML = ""


    fetch("http://localhost:8080/api/sellReq")

    .then(response => response.json())

    .then(sellRequests => {

        sellRequests.forEach(sell => {

            const div =
                document.createElement("div")


            div.innerHTML = `

                <h3>
                    Vehicle :
                    ${sell.brand} ${sell.model}
                </h3>

                <p>
                    Name : ${sell.name}
                </p>

                <p>
                    Phone : ${sell.phone}
                </p>

                <p>
                    Year : ${sell.year}
                </p>

                <p>
                    Expected Price :
                    ₹${sell.price.toLocaleString("en-IN")}
                </p>

                <p>
                    Description :
                    ${sell.description}
                </p>

                <button
                    onclick="deleteSell(${sell.id})">
                    Delete
                </button>

            `


            sellContainer.appendChild(div)

        })

    })

    .catch(error => {

        console.log(
            "Sell request error : " + error
        )

    })

}


function deleteSell(id){

    const result =
        confirm(
            "Are you sure you want to delete this sell request?"
        )


    if(!result){

        return

    }


    fetch(
        `http://localhost:8080/api/sellReq/${id}`,
        {
            method: "DELETE"
        }
    )

    .then(response => {

        if(!response.ok){

            throw new Error("Delete failed")

        }

        return response.text()

    })

    .then(data => {

        alert(
            "Sell request deleted successfully"
        )

        location.reload()

    })

    .catch(error => {

        console.log(
            "Delete sell request error : " + error
        )

    })

}