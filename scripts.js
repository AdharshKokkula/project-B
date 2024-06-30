// scripts.js

const images = [
  'url("banner1.jpg")',
  'url("banner2.jpg")',
  'url("banner3.jpg")',
  'url("banner4.jpeg")',
];

const container = document.getElementById("cardContainer");

function changeSlides() {
  const banner = document.getElementById("banner");
  let i = 1;
  setInterval(() => {
    if (i > 3) {
      i = 0;
    }
    banner.style.backgroundImage = images[i];
    i++;
  }, 5000);
}

changeSlides();

function displayPaymentPage() {
  window.location.href = "payment-gateway.html";
}

function arrangeThePages() {
  const jwtToken = sessionStorage.jwtToken;
  const headerButtonContainer = document.getElementById(
    "headerButtonContainer"
  );
  const headerUserContainer = document.getElementById("headerUserContainer");
  if (jwtToken !== undefined) {
    headerButtonContainer.style.display = "none";
    headerUserContainer.style.display = "block";
  } else {
    headerButtonContainer.style.display = "block";
    headerUserContainer.style.display = "none";
  }
}

arrangeThePages();

//creating worker card
function createWorkerCard(item) {
  // Create the work card div
  const workCard = document.createElement("div");
  workCard.className = "work-card";

  // Create the image element
  const workImage = document.createElement("img");
  workImage.src = item.image_src;
  workImage.alt = item.image_alt;
  workImage.className = "work-image";

  // Create the work info div
  const workInfo = document.createElement("div");
  workInfo.className = "work-info";

  // Create the badge span
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = item.badge;

  // Create the work title h2
  const workTitle = document.createElement("h2");
  workTitle.className = "work-title";
  workTitle.textContent = item.title;

  // Create the work rating div
  const workRating = document.createElement("div");
  workRating.className = "work-rating";

  // Create the rating value span
  const ratingValue = document.createElement("span");
  ratingValue.className = "rating-value";
  ratingValue.textContent = item.rating_value;

  // Create the rating stars span
  const ratingStars = document.createElement("span");
  ratingStars.className = "rating-stars";
  ratingStars.innerHTML = `
    <i class="fas fa-star"></i>
`;

  // Create the rating count span
  const ratingCount = document.createElement("span");
  ratingCount.className = "rating-count";
  ratingCount.textContent = `(${item.rating_count})`;

  // Create the work duration span
  const workDuration = document.createElement("span");
  workDuration.className = "work-duration";
  workDuration.textContent = `• ${item.duration}`;

  // Append rating elements to work rating div
  workRating.appendChild(ratingValue);
  workRating.appendChild(ratingStars);
  workRating.appendChild(ratingCount);
  workRating.appendChild(workDuration);

  // Create the work author div
  const workAuthor = document.createElement("div");
  workAuthor.className = "work-author";
  workAuthor.innerHTML = `
    <span>by ${item.author_name}</span>
    <p>
        ${item.author_description}
    </p>
`;

  // Create the work footer div
  const workFooter = document.createElement("div");
  workFooter.className = "work-footer";

  //create the work price h1
  const workPrice = document.createElement("h1");
  workPrice.className = "work-price";
  workPrice.textContent = item.price;

  // Create the apply button
  const applyButton = document.createElement("button");
  applyButton.className = "btn-hire";
  applyButton.textContent = "Hire me";
  applyButton.addEventListener("click", () => {
    displayPaymentPage();
  });

  workFooter.appendChild(workPrice);
  workFooter.appendChild(applyButton);

  // Append all elements to work info div
  workInfo.appendChild(badge);
  workInfo.appendChild(workTitle);
  workInfo.appendChild(workRating);
  workInfo.appendChild(workAuthor);
  workInfo.appendChild(workFooter);

  // Append image and work info to work card
  workCard.appendChild(workImage);
  workCard.appendChild(workInfo);

  // Append work card to container
  container.appendChild(workCard);
}

//generating workers cards
function createWorkersCards() {
  container.innerHTML = "";

  const response = async () => {
    const url = "http://localhost:3000/workers-data";
    const method = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(url, method)
      .then((res) => res.json())
      .then((data) => {
        for (let worker of data) {
          createWorkerCard(worker);
        }
      });
  };
  response();
}

//crating work card
function createWorkCard(item) {
  // Create the work card div
  const workCard = document.createElement("div");
  workCard.className = "work-card";

  // Create the image element
  const workImage = document.createElement("img");
  workImage.src = item.image_src;
  workImage.className = "work-image";

  // Create the work card content div
  const workCardContent = document.createElement("div");
  workCardContent.className = "work-card-content";

  // Create the work header div
  const workHeader = document.createElement("div");
  workHeader.className = "work-header";

  // Create the job title h3
  const jobTitle = document.createElement("h3");
  jobTitle.textContent = "Job Title: " + item.job_title;

  // Create the category span
  const category = document.createElement("span");
  category.className = "category";
  category.textContent = "Category: " + item.category;

  // Append job title and category to work header
  workHeader.appendChild(jobTitle);
  workHeader.appendChild(category);

  // Create the work body div
  const workBody = document.createElement("div");
  workBody.className = "work-body";

  // Create the description paragraph
  const description = document.createElement("p");
  description.className = "description";
  description.textContent = item.description;

  // Create the work details div
  const workDetails = document.createElement("div");
  workDetails.className = "work-details";

  // Create the location detail
  const locationDetail = document.createElement("div");
  locationDetail.className = "detail";
  locationDetail.innerHTML =
    '<i class="fas fa-map-marker-alt"></i> Location: ' + item.location;

  // Create the payment detail
  const paymentDetail = document.createElement("div");
  paymentDetail.className = "detail";
  paymentDetail.innerHTML =
    '<i class="fas fa-dollar-sign"></i> Payment: ' + item.payment;

  // Create the deadline detail
  const deadlineDetail = document.createElement("div");
  deadlineDetail.className = "detail";
  deadlineDetail.innerHTML =
    '<i class="fas fa-clock"></i> Deadline: ' + item.deadline;

  // Append details to work details div
  workDetails.appendChild(locationDetail);
  workDetails.appendChild(paymentDetail);
  workDetails.appendChild(deadlineDetail);

  // Append description and work details to work body
  workBody.appendChild(description);
  workBody.appendChild(workDetails);

  // Create the work footer div
  const workFooter = document.createElement("div");
  workFooter.className = "work-footer";

  // Create the giver info div
  const giverInfo = document.createElement("div");
  giverInfo.className = "giver-info";

  // Create the giver details p
  const giverDetails = document.createElement("p");
  giverDetails.className = "giver-details";
  giverDetails.innerHTML =
    "Posted by: " +
    item.posted_by +
    '<br>Rating: <span class="rating">' +
    item.rating +
    ' <i class="fas fa-star"></i></span>';

  // Append giver details to giver info
  giverInfo.appendChild(giverDetails);

  // Create the apply button
  const applyButton = document.createElement("button");
  applyButton.className = "btn-apply";
  applyButton.textContent = "Apply Now";
  applyButton.addEventListener("click", () => {
    displayPaymentPage();
  });

  // Append giver info and apply button to work footer
  workFooter.appendChild(giverInfo);
  workFooter.appendChild(applyButton);

  // Append work header, body, and footer to work card content
  workCardContent.appendChild(workHeader);
  workCardContent.appendChild(workBody);
  workCardContent.appendChild(workFooter);

  // Append work image and card content to work card
  // Append image to work image div
  workCard.appendChild(workImage);
  workCard.appendChild(workCardContent);

  // Append work card to container
  container.appendChild(workCard);
}

//generating work cards
function createWorksCards() {
  container.innerHTML = "";

  const response = async () => {
    const url = "http://localhost:3000/works-data";
    const method = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(url, method)
      .then((res) => res.json())
      .then((data) => {
        for (let worker of data) {
          createWorkCard(worker);
        }
      });
  };
  response();
}

function searchBarInputFunc() {
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  const searchBarInput = document.getElementById("searchBarInput");
  const value = searchBarInput.value;
  const response = async () => {
    const url = `http://localhost:3000/workers-data/${value}`;
    const method = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(url, method)
      .then((res) => res.json())
      .then((data) => {
        const container = document.getElementById("cardContainer");
        container.innerHTML = "";
        data = data.flat();
        // const entries = Object.entries(data);

        // // Shuffle the array using a shuffling algorithm, like the Fisher-Yates shuffle.
        // const shuffledEntries = entries.sort(() => Math.random() - 0.5);

        // // Convert the shuffled array back into an object.
        // const shuffledObj = Object.fromEntries(shuffledEntries);

        // console.log(shuffledObj); // { c: 3, a: 1, b: 2 }

        for (let work of data) {
          if (Object.keys(work).length == 11) {
            createWorkerCard(work);
          } else {
            createWorkCard(work);
          }
        }
      });
  };
  response();
}

const searchBarEle = document.getElementById("searchBarInput");

searchBarEle.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBarInputFunc();
  }
});

createWorksCards();
