const {
	override,
	useBabelRc,
	disableEsLint,
	overrideDevServer,
	watchAll,
} = require('customize-cra');

module.exports = {
	webpack: override(
		// usual webpack plugin
		disableEsLint(),
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useBabelRc()
	),
	devServer: overrideDevServer(
		// dev server plugin
		watchAll()
	),
};
