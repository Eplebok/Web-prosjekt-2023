//const electricToolsContainer = document.getElementById('electric-tools-container');

fetch('http://localhost:3500/tools/electric')
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
    const container = document.getElementById('product-card-container');
    
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
  /*.then(data => {
    console.log(data); // or display the data on the webpage
  })*/
  //.catch(error => console.error(error));
  /* .then(response => response.json())
  .then(data => {
    // create a new HTML element for each electric tool and append it to the electricToolsContainer
    data.electricTools.forEach(tool => {
      const toolElement = document.createElement('div');
      toolElement.textContent = `${tool.name}: ${tool.description}: ${tool.power}`;
      electricToolsContainer.appendChild(toolElement);
    });
  })
  .catch(error => {
    console.error(error);
    electricToolsContainer.textContent = 'Error retrieving electric tools';
  });*/

