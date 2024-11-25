// Step-1: Fetch, load and display categories on HTML

// Create two function
// first one for getting/loading data using fetch
// Second one is for showing data to the UI

// 1. loadCategories()
const loadCategories = async () => {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await res.json();
    displayCategories(data);
  } catch (err) {
    console.log(err);
  }
};
loadCategories();

const loadVideos = async (searchValue = "") => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchValue}`
    );
    const data = await res.json();
    // Passing data.videos as an argument to the displayVideos() function
    displayVideos(data.videos);
  } catch (err) {
    console.log(err);
  }
};
loadVideos();

const removeActiveClass = () => {
  const allCategoryButtons = document.querySelectorAll(".category-btn");
  allCategoryButtons.forEach((button) => {
    button.classList.remove("active");
  });
};

const loadCategoryVideos = async (id) => {
  try {
    // Remove active class from all category buttons
    removeActiveClass();

    // Fetch videos based on Category id
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();
    // console.log(data.category);
    displayVideos(data.category);

    const btnActive = document.getElementById(`btn-${id}`);
    btnActive.classList.add("active");
  } catch (err) {
    console.log(err);
  }
};

const loadDetails = async (videoId) => {
  console.log(videoId);
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (videoDetails) => {
  console.log(videoDetails);
  const modalDetailsContainer = document.querySelector("#modal-content");
  modalDetailsContainer.innerHTML = `
    <img src=${videoDetails.thumbnail}>
    <p class="mt-2">${videoDetails.description}</p>
  `;
  // Open the modal
  document.querySelector("#myModal").showModal();
};

// 2. displayCategories()
const displayCategories = (categories) => {
  const categoryContainer = document.querySelector("#category-container");

  // Loop through the category item
  categories.categories.forEach((category) => {
    // Create a button
    // const button = document.createElement("button");
    // button.classList.add("btn", "mx-2");
    // button.innerText = category.category;

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${category.category_id}" class="btn mx-2 category-btn" onclick="loadCategoryVideos(${category.category_id})">${category.category}</button>
    `;
    // Injecting the button to the categoryContainer
    categoryContainer.appendChild(buttonContainer);
  });
};

/**
{
"category_id": "1001",
"video_id": "aaaa",
"thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
"title": "Shape of You",
"authors": [
{
"profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
"profile_name": "Olivia Mitchell",
"verified": ""
}
],
"others": {
"views": "100K",
"posted_date": "16278"
},
"description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
*/

// 3. displayVideos()
const displayVideos = (videos) => {
  const videosContainer = document.querySelector("#videos");
  // Clear the innerHTML of videosContainer element
  videosContainer.innerHTML = "";

  if (videos.length === 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="max-h-screen flex justify-center flex-col items-center text-center">
      <img src="assets/Icon.png" class="w-[200px]">
      <h1 class="font-bold text-2xl mt-5">Sorry! No Content Found with this category<h1>
    </div>
    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }

  videos.map((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";

    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Thumbnail" />
      ${
        video.others?.posted_date.length === 0
          ? ""
          : `<span class="absolute bottom-2 right-2 bg-black text-white p-2 rounded text-xs">
        ${getTimeString(video.others?.posted_date)}
      </span>`
      }
      
    </figure>
    <div class="px-0 py-2 flex gap-2">
        <div class="w-[30px] h-[30px] rounded-full overflow-hidden">
          <img src=${
            video.authors[0].profile_picture
          } class="w-full h-full object-cover" alt="profile-pic">
        </div>
        <div>
          <h2 class="font-bold">${video.title}</h2>
          <div class="flex items-center gap-2">
            <p>${video.authors[0].profile_name}</p>
            ${
              video.authors[0].verified === true
                ? `<img
                  src="https://cdn-icons-png.flaticon.com/128/15050/15050690.png"
                  class="w-5 h-5"
                ></img>`
                : ""
            }
          </div>
          <div>
            <button onclick="loadDetails('${
              video.video_id
            }')" class="bg-red-500 text-white btn btn-sm rounded">Details</button>
          </div>
        </div>
    </div>
    `;

    videosContainer.append(card);
  });
};

document.querySelector("#search-input").addEventListener("keyup", function (e) {
  // console.log(e.target.value);
  loadVideos(e.target.value);
});
