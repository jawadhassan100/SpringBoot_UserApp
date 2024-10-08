const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userList = document.getElementById('userList');

// Fetch and display users
async function fetchUsers() {
    const response = await fetch('http://localhost:8080/api/users');
    const users = await response.json();
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `${user.name} (${user.email}) 
                        <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                        <button onclick="deleteUser(${user.id})">Delete</button>`;
        userList.appendChild(li);
    });
}

// Create or update user
userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const userId = userIdInput.value;
    const user = {
        name: nameInput.value,
        email: emailInput.value
    };

    const method = userId ? 'PUT' : 'POST';
    const url = userId ? `http://localhost:8080/api/users${userId}` : 'http://localhost:8080/api/users';

    await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    userIdInput.value = '';
    nameInput.value = '';
    emailInput.value = '';
    fetchUsers();
});

// Edit user
function editUser(id, name, email) {
    userIdInput.value = id;
    nameInput.value = name;
    emailInput.value = email;
}

// Delete user
async function deleteUser(id) {
    await fetch(`http://localhost:8080/api/users${id}`, {
        method: 'DELETE',
    });
    fetchUsers();
}

// Initial fetch
fetchUsers();
