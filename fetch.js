// api url
const api_url =
    "http://localhost:1304/question/1";

// Defining async function
async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    // console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
    let tab =
        `<h1>Question</h1>
        <h3>${data.data.question.description}</h3>`;


    for (let r of data.data.answer) {
        tab += `<tr> 
                <td>${r.description} </td>     
            </tr>`;
    }
    document.getElementById("employees").innerHTML = tab;
}