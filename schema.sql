-- ============================
--   RENTAL MANAGEMENT SYSTEM
--   CLEAN SQL SCHEMA
-- ============================

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS renting_db;
USE renting_db;

-- ============================
--   LANDLORDS TABLE
-- ============================
CREATE TABLE IF NOT EXISTS landlords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50)
);

-- ============================
--   TENANTS TABLE
-- ============================
CREATE TABLE IF NOT EXISTS tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50)
);

-- ============================
--   CONTRACTS TABLE
-- ============================
CREATE TABLE IF NOT EXISTS contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contract_date DATE NOT NULL,
    property_address VARCHAR(255) NOT NULL,
    landlord_id INT NOT NULL,
    fee_monthly DECIMAL(10,2) NOT NULL,
    property_type VARCHAR(255) NOT NULL,

    FOREIGN KEY (landlord_id) REFERENCES landlords(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================
--   CONTRACT ↔ TENANT JOIN TABLE
-- ============================
CREATE TABLE IF NOT EXISTS contract_tenants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contract_id INT NOT NULL,
    tenant_id INT NOT NULL,

    FOREIGN KEY (contract_id) REFERENCES contracts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================
-- OPTIONAL SAMPLE DATA (FOR TESTING / DEMO)
-- ============================================
USE renting_db;
-- ============================
--   SAMPLE LANDLORDS (10)
-- ============================
INSERT INTO landlords (first_name, last_name, email, phone) VALUES
('Michael', 'Reid', 'michael.reid@example.com', '0851234567'),
('Sarah', 'O\'Connor', 'sarah.oconnor@example.com', '0869876543'),
('Patrick', 'Walsh', 'patrick.walsh@example.com', '0875551122'),
('Emma', 'Daly', 'emma.daly@example.com', '0852223344'),
('John', 'Kavanagh', 'john.kavanagh@example.com', '0861117788'),
('Laura', 'Fitzgerald', 'laura.fitz@example.com', '0879992211'),
('Brian', 'O\'Neill', 'brian.oneill@example.com', '0895556677'),
('Niamh', 'Carroll', 'niamh.carroll@example.com', '0854443322'),
('David', 'Moore', 'david.moore@example.com', '0867778899'),
('Clare', 'Hughes', 'clare.hughes@example.com', '0873332211');

-- ============================
--   SAMPLE TENANTS (10)
-- ============================
INSERT INTO tenants (first_name, last_name, email, phone) VALUES
('Thea', 'Gillen', 'thea.gillen@example.com', '0891112233'),
('James', 'Murphy', 'james.murphy@example.com', '0894445566'),
('Aoife', 'Byrne', 'aoife.byrne@example.com', '0897778899'),
('Liam', 'Doyle', 'liam.doyle@example.com', '0893332211'),
('Sophie', 'Ryan', 'sophie.ryan@example.com', '0856667788'),
('Mark', 'O\Brien', 'mark.obrien@example.com', '0862224455'),
('Hannah', 'Kelly', 'hannah.kelly@example.com', '0871115566'),
('Conor', 'Smith', 'conor.smith@example.com', '0898881122'),
('Ella', 'Ward', 'ella.ward@example.com', '0859994433'),
('Shane', 'Boland', 'shane.boland@example.com', '0865559911');

-- ============================
--   SAMPLE CONTRACTS (3)
-- ============================
INSERT INTO contracts (contract_date, property_address, landlord_id, fee_monthly, property_type) VALUES
('2024-01-01', '12 Brookfield Avenue', 1, 1200.00, 'House'),
('2024-02-15', '8 Oakwood Drive', 2, 950.00, 'Apartment'),
('2024-03-10', '22 Riverbank Close', 3, 1400.00, 'Duplex');

-- ============================
--   SAMPLE CONTRACT ↔ TENANT LINKS
-- ============================
INSERT INTO contract_tenants (contract_id, tenant_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 4);
