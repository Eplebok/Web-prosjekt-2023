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
        image: tool.image
      };
    });
    
    // Display the modified data on the webpage
    const container = document.getElementById('normal-tools-container');
    
    modifiedData.forEach(tool => {
      
      if(tool.electric === false){
      const toolElement = document.createElement('div');
      toolElement.classList.add('product-card');
      const imageUrl = tool.image;
      toolElement.innerHTML = `
        <h2><a href="/spesificTool.html?toolName=${tool.name}">${tool.name}</a></h2>
        <img src="${tool.image}">
        <p>quantity: ${tool.quantity}</p>
        <p>${tool.electric}</p>
      `;
      container.appendChild(toolElement);
      console.log(tool.electric);
    }
    });
  })
  .catch(error => console.error(error));