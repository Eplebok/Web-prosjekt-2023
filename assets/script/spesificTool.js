// Retrieve the tool name from the URL

//window.location.href = "specificTool.html";

// Fetch the product information from the server
const toolName = window.location.search.split('=')[1];

function fetchToolData(toolType, toolName) {
fetch(`http://localhost:3200/tools/${toolType}/${toolName}`)
  .then(response => response.json())
  .then(tool => {
    if (tool) {//window.location.href = `/spesificTool.html?name=${tool.name}&description=${tool.description}&power=${tool.power}`;
    // Update the HTML elements on the page with the product information
    document.getElementById('tool-name').innerText = tool.name;
    document.getElementById('tool-description').innerText = tool.description;
  } else {
    console.log(`No ${toolType} tool found with name ${toolName}`);
  }
    //document.getElementById('tool-image').innerText = 
    //document.getElementById('tool-image').src = tool.image;

   
  })
  .catch(error => console.error(error));
}

//const toolName = window.location.search.split('=')[1];
console.log(toolName);

fetchToolData('electric', toolName);

fetchToolData('normal', toolName);



 /* fetch(`http://localhost:3200/tools/normal/${toolName}`)
  .then(response => response.json())
  .then(ntool => {
    //window.location.href = `/spesificTool.html?name=${tool.name}&description=${tool.description}&power=${tool.power}`;
    // Update the HTML elements on the page with the product information
    document.getElementById('tool-name').innerText = ntool.name;
    document.getElementById('tool-description').innerText = ntool.description;
    //document.getElementById('tool-image').innerText = 
    //document.getElementById('tool-image').src = tool.image;

   
  })
  .catch(error => console.error(error));*/