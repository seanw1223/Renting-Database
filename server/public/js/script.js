document.addEventListener("DOMContentLoaded", () => {

    const landlordAPI = "http://localhost:3000/api/landlords";
    const tenantAPI = "http://localhost:3000/api/tenants";
    const contractAPI = "http://localhost:3000/api/contracts";

    // ============================================================
    // LANDLORD SECTION
    // ============================================================

    const landlordForm = document.getElementById("landlordForm");

    landlordForm.onsubmit = async (e) => {
        e.preventDefault();

        const body = {
            title: title.value,
            first_name: first_name.value,
            surname: surname.value,
            email_address: email_address.value,
            phone_number: phone_number.value,
            address_line1: address_line1.value,
            address_line2: address_line2.value,
            town: town.value,
            county_city: county_city.value,
            eircode: eircode.value,
            date_of_birth: date_of_birth.value,
            permission_to_rent: permission_to_rent.checked ? 1 : 0,
            permission_to_email: permission_to_email.checked ? 1 : 0,
            title_other: title_other.value
        };

        const id = landlordId.value;
        const method = id ? "PUT" : "POST";
        const endpoint = id ? `${landlordAPI}/${id}` : landlordAPI;

        const response = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.error(await response.text());
            return;
        }

        landlordForm.reset();
        landlordId.value = "";
        fetchLandlords();
    };

    window.fetchLandlords = async () => {
        const response = await fetch(landlordAPI);
        if (!response.ok) return;
    
        const data = await response.json();
        updateLandlordTable(data);
    
        landlordTable.style.display = "table";
        document.getElementById("closeLandlordTable").style.display = "inline-block";  // ← ADD THIS
    };
    

    window.editLandlord = (id) => {
        fetch(`${landlordAPI}/${id}`)
            .then(res => res.json())
            .then(data => {
                landlordId.value = data.id;
                title.value = data.title;
                first_name.value = data.first_name;
                surname.value = data.surname;
                email_address.value = data.email_address;
                phone_number.value = data.phone_number;
                address_line1.value = data.address_line1;
                address_line2.value = data.address_line2;
                town.value = data.town;
                county_city.value = data.county_city;
                eircode.value = data.eircode;
                date_of_birth.value = data.date_of_birth;
                permission_to_rent.checked = data.permission_to_rent === 1;
                permission_to_email.checked = data.permission_to_email === 1;
                title_other.value = data.title_other;
            });
    };

    window.deleteLandlord = (id) => {
        fetch(`${landlordAPI}/${id}`, { method: "DELETE" })
            .then(() => fetchLandlords());
    };

    function updateLandlordTable(data) {
        const tbody = landlordTable.querySelector("tbody");
        tbody.innerHTML = "";

        data.forEach(item => {
            const tr = document.createElement("tr");

            const cols = [
                item.id,
                item.title,
                item.first_name,
                item.surname,
                item.email_address,
                item.phone_number,
                item.address_line1,
                item.address_line2,
                item.town,
                item.county_city,
                item.eircode,
                item.date_of_birth,
                item.permission_to_rent,
                item.permission_to_email,
                item.title_other
            ];

            cols.forEach(c => {
                const td = document.createElement("td");
                td.textContent = c ?? "";
                tr.appendChild(td);
            });

            const actionTd = document.createElement("td");
            actionTd.innerHTML = `
                <button onclick="editLandlord(${item.id})">Edit</button>
                <button onclick="deleteLandlord(${item.id})">Delete</button>
            `;
            tr.appendChild(actionTd);

            tbody.appendChild(tr);
        });
    }
    window.closeLandlordTable = function () {
        document.getElementById("landlordTable").style.display = "none";
        document.getElementById("closeLandlordTable").style.display = "none";
    };
    window.closeTenantTable = function () {
        document.getElementById("tenantTable").style.display = "none";
        document.getElementById("closeTenantTable").style.display = "none";
    };
    
    window.closeContractTable = function () {
        document.getElementById("contractTable").style.display = "none";
        document.getElementById("closeContractTable").style.display = "none";
    };
    
    

    // ============================================================
    // TENANT SECTION
    // ============================================================

    const tenantForm = document.getElementById("tenantForm");

    tenantForm.onsubmit = async (e) => {
        e.preventDefault();

        const body = {
            first_name: tenantFirstName.value,
            surname: tenantLastName.value,
            email_address: tenantEmail.value,
            phone_number: tenantPhoneNumber.value,
            address_line1: tenantAddressLine1.value,
            address_line2: tenantAddressLine2.value,
            town: tenantCity.value,
            county_city: tenantState.value,
            eircode: tenantZip.value
        };

        const id = tenantId.value;
        const method = id ? "PUT" : "POST";
        const endpoint = id ? `${tenantAPI}/${id}` : tenantAPI;

        const response = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!response.ok) return;

        tenantForm.reset();
        tenantId.value = "";
        fetchTenants();
    };

    window.fetchTenants = async () => {
        const response = await fetch(tenantAPI);
        if (!response.ok) return;

        const data = await response.json();
        updateTenantTable(data);
        tenantTable.style.display = "table";
        document.getElementById("closeTenantTable").style.display = "inline-block";

    };

    window.editTenant = (id) => {
        fetch(`${tenantAPI}/${id}`)
            .then(res => res.json())
            .then(data => {
                tenantId.value = data.id;
                tenantFirstName.value = data.first_name;
                tenantLastName.value = data.surname;
                tenantEmail.value = data.email_address;
                tenantPhoneNumber.value = data.phone_number;
                tenantAddressLine1.value = data.address_line1;
                tenantAddressLine2.value = data.address_line2;
                tenantCity.value = data.town;
                tenantState.value = data.county_city;
                tenantZip.value = data.eircode;
            });
    };

    window.deleteTenant = (id) => {
        fetch(`${tenantAPI}/${id}`, { method: "DELETE" })
            .then(() => fetchTenants());
    };

    function updateTenantTable(data) {
        const tbody = tenantTable.querySelector("tbody");
        tbody.innerHTML = "";

        data.forEach(item => {
            const tr = document.createElement("tr");

            const cols = [
                item.id,
                item.first_name,
                item.surname,
                item.email_address,
                item.phone_number,
                item.address_line1,
                item.address_line2,
                item.town,
                item.county_city,
                item.eircode
            ];

            cols.forEach(c => {
                const td = document.createElement("td");
                td.textContent = c ?? "";
                tr.appendChild(td);
            });

            const actionTd = document.createElement("td");
            actionTd.innerHTML = `
                <button onclick="editTenant(${item.id})">Edit</button>
                <button onclick="deleteTenant(${item.id})">Delete</button>
            `;
            tr.appendChild(actionTd);

            tbody.appendChild(tr);
        });
    }
    window.manageTenants = async (contractId) => {
        const res = await fetch(`${contractAPI}/${contractId}`);
        const data = await res.json();
    
        document.getElementById("tenantManagerContractId").textContent = contractId;
    
        const tenantList = document.getElementById("tenantList");
        tenantList.innerHTML = "";
    
        if (data.tenants && data.tenants.length > 0) {
            data.tenants.forEach(t => {
                const div = document.createElement("div");
                const last =
    t.last_name ||
    t.lastname ||
    t.lastName ||
    t.surname ||
    "";

div.innerHTML = `
    Tenant ID: ${t.id} — ${t.first_name} ${last}
    <button onclick="removeTenantFromContract(${contractId}, ${t.id})">Remove</button>
`;

                tenantList.appendChild(div);
            });
        } else {
            tenantList.innerHTML = "<p>No tenants assigned.</p>";
        }
    
        document.getElementById("tenantManager").style.display = "block";
    };
    window.addTenantToContract = async () => {
        const contractId = document.getElementById("tenantManagerContractId").textContent;
        const tenantId = document.getElementById("newTenantId").value;
    
        await fetch(`${contractAPI}/addTenant`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contractId, tenantId })
        });
    
        manageTenants(contractId); // refresh list
    };
    window.removeTenantFromContract = async (contractId, tenantId) => {
        await fetch(`${contractAPI}/removeTenant`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contractId, tenantId })
        });
    
        manageTenants(contractId); // refresh list
    };
    window.closeTenantManager = () => {
        document.getElementById("tenantManager").style.display = "none";
    };
    
    
    
    

    // ============================================================
    // CONTRACT SECTION
    // ============================================================

    const contractForm = document.getElementById("contractForm");

    contractForm.onsubmit = async (e) => {
        e.preventDefault();

        const body = {
            contract_date: contractDate.value,
            property_address: contractAddress.value,
            fee_monthly: contractFee.value,
            property_type: contractType.value,
            landlord_id: contractLandlord.value,
           
        };

        const id = contractId.value;
        const method = id ? "PUT" : "POST";
        const endpoint = id ? `${contractAPI}/${id}` : contractAPI;

        const response = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!response.ok) return;

        contractForm.reset();
        contractId.value = "";
        fetchContracts();
    };

    window.fetchContracts = async () => {
        const response = await fetch(contractAPI);
        if (!response.ok) return;

        const data = await response.json();
        updateContractTable(data);
        contractTable.style.display = "table";
        document.getElementById("closeContractTable").style.display = "inline-block";

    };

    window.editContract = (id) => {
        fetch(`${contractAPI}/${id}`)
            .then(res => res.json())
            .then(data => {
                contractId.value = data.id;
                contractDate.value = data.contract_date;
                contractAddress.value = data.property_address;
                contractFee.value = data.fee_monthly;
                contractType.value = data.property_type;
                contractLandlord.value = data.landlord_id;
                
            });
    };

    window.deleteContract = (id) => {
        fetch(`${contractAPI}/${id}`, { method: "DELETE" })
            .then(() => fetchContracts());
    };

    function updateContractTable(data) {
        const tbody = contractTable.querySelector("tbody");
        tbody.innerHTML = "";

        data.forEach(item => {
            const tr = document.createElement("tr");

            const cols = [
                item.id,
                item.contract_date,
                item.property_address,
                item.fee_monthly,
                item.property_type,
                item.landlord_id,
               
            ];

            cols.forEach(c => {
                const td = document.createElement("td");
                td.textContent = c ?? "";
                tr.appendChild(td);
            });

            const actionTd = document.createElement("td");
            actionTd.innerHTML = `
                <button onclick="editContract(${item.id})">Edit</button>
                <button onclick="deleteContract(${item.id})">Delete</button>
                <button onclick="manageTenants(${item.id})">Tenants</button>
            `;
            tr.appendChild(actionTd);

            tbody.appendChild(tr);
        });
    }

});
