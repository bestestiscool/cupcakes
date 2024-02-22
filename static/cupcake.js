$(function() {
  // Function to add a cupcake to the list
  function addCupcakeToList(cupcake) {
    $('#cupcakes-list').append(
      `<div class="col-12 col-md-4 mb-3">
        <div class="card">
          <img class="card-img-top" src="${cupcake.image}" alt="Cupcake Image">
          <div class="card-body">
            <h5 class="card-title">${cupcake.flavor}</h5>
            <p class="card-text">Size: ${cupcake.size}</p>
            <p class="card-text">Rating: ${cupcake.rating}</p>
          </div>
        </div>
      </div>`
    );
  }

  // Fetch and display existing cupcakes
  async function fetchAndDisplayCupcakes() {
    const response = await axios.get('/api/cupcakes');
    response.data.cupcakes.forEach(addCupcakeToList);
  }

  // Handle the form submission
  $('#new-cupcake-form').on('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const flavor = $('#flavor').val();
    const size = $('#size').val();
    const rating = $('#rating').val();
    const image = $('#image').val();

    try {
      const response = await axios.post('/api/cupcakes', { flavor, size, rating, image });

      addCupcakeToList(response.data.cupcake);
      this.reset(); // Reset the form fields after successful submission
    } catch (error) {
      console.error("Failed to create a new cupcake", error);
      // Optionally display an error message on the page
    }
  });

  // Initial fetch of cupcakes
  fetchAndDisplayCupcakes();
});
