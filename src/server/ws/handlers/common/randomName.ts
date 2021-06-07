import { uniqueNamesGenerator, starWars } from 'unique-names-generator';

export const getRandomName = () => uniqueNamesGenerator({
    dictionaries: [starWars]
});
