// Client side.

import {getCookie, hasCookie, setCookie} from "cookies-next";

export const getCookieCart = (): { [id: string]: number } => {
	if (hasCookie('cart')) {
		return JSON.parse(getCookie('cart') as string ?? '{}');
	}

	return {};
}

export const addProductToCart = (id: string): void => {

	const cookieCart = getCookieCart();

	if (cookieCart[id]) {
		cookieCart[id] += 1;
	} else {
		cookieCart[id] = 1;
	}

	setCookie('cart', JSON.stringify(cookieCart));
}

export const removeProductFromCart = (id: string): void => {
	const cookieCart = getCookieCart();

	if (cookieCart[id]) delete cookieCart[id];

	setCookie('cart', JSON.stringify(cookieCart))
}


export const removeSingleItemFromCart = (id: string): void => {

	const cookieCart = getCookieCart();

	if (!cookieCart[id]) return;

	cookieCart[id] -= 1;

	if (cookieCart[id] <= 0) delete cookieCart[id];

	setCookie('cart', JSON.stringify(cookieCart));
}
