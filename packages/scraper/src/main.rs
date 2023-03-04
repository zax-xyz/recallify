mod fetching;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let all_products = fetching::get_all_products().await?;
    println!("{} products found", all_products.len());
    for product in all_products {
        println!("{}", product.name.to_lowercase().replace(',', "\","))
    }

    Ok(())
}
