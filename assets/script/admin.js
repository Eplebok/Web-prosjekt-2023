fetch('http://localhost:3200/tools/tools')
  .then(response => response.json())
  .then(data => {
    // Modify the data as needed
    const modifiedData = data.map(tool => {
      return {
        id: tool._id,
        name: tool.name,
        description: tool.description, 
        quantity: tool.quantity,
        electric: tool.electric,
        functional: tool.functional
      };
    });
  
    
    // Display the modified data on the webpage
    const container = document.getElementById('tool-list');
   
    
    modifiedData.forEach(tool => {

        const tName = tool.name; 
      if(tool) {
        const toolElement = document.createElement('tr');
        toolElement.innerHTML = `
            <td><a href="/spesificTool.html?toolName=${tName}" id="tool-card-h2">${tName}</a></td>
            <td class="table-td">${tool.description}</td>
            <td class="table-td">${tool.quantity}</td>
            <td class="table-td">${tool.electric}</td>
            <td class="table-td">${tool.functional}</td>
            <td class="table-td">
                <button class="delete-tool-button" data-tool-id="${tool.id}">Delete</button>
                <button class="edit-tool-button" data-tool-id="${tool.id}">Edit</button>
                <button class="admin-markTool-button" data-tool-id="${tool.id}">Mark as Working</button>
            </td>
        `;
        container.appendChild(toolElement);
        console.log(tool.electric);

    
        // add click event listener to delete button
        const deleteButton = toolElement.querySelector('.delete-tool-button');
        deleteButton.addEventListener('click', async () => {
          toolElement.remove(); // remove tool from webpage
          const toolId = deleteButton.dataset.toolId;
          const deleted = await deleteTool(toolId); // delete tool from database
          if (!deleted) {
            console.log('Failed to delete tool');
          }
        });

        // add event listener to the "mark tool as working" button
        const markButton = toolElement.querySelector('.admin-markTool-button');
        markButton.addEventListener('click', async () => {
          tool.functional = 'working'; // change the content from "broken" to "working"
          const response = await fetch(`http://localhost:3200/tools/working/${tool.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ functional: 'working' })
          });
          console.log('response:', response);
          if (response.ok) {
            console.log('Tool state updated to working');
            console.log('tool.functional:', tool.functional);
            tool.functional = 'working'; // updates the tool from "broken" to "working"
          } else {
            console.log('Failed to update tool state');
          }
        });
      }
    });
  })
  .catch(error => console.error(error));


  const editButtons = document.querySelectorAll('.edit-tool-button');
editButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.parentElement.parentElement;
    const cells = row.children;

    // Replace cell contents with input fields
    for (let i = 0; i < cells.length - 1; i++) {
      const cell = cells[i];
      const content = cell.textContent.trim();
      cell.innerHTML = `<input type="text" value="${content}">`;
    }

    // Change the edit button to a save button
    button.innerText = 'Save';
    button.classList.add('save-tool-button');
    button.classList.remove('edit-tool-button');
  });
});

const saveButtons = document.querySelectorAll('.save-tool-button');
saveButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.parentElement.parentElement;
    const cells = row.children;

    // Update the data
    const tName = cells[0].querySelector('input').value;
    const quantity = cells[1].querySelector('input').value;
    const electric = cells[2].querySelector('input').value;
    const functional = cells[3].querySelector('input').value;

    // Replace input fields with cell contents
    cells[0].innerHTML = `<a href="/spesificTool.html?toolName=${tName}" id="tool-card-h2">${tName}</a>`;
    cells[1].innerHTML = quantity;
    cells[2].innerHTML = electric;
    cells[3].innerHTML = functional;

    // Change the save button back to an edit button
    button.innerText = 'Edit';
    button.classList.add('edit-tool-button');
    button.classList.remove('save-tool-button');
  });
});