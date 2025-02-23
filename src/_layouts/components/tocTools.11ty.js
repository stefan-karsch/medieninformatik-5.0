/* TOC über alle Seiten
############################################################################ */

exports.getTocContent = (eleventy, data) => {

  const createToc = (collection) => {
    const tocItems = collection.map((item) => `<li><a href="${eleventy.url(item.url)}">${item.data.title}</a></li>`);

    return `
      <ul class="item-list is-tight">
        ${tocItems.join("\n")}
      </ul>`;
  }

  return `
    <nav class="inline-navigation">
      ${createToc(data.collections.pagesInToc)}
    </nav>
  `;
};

/* TOC über alle Inhalte einer Seite (Level 1)
############################################################################ */

exports.getPageTOC = (obj) => {

  const { eleventy, collection, maxLevel } = obj;

  const createToc = (collection) => {

    const tocItems = collection.filter(item => item.data.level <= maxLevel).map((item) => {
      return `
        <li>
          <a href="#${eleventy.slugify(item.data.title)}">${item.data.title}</a>
        </li>
      `;
    });

    return `
      <ul class="item-list is-tight">
        ${tocItems.join("\n")}
      </ul>`;
  }

  return `
    <nav class="inline-navigation">
      ${createToc(collection)}
    </nav>
  `;
};

