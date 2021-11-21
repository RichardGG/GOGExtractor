Extracts data from GOG DB as JSON
Also fetches additional data from Steam

USAGE
npm install
node ./index.js

# You may need to use the following if running into memory issues
node --max-old-space-size=4096 ./index.js

EXAMPLE JSON
"52819909153584447": {
    "title": "Half-Life: Alyx",
    "summary": "Half-Life: Alyx is Valve’s VR return to the Half-Life series. It’s the story of an impossible fight against a vicious alien race known as the Combine, set between the events of Half-Life and Half-Life 2. \r\n \r\nSet between the events of Half-Life and Half-Life 2, Alyx Vance and her father Eli mount an early resistance to the Combine's brutal occupation of Earth.",
    "meta": {
        "gogId": "52819909153584447",
        "releaseKeys": [
            "steam_546560",
            "gamehouse_GAME_FROM_DATA_FILE-696-20200408214058",
            "gamehouse_GAME_FROM_DATA_FILE-696-20200408223931",
            "gamehouse_GAME_FROM_DATA_FILE-696-20200408233931",
            "gamehouse_GAME_FROM_DATA_FILE-696-20200409003932",
            "gamehouse_GAME_FROM_DATA_FILE-696-20200409080600",
            "humble_GAME_FROM_DATA_FILE-770-20200411074355",
            "beamdog_a50cc629-3d1b-4fe9-a06b-11a71f228c7b",
            "minecraft_a50cc629-3d1b-4fe9-a06b-11a71f228c7b",
            "minecraft_94dac213-f0f4-40f9-b71e-1b634f3eeaa0",
            "minecraft_6a889247-d10a-424f-87ae-9f50b74cd60c",
            "generic_52819909153584447"
        ],
        "steamId": "546560",
        "gogFetched": 1605955540708,
        "steamFetched": 1600947477043
    },
    "info": {
        "developers": [
            "Valve Corporation"
        ],
        "publishers": [
            "Valve Corporation"
        ],
        "releaseDate": 1584921600,
        "osCompatibility": {
            "supported": [
                {
                    "name": "Windows",
                    "slug": "windows"
                },
                {
                    "name": "macOS",
                    "slug": "osx"
                }
            ]
        }
    },
    "reviews": {
        "gogCriticsScore": 92.7778,
        "steamDescription": "Overwhelmingly Positive",
        "steamValue": 10,
        "steamPercent": 98,
        "steamTotal": 32245
    },
    "categories": {
        "themes": [
            "Action",
            "Science fiction"
        ],
        "genres": [
            "Adventure",
            "Puzzle",
            "Shooter"
        ],
        "gogTags": [
            "Best",
            "Done",
            "VR"
        ],
        "steamTags": [
            "VR",
            "FPS",
            "Story Rich",
            "Shooter",
            "Horror",
            "Female Protagonist",
            "First-Person",
            "Action",
            "Zombies",
            "Sci-fi",
            "Atmospheric",
            "Beautiful",
            "Singleplayer",
            "Psychological Horror",
            "Adventure",
            "Aliens",
            "Futuristic",
            "Memes",
            "Great Soundtrack",
            "Gore"
        ],
        "steamFeatures": [
            "Single-player",
            "Steam Achievements",
            "Captions available",
            "Steam Workshop",
            "Includes level editor",
            "Valve Index",
            "HTC Vive",
            "Oculus Rift",
            "Windows Mixed Reality",
            "Tracked Motion Controllers",
            "Seated",
            "Standing",
            "Room-Scale"
        ]
    },
    "user": {
        "lastPlayed": 1599611432,
        "minutesInGame": 1449,
        "installed": false,
        "diskSize": 72722758337,
        "ownedPlatforms": [
            "steam"
        ],
        "platformDetails": {
            "steam": {
                "installed": null,
                "diskSize": 72722758337,
                "lastPlayed": 1599611432,
                "minutesInGame": 1449,
                "osCompatibility": "{\"supported\":[{\"name\":\"Windows\",\"slug\":\"windows\"},{\"name\":\"macOS\",\"slug\":\"osx\"}]}"
            }
        }
    },
    "assets": {
        "portraitCover": "https://images.gog.com/0c0208bb217aad6d0b18d9efa5bd26f0a51d843efea501b21b85c26bacec2582_glx_vertical_cover.webp?namespace=gamesdb",
        "squareIcon": "https://images.gog.com/85a359840edba715e8df0db6d3f3b98d1d2278ef7c5ed313561c9aa2b847cc92_glx_square_icon_v2.webp?namespace=gamesdb",
        "background": "https://images.gog.com/532cf37c0df324110e4d81158ca7a53ec9a145417f71b75d9a94258bfdb868ee_glx_bg_top_padding_7.webp?namespace=gamesdb",
        "gogScreenshots": [
            "https://images.gog.com/23b32c404dcec7fb95ed6fbe1eca34f6b4d3adef7d099d5019c8339a3284a4c3{formatter}.{ext}?namespace=gamesdb",
            "https://images.gog.com/f2b9f08381153f513751b6b2b83bdabaf8bd6351e1a7cd9735f18878a22c758d{formatter}.{ext}?namespace=gamesdb",
            "https://images.gog.com/e2729c898005f187e928e62b4d34bb8e440dcb12b5cabe2d5152df46345917fd{formatter}.{ext}?namespace=gamesdb",
            "https://images.gog.com/38b2159aebe751b8c30fffa70f64d7ee516037c88d991889dd996b23cab64a51{formatter}.{ext}?namespace=gamesdb",
            "https://images.gog.com/d40fac20332d3aeceda5e09a600c9aba3d41c4d311665964d235fa8f67f6047a{formatter}.{ext}?namespace=gamesdb",
            "https://images.gog.com/a53965e99ed02c5bada43752b058abda6a065494454a7af1f18a034bd7786e15{formatter}.{ext}?namespace=gamesdb",
            "https://images.gog.com/3bdce9d57b04d8b1877e0b30bc0782778750afdff77d74ffcef1a195cc71d872{formatter}.{ext}?namespace=gamesdb",
            "https://images.gog.com/560937c2aec08cae0155e58df8c68df188024bf81a972701c8b827921858d203{formatter}.{ext}?namespace=gamesdb",
            "https://images.gog.com/b493ffbbf636489ec87b725ec5e9fba344f7ae9032b56d873614eb50374830b0{formatter}.{ext}?namespace=gamesdb"
        ],
        "gogVideos": [
            {
                "name": "Trailer",
                "provider": "youtube",
                "thumbnailId": "O2W0N3uKXmo",
                "videoId": "O2W0N3uKXmo"
            },
            {
                "name": "Gameplay Trailer",
                "provider": "youtube",
                "thumbnailId": "3uKUSnY0HVs",
                "videoId": "3uKUSnY0HVs"
            },
            {
                "name": "Gameplay Trailer",
                "provider": "youtube",
                "thumbnailId": "nFjtVmka54E",
                "videoId": "nFjtVmka54E"
            },
            {
                "name": "Gameplay Trailer",
                "provider": "youtube",
                "thumbnailId": "LTLotwKpLgk",
                "videoId": "LTLotwKpLgk"
            }
        ],
        "steamScreenshots": [
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_d61365e93f20ceb5a94a1e5b2811cf504cbfa303.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_fe7066404a704aa20f7c6f251facb7aef2606bda.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_6868ae1644628f857e7df4b72a00fdf506f79c7f.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_4236773ab28112613bd7d4c6282331c861bc222a.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_5d228b092e93ff148e6a998c33e751fb968cc956.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_70fce3236bf252d3814f793744f648cbe35164e4.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_fcc7a64234b8b26cac3d69dfc4779dd438582f15.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_0360004603a7861cf6781d5449e641f916f1ee07.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_e5152f19710aaa91c4a4ab161785af3e1f8d850d.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_ac80dfaacaade35a1da835dadd52ab420607603b.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_ddc667aa2687543c0baa1a63c6bdb5fa59e0617e.1920x1080.jpg?t=1594314571",
            "https://cdn.cloudflare.steamstatic.com/steam/apps/546560/ss_4912f4c3d259a472e9898f0a7b1f819a533d2c1e.1920x1080.jpg?t=1594314571"
        ],
        "steamVideos": [
            {
                "data-webm-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256767815/movie480.webm?t=1583175736",
                "data-webm-hd-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256767815/movie_max.webm?t=1583175736",
                "data-mp4-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256767815/movie480.mp4?t=1583175736",
                "data-mp4-hd-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256767815/movie_max.mp4?t=1583175736",
                "data-poster": "https://cdn.cloudflare.steamstatic.com/steam/apps/256767815/movie.293x165.jpg?t=1583175736"
            },
            {
                "data-webm-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776744/movie480.webm?t=1583175743",
                "data-webm-hd-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776744/movie_max.webm?t=1583175743",
                "data-mp4-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776744/movie480.mp4?t=1583175743",
                "data-mp4-hd-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776744/movie_max.mp4?t=1583175743",
                "data-poster": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776744/movie.293x165.jpg?t=1583175743"
            },
            {
                "data-webm-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776745/movie480.webm?t=1583175752",
                "data-webm-hd-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776745/movie_max.webm?t=1583175752",
                "data-mp4-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776745/movie480.mp4?t=1583175752",
                "data-mp4-hd-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776745/movie_max.mp4?t=1583175752",
                "data-poster": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776745/movie.293x165.jpg?t=1583175752"
            },
            {
                "data-webm-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776746/movie480.webm?t=1583175759",
                "data-webm-hd-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776746/movie_max.webm?t=1583175759",
                "data-mp4-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776746/movie480.mp4?t=1583175759",
                "data-mp4-hd-source": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776746/movie_max.mp4?t=1583175759",
                "data-poster": "https://cdn.cloudflare.steamstatic.com/steam/apps/256776746/movie.293x165.jpg?t=1583175759"
            }
        ]
    }
},