export default class NewsList {
  constructor(data) {
    this.data = data;
    this.createNewsListAndScrollObserver();
  }
  
  createNewsListAndScrollObserver() {
    const newsListCon = this.createNewsListCon();
    const newsListArticle =this.createNewsListArticle();
    newsListCon.appendChild(newsListArticle);
    
    this.scrollObserverElement = this.observerElement();
    this.newsListCon.appendChild(this.scrollObserverElement);
    this.scrollObserver(this.newsListArticle, this.scrollObserverElement);
  }

  createNewsListCon() {
    this.newsListCon = document.createElement('div');
    this.newsListCon.className = 'news-list-container';

    return this.newsListCon
  }

  createNewsListArticle() {
     this.newsListArticle = document.createElement('article');
     this.newsListArticle.className = 'news-list';
     this.newsListArticle.dataset.category = this.data.category;
    
    return this.newsListArticle
  }

  async updateNewsList() {
    const newsList = await this.getNewsList(this.data);
    newsList.forEach((item) => {
      this.newsListArticle.appendChild(item);
    });
  }

  async getNewsList(page = 1, category, pageSize = 5) {
    const newsArr = [];
    let NEWS_API__KEY = '4b5fcfae84d64b68ab6bd73c347c8004';
    let url = `https://newsapi.org/v2/top-headlines?country=kr&category=${
      category === 'all' ? '' : category
    }&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API__KEY}`;

    const fetchNews = async (url) => {
      try {
        const response = await axios.get(url);
        const articles = response.data.articles;

        articles.forEach((data) => {
          if (data.urlToImage === null) {
            data.urlToImage =
              'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
          }

          if (data.description === null) {
            data.description = '';
          }

          const newsItem = document.createElement('section');
          newsItem.className = 'news-item';
          newsItem.insertAdjacentHTML(
            'beforeend',
            `
                  <div class="thumbnail">
                      <a href=${data.url} target="_blank" 
                      rel="noopener noreferrer">
                          <img
                          src=${data.urlToImage}
                          alt="thumbnail" />
                      </a>
                  </div>
                  <div class="contents">
                      <h2>
                          <a href=${data.url} target="_blank" 
                          rel="noopener noreferrer">
                          ${data.title}
                          </a>
                      </h2>
                      <p>
                      ${data.description}
                      </p>
                  </div>
              `,
          );
          newsArr.push(newsItem);
        });
        return newsArr;
      } catch (error) {
        if (error.response && error.response.status === 429) {
          NEWS_API__KEY = '9d8be12d479a435ab2ec5ac3cfc249b5';
          url = `https://newsapi.org/v2/top-headlines?country=kr&category=${
            category === 'all' ? '' : category
          }&page=${page}&pageSize=${pageSize}&apiKey=${NEWS_API__KEY}`;
          return await fetchNews(url);
        }

        return [];
      }
    };

    return await fetchNews(url);
  }

  observerElement() {
    const observerElement = document.createElement('div');
    observerElement.className = 'scroll-observer';
    observerElement.dataset.page = '1';

    const observerImg = document.createElement('img');
    observerImg.src = './img/ball-triangle.svg';
    observerImg.alt = 'Loading...';

    observerElement.appendChild(observerImg);
    
    return observerElement;
  }

  scrollObserver(newsListArticle, scrollObserverElement) {
    const callback = async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const nextPage = parseInt(entry.target.dataset['page']);
          const category = newsListArticle.dataset.category;

          const newsList = await this.getNewsList(nextPage, category);
          entry.target.dataset['page'] = nextPage + 1;

          if (newsList.length > 0) {
            newsList.forEach((data) => {
              newsListArticle.appendChild(data);
            });
            continue;
          }
          io.unobserve(entry.target);
          entry.target.remove();
        }
      }
    };

    const io = new IntersectionObserver(callback, { threshold: 0.8 ,rootMargin: '-20px'});
    io.observe(this.scrollObserverElement);
  }

  get element() {
    return this.newsListCon;
  }
}
