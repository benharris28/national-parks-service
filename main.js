'use strict';

//$(".state").chosen({
 // no_results_text: "Oops, nothing found!"
//})



const apiKey = 'VNB7wgMgbqeHd90hZG2TabO7knvZ69doJG1AXmqr';
const url = 'https://developer.nps.gov/api/v1/parks?'
const limit = $('#js-max-results').val();

// we are lookig for 
function displayResults(responseJson) {
  console.log('results displayed');
  $('#results-list').empty();
  for (i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
    `<li>
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
      </li>`);
  }

}

// function to format states into stateCode parameter
// must be a comma delimited list of 2 letter codes to insert into // url
function formatStates(states) {
  console.log('formatStates ran');
  const lastIndex = states.length - 1;
  let stateCode;
  let stateString ='';
  
  if (states.length > 1) {
    stateCode = states[0] + ",";
  
      for (i = 1; i < states.length -1; i++) {
      stateCode += states[i] + ",";
  
  }
   stateString = stateCode + states[lastIndex];
  }
  else {
    stateString = states[0];
  }
  let stateParam = `stateCode=${stateString}`;
  console.log(stateString);
  console.log(stateParam);
  getStates(stateParam,limit);
}

// fetch function to return states based on inputs
// format url

function getStates(stateParam, limit) {
console.log('getStates ran');

const urlCompiled = `https://developer.nps.gov/api/v1/parks?${stateParam}&limit=${limit}&api_key=${apiKey}`;

fetch(urlCompiled)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const states = $('select[name = "state"]').val();
    
    console.log(states);
    console.log(limit);
    formatStates(states);
  });
}

$(watchForm);