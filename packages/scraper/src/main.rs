use fetching::page_specific::specific::SpecificProduct;
use tracing::error;

use crate::fetching::page_specific::specific::get_specific_product;

mod fetching;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let all_products = fetching::get_all_products().await?;
    println!("{} products found", all_products.len());
    for product in &all_products {
        println!("{}", product.name.to_lowercase().replace(',', "\","))
    }

    let mut failed = 0;
    let mut converted: Vec<SpecificProduct> = Vec::with_capacity(all_products.len());
    // see how many products can be converted
    for window in all_products.chunks(10) {
        let c = window
            .iter()
            .map(|p| {
                let x = p.href.clone();
                tokio::spawn(async move { get_specific_product(&x).await })
            })
            .collect::<Vec<_>>();

        for handle in c {
            match handle.await {
                Ok(s) => match s {
                    Ok(s) => converted.push(s),
                    Err(e) => {
                        error!("{e:#?}");
                        failed += 1;
                    }
                },
                Err(e) => {
                    error!("outer: {e:#?}");
                }
            }
        }
    }

    println!("total success: {}", converted.len());
    println!("total failed: {}", failed);

    // Save
    let s = serde_json::to_string_pretty(&converted)?;
    tokio::fs::write("./data.json", s).await?;

    Ok(())
}
