const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const axios = require('axios');

//fetching api
const fetchData = async (page) => {
    try {
        const apiUrl = `https://catfact.ninja/breeds?page=${page}`;
        const response = await axios.get(apiUrl);
        const breeds = response.data.data;
        console.log(`current page is ${page}`);
        console.log(`page no. ${page} have ${breeds.length} data`);
        console.log(breeds);
        return breeds;
    } catch (error) {
        console.error(`Error fetching data for page ${page}:`, error.message);
         
    }
};

const fetchAllData = async () => {
    let page = 1;
    const allBreeds = [];

    while (true) {
        const breeds = await fetchData(page);

        if (breeds.length > 0) {
            allBreeds.push(...breeds);
            page++;
        } else {
            console.log(`Total page in URL is ${page - 1}`);
            break;
        }
    }

    return allBreeds;
};

//group[ by] country
const groupBreedsByCountry = (breeds) => {
    const groupedBreeds = {};

    breeds.forEach((breed) => {
        const country = breed.country;
        if (!groupedBreeds[country]) {
            groupedBreeds[country] = [];
        }

        groupedBreeds[country].push({
            breed: breed.breed,
            origin: breed.origin,
            coat: breed.coat,
            pattern: breed.pattern,
        });
    });

    return groupedBreeds;
};

const processAllBreeds = async () => {
    const allBreeds = await fetchAllData();
    const groupedBreeds = groupBreedsByCountry(allBreeds);

    console.log('Grouped Cat Breeds by Country:', groupedBreeds);
};

processAllBreeds();

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});