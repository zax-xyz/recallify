use self::page_specific::get_overview_page;

pub(crate) mod page_specific;

#[derive(Debug, Clone)]
pub(crate) struct ProductLink {
    pub(crate) name: String,
    pub(crate) href: String,
}

#[tracing::instrument]
pub(crate) async fn get_all_products() -> anyhow::Result<Vec<ProductLink>> {
    let mut link =
        "https://www.foodstandards.gov.au/industry/foodrecalls/recalls/Pages/default.aspx"
            .to_string();
    let mut all_products = Vec::with_capacity(300);
    loop {
        let (products, next) = get_overview_page(&link).await?;

        all_products.extend(products);
        match next {
            Some(l) => link = l,
            None => break,
        }
    }

    Ok(all_products)
}

#[tracing::instrument]
pub(crate) async fn get_first_page() -> anyhow::Result<Vec<ProductLink>> {
    let link = "https://www.foodstandards.gov.au/industry/foodrecalls/recalls/Pages/default.aspx";
    let (products, _) = get_overview_page(link).await?;

    Ok(products)
}
