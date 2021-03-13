const fs = require('fs');
const _ = require('lodash');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const cheerio = require('cheerio');

let games = {}; // by gogGameId
let gogCache = []; // by gogGameId
let steamList = []; 
let steamCache = {}; // by steamId

let progressCallback = function(progress) {
    console.log(progress)
};

init();

function init() {

        // later
    // gamePieceTypeId request
    // users?

    const fileLoadPromises = []
    fileLoadPromises.push(loadGamesFromFile());
    fileLoadPromises.push(loadGogCacheFromFile());
    fileLoadPromises.push(loadSteamListFromFile());
    fileLoadPromises.push(loadSteamCacheFromFile());

    // TODO
    // option for 
        // a. gog fetch
        // b. gog cache
        // c. (otherwise will just use games?)
    // better output somehow, maybe a function?
    // options for input/output location?

    // refetch gogs (combine?)


    // confirm that I fixed the steam reviews to be total

    
    Promise.all(fileLoadPromises).then(() => {
        updateGogGames().then(() => {
            fetchSteamData().then(() => {
                saveToFile()
            })
        })
    })
}

function loadGamesFromFile() {
    return new Promise((resolve) => {
        fs.readFile('output/games.json', (err, data) => {
            if (err) throw err;
            games = JSON.parse(data).games;
            resolve();
        });
    });
}
function loadGogCacheFromFile() {
    return new Promise((resolve) => {
        fs.readFile('output/gogCache.json', (err, data) => {
            if (err) throw err;
            gogCache = JSON.parse(data).rows;
            resolve();
        });
    });
}
function loadSteamListFromFile() {
    return new Promise((resolve) => {
        fs.readFile('output/steamList.json', (err, data) => {
            if (err) throw err;
            steamList = JSON.parse(data).list;
            resolve();
        });
    });
}
function loadSteamCacheFromFile() {
    return new Promise((resolve) => {
        fs.readFile('output/steamCache.json', (err, data) => {
            if (err) throw err;
            steamCache = JSON.parse(data).caches;
            resolve();
        });
    });
}

function reportProgress(progress) {
    progressCallback(progress)
}

// loads games don't have a valid steam cache and updates the game records
// return Promise
function fetchSteamData() {
    reportProgress({
        type: 'overall',
        description: 'Checking/Updating Steam Cache'
    });
    const steamListingPromises = []
        // Check each game
        let invalidCount = 0;
        let progressCount = 0;

        _.each(games, (game) => {
            if (!game.meta.steamId) {
                return
            }
            // check if we need to fetch steam listing
            if (checkSteamCacheValid(game.meta.steamId)) {
                parseSteamDetails(game)
            } else {
                invalidCount++
                // request steam listing
                steamListingPromises.push(
                    requestSteamListing(game.meta.steamId).then(() => {
                        // parse steam listing
                        progressCount++
                        parseSteamDetails(game)
                        reportProgress({
                            type: 'fetchingSteamListings',
                            progress: progressCount,
                            total: invalidCount,
                        })
                    })
                )
            }
        })
    return Promise.all(steamListingPromises)
}

// TODO fix
// this resets the games and gog cache? maybe that's okay?
function updateGogGames() {
    reportProgress({
        type: 'overall',
        description: 'Querying GOG DB'
    });
    // NUKE the previous info
    games = {};
    gogCache = [];
    let db = new sqlite3.Database('C:\\ProgramData\\GOG.com\\Galaxy\\storage\\galaxy-2.0.db', (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    // Get gamePieceTypes and update query with correct values
    let typesSql = `SELECT * FROM GamePieceTypes;`;

    return new Promise((resolve, reject) => {
        // Loop through types query results
        db.all(typesSql, [], (err, rows) => {
            if (err) {
                reject();
                // throw err;
            }

            $gamePieceTypes = {};

            rows.forEach((row) => {
                $gamePieceTypes[row.type] = row.id;
            });

            let sql = 
            `SELECT 
                games.releaseKey,
                group_concat(myRating) as myRating,
                group_concat(sortingTitle) as sortingTitle,
                group_concat(title) as title,
                group_concat(allGameReleases) as allGameReleases,
                group_concat(dlcs) as dlcs,
                group_concat(media) as media,
                group_concat(originalImages) as originalImages,
                group_concat(originalMeta) as originalMeta,
                group_concat(originalSortingTitle) as originalSortingTitle,
                group_concat(originalTitle) as originalTitle,
                group_concat(myAchievementsCount) as myAchievementsCount,
                group_concat(osCompatibility) as osCompatibility,
                group_concat(meta) as meta,
                group_concat(summary) as summary,
                group_concat(changelog) as changelog,
                group_concat(goodies) as goodies,
                group_concat(isPreorder) as isPreorder,
                group_concat(productLinks) as productLinks,
                tags,
                GameTimes.minutesInGame,
                LastPlayedDates.lastPlayedDate,
                ReleaseProperties.gameId,
                installed.installed,
                DiskSizes.diskSize
            FROM (SELECT GamePieces.releaseKey, -- This query groups all gamePieces by releaseKey
                (case when gamePieceTypeId = ${$gamePieceTypes.myRating} then value end) as myRating,
                (case when gamePieceTypeId = ${$gamePieceTypes.sortingTitle} then value end) as sortingTitle,
                (case when gamePieceTypeId = ${$gamePieceTypes.title} then value end) as title,
                (case when gamePieceTypeId = ${$gamePieceTypes.allGameReleases} then value end) as allGameReleases,
                (case when gamePieceTypeId = ${$gamePieceTypes.dlcs} then value end) as dlcs,
                (case when gamePieceTypeId = ${$gamePieceTypes.media} then value end) as media,
                (case when gamePieceTypeId = ${$gamePieceTypes.originalImages} then value end) as originalImages,
                (case when gamePieceTypeId = ${$gamePieceTypes.originalMeta} then value end) as originalMeta,
                (case when gamePieceTypeId = ${$gamePieceTypes.originalSortingTitle} then value end) as originalSortingTitle,
                (case when gamePieceTypeId = ${$gamePieceTypes.originalTitle} then value end) as originalTitle,
                (case when gamePieceTypeId = ${$gamePieceTypes.myAchievementsCount} then value end) as myAchievementsCount,
                (case when gamePieceTypeId = ${$gamePieceTypes.osCompatibility} then value end) as osCompatibility,
                (case when gamePieceTypeId = ${$gamePieceTypes.meta} then value end) as meta,
                (case when gamePieceTypeId = ${$gamePieceTypes.summary} then value end) as summary,
                (case when gamePieceTypeId = ${$gamePieceTypes.changelog} then value end) as changelog,
                (case when gamePieceTypeId = ${$gamePieceTypes.goodies} then value end) as goodies,
                (case when gamePieceTypeId = ${$gamePieceTypes.isPreorder} then value end) as isPreorder,
                (case when gamePieceTypeId = ${$gamePieceTypes.productLinks} then value end) as productLinks
            FROM GamePieces) as games
            LEFT JOIN (SELECT releaseKey, group_concat(tag) as tags FROM UserReleaseTags GROUP BY UserReleaseTags.releaseKey) as tags
            ON games.releaseKey = tags.releaseKey
            LEFT JOIN (SELECT (Platforms.name || '_' || InstalledexternalProducts.productId) as releaseKey, TRUE as installed FROM InstalledExternalProducts
                INNER JOIN Platforms
                ON InstalledExternalProducts.platformId = Platforms.id) as installed
            ON games.releaseKey = installed.releaseKey
            LEFT JOIN DiskSizes
            ON games.releaseKey = DiskSizes.gameReleaseKey
            LEFT JOIN GameTimes
            ON games.releaseKey = GameTimes.releaseKey
            LEFT JOIN LastPlayedDates
            ON games.releaseKey = LastPlayedDates.gameReleaseKey
            LEFT JOIN ReleaseProperties
            ON games.releaseKey = ReleaseProperties.releaseKey
            INNER JOIN GameLinks
            ON games.releaseKey = GameLinks.releaseKey
            GROUP BY games.releaseKey;`;

            // Loop through game data query results
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject();
                    // throw err;
                }
                rows.forEach((row) => {
                    if (row.gameId == null || row.gameId == '') {
                        return;
                    }
                    const platform = row.releaseKey.split('_')[0];
                    const lastPlayedUnix = row.lastPlayedDate ? new Date(row.lastPlayedDate).getTime() / 1000 : 0; // This uses whatever the current timezone is, IDK if this is correct
                    if (games[row.gameId]) {
                        // Own same game on another platform
                        const game = games[row.gameId];
                        if (row.installed) {
                            // installed on at least one platform
                            game.user.installed = true;
                        }
                        if (row.isOwned) {
                            game.user.owned = true;
                        }
                        if (lastPlayedUnix && (!game.user.lastPlayed || lastPlayedUnix > game.user.lastPlayed)) {
                            // only replace lastPlayed if not set or newer
                            game.user.lastPlayed = lastPlayedUnix;
                        }
                        // combine minutes in game
                        game.user.diskSize += row.diskSize ? row.diskSize : 'NA';
                        game.user.minutesInGame += row.minutesInGame ? row.minutesInGame : 'NA';
                        game.user.ownedPlatforms.push(platform)
                        game.user.platformDetails[platform] = {
                            installed: row.installed,
                            diskSize: row.diskSize,
                            owned: row.isOwned,
                            lastPlayed: lastPlayedUnix,
                            minutesInGame: row.minutesInGame,
                            achievements: row.achievmentsCount,
                            osCompatibility: row.osCompatibility,
                            purchaseDate: row.purchaseDate,
                            addedDate: row.addedDate,
                        };

                    } else {
                        // New Game
                        const meta = JSON.parse(row.originalMeta);
                        const releaseKeys = JSON.parse(row.allGameReleases).releases
                        const steamKey = _.find(releaseKeys, (key) => {return key.indexOf('steam') == 0})
                        const steamId = steamKey ? steamKey.substring(6) : null
                        const media = JSON.parse(row.media)
                        const images = JSON.parse(row.originalImages)
                        const title = JSON.parse(row.originalTitle)
                        const originalTitle = JSON.parse(row.originalTitle)
                        const summary = JSON.parse(row.summary)
                        const platformDetails = {};
                        platformDetails[platform] = {
                            installed: row.installed,
                            diskSize: row.diskSize ? row.diskSize : 'NA',
                            lastPlayed: lastPlayedUnix ? lastPlayedUnix : 'NA',
                            minutesInGame: row.minutesInGame ? row.minutesInGame : 'NA',
                            achievements: row.achievmentsCount,
                            osCompatibility: row.osCompatibility,
                        };
                        // Save details from query
                        const game = {
                            title: title ? title.title : originalTitle ? originalTitle.title : '',
                            summary: summary ? summary.summary : '',
                            meta: {
                                gogId: row.gameId,
                                releaseKeys: releaseKeys,
                                steamId: steamId,
                                gogFetched: Date.now(),
                            },
                            info: {
                                developers: meta.developers,
                                publishers: meta.publishers,
                                releaseDate: meta.releaseDate,
                                osCompatibility: JSON.parse(row.osCompatibility),
                            },
                            reviews: {
                                gogCriticsScore: meta.criticsScore,
                            },
                            categories: {
                                themes: meta.themes,
                                genres: meta.genres,
                                gogTags: row.tags ? row.tags.split(',') : [],
                            },
                            user: {
                                lastPlayed: lastPlayedUnix ? lastPlayedUnix : 'NA',
                                minutesInGame: row.minutesInGame ? row.minutesInGame : 'NA',
                                installed: row.installed ? true : false,
                                diskSize: row.diskSize ? row.diskSize : 'NA',
                                owned: row.isOwned,
                                ownedPlatforms: [platform],
                                platformDetails: platformDetails
                            },
                            assets: {
                                portraitCover: images.verticalCover,
                                squareIcon: images.squareIcon,
                                background: images.background,
                                gogArtwork: media.artwork,
                                gogScreenshots: media.screenshots,
                                gogVideos: media.videos,
                            }
                        };
                        // Save game based on gogId
                        games[row.gameId] = game;
                    }
                    // Save row to gogCache, doesn't have a purpose yet, but might be useful for updates
                    gogCache.push({
                        fetched: Date.now(),
                        row: row,
                    });
                    
                });
                resolve();
            });
        });
        // close the database connection
        db.close();
    })
}

// return true if steamCache for game is okay
function checkSteamCacheValid(steamId) {
    const cacheRecord = steamCache[steamId]
    if (!cacheRecord) {
        return false
    }
    const steamResponse = cacheRecord.response
    if (!steamResponse) {
        return false
    }
    const $ = cheerio.load(steamResponse);
    if ($('#app_agegate').length) {
        return false
    }
    return true
}

// make request for steam listing, saves to cache
// return axios Promise
function requestSteamListing(steamId) {

    // TODO maybe also request https://store.steampowered.com/api/appdetails?appids=546560
    // More APIs https://wiki.teamfortress.com/wiki/User:RJackson/StorefrontAPI#Known_methods
    return axios.get('https://store.steampowered.com/app/' + steamId, {'headers': {Cookie: 'birthtime=-2208959999'}}).then((response) => {
        const steamResponse = response.data;
        steamCache[steamId] = {
            fetched: Date.now(),
            response: steamResponse
        };
    })
}

// updates steamList
// return axios Promise
function updateSteamList() {
    return axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json').then(response => {
        steamList = response.data.applist.apps;
    });
}

// parses steamResponse cache and updates game
// return null
function parseSteamDetails(game) {
    if (!game.meta.steamId) {
        return
    }
    const steamId = game.meta.steamId
    if (!steamCache[steamId]) {
        return
    }
    const steamResponse = steamCache[steamId].response;
    game.meta.steamFetched = steamCache[steamId].fetched;
    const $ = cheerio.load(steamResponse);
    const tags = [];
    const $tags = $('.glance_tags.popular_tags a');
    for (let i = 0; i < $tags.length; i++) {
        tags.push($($tags[i]).text().trim());
    }
    game.categories.steamTags = tags;

    const features = [];
    const $features = $('.game_area_details_specs .name')
    for (let i = 0; i < $features.length; i++) {
        features.push($($features[i]).text().trim());
    }
    game.categories.steamFeatures = features;

    game.reviews.steamDescription = $('.user_reviews_summary_row .game_review_summary').first().text().trim();
    game.reviews.steamValue = parseInt($('meta[itemprop="ratingValue"]').first().attr('content'));
    const steamPercentDesc = $('.review_histogram_section:not(.recent) .game_review_summary').first().attr('data-tooltip-html');
    game.reviews.steamPercent = parseInt(steamPercentDesc ? steamPercentDesc.match(/^[^%*]*/)[0] : 'NA');
    game.reviews.steamTotal = parseInt($('meta[itemprop="reviewCount"]').first().attr('content'));

    const screenshots = [];
    $screenshots = $('.highlight_screenshot_link');
    for (let i = 0; i < $screenshots.length; i++) {
        screenshots.push($($screenshots[i]).attr('href'));
    }
    game.assets.steamScreenshots = screenshots;

    const videos = [];
    $videos = $('.highlight_movie');
    for (let i = 0; i < $videos.length; i++) {
        videos.push({
            'data-webm-source': $($videos[i]).attr('data-webm-source'),
            'data-webm-hd-source': $($videos[i]).attr('data-webm-hd-source'),
            'data-mp4-source': $($videos[i]).attr('data-mp4-source'),
            'data-mp4-hd-source': $($videos[i]).attr('data-mp4-hd-source'),
            'data-poster': $($videos[i]).attr('data-poster')
        });
    }
    game.assets.steamVideos = videos;
}

// saves all variables to json files
// return null
function saveToFile() {
    const gamesData = new Uint8Array(Buffer.from(JSON.stringify({
        type: "gogExtractorGames",
        version: 1,
        games: games
    })));
    fs.writeFile('output/games.json', gamesData, (err) => {
        if (err) throw err;
        reportProgress({
            type: 'overall',
            description: 'Games saved!'
        });
    });

    const steamListData = new Uint8Array(Buffer.from(JSON.stringify({
        type: "gogExtractorSteamListCache",
        version: 1,
        list: steamList
    })));
    fs.writeFile('output/steamList.json', steamListData, (err) => {
        if (err) throw err;
        reportProgress({
            type: 'overall',
            description: 'Steam list saved!'
        });
    });

    const steamCacheData = new Uint8Array(Buffer.from(JSON.stringify({
        type: "gogExtractorSteamListingsCache",
        version: 1,
        caches: steamCache
    })));
    fs.writeFile('output/steamCache.json', steamCacheData, (err) => {
        if (err) throw err;
        reportProgress({
            type: 'overall',
            description: 'Steam cache saved!'
        });
    });

    const gogCacheData = new Uint8Array(Buffer.from(JSON.stringify({
        type: "gogExtractorGogDatabaseCache",
        version: 1,
        rows: gogCache
    })));
    fs.writeFile('output/gogCache.json', gogCacheData, (err) => {
        if (err) throw err;
        reportProgress({
            type: 'overall',
            description: 'GOG cache saved!'
        });
    });
}