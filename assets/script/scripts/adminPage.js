window.addEventListener('load', async () => {
  try {
    const response = await fetch('http://localhost:3200/all', {
      method: "GET"
    });
    const allUsers = await response.json();
    const tbody = document.querySelector("#admin-user-list");
    allUsers.forEach(user => {
      const tr = document.createElement('tr');
      const emailTd = document.createElement('td');
      emailTd.textContent = user.email;
      const roleTd = document.createElement('td');
      roleTd.textContent = user.role;
      const makerTd = document.createElement('td');
      const makerButton = document.createElement("button");
      makerButton.innerHTML = "Make this user a maker"
      makerButton.addEventListener('click', async() => {
        try {
          const updateUser = await fetch(`http://localhost:3200/all/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'maker' })
          });
          const updatedUser = await updateUser.json();
          roleTd.textContent = updatedUser.role;
        } catch (error) {
          console.log(error.message);
        }
      });
      makerTd.append(makerButton);
      const adminTd = document.createElement('td');
      const adminButton = document.createElement("button");
      adminButton.innerHTML = 'Make this user an admin';
      adminButton.addEventListener('click', async () => {
        try {
          const updateUser = await fetch(`http://localhost:3200/all/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'admin' })
          });
          const updatedUser = await updateUser.json();
          roleTd.textContent = updatedUser.role;
        } catch (error) {
          console.log(error.message);
        }
      });
      adminTd.append(adminButton);
      const deleteTd = document.createElement('td');
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = 'Delete account';
      deleteButton.addEventListener('click', async () => {
        try {
          const response = await fetch(`http://localhost:3200/delete/${user._id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            tr.remove();
          } else {
            throw new Error('Failed to delete user');
          }
        } catch (error) {
          console.log(error.message);
        }
      });
      
      deleteTd.append(deleteButton);
      tr.append(emailTd, roleTd, makerTd, adminTd, deleteTd);
      tbody.append(tr);
    });
  } catch (error) {
    console.log(error.message);
  }
});
