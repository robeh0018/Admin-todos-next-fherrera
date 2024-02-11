'use client'

import {useState} from "react";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";

interface Props {
	currentTab?: number;
	tabOptions?: number[];
}

export const TabBar = ({tabOptions = [1, 2, 3, 4], currentTab = 1}: Props) => {

	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState(currentTab);

	const handleTapSelected = (tap: number) => {
		setSelectedTab(tap);

		setCookie('selectedTap', tap.toString());

		router.refresh();
	}

	return (
		<div className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2
			${'grid-cols-' + tabOptions.length}
		`}>

			{
				tabOptions.map(tap => (
					<div key={tap}>
						<input type="radio" id={tap.toString()}
							   className="peer hidden"
							   value={selectedTab}
							   onChange={() => {
							   }}
							   checked={selectedTab === tap}
						/>
						<label
							onClick={() => handleTapSelected(tap)}
							className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
							{tap}
						</label>
					</div>
				))

			}

		</div>
	)
}