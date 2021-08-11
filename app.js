let users = [];

// export const resetUsers = () => {
// 	users = [];
// };

export const listUsers = () => users;

export const addUser = async (username) => {
	const foundUser = users.find((user) => user.username === username);
	if (!foundUser) {
		users.push({
			username: username,
			balance: 0,
		});
	} else {
		console.error(`User "${username}" already exists`);
	}
};

export const addDeposit = async (username, deposit) => {
	const foundUser = users.find((user) => user.username === username);
	if (foundUser) {
		users.forEach((user) => {
			if (user.username === username) user.balance += deposit;
		});
	} else {
		console.error(`User "${username}" does not exist`);
	}
};

export const checkBalance = async (username) => {
	const foundUser = users.find((user) => user.username === username);
	const userBalance = users.find((user) => user.balance);
	if (foundUser && userBalance) {
		for (var i in users) {
			if (users[i].username == username) {
				// console.log(users[i]);
				return users[i];
			}
		}
	} else {
		console.error(`User "${username}" does not exist`);
	}
};

export const transferFund = async (sender, amount, receiver) => {
	const newSender = users.find((user) => user.username === sender);
	const newReceiver = users.find((user) => user.username === receiver);

	if (newSender && newReceiver) {
		users.forEach((user) => {
			if (user.username === sender) {
				user.balance -= amount;
			} else if (user.username === receiver) {
				user.balance += amount;
			}
		});
	} else {
		console.error("Transaction failed");
	}
};

export const transferFundExternal = async (sender, amount) => {
	const newSender = users.find((user) => user.username === sender);

	if (newSender) {
		users.forEach((user) => {
			if (user.username === sender) {
				user.balance -= amount;
			}
		});
	} else {
		console.error("Transaction failed");
	}
};

// export { addUser, transferFund, addDeposit, transferFundExternal };

// console.log(users);
// addUser("User A");
// addDeposit("User A", 10);
// console.log(users);
// addUser("User B");
// addDeposit("User B", 20);
// console.log(users);
// transferFund("User B", 15, "User A");
// console.log(users);
// transferFundExternal("User A", 25);
// console.log(users);
// checkBalance("User A");
// console.log(users);