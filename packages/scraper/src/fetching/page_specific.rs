use anyhow::Context;
use scraper::{ElementRef, Html, Selector};
use tracing::info;

use super::ProductLink;

/// Returns a vector of product links found, and if there is another page.
#[tracing::instrument]
pub(crate) async fn get_overview_page(
    url: &str,
) -> anyhow::Result<(Vec<ProductLink>, Option<String>)> {
    info!("starting scrape");
    let page_html = reqwest::get(url).await?.text().await?;
    let document = Html::parse_document(&page_html);

    let table_sel = Selector::parse(
        "#PrintPreviewArea > table:nth-child(4) > tbody div.searchfilter-userfilterbox",
    )
    .unwrap();
    let heading_sel = Selector::parse("h3 a").unwrap();

    let filter_box_node = document
        .select(&table_sel)
        .next()
        .context("no search box found")?;

    let recalls = filter_box_node
        .next_sibling()
        .context("div containing items not found")?;

    let mut products: Vec<ProductLink> = Vec::with_capacity(10);

    for product in recalls.children() {
        let p_element = ElementRef::wrap(product).context("node not element")?;
        // Get name
        let a_tag = p_element
            .select(&heading_sel)
            .next()
            .context("product does not have a name")?;

        let name = a_tag.text().next().context("element does not have text")?;
        let href = a_tag.value().attr("href").context("a does not have href")?;

        products.push(ProductLink {
            name: name.to_string(),
            href: href.to_string(),
        })
    }

    // Determine if have to continue
    let sel = Selector::parse("div.paging-links").unwrap();
    let pages_container = document
        .select(&sel)
        .next()
        .context("paging-links did not exist")?;

    let next_page_a = pages_container
        .last_child()
        .context("did not have a last child")?;

    if next_page_a
        .first_child()
        .context("a does not have child")?
        .value()
        .as_text()
        .context("last node not text")?
        .to_string()
        != "Next >"
    {
        return Ok((products, None));
    }

    Ok((
        products,
        next_page_a
            .value()
            .as_element()
            .context("last a was not an element")?
            .attr("href")
            .map(|e| format!("https://www.foodstandards.gov.au{e}")),
    ))
}
