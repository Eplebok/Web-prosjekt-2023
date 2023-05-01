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

   
      if(tool) {
        const toolElement = document.createElement('div');
        toolElement.classList.add('tool-card');
        toolElement.innerHTML = `
          <h2><a href="/spesificTool.html?toolName=${tool.name}" id="tool-card-h2">${tool.name}</a></h2>
          <button class="delete-tool-button" data-tool-id="${tool.id}">Delete item</button>
          <p id="tool-card-quantity">quantity: ${tool.quantity}</p>
          <p id="tool-card-electric">${tool.electric}</p>
          <p> Tool is: ${tool.functional} </p>
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
