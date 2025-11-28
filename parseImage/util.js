
export function getFileList(file) {
	return fs.readdirSync(file);
}