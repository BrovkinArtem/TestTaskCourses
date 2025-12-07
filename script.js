document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("[data-js-tabs-button]");
  const contents = document.querySelectorAll("[data-js-tabs-content]");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      const targetId = tab.getAttribute("aria-controls");

      contents.forEach(content => {
        if (content.id === targetId) {
          content.hidden = false;
        } else {
          content.hidden = true;
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".tabs__form-search");
  const courses = document.querySelectorAll(".course-card");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    courses.forEach(course => {
      const title = course.querySelector(".course-card__title").textContent.toLowerCase();
      if (title.includes(query)) {
        course.closest("li").style.display = "";
      } else {
        course.closest("li").style.display = "none";
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabs__button');

  tabs.forEach(tab => {
    const tabPanelId = tab.getAttribute('aria-controls');
    const tabPanel = document.getElementById(tabPanelId);
    const courseCount = tabPanel.querySelectorAll('.course-card').length;
    tab.setAttribute('data-count', courseCount);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const loadMoreBtn = document.querySelector('.courses__more-button');
  const tabsContents = document.querySelectorAll('[data-js-tabs-content]');

  function hideExtraCards(tabContent) {
    const items = tabContent.querySelectorAll('.courses__item');
    items.forEach((item, index) => {
      if(index >= 9) {
        item.style.display = 'none';
      } else {
        item.style.display = 'block';
      }
    });
  }

  tabsContents.forEach(tab => hideExtraCards(tab));

  loadMoreBtn.addEventListener('click', () => {
    const activeTab = document.querySelector('[data-js-tabs-content]:not([hidden])');
    const hiddenItems = Array.from(activeTab.querySelectorAll('.courses__item')).filter(item => item.style.display === 'none');

    hiddenItems.slice(0, 9).forEach(item => item.style.display = 'block');

    if(hiddenItems.length <= 9) {
      loadMoreBtn.style.display = 'none';
    }
  });

  const tabsButtons = document.querySelectorAll('[data-js-tabs-button]');
  tabsButtons.forEach(button => {
    button.addEventListener('click', () => {
      setTimeout(() => {
        const activeTab = document.querySelector('[data-js-tabs-content]:not([hidden])');
        hideExtraCards(activeTab);
        loadMoreBtn.style.display = 'block';
      }, 50);
    });
  });
});