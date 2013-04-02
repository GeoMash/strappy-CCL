$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.uploader',
		$name:		'Uploader',
		$extends:	'strappy.Component'
	}
)
(
	{},
	{
		state:
		{
			'private':
			{
				html:							'',
				upload_runtimes:				'html5,flash,silverlight,gears,browserplus',
				upload_container:				null,//'plupload-container',
				upload_browse_button:			null,
				upload_max_file_size:			'50mb',
				// upload_resize:					{width : 320, height : 240, quality : 90},
				upload_url:						'/',
				upload_flash_swf_url:			'/lib/plupload/plupload.flash.swf',
				upload_silverlight_xap_url:		'/lib/plupload/plupload.silverlight.xap',
				// upload_filters:				[]
				// {title : "Image files", extensions : "jpg,gif,png"},
				// {title : "Zip files", extensions : "zip"}
			}
		},
		components:
		{
			
		},
		stores:
		[
			
		],
		views:
		[
			'Main'
		],
		controllers:
		[
			'Main'
		]
	}
);