const API_KEY_LOCAL_STORAGE_KEY = 'apiKey';
const OFFSET_LOCAL_STORAGE_KEY = 'offset';
const POSTS_CACHE_LOCAL_STORAGE_KEY = 'postsCache';
const COMMUNTIY_ID = -1;
const FETCH_POSTS_CNT = 10;

const localStorageMaxSize = getMaxLocalStorageSizeWithBinarySearch();

let apiKey = localStorage.getItem(API_KEY_LOCAL_STORAGE_KEY);
let offset = parseInt(localStorage.getItem(OFFSET_LOCAL_STORAGE_KEY)) || 0;
let posts = JSON.parse(localStorage.getItem(POSTS_CACHE_LOCAL_STORAGE_KEY)) || [];
let currentlyFetching = false;

const apiKeyInput = document.getElementById("api-key-input");
const saveAPIKeyBtn = document.getElementById("save-api-key-btn");
const getPostsBtn = document.getElementById("get-posts-btn");
const widgetContainer = document.querySelector(".widget-container");

function processFetchResult(fetchResult) {
    currentlyFetching = false;
    if (fetchResult.error) {
        console.error(fetchResult.error.error_msg);
        return;
    }

    const fetchedPosts = fetchResult.response.items;
    posts = posts.concat(fetchedPosts);
    offset += fetchedPosts.length;
    try {
        localStorage.setItem(POSTS_CACHE_LOCAL_STORAGE_KEY, JSON.stringify(posts))
    } catch {
        posts.splice(0, FETCH_POSTS_CNT);
        localStorage.setItem(POSTS_CACHE_LOCAL_STORAGE_KEY, JSON.stringify(posts));
    }
    localStorage.setItem(OFFSET_LOCAL_STORAGE_KEY, offset);
    const usage = Math.round(getLocalStoargeUsage()* 100) / 100;
    console.log(`used ${usage}/${localStorageMaxSize} KB of local storage`);
    insertPosts(fetchedPosts);
}

function insertPosts(posts) {
    posts.forEach((post) => {
        const date = new Date(post.date*1000);
        div = document.createElement('div');
        div.classList.add("post");
        div.insertAdjacentHTML('afterBegin', `
        <div class="post-title">${formatDate(date)}</div>
        <div class="post-content">${post.text}</div>
        `);
        widgetContainer.appendChild(div);
    });
}

function formatDate(date) {
    const day = padNumber(date.getDay());
    const month = padNumber(date.getMonth());
    const year = date.getFullYear();
    const hour = padNumber(date.getHours());
    const minute = padNumber(date.getMinutes());
    return `${day}.${month}.${year} ${hour}:${minute}`;
}

function padNumber(number) {
    return String(number).padStart(2, '0');
}

function startFetchingPosts() {
    if (!apiKey) {
        return;
    }
    currentlyFetching = true;
    const script = document.createElement('script');
    script.src = `https://api.vk.com/method/wall.get?owner_id=${COMMUNTIY_ID}&count=${FETCH_POSTS_CNT}&offset=${offset}&access_token=${apiKey}&v=5.131&callback=${processFetchResult.name}`;
    document.head.append(script);
}

function isScrolledToBottom(el) {
    return el.scrollHeight - el.scrollTop - el.clientHeight < 5;
}

function insertFirstPosts() {
    if (!posts.length) {
        startFetchingPosts();
    }
    insertPosts(posts);
}


saveAPIKeyBtn.addEventListener('click', () => {
    apiKey = apiKeyInput.value.trim();
    localStorage.setItem(API_KEY_LOCAL_STORAGE_KEY, apiKey);
});

getPostsBtn.addEventListener('click', () => {
    if (!currentlyFetching) {
        startFetchingPosts();
    }
});

widgetContainer.addEventListener('scroll', (e) => {
    if (!currentlyFetching && isScrolledToBottom(e.target)) {
        startFetchingPosts();
    }
});

insertFirstPosts();
