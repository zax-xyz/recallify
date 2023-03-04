use anyhow::{Context, Ok};
use scraper::{html::Select, Html, Selector};
use serde::Serialize;
use tracing::info;

#[derive(Clone, Debug, Serialize)]
pub(crate) struct SpecificProduct {
    pub(crate) name: String,
    pub(crate) publish_date: String,
    pub(crate) product_info: String,
    pub(crate) date_markings: String,
    pub(crate) problem: String,
    /// Food safety hazard
    pub(crate) fsh: String,
    /// Country of origin
    pub(crate) origin: String,
    /// What to do
    pub(crate) wtd: String,
    pub(crate) image_url: String,
}

fn get_inner_text(v: &mut Select) -> anyhow::Result<String> {
    Ok(v.next()
        .context("no next p")?
        .text()
        .next()
        .context("no descendent text nodes")?
        .trim()
        .to_string())
}

#[tracing::instrument]
pub(crate) async fn get_specific_product(url: &str) -> anyhow::Result<SpecificProduct> {
    info!("starting fetch");
    let page_html = reqwest::get(url).await?.text().await?;
    let document = Html::parse_document(&page_html);

    let title = document
        .select(&Selector::parse("#DeltaPlaceHolderPageTitleInTitleArea").unwrap())
        .next()
        .context("no title")?
        .text()
        .next()
        .context("no text in title")?
        .trim()
        .to_string();

    let initial_p = Selector::parse("div > span > div > div.article-content > div > p").unwrap();

    let mut p_iter = document.select(&initial_p);

    let publish_date = get_inner_text(&mut p_iter)?
        .split_once(": ")
        .context("could not split date")?
        .1
        .to_string();

    let product_info = get_inner_text(&mut p_iter)?;
    let date_markings = get_inner_text(&mut p_iter)?;

    let image_url = p_iter
        .next()
        .context("no next p")?
        .select(&Selector::parse("img").unwrap())
        .next()
        .context("no image found")?
        .value()
        .attr("src")
        .map(|e| format!("https://www.foodstandards.gov.au{e}"))
        .context("image does not contain href")?;

    let problem = get_inner_text(&mut p_iter)?;
    let fsh = get_inner_text(&mut p_iter)?;
    let origin = get_inner_text(&mut p_iter)?;
    let wtd = get_inner_text(&mut p_iter)?;

    Ok(SpecificProduct {
        name: title,
        publish_date,
        product_info,
        date_markings,
        problem,
        fsh,
        origin,
        wtd,
        image_url,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_name() {
        tokio::runtime::Builder::new_multi_thread().enable_all().build().unwrap().block_on(async move {
let product = 
            get_specific_product("https://www.foodstandards.gov.au/industry/foodrecalls/recalls/Pages/CROWN-COUQUE-D%E2%80%99ASSE-WHITE-and-CROWN-COUQUE-D%E2%80%99ASSE-COFFEE.aspx").await.unwrap();
            println!("{product:#?}")
        })
    }
}
