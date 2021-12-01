function token() {
    let form = new FormData();
    form.append('grant_type', 'client_credentials');
    form.append('client_id', '120af9d8450d4fbcf81ee04982cbb7ab');
    form.append('client_secret', 'd21ab62e9875ada332d19b9b71ab507e');

    axios({
        method: 'post',
        url: 'https://account.kkbox.com/oauth2/token',
        data: form,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then((response) => {
        let data = response.data;
        console.log(data);
        let token = data.access_token;

        let keywords = document.getElementById('keywords');
        let type = document.getElementById('type');
        let territory = document.getElementById('territory');
        let limit = document.getElementById('limit');
        let availability = document.getElementById('availability');
        document.getElementById('search').addEventListener('click', () => {
            if (keywords.value) {
                getData(token, keywords.value, type.value, territory.value, limit.value, availability.value);
            } else {
                alert('請輸入關鍵字');
            };
        });
    }).catch((error) => {
        console.log(error)
    })
};
token();

function getData(token, q, type, territory, limit, availability) {
    let form = new FormData();
    axios({
        method: 'get',
        url: 'https://api.kkbox.com/v1.1/search' +
            '?q=' + q +
            '&type=' + type +
            '&territory=' + territory +
            '&limit=' + limit + 
            '&availability=' + availability,
        data: form,
        headers: {
            'accept': 'application/json',
            'authorization': 'Bearer ' + token
        },
    }).then((response) => {
        let data = response.data;
        console.log(response.data);
    }).catch((error) => {
        console.log(error)
    })
};
