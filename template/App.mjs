// do something!
import { Nav, NewsList } from './components/index.js';

window.onload = async function () {
  const rootElement = document.getElementById('root');

  const proxyData = new Proxy(
    {
      category: 'all',
    },
    {
      set: async function (target, prop, value) {
        Reflect.set(target, prop, value);
        const newsListElement = new NewsList(proxyData);
        await newsList.updateNewsList();
        const container = rootElement.querySelector('.news-list-container');
 
        if (container === null) {
          rootElement.appendChild(newsListElement.element);
        } else {
          container.replaceWith(newsListElement.element);
        }
      },
    },
  );

  const navElement = new Nav(proxyData);
  const newsList = new NewsList(proxyData);
  rootElement.appendChild(navElement.element);
  rootElement.appendChild(newsList.element);

  await newsList.updateNewsList();

  
};