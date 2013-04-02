$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.uploader.controller',
		$name:		'Main',
		$extends:	'strappy.mvc.Controller',
		$uses:
		[
			'strappy.ccl.trait.Pluploadable'
		]
	}
)
(
	{},
	{
		events:
		{
			onInit:				true,
			onFilesAdded:		true,
			onUploadProgress:	true,
			onError:			true,
			onFileUploaded:		true
		},
		uploader:	null,
		onAfterCmpInit: function()
		{
			var view=this.getView('Main');
			view.observe('onReady',this.onViewReady.bind(this));
			this.cmp().setReady();
		},
		onViewReady: function()
		{
			var view=this.getView('Main');
			view.syncView();
			view.show();
			if (Object.isNull(this.getState('upload_container')))
			{
				this.setState('upload_container',this.getIID());
			}
			this.initUploader();
		},
		onSignalShow: function()
		{
			this.getView('Main').show();
		},
		onSignalHide: function()
		{
			this.getView('Main').hide();
		}
	}
);