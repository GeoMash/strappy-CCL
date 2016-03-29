module.exports = function(grunt)
{
	var BANNER=	"/*\r\n"
				+' Strappy CCL v<%= pkg.version %>'
				+' | (c) 2014 Timothy Chandler <tim@pi-co.io>'
				+' | See Strappy license file. '
				+"\r\n"
				+' Date Built: <%= grunt.template.today("yyyy-mm-dd") %>'
				+"\r\n*/\r\n";
	
	function getShim()
	{
		var shim	={},
			deps	={'deps':['strappy/Strappy']},
			prefix	='strappy/';
		grunt.file.recurse
		(
			'./src/',
			function(abspath, rootdir, subdir, filename)
			{
				if (!subdir
				&& (filename=='main.js' || filename=='Strappy.js'))
				{
					return;
				}
				if (filename.indexOf('.js')!==-1 && (!subdir || subdir.indexOf('docs')===-1))
				{
					if (subdir)
					{
						shim[prefix+subdir+'/'+filename.replace('.js','')]=deps;
					}
					else
					{
						shim[prefix+filename.replace('.js','')]=deps;
					}
				}
			}
		);
//		grunt.file.write('build/Shim.json',JSON.stringify(shim));
		return shim;
	}
	
	var shim=getShim();
	
	grunt.Config=
	{
		pkg:	grunt.file.readJSON('package.json'),
		requirejs:
		{
			ccl:
			{
				options:
				{
					stripBanners:	true,
					banner:			BANNER,
					baseUrl:		'src',
					name:			'strappy/ccl',
					packages:
					[
						{
							name:		'strappy',
							location:	'.'
						},
						{
							name:		'strappy/ccl',
							location:	'./ccl/'
						}
					],
					optimize:		"none",
					shim:			shim,
					wrapShim:		true,
					out:			"bin/<%= pkg.name %>.<%= pkg.version %>.ccl.js"
				}
			}
		}
	};
};