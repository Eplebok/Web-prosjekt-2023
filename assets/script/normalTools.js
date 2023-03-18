fetch('http://localhost:3200/tools/normal')
  .then(response => response.json())
  .then(data => {
    // Modify the data as needed
    const modifiedData = data.map(tool => {
      return {
        name: tool.name,
        description: tool.description,// increase price by 10%;
        power: tool.power
      };
    });
    
    // Display the modified data on the webpage
    const container = document.getElementById('normal-tools-container');
    
    modifiedData.forEach(tool => {
      const toolElement = document.createElement('div');
      toolElement.classList.add('product-card');
      toolElement.innerHTML = `
        <h2>${tool.name}</h2>
        <p>description: ${tool.description}</p>
        
      `;
      //<p>power: ${tool.power}</p>
      container.appendChild(toolElement);
    });
  })
  .catch(error => console.error(error));