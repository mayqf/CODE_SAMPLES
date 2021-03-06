'use strict';

{
  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  }

  function createAndAppend(name, parent, options = {}) {
    const child = document.createElement(name);
    parent.appendChild(child);
    Object.keys(options).forEach(key => {
      const value = options[key];
      if (key === 'text') {
        child.textContent = value;
      } else {
        child.setAttribute(key, value);
      }
    });
    return child;
  }

  function renderError(error) {
    const root = document.getElementById('root');
    createAndAppend('div', root, {
      text: error.message,
      class: 'alert',
    });
  }

  function createOptionElements(repositories, select) {
    repositories
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((repository, index) => {
        createAndAppend('option', select, {
          text: repository.name,
          value: index,
        });
      });
  }

  function addRow(tbody, label, value) {
    const tr = createAndAppend('tr', tbody);
    createAndAppend('td', tr, {
      text: `${label}:`,
      class: 'label',
    });
    createAndAppend('td', tr, {
      text: value,
    });
    return tr;
  }

  function renderRepositories(repository) {
    const leftBox = document.getElementById('left-box');
    leftBox.innerHTML = '';
    const repTable = createAndAppend('table', leftBox);
    const tBody = createAndAppend('tbody', repTable, {
      class: 'table_elms',
    });
    const firstRow = addRow(tBody, 'Repository', '');
    addRow(tBody, 'Description', repository.description);
    addRow(tBody, 'Forks', repository.forks);
    addRow(tBody, 'Updated', new Date(repository.updated_at).toLocaleString('en-GB'));
    createAndAppend('a', firstRow.lastChild, {
      href: repository.html_url,
      target: '_blank',
      text: repository.name,
    });
  }

  async function renderContributions(repository) {
    const rightBox = document.getElementById('right-box');
    rightBox.innerHTML = '';
    createAndAppend('h2', rightBox, {
      text: 'Contributions',
      class: 'contrib-title',
    });
    const contributionsList = createAndAppend('ul', rightBox, {
      class: 'list-container',
    });
    try {
      const contributions = await fetchJSON(repository.contributors_url);
      contributions.forEach(contribution => {
        const listItem = createAndAppend('li', contributionsList, {
          class: 'contrib',
        });
        createAndAppend('img', listItem, {
          class: 'contrib_img',
          src: contribution.avatar_url,
        });
        const contribName = createAndAppend('span', listItem, {
          class: 'contrib-name',
        });
        createAndAppend('a', contribName, {
          href: contribution.html_url,
          target: '_blank',
          text: contribution.login,
        });
        createAndAppend('span', listItem, {
          class: 'contrib-count',
          text: contribution.contributions,
        });
      });
    } catch (error) {
      renderError(error);
    }
  }
  async function renderWholePage(url) {
    const root = document.getElementById('root');
    const header = createAndAppend('header', root, {
      id: 'header',
    });
    createAndAppend('h1', header, {
      class: 'header-title',
      text: 'HYF Repositories',
    });
    const select = createAndAppend('select', header);
    const container = createAndAppend('main', root, {
      id: 'container',
    });
    createAndAppend('section', container, {
      class: 'left-box',
      id: 'left-box',
    });
    createAndAppend('section', container, {
      class: 'right-box',
      id: 'right-box',
    });
    try {
      const repositories = await fetchJSON(url);
      createOptionElements(repositories, select);
      renderRepositories(repositories[select.value]);
      renderContributions(repositories[select.value]);
      select.addEventListener('change', () => {
        const repIndex = select.value;
        renderRepositories(repositories[repIndex]);
        renderContributions(repositories[repIndex]);
      });
    } catch (error) {
      renderError(error);
    }
  }

  function main(url) {
    renderWholePage(url);
  }

  window.onload = () => main(HYF_REPOS_URL);
}
