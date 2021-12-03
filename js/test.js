const app = new Vue({
    el: '#vueApp',
    data: {
        todayTotal: 0,
        loginType: '',
    },
    mounted() {
        // 綁定專案取得 token
        this.token();
    },
    methods: {
        token() {
            // 跨域代理
            const crossServer = 'https://cors-anywhere.herokuapp.com/';

            // 綁定專案
            const form = new FormData();
            form.append('grant_type', 'client_credentials');
            form.append('client_id', document.getElementById('id').value);
            form.append('client_secret', document.getElementById('secret').value);

            axios({
                method: 'post',
                url: crossServer + 'https://account.kkbox.com/oauth2/token',
                data: form,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then((response) => {
                let data = response.data;
                console.log(data);
                const token = data.access_token;
                if (data.error) { return alert(data.error); };
                    
                // 搜尋
                document.getElementById('search').addEventListener('click', () => {
                    if (document.getElementById('keywords').value) {
                        this.search(token,
                            document.getElementById('keywords').value,
                            document.getElementById('type').value,
                            document.getElementById('territory').value,
                            document.getElementById('limit').value,
                            document.getElementById('availability').value);
                    } else {
                        alert('請檢察必填欄位');
                    };
                });

                // Get an album
                document.getElementById('albumDetail').addEventListener('click', () => {
                    if (document.getElementById('albumId').value) {
                        this.albumDetail(token,
                            document.getElementById('albumId').value,
                            document.getElementById('albumTerritory').value);
                    } else {
                        alert('請檢察必填欄位');
                    };
                });

                // Get tracks in an album
                document.getElementById('albumTracksDetail').addEventListener('click', () => {
                    if (document.getElementById('albumTracksId').value) {
                        this.albumTracks(token,
                            document.getElementById('albumTracksId').value,
                            document.getElementById('albumTracksTerritory').value,
                            document.getElementById('albumTracksOffset').value,
                            document.getElementById('albumTracksLimit').value);
                    } else {
                        alert('請檢察必填欄位');
                    };
                });

                // Get an artist
                document.getElementById('artistDetail').addEventListener('click', () => {
                    if (document.getElementById('artistId').value) {
                        this.artistDetail(token,
                            document.getElementById('artistId').value,
                            document.getElementById('artistTerritory').value);
                    } else {
                        alert('請檢察必填欄位');
                    };
                });

                // Get albums by an artist
                document.getElementById('albumsDetail').addEventListener('click', () => {
                    if (document.getElementById('albumsId').value) {
                        this.albumsArtist(token,
                            document.getElementById('albumsId').value,
                            document.getElementById('albumsTerritory').value,
                            document.getElementById('albumsOffset').value,
                            document.getElementById('albumsLimit').value);
                    } else {
                        alert('請檢察必填欄位');
                    };
                });

                // Get artists similar to a given artist
                document.getElementById('artistsSimilarDetail').addEventListener('click', () => {
                    if (document.getElementById('artistsSimilarId').value) {
                        this.artistsSimilar(token,
                            document.getElementById('artistsSimilarId').value,
                            document.getElementById('artistsSimilarTerritory').value,
                            document.getElementById('artistsSimilarOffset').value,
                            document.getElementById('artistsSimilarLimit').value);
                    } else {
                        alert('請檢察必填欄位');
                    };
                });

                // Get an artist's top tracks
                document.getElementById('artistTopDetail').addEventListener('click', () => {
                    if (albumTracksId.value) {
                        this.artistTop(token,
                            document.getElementById('artistTopId').value,
                            document.getElementById('artistTopTerritory').value,
                            document.getElementById('artistTopOffset').value,
                            document.getElementById('artistTopLimit').value);
                    } else {
                        alert('請檢察必填欄位');
                    };
                });

                // Get chart playlists
                document.getElementById('chartPlaylistsDetail').addEventListener('click', () => {
                    if (document.getElementById('chartPlaylistsTerritory').value) {
                        this.chartPlaylists(token,
                            document.getElementById('chartPlaylistsTerritory').value,
                            document.getElementById('chartPlaylistsOffset').value,
                            document.getElementById('chartPlaylistsLimit').value);
                    } else {
                        alert('請檢察必填欄位');
                    };
                });

                // Get a chart playlists
                document.getElementById('aChartPlaylistsDetail').addEventListener('click', () => {
                    if (document.getElementById('playlistId').value) {
                        this.aChartPlaylists(token,
                            document.getElementById('playlistId').value,
                            document.getElementById('aChartPlaylistsTerritory').value);
                    } else {
                        alert('請檢察必填欄位');
                    };
                });
            }).catch((error) => {
                console.log(error)
            })
        },
        // 搜尋
        search(token, q, type, territory, limit, availability) {
            const form = new FormData();
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
        },
        // Get an album
        albumDetail(token, albumId, territory) {
            const form = new FormData();
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
        },
        // Get tracks in an album
        albumTracks(token, albumId, territory, offset, limit) {
            const form = new FormData();
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
        },
        // Get an artist
        artistDetail(token, artistId, territory) {
            const form = new FormData();
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
        },
        // Get albums by an artist
        albumsArtist(token, artistId, territory, offset, limit) {
            const form = new FormData();
            axios({
                method: 'get',
                url: 'https://api.kkbox.com/v1.1/artists/' + artistId + '/albums?territory=' + territory + '&offset=' + offset + '&limit=' + limit,
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
        },
        // Get artists similar to a given artist
        artistsSimilar(token, artistId, territory, offset, limit) {
            const form = new FormData();
            axios({
                method: 'get',
                url: 'https://api.kkbox.com/v1.1/artists/' + artistId + '/related-artists?territory=' + territory + '&offset=' + offset + '&limit=' + limit,
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
        },
        // Get an artist's top tracks
        artistTop(token, artistId, territory, offset, limit) {
            const form = new FormData();
            axios({
                method: 'get',
                url: 'https://api.kkbox.com/v1.1/artists/' + artistId + '/top-tracks?territory=' + territory + '&offset=' + offset + '&limit=' + limit,
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
        },
        // Get chart playlists
        chartPlaylists(token, territory, offset, limit) {
            const form = new FormData();
            axios({
                method: 'get',
                url: 'https://api.kkbox.com/v1.1/charts/?territory=' + territory + '&offset=' + offset + '&limit=' + limit,
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
        },
        // Get a chart playlists
        aChartPlaylists(token, playlistId, territory) {
            const form = new FormData();
            axios({
                method: 'get',
                url: 'https://api.kkbox.com/v1.1/charts/' + playlistId + '?territory=' + territory,
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
        },
    },
});