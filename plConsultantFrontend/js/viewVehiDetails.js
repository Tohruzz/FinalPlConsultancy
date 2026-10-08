const params = new URLSearchParams(window.location.search)

const vehicleId = params.get("id")

const details = document.getElementById("vehicleDetails")


fetch(`http://localhost:8080/api/vehicles/${vehicleId}`)
.then(response => {

    if(!response.ok){
        throw new Error("Vehicle not found")
    }

    return response.json()

})
.then(vehicle => {

    details.innerHTML = `

        <div class="vehicleLayout">

            <div class="imageSection">

                <div id="mainImage" class="mainImage">
                    <div class="loading">
                        Loading image...
                    </div>
                </div>

                <div id="thumbnails" class="thumbnails"></div>

            </div>


            <div class="vehicleInfo">

                <p class="vehicleCategory">
                    ${vehicle.category}
                </p>

                <h1>
                    ${vehicle.brand}
                    ${vehicle.model}
                </h1>

                <p class="vehiclePrice">
                    ₹${vehicle.price.toLocaleString("en-IN")}
                </p>


                <div class="vehicleMeta">

                    <div class="metaItem">

                        <span>
                            Year
                        </span>

                        <p>
                            ${vehicle.year}
                        </p>

                    </div>


                    <div class="metaItem">

                        <span>
                            Kilometres
                        </span>

                        <p>
                            ${vehicle.kmDriven.toLocaleString("en-IN")} km
                        </p>

                    </div>

                </div>


                <div class="description">

                    <p class="descriptionTitle">
                        Description
                    </p>

                    <p>
                        ${vehicle.description}
                    </p>

                </div>


                <a
                    href="enquire.html?vehicleId=${vehicle.id}"
                    class="enquireButton"
                >
                    Enquire Now
                </a>

            </div>

        </div>

    `

    imageLoad(vehicle.id)

})
.catch(error => {

    console.log("Vehicle error : " + error)

    details.innerHTML = `
        <div class="loading">
            Unable to load vehicle details.
        </div>
    `

})


function imageLoad(id){

    fetch(`http://localhost:8080/api/images/vehicle/${id}`)
    .then(response => response.json())
    .then(images => {

        const mainImage =
            document.getElementById("mainImage")

        const thumbnails =
            document.getElementById("thumbnails")


        if(images.length === 0){

            mainImage.innerHTML = `
                <div class="noImages">
                    No images available
                </div>
            `

            return
        }


        mainImage.innerHTML = `
            <img
                id="mainVehicleImage"
                src="http://localhost:8080/uploads/${images[0].image}"
                alt="Vehicle image"
            >
        `


        images.forEach((image, index) => {

            const thumbnail =
                document.createElement("img")

            thumbnail.src =
                `http://localhost:8080/uploads/${image.image}`

            thumbnail.className = "thumbnail"

            if(index === 0){
                thumbnail.classList.add("active")
            }

            thumbnail.onclick = function(){

                showImage(
                    `http://localhost:8080/uploads/${image.image}`,
                    thumbnail
                )

            }

            thumbnails.appendChild(thumbnail)

        })

    })
    .catch(error => {

        console.log(
            "Image error : " + error
        )

    })

}

function showImage(image, selectedThumbnail){

    const mainImage =
        document.getElementById("mainVehicleImage")

    mainImage.style.opacity = "0"

    setTimeout(() => {

        mainImage.src = image

        mainImage.onload = () => {
            mainImage.style.opacity = "1"
        }

    },200)


    document.querySelectorAll(".thumbnail").forEach(thumbnail => {

        thumbnail.classList.remove("active")

    })


    selectedThumbnail.classList.add("active")
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