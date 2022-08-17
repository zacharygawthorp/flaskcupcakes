const BASE_URL = "http://127.0.0.1:5000/api";

/** given data about a cupcake, generate html */

function generateCupcakeHTML(cupcake) {
    return `
        <div class="card my-2" style="width: 15rem;" data-cupcake-id=${cupcake.id}>
            
            <img class="card-img-top"
                src="${cupcake.image}"
                alt="(no image provided)">
            <div class="card-body">
                ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
                <button class="delete-btn"><i class="fas fa-trash"></i></buttton>
            </div>
           
        </div> 
    `;
}

/** put intial cupcakes on the homepage. */

async function showInitialCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $("#cupcakes-list").append(newCupcake)
    }
}

/** handle form for adding a new cupcake */

$("#new-cupcake-form").on("submit", async function (evt) {
    evt.preventDefault();
  
    let flavor = $("#form-flavor").val();
    let rating = $("#form-rating").val();
    let size = $("#form-size").val();
    let image = $("#form-image").val();
  
    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
      flavor,
      rating,
      size,
      image
    });
  
    let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
    $("#cupcakes-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
});

$("#cupcakes-list").on("click", ".delete-btn", async function (evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).parent().parent("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showInitialCupcakes);