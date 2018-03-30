const CountryService  = {
    getCountries: async function() {
        try {
            let response = await fetch(
                'https://winevintageapp.firebaseio.com/country.json?auth=0S0M8K7etZ6pu0khQYNEtGxtWf1OB3OuYdgW87ck'
            );
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }
};

export default CountryService;