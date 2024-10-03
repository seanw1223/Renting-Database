document.addEventListener('DOMContentLoaded', function () {
    const landlordAPI = 'http://localhost:3000/api/landlords';
    const tenantAPI = 'http://localhost:3000/api/tenants';
    const contractAPI = 'http://localhost:3000/api/contracts';

     // Landlord Section
     const landlordForm = document.getElementById('landlordForm');
     landlordForm.onsubmit = async function (e) {
         e.preventDefault();
         const body = {
              // Extracting landlord information from form fields
             first_name: document.getElementById('landlordFirstName').value,
             last_name: document.getElementById('landlordLastName').value,
             email: document.getElementById('landlordEmail').value,
             phone_number: document.getElementById('landlordPhoneNumber').value,
             address_line1: document.getElementById('landlordAddressLine1').value,
             address_line2: document.getElementById('landlordAddressLine2').value,
             city: document.getElementById('landlordCity').value,
             state: document.getElementById('landlordState').value,
             zip: document.getElementById('landlordZip').value
         };
         const id = document.getElementById('landlordId').value;
         const method = id ? 'PUT' : 'POST';
         const endpoint = id ? `${landlordAPI}/${id}` : landlordAPI;
 
         try {
             // Send request to server
             const response = await fetch(endpoint, {
                 method: method,
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(body)
             });
             if (response.ok) {
                 console.log('Landlord saved successfully');
                 document.getElementById('landlordForm').reset();
                 document.getElementById('landlordId').value = '';
                 fetchLandlords();
             } else {
                 throw new Error('Failed to save landlord');
             }
         } catch (error) {
             console.error('Error saving landlord:', error);
         }
     };
 
     window.fetchLandlords = async function () {  // Function to fetch landlords from the server
         try {
             const response = await fetch(landlordAPI);
             if (response.ok) {
                 const data = await response.json();
                 updateTable('landlordTable', data, 'landlord');
                 document.getElementById('landlordTable').style.display = 'table';
             } else {
                 throw new Error('Failed to retrieve landlords');
             }
         } catch (error) {
             console.error('Error retrieving landlords:', error);
         }
     };
 
     window.editLandlord = function (id) {  // Function to edit landlords 
         fetch(`${landlordAPI}/${id}`)
             .then(response => response.json())
             .then(data => {
                 document.getElementById('landlordId').value = data.id;
                 document.getElementById('landlordFirstName').value = data.first_name;
                 document.getElementById('landlordLastName').value = data.last_name;
                 document.getElementById('landlordEmail').value = data.email;
                 document.getElementById('landlordPhoneNumber').value = data.phone_number;
                 document.getElementById('landlordAddressLine1').value = data.address_line1;
                 document.getElementById('landlordAddressLine2').value = data.address_line2;
                 document.getElementById('landlordCity').value = data.city;
                 document.getElementById('landlordState').value = data.state;
                 document.getElementById('landlordZip').value = data.zip;
             })
             .catch(error => console.error('Error loading landlord data:', error));
     };
 
     window.deleteLandlord = async function (id) { // Function to delete landlords 
         try {
             const response = await fetch(`${landlordAPI}/${id}`, { method: 'DELETE' });
             if (response.ok) {
                 fetchLandlords();
                 console.log('Landlord deleted successfully');
             } else {
                 throw new Error('Failed to delete landlord');
             }
         } catch (error) {
             console.error('Error deleting landlord:', error);
         }
     };
 
     // Tenant Section
     const tenantForm = document.getElementById('tenantForm');
     tenantForm.onsubmit = async function (e) {
         e.preventDefault();
         const body = {
             first_name: document.getElementById('tenantFirstName').value,
             last_name: document.getElementById('tenantLastName').value,
             email: document.getElementById('tenantEmail').value,
             phone_number: document.getElementById('tenantPhoneNumber').value,
             address_line1: document.getElementById('tenantAddressLine1').value,
             address_line2: document.getElementById('tenantAddressLine2').value,
             city: document.getElementById('tenantCity').value,
             state: document.getElementById('tenantState').value,
             zip: document.getElementById('tenantZip').value
         };
         const id = document.getElementById('tenantId').value;
         const method = id ? 'PUT' : 'POST';
         const endpoint = id ? `${tenantAPI}/${id}` : tenantAPI;
 
         try {
             const response = await fetch(endpoint, {
                 method: method,
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(body)
             });
             if (response.ok) {
                 console.log('Tenant saved successfully');
                 document.getElementById('tenantForm').reset();
                 document.getElementById('tenantId').value = '';
                 fetchTenants();
             } else {
                 throw new Error('Failed to save tenant');
             }
         } catch (error) {
             console.error('Error saving tenant:', error);
         }
     };
 
     window.fetchTenants = async function () { // similar functions to landlords.
         try {
             const response = await fetch(tenantAPI);
             if (response.ok) {
                 const data = await response.json();
                 updateTable('tenantTable', data, 'tenant');
                 document.getElementById('tenantTable').style.display = 'table';
             } else {
                 throw new Error('Failed to retrieve tenants');
             }
         } catch (error) {
             console.error('Error retrieving tenants:', error);
         }
     };
 
     window.editTenant = function (id) {
         fetch(`${tenantAPI}/${id}`)
             .then(response => response.json())
             .then(data => {
                 document.getElementById('tenantId').value = data.id;
                 document.getElementById('tenantFirstName').value = data.first_name;
                 document.getElementById('tenantLastName').value = data.last_name;
                 document.getElementById('tenantEmail').value = data.email;
                 document.getElementById('tenantPhoneNumber').value = data.phone_number;
                 document.getElementById('tenantAddressLine1').value = data.address_line1;
                 document.getElementById('tenantAddressLine2').value = data.address_line2;
                 document.getElementById('tenantCity').value = data.city;
                 document.getElementById('tenantState').value = data.state;
                 document.getElementById('tenantZip').value = data.zip;
             })
             .catch(error => console.error('Error loading tenant data:', error));
     };
 
     window.deleteTenant = async function (id) {
         try {
             const response = await fetch(`${tenantAPI}/${id}`, { method: 'DELETE' });
             if (response.ok) {
                 fetchTenants();
                 console.log('Tenant deleted successfully');
             } else {
                 throw new Error('Failed to delete tenant');
             }
         } catch (error) {
             console.error('Error deleting tenant:', error);
         }
     };
 
     // Contracts Section
     const contractForm = document.getElementById('contractForm');
     contractForm.onsubmit = async function (e) {
         e.preventDefault();
         const body = {
             contract_date: document.getElementById('contractDate').value,
             property_address: document.getElementById('contractAddress').value,
             monthly_fee: document.getElementById('contractFee').value,
             property_type: document.getElementById('contractType').value,
             landlord: document.getElementById('contractLandlord').value,
             tenant: document.getElementById('contractTenant').value
         };
         const id = document.getElementById('contractId').value;
         const method = id ? 'PUT' : 'POST';
         const endpoint = id ? `${contractAPI}/${id}` : contractAPI;
 
         try {
             const response = await fetch(endpoint, {
                 method: method,
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(body)
             });
             if (response.ok) {
                 console.log('Contract saved successfully');
                 document.getElementById('contractForm').reset();
                 document.getElementById('contractId').value = '';
                 fetchContracts();
             } else {
                 throw new Error('Failed to save contract');
             }
         } catch (error) {
             console.error('Error saving contract:', error);
         }
     };
 
     window.fetchContracts = async function () {
         try {
             const response = await fetch(contractAPI);
             if (response.ok) {
                 const data = await response.json();
                 updateTable('contractTable', data, 'contract');
                 document.getElementById('contractTable').style.display = 'table';
             } else {
                 throw new Error('Failed to retrieve contracts');
             }
         } catch (error) {
             console.error('Error retrieving contracts:', error);
         }
     };
 
     window.editContract = function (id) { // more similar functions
         fetch(`${contractAPI}/${id}`)
             .then(response => response.json())
             .then(data => {
                 document.getElementById('contractId').value = data.id;
                 document.getElementById('contractDate').value = data.contract_date;
                 document.getElementById('contractAddress').value = data.property_address;
                 document.getElementById('contractFee').value = data.monthly_fee;
                 document.getElementById('contractType').value = data.property_type;
                 document.getElementById('contractLandlord').value = data.landlord;
                 document.getElementById('contractTenant').value = data.tenant;
             })
             .catch(error => console.error('Error loading contract data:', error));
     };
 
     window.deleteContract = async function (id) {
         try {
             const response = await fetch(`${contractAPI}/${id}`, { method: 'DELETE' });
             if (response.ok) {
                 fetchContracts();
                 console.log('Contract deleted successfully');
             } else {
                 throw new Error('Failed to delete contract');
             }
         } catch (error) {
             console.error('Error deleting contract:', error);
         }
     };
 
     function updateTable(tableId, data, type) {
         const tbody = document.getElementById(tableId).querySelector('tbody');
         tbody.innerHTML = '';
         data.forEach(item => {
             const tr = document.createElement('tr');
             for (const key in item) {
                 const td = document.createElement('td');
                 td.textContent = item[key];
                 tr.appendChild(td);
             }
             const actionTd = document.createElement('td');
             actionTd.innerHTML = `
                 <button onclick="edit${capitalize(type)}(${item.id})">Edit</button>
                 <button onclick="delete${capitalize(type)}(${item.id})">Delete</button>`;
             tr.appendChild(actionTd);
             tbody.appendChild(tr);
         });
     }
 
     // Capitalization
     function capitalize(string) {
         return string.charAt(0).toUpperCase() + string.slice(1);
     }
 });



/// GET route to retrieve landlords data
// GET http://localhost:3000/api/landlords
// Example response:
/*
[
  {
    "id": 1,
    "first_name": "Rick",
    "last_name": "Grimes",
    "email": "Rick.grimes@grimsy.com",
    "phone_number": "123-456-7890",
    "address_line1": "123 Walker street",
    "address_line2": null,
    "city": "Atlanta",
    "state": "Georgia",
    "zip": "ATL 4575"
  },
  {
    "id": 2,
    "first_name": "Anthony",
    "last_name": "Soprano",
    "email": "tony.soprano@gmail.com",
    "phone_number": "666-666-4656",
    "address_line1": "123 Mob St",
    "address_line2": null,
    "city": "New Jersey",
    "state": "USA",
    "zip": "t66 55h7"
  },
  {
    "id": 3,
    "first_name": "Negan",
    "last_name": "Smith",
    "email": "negan.smith@gmail.com",
    "phone_number": "666-643-4465",
    "address_line1": "12 dead St",
    "address_line2": null,
    "city": "Virginia",
    "state": "USA",
    "zip": "V56 65hs7"
  }
]
*/

// POST route to create a new landlord
// POST http://localhost:3000/api/landlords
// Example request body:
/*
{
  "first_name": "Eddard",
  "last_name": "Stark",
  "email": "ned.stark@winterfell.com",
  "phone_number": "555-444-3333",
  "address_line1": "Winterfell Castle",
  "address_line2": null,
  "city": "Winterfell",
  "state": "The North",
  "zip": "WF1 1AA"
}
*/


/* This exam was a lot harder than any assignment I have done so far with so many different aspects to complete.
I started with creating the database which was not too difficult until I needed to make the connection after starting the contract class
Most of this information I had from previous assignments in particular assignment 4 which was very useful considering i used sql rather than mongoDb
Once the database was created I organised my backend into easily accessible folders as to not to overwhelm myself with so many js files
i also did it this way to avoid 1 continous js file like my front end is.

db.js was created in my config folder just to keep it out of the way of the rest of the exam.
A controllers folder was made to process logic taken in from the models folder
A routes folder was made to define how API requests are processed, this contained 3 short files for the tables, it took info in from the controllers filed
A models folder was made to contain all the schema definitions and data-related logic for the entities managed by the system. this contained 3 longer files focusing on schema

I found info on how all this worked on stack overflow as well as on the website https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
My main backend file was app.js which similar to before was vital in the backend, i also used information from previous assignments for this
before I started my folders I downloaded all necessary packages i needed such as json (npm init -y) as well as express,cors etc
once app.js was finished I tried making the connection to the database I had created using node app.js, omce this connection was made 
I Tested my api endpoints which I have done before using postman, this took me some time to iron out but i eventually did get it running
it took some time as some of my CRUD aspects were slightly off for example the GET/retreve function was not connecting correctly to app.js
once I had this done i started on the front end
most of the material i worked off of on this was from previous assignments in particular assigment 3 but new ideas such as creating folders
was an idea i found to be useful upon researching the amount of files i wanted for this exam

i started by creating my html which I have done on many other assignments and all of the knowledge needed to do it can be found
on wschools as well as elements i took from assignment 3 which had a lot of html elements. The same can be said for css.
I started the js front end and it did take some time for all functions to be added however i did have information from previous assignments
i used assignment 4 and 6 for this as 4 detailed the database with 6 having more details on API, i also got some info online
'geeksforgeeks' was a good website i found much info on as well as videos by 'cbt nuggets' and others like 'thecodingtrain' who 
was useful when i inspected my page for errors and how to spot them on the console 

The hardest part then followed, i could not make a connection between the front and back end, as well as other countless problems such as
the requests being accepted as html rather than json and massive errors with making a front end connection using API consts
Eventually the problem turned out to be the path name, it was supposed to be for example const landlordAPI = 'http://localhost:3000/api/landlords'
but i had thought that like the back end i could just write ./api/landlords. This took time to figure out but i eventually got it.
I then added the datadump and some comments but kept most of the explanation to this comment section.

The front end is still an issue as i cannot create update or delete only retrieve what i have already created. I am confident in my database as the 3 tables are effective with the contracts taking elements from lanlords etc
and extremely confident in my backend considering i tested it using postman.

Overall i found this assignment to be quite difficult but i do believe I completed most of it effectively and would say their are only a small
few errors hidden in the codebase.


*/