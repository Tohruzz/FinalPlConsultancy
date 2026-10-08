const container =
    document.getElementById("container")


fetch("http://localhost:8080/api/vehicles")

.then(response => {

    if(!response.ok){
        throw new Error("Vehicles could not be loaded")
    }

    return response.json()

})

.then(vehicles => {

    container.innerHTML = ""


    if(vehicles.length === 0){

        container.innerHTML = `
            <div class="noVehicles">
                No vehicles are available at the moment.
            </div>
        `

        return
    }


    vehicles.forEach((vehicle,index) => {

        const card =
            document.createElement("div")

        card.className = "vehicleCard"


        const number =
            String(index + 1).padStart(2,"0")


        card.innerHTML = `

            <div class="vehicleImage">

                <div class="vehicleNumber">
                    ${number}
                </div>

                <div class="imageLoading">
                    Loading...
                </div>

            </div>


            <div class="vehicleInfo">

                <div class="vehicleDetails">

                    <h3>
                        ${vehicle.brand}
                        ${vehicle.model}
                    </h3>

                    <p>
                        ${vehicle.category || "Vehicle"}
                    </p>

                    <p class="vehiclePrice">
                        ₹${Number(vehicle.price).toLocaleString("en-IN")}
                    </p>

                </div>


                <div class="vehicleMeta">

                    <span>
                        ${vehicle.year}
                    </span>

                    <span>
                        ${Number(vehicle.kmDriven).toLocaleString("en-IN")} km
                    </span>

                </div>


                <a
                    href="viewVehiDetails.html?id=${vehicle.id}"
                    class="viewButton"
                    aria-label="View vehicle details"
                ></a>

            </div>

        `


        container.appendChild(card)


        loadVehicleImage(
            vehicle.id,
            number
        )

    })


    startCardAnimations()
    startScrollReveal()

})

.catch(error => {

    console.log(
        "Vehicle loading error : " + error
    )

    container.innerHTML = `
        <div class="noVehicles">
            Unable to load vehicles.
            Please try again later.
        </div>
    `

})


function loadVehicleImage(vehicleId,number){

    fetch(
        `http://localhost:8080/api/images/vehicle/${vehicleId}`
    )

    .then(response => {

        if(!response.ok){
            throw new Error("Images could not be loaded")
        }

        return response.json()

    })

    .then(images => {

        const cards =
            document.querySelectorAll(".vehicleCard")


        let card = null


        cards.forEach(currentCard => {

            const button =
                currentCard.querySelector(".viewButton")


            if(
                button &&
                button.href.includes(
                    `id=${vehicleId}`
                )
            ){

                card = currentCard

            }

        })


        if(!card){
            return
        }


        const imageBox =
            card.querySelector(".vehicleImage")


        if(images.length === 0){

            imageBox.innerHTML = `

                <div class="vehicleNumber">
                    ${number}
                </div>

                <div class="noImage">
                    No image available
                </div>

            `

            return
        }


        const image =
            images[0]


        imageBox.innerHTML = `

            <div class="vehicleNumber">
                ${number}
            </div>

            <img
                src="http://localhost:8080/uploads/${image.image}"
                alt="${card.querySelector("h3").textContent.trim()}"
            >

        `

    })

    .catch(error => {

        console.log(
            "Image loading error : " + error
        )


        const cards =
            document.querySelectorAll(".vehicleCard")


        cards.forEach(card => {

            const button =
                card.querySelector(".viewButton")


            if(
                button &&
                button.href.includes(
                    `id=${vehicleId}`
                )
            ){

                const imageBox =
                    card.querySelector(".vehicleImage")


                imageBox.innerHTML = `

                    <div class="vehicleNumber">
                        ${number}
                    </div>

                    <div class="noImage">
                        No image available
                    </div>

                `

            }

        })

    })

}


function startCardAnimations(){

    const cards =
        document.querySelectorAll(".vehicleCard")


    const grid =
        document.querySelector(".vehicleGrid")


    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                grid.classList.add("hasHover")

                card.classList.add("isHovered")

            }
        )


        card.addEventListener(
            "mousemove",
            event => {

                if(window.innerWidth <= 700){
                    return
                }


                const rect =
                    card.getBoundingClientRect()


                const x =
                    event.clientX - rect.left

                const y =
                    event.clientY - rect.top


                const centerX =
                    rect.width / 2

                const centerY =
                    rect.height / 2


                const rotateX =
                    ((y - centerY) / centerY) * -2.5

                const rotateY =
                    ((x - centerX) / centerX) * 2.5


                card.style.transform = `
                    translateY(-18px)
                    scale(1.055)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                `

            }
        )


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove("isHovered")

                grid.classList.remove("hasHover")

                card.style.transform = ""

            }
        )

    })

}


function startScrollReveal(){

    const cards =
        document.querySelectorAll(".vehicleCard")


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if(entry.isIntersecting){

                        entry.target.classList.add(
                            "cardVisible"
                        )

                        observer.unobserve(
                            entry.target
                        )

                    }

                })

            },
            {
                threshold:.15
            }
        )


    cards.forEach(card => {

        observer.observe(card)

    })

}


const navbar =
    document.querySelector(".navbar")


window.addEventListener("scroll",() => {

    if(!navbar){
        return
    }


    if(window.scrollY > 60){

        navbar.style.padding =
            "14px 5%"

        navbar.style.background =
            "rgba(1,7,54,.97)"

    }

    else{

        navbar.style.padding =
            "0 5%"

        navbar.style.background =
            "rgba(1,7,54,.88)"

    }

})
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