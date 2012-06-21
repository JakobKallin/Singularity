var filesystem = require('fs');
var cheerio = require('cheerio');
var htmlFileName = process.argv[2];
var html = filesystem.readFileSync(htmlFileName, 'UTF-8');
$ = cheerio.load(html);

var includeScript = function() {
	$(this).text('[Script contents]');
	$(this).removeAttr('src');
};

$('script').each(includeScript);
process.stdout.write($.html());