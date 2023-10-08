module.exports = {
	data: {
		layout: "default.11ty.js",
		bodyClass: "content-blocks",
	},
	render(data) {

    const tocTools = require('./components/tocTools.11ty.js');

    const handlungsfelderList = data.collections.handlungsfelder.map((item) => {
      const editUrl = `${data.settings.repoEditUrl}${item.page.inputPath.replace('./src/', 'src/')}`;
      return `
        <section class="${item.data.class ? item.data.class : ''} ${item.data.level===1 ? 'has-seperator' : ''}">
          <div class="content">
            <h${item.data.level + 1} id="${this.slugify(item.data.title)}">${item.data.title} <a href="${editUrl}"><span class="icon icon--inline">edit</span></a></h${item.data.level + 1}>
            ${item.content}
          </div>
        </section>
      `;
    });

		return `
			<main>
				<section>
					<header>
						<h1>${data.title}</h1>
					</header>
				</section>

        <section>
          <nav>
            ${tocTools.getPageTOC({
              eleventy: this,
              collection: data.collections.handlungsfelder,
              maxLevel: 1
            })}
          </nav>
        </section>

        ${data.content}

        <section>
          ${handlungsfelderList.join("\n")}
        </section>
			</main>
		`;
	}
}
