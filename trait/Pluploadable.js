$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Pluploadable',
		$uses:
		[
			$JSKK.trait.Observable
		]
	}
)
(
	{},
	{
		// events:
		// {
		// 	onInit:				true,
		// 	onFilesAdded:		true,
		// 	onUploadProgress:	true,
		// 	onError:			true,
		// 	onFileUploaded:		true
		// },
		initUploader: function()
		{
			this.uploader=new plupload.Uploader();
			this.bind('Init',			this.onInit.bind(this));
			this.bind('FilesAdded',		this.onFilesAdded.bind(this));
			this.bind('UploadProgress',	this.onUploadProgress.bind(this));
			this.bind('Error',			this.onError.bind(this));
			this.bind('FileUploaded',	this.onFileUploaded.bind(this));
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
		onUploadProgress: function(uploader,file)
		{
			this.fireEvent('onUploadProgress',this,uploader,params);
		},
		onStateChange: function()
		{
			
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