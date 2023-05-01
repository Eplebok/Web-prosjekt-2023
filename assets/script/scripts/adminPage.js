 // for admin page  
 // admin can change the role from maker to admin and vice versa
 window.addEventListener('load', async () => {
    try {
      const response = await fetch('http://localhost:3200/all', {
        method: "GET"
      });
      const allUsers = await response.json();
      const ul = document.querySelector(".admin-all-user-list");
      allUsers.forEach(user => {
        const li = document.createElement('li');
        const button = document.createElement("button");
        button.innerHTML = 'Make this user admin';
        li.innerHTML = `Email: ${user.email}. Role: ${user.role}`;
        button.addEventListener('click', async () => {
          try {
            const updateUser = await fetch(`http://localhost:3200/all/${user._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ role: 'admin' })
            });
            const updatedUser = await updateUser.json();
            li.innerHTML = `Email: ${updatedUser.email}. Role: ${updatedUser.role}`;
          } catch (error) {
            console.log(error.message);
          }
        });
        const makerButton = document.createElement("button")
        makerButton.innerHTML = "Make this user an maker"
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
            li.innerHTML = `Email: ${updatedUser.email}. Role: ${updatedUser.role}`;
          } catch (error) {
            console.log(error.message);
          }
        })
        const div = document.createElement("div")
        div.append(button, makerButton)
        li.append(div)
        ul.append(li);
      });
    } catch (error) {
      console.log(error.message);
    }
  });