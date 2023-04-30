fetch('http://localhost:3200/tools/electric')
  .then(response => response.json())
  .then(data => {
    // Modify the data as needed
    const modifiedData = data.map(tool => {
      return {
        id: tool._id,
        name: tool.name,
        quantity: tool.quantity,
        electric: tool.electric,
        image: tool.image,
        functional: tool.functional
      };
    });
    
    // Display the modified data on the webpage
    const container = document.getElementById('tool-card-container');
    
    modifiedData.forEach(tool => {
      
      if(tool.electric === false){
      const toolElement = document.createElement('div');
      toolElement.classList.add('tool-card');
      const imageUrl = tool.image;
      toolElement.innerHTML = `
        <button class="broken-tool-button">Broken?</button>  
        <h2><a href="/spesificTool.html?toolName=${tool.name}" id="tool-card-h2">${tool.name}</a></h2>
        <button class="delete-tool-button" data-tool-id="${tool.id}">X</button>
        <img src="${tool.image}" id="tool-card-image">
        <p id="tool-card-quantity">quantity: ${tool.quantity}</p>
        <p id="tool-card-electric">${tool.electric}</p>
        <p> Tool is: ${tool.functional} </p>
      `;
      container.appendChild(toolElement);
      console.log(tool.electric);

        // add event listener to delete button
        const deleteButton = toolElement.querySelector('.delete-tool-button');
        deleteButton.addEventListener('click', async () => {
          toolElement.remove(); // remove the tool from webpage
          const toolId = deleteButton.dataset.toolId;
          const deleted = await deleteTool(toolId); // delete the tool from database
          if (!deleted) {
            console.log('Failed to delete tool');
          }
        });

      // add event listener to broken button
      // add event listener to broken button
      const brokenButton = toolElement.querySelector('.broken-tool-button');
      brokenButton.addEventListener('click', async () => {
        tool.functional = 'broken'; // update tool's state
        const response = await fetch(`http://localhost:3200/tools/electric/${tool.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ functional: 'broken' })
        });
        if (response.ok) {
          console.log('Tool state updated to broken');
          tool.functional = 'broken'; // update tool object to reflect the change
        } else {
          console.log('Failed to update tool state');
        }
      });
       




    }
    });
  })
  .catch(error => console.error(error));