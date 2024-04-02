import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../context/CartContext';

const Header = () => {
	const navigate = useNavigate();
	const { data } = useCartContext();

	return (
		<nav
			className="sticky top-0 z-10 block w-full max-w-full px-24 py-2 text-white bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:py-4">
			<div className="flex items-center justify-between text-blue-gray-900">
				<img
					src='/images.png'
					onClick={() => navigate("/")}
					alt='logo-imae'
					className="h-14 w-30 mr-4 cursor-pointer" />
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-x-1">
						<div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
							{data.length !== 0 && <div className="t-0 absolute left-3">
								<p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{data.length}</p>
							</div>}

							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6 stroke-black">
								<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
							</svg>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Header