var filesystem = require('fs');
var cheerio = require('cheerio');
var htmlFileName = process.argv[2];
var html = filesystem.readFileSync(htmlFileName, 'UTF-8');
$ = cheerio.load(html);

var includeScript = function() {
	if ( $(this).attr('src') ) {
		var path = $(this).attr('src');
		var contents = filesystem.readFileSync(path, 'UTF-8');
		$(this).text(contents);
		$(this).removeAttr('src');
	}
};

var includeStylesheet = function() {
	var path = $(this).attr('href');
	var contents = filesystem.readFileSync(path, 'UTF-8');
	$(this).removeAttr('href');
	
	var styleNode = $('<style></style>');
	$(styleNode).text(contents);
	$(this).after(styleNode);
	$(this).remove();
};

$('script').each(includeScript);
$('link[rel=stylesheet]').each(includeStylesheet);
process.stdout.write($.html());