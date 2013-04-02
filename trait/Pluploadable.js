$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Pluploadable',
		$uses:
		[
			'$JSKK.trait.Observable'
		]
	}
)
(
	{},
	{
		/*
		events:
		{
			onInit:				true,
			onFilesAdded:		true,
			onUploadProgress:	true,
			onError:			true,
			onFileUploaded:		true
		},
		
		upload_runtimes:			'gears,html5,flash,silverlight,browserplus',
		upload_browse_button:		'plupload-select',
		upload_container:			'plupload-container',
		upload_max_file_size:		'10mb',
		upload_url:					'upload.php',
		upload_flash_swf_url:		'plupload.flash.swf',
		upload_silverlight_xap_url:	'plupload.silverlight.xap',
		upload_filters:
		[
			{title : "Image files", extensions : "jpg,gif,png"},
			{title : "Zip files", extensions : "zip"}
		]
		
		
		
		*/
		initUploader: function()
		{
			this.uploader=new plupload.Uploader
			(
				{
					runtimes:				this.getState('upload_runtimes'),
					browse_button:			this.getState('upload_browse_button'),
					container:				this.getState('upload_container'),
					max_file_size:			this.getState('upload_max_file_size'),
					url:					this.getState('upload_url'),
					flash_swf_url:			this.getState('upload_flash_swf_url'),
					silverlight_xap_url:	this.getState('upload_silverlight_xap_url'),
					filters:				this.getState('upload_filters') || false
				}
			);
			this.uploader.bind('Init',				this.onInit.bind(this));
			this.uploader.bind('FilesAdded',		this.onFilesAdded.bind(this));
			this.uploader.bind('UploadProgress',	this.onUploadProgress.bind(this));
			this.uploader.bind('Error',				this.onError.bind(this));
			this.uploader.bind('FileUploaded',		this.onFileUploaded.bind(this));
			
			this.uploader.init();
		},
		uploadFiles: function()
		{
			this.uploader.start();
		},
		onInit: function(uploader,params)
		{
			this.fireEvent('onInit',this,uploader,params);
		},
		onFilesAdded: function(uploader,files)
		{
			this.fireEvent('onFilesAdded',this,uploader,files);
		},
		onUploadProgress: function(uploader,file,params)
		{
			this.fireEvent('onUploadProgress',this,uploader,params);
		},
		onError: function(uploader,err)
		{
			this.fireEvent('onError',this,uploader,err);
		},
		onFileUploaded: function(uploader,file)
		{
			this.fireEvent('onFileUploaded',this,uploader,file);
		}
	}
);