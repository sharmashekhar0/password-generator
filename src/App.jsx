import { useState, useCallback, useEffect, useRef } from "react";

function App() {
	const min = 8;
	const max = 40;
	const [isNumberAllowed, setIsNumberAllowed] = useState(false);
	const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);
	const [length, setLength] = useState(8);
	const [password, setPassword] = useState("");

	const passwordRef = useRef(null);

	const generatePassword = useCallback(() => {
		let keys = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz";

		if (isNumberAllowed) keys += "0123456789";
		if (isCharacterAllowed) keys += "!@#$%^&*(){}";

		let pass = "";
		for (let i = 1; i <= length; i++) {
			let index = Math.floor(Math.random() * keys.length);
			pass += keys[index];
		}

		setPassword(pass);
	}, [length, isCharacterAllowed, isNumberAllowed]);

	useEffect(() => {
		generatePassword();
	}, [length, isCharacterAllowed, isNumberAllowed]);

	const copyPasswordToClipboard = useCallback(() => {
		passwordRef?.current?.select();
		window.navigator.clipboard.writeText(password);
	}, [password]);

	return (
		<div
			className="bg-slate-900 h-screen font-customFont
     flex items-center justify-center"
		>
			<div className="bg-slate-800 rounded-md p-4 py-8 sm:p-8  flex flex-col gap-8 sm:gap-4">
				<div className="flex items-center">
					<input
						type="text"
						value={password}
						className="h-10 font-semibold text-2xl outline-none px-4 rounded-s-md w-4/5 text-[#F4C430]"
						ref={passwordRef}
						readOnly
					/>
					<button
						onClick={copyPasswordToClipboard}
						className="px-4 rounded-e-md bg-blue-600 hover:bg-blue-800 font-semibold h-10 text-white"
					>
						Copy
					</button>
				</div>
				<div className="flex flex-col sm:flex-row gap-6 sm:gap-4">
					<div className="flex items-center gap-1 text-[#F4C430]">
						<input
							type="range"
							id="length"
							value={length}
							min={min}
							max={max}
							onChange={(e) => setLength(e.currentTarget.value)}
							className="accent-blue-900"
						/>
						<label htmlFor="length">Length ({length})</label>
					</div>
					<div className="flex items-center gap-1 text-[#F4C430]">
						<input
							type="checkbox"
							id="number"
							value={isNumberAllowed}
							onChange={() =>
								setIsNumberAllowed(!isNumberAllowed)
							}
						/>
						<label htmlFor="number">Numbers</label>
					</div>
					<div className="flex items-center gap-1 text-[#F4C430]">
						<input
							type="checkbox"
							id="specialCharacter"
							value={isCharacterAllowed}
							onChange={() =>
								setIsCharacterAllowed(!isCharacterAllowed)
							}
						/>
						<label htmlFor="specialCharacter">
							Special Characters
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
