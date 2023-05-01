fetch('http://localhost:3200/tools/tools')
  .then(response => response.json())
  .then(data => {
    // Modify the data as needed
    const modifiedData = data.map(tool => {
      return {
        id: tool._id,
        name: tool.name,
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
            <td>${tool.quantity}</td>
            <td>${tool.electric}</td>
            <td>${tool.functional}</td>
            <td><button class="delete-tool-button" data-tool-id="${tool.id}">Delete</button></td>
        `;
        container.appendChild(toolElement);
        console.log(tool.electric);

    
        // Add click event listener to delete button
        const deleteButton = toolElement.querySelector('.delete-tool-button');
        deleteButton.addEventListener('click', async () => {
          toolElement.remove(); // Remove tool from webpage
          const toolId = deleteButton.dataset.toolId;
          const deleted = await deleteTool(toolId); // Delete tool from database
          if (!deleted) {
            console.log('Failed to delete tool');
          }
        });
      }
    });
    
    
  
  })
  .catch(error => console.error(error));
