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

        // 搜尋
        let keywords = document.getElementById('keywords');
        let type = document.getElementById('type');
        let territory = document.getElementById('territory');
        let limit = document.getElementById('limit');
        let availability = document.getElementById('availability');
        document.getElementById('search').addEventListener('click', () => {
            if (keywords.value) {
                search(token, keywords.value, type.value, territory.value, limit.value, availability.value);
            } else {
                alert('請輸入關鍵字');
            };
        });

        // Get an album
        let albumId = document.getElementById('albumId');
        let albumTerritory = document.getElementById('albumTerritory');
        document.getElementById('albumDetail').addEventListener('click', () => {
            if (albumId.value) {
                albumDetail(token, albumId.value, albumTerritory.value);
            } else {
                alert('請輸入 albumId');
            };
        });

        // Get tracks in an album
        let albumTracksId = document.getElementById('albumTracksId');
        let albumTracksTerritory = document.getElementById('albumTracksTerritory');
        let albumTracksOffset = document.getElementById('albumTracksOffset');
        let albumTracksLimit = document.getElementById('albumTracksLimit');
        document.getElementById('albumTracksDetail').addEventListener('click', () => {
            if (albumTracksId.value) {
                albumTracks(token,
                    albumTracksId.value,
                    albumTracksTerritory.value,
                    albumTracksOffset.value,
                    albumTracksLimit.value);
            } else {
                alert('請輸入 albumId');
            };
        });

        // Get an artist
        let artistId = document.getElementById('artistId');
        let artistTerritory = document.getElementById('artistTerritory');
        document.getElementById('artistDetail').addEventListener('click', () => {
            if (artistId.value) {
                artistDetail(token, artistId.value, artistTerritory.value);
            } else {
                alert('請輸入 artistId');
            };
        });

    }).catch((error) => {
        console.log(error)
    })
};
token();

// 搜尋
function search(token, q, type, territory, limit, availability) {
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
        console.log(data);
    }).catch((error) => {
        console.log(error)
    })
};

// Get an album
function albumDetail(token, albumId, territory) { 
    let form = new FormData();
    axios({
        method: 'get',
        url: 'https://api.kkbox.com/v1.1/albums/' + albumId + '?territory=' + territory,
        data: form,
        headers: {
            'accept': 'application/json',
            'authorization': 'Bearer ' + token
        },
    }).then((response) => {
        let data = response.data;
        console.log(data);
    }).catch((error) => {
        console.log(error)
    })
};

// Get tracks in an album
function albumTracks(token, albumId, territory, offset, limit) {
    let form = new FormData();
    axios({
        method: 'get',
        url: 'https://api.kkbox.com/v1.1/albums/' + albumId + '/tracks?territory=' + territory + '&offset=' + offset + '&limit=' + limit,
        data: form,
        headers: {
            'accept': 'application/json',
            'authorization': 'Bearer ' + token
        },
    }).then((response) => {
        let data = response.data;
        console.log(data);
    }).catch((error) => {
        console.log(error)
    })
};

// Get an artist
function artistDetail(token, artistId, territory) {
    let form = new FormData();
    axios({
        method: 'get',
        url: 'https://api.kkbox.com/v1.1/artists/' + artistId + '?territory=' + territory,
        data: form,
        headers: {
            'accept': 'application/json',
            'authorization': 'Bearer ' + token
        },
    }).then((response) => {
        let data = response.data;
        console.log(data);
    }).catch((error) => {
        console.log(error)
    })
};