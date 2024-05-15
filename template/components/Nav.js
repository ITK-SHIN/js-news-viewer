export default class Nav {
  constructor(data) {
    this.data = data;
    this.createNavElement();
    this.selectCategory();
  }

   createNavElement ()  {
    this.navElement = document.createElement('nav');
    this.navElement.className = 'category-list';
    this.navElement.insertAdjacentHTML(
        'beforeend',
        `
        <ul>
           <li id="all" class="category-item active">전체보기</li>
           <li id="business" class="category-item">비즈니스</li>
           <li id="entertainment" class="category-item">엔터테인먼트</li>
           <li id="health" class="category-item">건강</li>
           <li id="science" class="category-item">과학</li>
           <li id="sports" class="category-item">스포츠</li>
           <li id="technology" class="category-item">기술</li>
        </ul>  
     `,
      );

    return this.navElement;
   }
  
  selectCategory() {
        const categoryItem = this.navElement.querySelectorAll('.category-item');

        [...categoryItem].forEach((item) => {
          item.addEventListener('click', (event) => {
            categoryItem.forEach((item) => {
              item.classList.remove('active');
            });

            console.log(event.target)
            event.target.classList.add('active');
            this.data.category = event.target.id;
          });
        });
  }
  
  get element() {
    return this.navElement;
  }
}
