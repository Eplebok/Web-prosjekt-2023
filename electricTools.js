//const electricToolsContainer = document.getElementById('electric-tools-container');

fetch('http://localhost:3500/tools/electric')
  .then(response => response.json())
  .then(data => {
    // Modify the data as needed
    const modifiedData = data.map(tool => {
      return {
        id: tool._id,
        name: tool.name,
        description: tool.description,
        power: tool.power
      };
    });
    
    // Display the modified data on the webpage
    const container = document.getElementById('product-card-container');
    
    modifiedData.forEach(tool => {
      const toolElement = document.createElement('div');
      toolElement.classList.add('product-card');
      const imageUrl = `/assets/images/${tool.name}.jpg`;
      toolElement.innerHTML = `
        <h2><a href="/spesificTool.html?toolName=${tool.name}">${tool.name}</a></h2>
        <img src="${imageUrl}">
        
        
      `;
      container.appendChild(toolElement);
    });
  })
  .catch(error => console.error(error));
 

