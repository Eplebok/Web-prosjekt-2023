// electricTools.js
const electricToolsContainer = document.querySelector('#electric-tools-container');

fetch('/electricTools.html')
  .then(response => response.json())
  .then(data => {
    // create a new HTML element for each electric tool and append it to the electricToolsContainer
    data.electricTools.forEach(tool => {
      const toolElement = document.createElement('div');
      toolElement.textContent = `${tool.name}: ${tool.description}`;
      electricToolsContainer.appendChild(toolElement);
    });
  })
  .catch(error => {
    console.error(error);
    electricToolsContainer.textContent = 'Error retrieving electric tools';
  });
