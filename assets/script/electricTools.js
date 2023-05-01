//const electricToolsContainer = document.getElementById('electric-tools-container');

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

   
      if(tool.electric === true) {
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

        // search bar

        const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('input', () => {
         const searchText = searchBar.value.toLowerCase();
          filterTools(searchText);
        });
  
          function filterTools(searchText) {
            const toolCards = document.querySelectorAll('.tool-card');
            toolCards.forEach(toolCard => {
              const toolName = toolCard.querySelector('h2').textContent.toLowerCase();
              if (toolName.includes(searchText)) {
                toolCard.style.display = 'block';
              } else {
                toolCard.style.display = 'none';
              }
            });
          }
    
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
 

