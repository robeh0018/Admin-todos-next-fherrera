import {cookies} from "next/headers";
import {Product, products} from "@/products";
import {ItemCard} from "@/shopping-cart";
import {WidgetItem} from "@/app/components";

export const metadata = {
	title: 'Shopping Cart page',
	description: 'Shopping Cart page description',
}

interface ProductInCart {
	product: Product;
	quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }) => {
	const productsInCart: ProductInCart[] = [];

	for (const productId of Object.keys(cart)) {
		const product = products.find(product => productId === product.id);

		if (product) {
			productsInCart.push({product, quantity: cart[productId]});
		}
	}


	return productsInCart;
}

export default function CartPage() {

	const cookiesStore = cookies();
	const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as { [id: string]: number };
	const productsInCart = getProductsInCart(cart);

	const totalToPay = productsInCart.reduce(
		(prev, current) => (current.quantity * current.product.price) + prev, 0)
	return (
		<div>
			<h1 className="text-4xl">Cart products</h1>
			<hr className="mb-2"/>


			<div className="flex flex-col sm:flex-row gap-2 w-full">
				<div className='flex flex-col gap-2 w-full sm:w-8/12'>

					{
						productsInCart.map(({product, quantity}) => (
							<ItemCard
								key={product.id}
								product={product}
								quantity={quantity}
							/>
						))
					}
				</div>

				<div className='flex flex-col w-full sm:w-4/12'>
					<WidgetItem title={'Total Price'}>
						<div className='mt-2 flex justify-center gap-4'>
							<h3 className='text-3xl font-bold text-gray-700'>${(totalToPay * 1.15).toFixed(2)}</h3>
						</div>
						<span
							className='font-bold text-center text-gray-500'>Taxes 15%: ${(totalToPay * 0.15).toFixed(2)}</span>
					</WidgetItem>
				</div>
			</div>
		</div>
	)
}