const vscode = require('vscode');
const path = require('path');
let registeredDisposables = [];

const unregisterSubscriptions = () => {
	registeredDisposables.forEach((disposable) => {
		disposable.dispose();
	});
	registeredDisposables = [];
}

function activate(context) {
	const registerSubscription = (subscription) => {
		context.subscriptions.push(subscription);
		registeredDisposables.push(subscription);
	}

	const loadAutocompletions = () => {
		const completionItems = require(path.join(vscode.workspace.rootPath, 'autocomplete.config.js'));
		unregisterSubscriptions();
	  vscode.languages.getLanguages().then((languages) => {
			languages.forEach((language) => {
				const subscription = vscode.languages.registerCompletionItemProvider(language, {
					provideCompletionItems: () => completionItems,
				});
				registerSubscription(subscription);
			});
		})
	}

	context.subscriptions.push(vscode.commands.registerCommand('flexible-autocomplete.reload', () => {
		loadAutocompletions();
		vscode.window.showInformationMessage(`Flexible Autocomplete: Reloaded!`);
	}));

	loadAutocompletions();
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	unregisterSubscriptions();
}

module.exports = {
	activate,
	deactivate
}
