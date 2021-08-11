import {
	addUser,
	addDeposit,
	transferFund,
	listUsers,
	checkBalance,
	transferFundExternal,
} from "./app";

describe("Testing the test app", () => {
	it("should add User A to the app", () => {
		const username = "User A";

		addUser(username);

		expect(listUsers()).toEqual([{ username, balance: 0 }]);
	});

	it("should credit User A with 10 dollars", () => {
		const username = "User A";
		const amount = 10;

		addDeposit(username, amount);

		expect(listUsers()).toEqual([{ username, balance: amount }]);
	});

	it("should add User B to the app", () => {
		const username = "User B";

		addUser(username);

		expect(listUsers()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ username: "User A", balance: 10 }),
				expect.objectContaining({ username: username, balance: 0 }),
			])
		);
	});

	it("should credit User B with 20 dollars", () => {
		const username = "User B";
		const amount = 20;

		addDeposit(username, amount);

		expect(listUsers()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ username: "User A", balance: 10 }),
				expect.objectContaining({ username: username, balance: 20 }),
			])
		);
	});

	it("should transfer 15 dollars from User B to User A", () => {
		const username = "User B";
		const amount = 15;
		transferFund("User B", amount, "User A");

		expect(listUsers()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ username: "User A", balance: 25 }),
				expect.objectContaining({ username: username, balance: 5 }),
			])
		);
	});

	it("should check User A Balance and has 25 dollars", () => {
		const username = "User A";

		expect(checkBalance(username)).resolves.toEqual(
			expect.objectContaining({ username: username, balance: 25 })
		);
	});

	it("should check User B Balance and has 5 dollars", () => {
		const username = "User B";

		expect(checkBalance(username)).resolves.toEqual(
			expect.objectContaining({ username: username, balance: 5 })
		);
	});

	it("should transfer 25 dollars from User A out of the app", () => {
		const username = "User A";
		const amount = 25;
		transferFundExternal("User A", amount);

		expect(listUsers()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ username: username, balance: 0 }),
				expect.objectContaining({ username: "User B", balance: 5 }),
			])
		);
	});
});
