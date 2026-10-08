const params = new URLSearchParams(window.location.search)

const vehicleId = params.get("id")

const editVehicleForm =
    document.getElementById("editVehicleForm")


fetch(`http://localhost:8080/api/vehicles/${vehicleId}`)
.then(response => {

    if(!response.ok){
        throw new Error("Vehicle could not be loaded")
    }

    return response.json()

})
.then(vehicle => {

    document.getElementById("category").value =
        vehicle.category

    document.getElementById("brand").value =
        vehicle.brand

    document.getElementById("model").value =
        vehicle.model

    document.getElementById("price").value =
        vehicle.price

    document.getElementById("year").value =
        vehicle.year

    document.getElementById("kmDriven").value =
        vehicle.kmDriven

    document.getElementById("description").value =
        vehicle.description || ""

})
.catch(error => {

    console.log("Vehicle error : " + error)

})


editVehicleForm.addEventListener("submit", function(event){

    event.preventDefault()


    const vehicle = {

        category:
            document.getElementById("category").value,

        brand:
            document.getElementById("brand").value,

        model:
            document.getElementById("model").value,

        price:
            Number(document.getElementById("price").value),

        year:
            Number(document.getElementById("year").value),

        kmDriven:
            Number(document.getElementById("kmDriven").value),

        description:
            document.getElementById("description").value

    }


    fetch(`http://localhost:8080/api/vehicles/${vehicleId}`, {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(vehicle)

    })
    .then(response => {

        if(!response.ok){
            throw new Error("Vehicle update failed")
        }

        return response.json()

    })
    .then(data => {

        alert("Vehicle updated successfully")

    })
    .catch(error => {

        console.log("Update error : " + error)

        alert("Something went wrong")

    })

})


function loadImages(){

    const imageContainer =
        document.getElementById("imageContainer")


    imageContainer.innerHTML = ""


    fetch(`http://localhost:8080/api/images/vehicle/${vehicleId}`)
    .then(response => {

        if(!response.ok){
            throw new Error("Images could not be loaded")
        }

        return response.json()

    })
    .then(images => {

        if(images.length === 0){

            imageContainer.innerHTML = `
                <div class="noImages">
                    No images uploaded yet.
                </div>
            `

            return

        }


        images.forEach(image => {

            const div =
                document.createElement("div")

            div.className = "imageItem"


            div.innerHTML = `

                <img
                    src="http://localhost:8080/uploads/${image.image}"
                    alt="Vehicle image"
                >

                <button
                    class="deleteButton"
                    onclick="deleteImage(${image.id})"
                >
                    Delete Image
                </button>

            `


            imageContainer.appendChild(div)

        })

    })
    .catch(error => {

        console.log("Image error : " + error)

    })

}


function uploadImage(){

    const fileInput =
        document.getElementById("image")

    const file =
        fileInput.files[0]


    if(!file){

        alert("Please select an image")

        return

    }


    const formData =
        new FormData()

    formData.append("image", file)


    fetch(`http://localhost:8080/api/images/upload/${vehicleId}`, {

        method:"POST",

        body:formData

    })
    .then(response => {

        if(!response.ok){
            throw new Error("Image upload failed")
        }

        return response.json()

    })
    .then(data => {

        alert("Image uploaded successfully")

        fileInput.value = ""

        loadImages()

    })
    .catch(error => {

        console.log("Upload error : " + error)

        alert("Image upload failed")

    })

}


function deleteImage(id){

    const result =
        confirm("Are you sure you want to delete this image?")


    if(!result){
        return
    }


    fetch(`http://localhost:8080/api/images/${id}`, {

        method:"DELETE"

    })
    .then(response => {

        if(!response.ok){
            throw new Error("Image delete failed")
        }

        return response.text()

    })
    .then(data => {

        alert("Image deleted successfully")

        loadImages()

    })
    .catch(error => {

        console.log("Delete image error : " + error)

        alert("Image could not be deleted")

    })

}


function goBack(){

    window.location.href = "admin.html"

}


loadImages()