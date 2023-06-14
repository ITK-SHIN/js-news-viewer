// do something!
import { Nav, NewsList } from './components/index.js';

const get = (target) => {
  return document.querySelector(target)
}

const $NewsListCon = get('.news-list-container');

  //News Viewer 구성하기 시작
  Nav();
  NewsList();
  //News Viewer 구성하기 끝


const getPost = async () => {
  const API_Key = '4b5fcfae84d64b68ab6bd73c347c8004';
  const NEWS_API_URL =
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + API_Key;
  
/*    const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${
    category === 'all' ? '' : category
     }&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`; */
  
 /*  console.log(NEWS_API_URL); */

  fetch(NEWS_API_URL)
    .then((response) => response.json())
    .then((data) => {
      showNewsList(data); // 서버로부터 받은 뉴스 데이터
    })
    .catch((error) => {
      console.log(error);
    });
}

const showNewsList = (article) => {
  console.log(article.articles)
  console.log(article.content);
  const $articlesArray = article.articles
  $articlesArray.forEach((newsList) => {
    const $newsList = document.createElement('article');
    console.log($newsList)
    $newsList.classList.add('news-list');
    $newsList.innerHTML = `
    <section class="news-item">
            <div class="thumbnail">
              <a href="https://www.ajunews.com/view/20220220180410403" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://image.ajunews.com/content/image/2022/02/20/20220220180523846963.jpg"
                  alt="thumbnail" />
              </a>
            </div>
            <div class="contents">
              <h2>
                <a href="https://www.ajunews.com/view/20220220180410403" target="_blank" rel="noopener noreferrer">
                  ​[뉴욕증시 주간전망] 러시아-우크라이나 긴장 속 변동성 지속 - 아주경제
                </a>
              </h2>
              <p>
                이번 주(21일~25일·현지시간) 뉴욕 증시는 러시아와 우크라이나 간 지정학적 긴장과 우크라이나 간 미국
                연방준비제도(Fed·연준)의 긴축 우려에 계속해서...
              </p>
            </div>
          </section>
    `;

      $NewsListCon.appendChild($newsList);
  });


}


const loadNewsList = async () => {
  const response = await getPost()
/*   console.log(response) */
  showNewsList(response)
}



window.addEventListener('DOMContentLoaded', () => {
  loadNewsList();

});