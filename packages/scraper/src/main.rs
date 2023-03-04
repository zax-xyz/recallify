use std::time::Duration;

use fetching::{get_first_page, page_specific::specific::SpecificProduct};
use tracing::{error, info};

use crate::fetching::page_specific::specific::get_specific_product;

mod fetching;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    loop {
        // Get first page of products
        let products = get_first_page().await?;

        // Convert the first page into json products
        let mut converted: Vec<SpecificProduct> = Vec::with_capacity(10);
        let c = products
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
                        error!("could not convert: {e:#?}");
                    }
                },
                Err(e) => {
                    error!("outer: {e:#?}");
                }
            }
        }

        // Send the converted products to server
        //.. thingy
        let s = serde_json::to_string_pretty(&converted)?;
        tokio::fs::write("./data.json", s).await?;

        // Wait like 5 minutes
        info!("complete; pending 300 seconds");
        tokio::time::sleep(Duration::from_secs(300)).await;
    }
}
