// Retrieve the tool name from the URL

const toolName = window.location.search.split('=')[1];
//window.location.href = "specificTool.html";

// Fetch the product information from the server
console.log(toolName);


fetch(`http://localhost:3200/tools/electric/${toolName}`)
  .then(response => response.json())
  .then(tool => {
    //window.location.href = `/spesificTool.html?name=${tool.name}&description=${tool.description}&power=${tool.power}`;
    // Update the HTML elements on the page with the product information
    document.getElementById('tool-name').innerText = tool.name;
    document.getElementById('tool-description').innerText = tool.description;
    //document.getElementById('tool-image').innerText = 
    //document.getElementById('tool-image').src = tool.image;

   
  })
  .catch(error => console.error(error));