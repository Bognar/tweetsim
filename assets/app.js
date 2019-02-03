/* This is training project that is done following tutorial  */
const tweetlist = document.getElementById('tweet-list');

// Events
eventListeners();
function eventListeners() {
    document.querySelector('#form') - addEventListener('submit', newTweet);

    // remove tweet from list
    tweetlist.addEventListener('click', removeTweet);

    // read local storage
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}


//Functions

function newTweet(e) {
    e.preventDefault();

    // red values from form
    const tweet = document.getElementById('tweet').value;

    // remove btn
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';


    const li = document.createElement('li');
    li.textContent = tweet;

    // add btn to li element
    li.appendChild(removeBtn);
    // add li element
    tweetlist.appendChild(li);

    addTweetToLocalStorage(tweet);

    
}
// remove tweet
function removeTweet(e) {
    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove();
    }

    removeTweetLS(e.target.parentElement.textContent);

}
// adds tweets to LS
function addTweetToLocalStorage(tweet) {
    let tweets = getTweetsFromLocalStorage();

    tweets.push(tweet);

    //convert to string
    localStorage.setItem('tweets', JSON.stringify(tweets));


}
function getTweetsFromLocalStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');
    if (tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    }
    return tweets;
}

function localStorageOnLoad() {
    let tweets = getTweetsFromLocalStorage();

    tweets.forEach(function (tweet) {
        // remove btn
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        const li = document.createElement('li');
        li.textContent = tweet;

        // add btn to li element
        li.appendChild(removeBtn);
        // add li element
        tweetlist.appendChild(li);
    })
}
function removeTweetLS(tweet) {
    let tweets = getTweetsFromLocalStorage();
    //remove X
    const tweetDelete = tweet.substring(0, tweet.length - 1);
    tweets.forEach(function (tweetLS, index) {
        if (tweetDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}