const fs = require('fs');
const path = require('path');

const package_path = path.join(__dirname, '../../public/images/')

const access_database = {
    package_db: (package = 'bariloche') => {
        let package_json = JSON.parse(fs.readFileSync(package_path + package + '.json', 'utf-8'));
        return package_json; 
    }
};

module.exports = access_database