function getDetails() {
  fetch("http://localhost:3000/register")
    .then((res) => res.json())
    .then((data) => {
      console.log("hello");
      const details = document.getElementById("details");
      details.innerHTML = "";
      data.forEach((user) => {
        const div = document.createElement("div");
        div.innerHTML = user.username;
        details.appendChild(div);
      });
    });
}

function register() {
  const username = document.getElementById("username").value;
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const gender = document.getElementById("gender").value;
  const location = document.querySelector("location");
  const status = document.getElementById("status");
  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      name,
      password,
      gender,
      location,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      status.innerHTML = "User registered successfully";
    })
    .catch((error) => {
      console.log(error);
      status.innerHTML = error.message;
      alert(error.message);
    });
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const loginStatus = document.getElementById("loginStatus");
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(
        JSON.stringify({
          username,
          password,
        })
      );
      console.log(data);
      loginStatus.innerHTML = "User logged in successfully";
    })
    .catch((error) => {
      loginStatus.innerHTML = error.message;
      alert(error.message);
    });
}

function updatePassword() {
  const username = document.getElementById("updateUsername").value;
  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const updateStatus = document.getElementById("updateStatus");
  fetch("http://localhost:3000/change-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      oldPassword,
      newPassword,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateStatus.innerHTML = "Password updated successfully";
    })
    .catch((error) => {
      console.log(error);
      updateStatus.innerHTML = error.message;
      alert(error.message);
    });
}

function getDataWithJwt() {
  const url = "http://localhost:3000/register";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNVUllBIiwiaWF0IjoxNzE4NDc1MDIwfQ.lWZbtkLw99d4vcMTlSSt9OrMeXDqyKaAl-ucrp7lqIM"; // Replace with your actual token
  const encodedToken = encodeURIComponent(token);
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + encodedToken,
    },
  };
  fetch(url, option)
    .then((res) => res.json())
    .then((data) => {
      console.log("hello");
      const details = document.getElementById("dataWithJwtToken");
      details.innerHTML = "";
      data.forEach((user) => {
        const div = document.createElement("div");
        div.innerHTML =
          user.username +
          " | " +
          user.name +
          " | " +
          user.password +
          " | " +
          user.gender +
          " | " +
          user.location;
        details.appendChild(div);
      });
    });
}
