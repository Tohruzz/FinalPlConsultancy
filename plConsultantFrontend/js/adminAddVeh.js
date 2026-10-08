const addVehicleForm =
    document.getElementById("addVehicleForm")


addVehicleForm.addEventListener("submit", function(event){

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


    fetch("http://localhost:8080/api/vehicles", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(vehicle)

    })
    .then(response => {

        if(!response.ok){
            throw new Error("Vehicle could not be added")
        }

        return response.json()

    })
    .then(vehicle => {

        const vehicleId = vehicle.id

        const files =
            document.getElementById("images").files


        const uploadPromises = []


        for(let i = 0; i < files.length; i++){

            const formData =
                new FormData()

            formData.append("image", files[i])


            uploadPromises.push(

                fetch(
                    `http://localhost:8080/api/images/upload/${vehicleId}`,
                    {
                        method:"POST",
                        body:formData
                    }
                )
                .then(response => {

                    if(!response.ok){
                        throw new Error("Image upload failed")
                    }

                    return response.json()

                })

            )

        }


        return Promise.all(uploadPromises)

    })
    .then(() => {

        alert("Vehicle added successfully")

        window.location.href = "admin.html"

    })
    .catch(error => {

        console.log("Error : " + error)

        alert("Something went wrong")

    })

})


function goBack(){

    window.location.href = "admin.html"

}