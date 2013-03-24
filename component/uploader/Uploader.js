$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component',
		$name:		'Uploader',
		$extends:	'strappy.Component'
	}
)
(
	{},
	{
		config:
		{
			attachTo:				null,
			runtimes:				'html5,flash,silverlight,gears,browserplus',
			browse_button:			'pickfiles',
			max_file_size:			'50mb',
			resize:					{width : 320, height : 240, quality : 90},
			url:					'/',
			flash_swf_url:			'/js/plupload/js/plupload.flash.swf',
			silverlight_xap_url:	'/js/plupload/js/plupload.silverlight.xap',
			filters:				[]
			// {title : "Image files", extensions : "jpg,gif,png"},
			// {title : "Zip files", extensions : "zip"}
			
		},
		components:
		{
			
		},
		stores:
		[
			
		],
		views:
		[
			'Default'
		],
		controllers:
		[
			'Default'
		]
	}
);