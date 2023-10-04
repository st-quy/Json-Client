let tbody = document.getElementById("tbody");

fetch("https://tour-booking.glitch.me/user")
  .then((res) => res.json())
  .then((json) => {
    json.map((data) => {
      tbody.append(td_fun(data));
    });
  });

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var modal = document.getElementById("id01");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function td_fun({ id, profile, name, email, status, role }) {
  let td = document.createElement("tr");
  td.setAttribute("id", `child-${id}`);
  td.innerHTML = `
    <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <img src="${profile}" class="h-10 w-10 rounded-full" alt="">
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                        ${name}
                    </div>
                    <div class="text-sm text-gray-500">
                        ${email}
                    </div>
                </div>
            </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
           ${status}
        </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
        <span class="text-sm text-gray-500">${role}</span>
    </td>
 <td class="px-6 py-4 whitespace-nowrap">
<button class="text-sm text-gray-500" id="deleteBtn" onclick="handleDelete(${id})">Delete</button>
    </td>
    `;
  return td;
}

async function handleDelete(id) {
  event.preventDefault();

  await axios
    .delete(`https://tour-booking.glitch.me/user/${id}`)
    .then((response) => {
      document.getElementById(`child-${id}`).remove();
    });
}

async function handleSubmit(event) {
  event.preventDefault();

  var name = document.querySelector('input[name="name"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var profile = document.querySelector('input[name="profile"]').value;
  var status = document.querySelector('input[name="status"]').value;
  var role = document.querySelector('input[name="role"]').value;
  await axios
    .post("https://tour-booking.glitch.me/user", {
      name: name,
      email: email,
      profile: profile,
      status: status,
      role: role,
    })
    .then((response) => {
      var modal = document.getElementById("id01");
      modal.style.display = "none";
      tbody.append(td_fun(response.data));
    });
  event.target.reset();
}
