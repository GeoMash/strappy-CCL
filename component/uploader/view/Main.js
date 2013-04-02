$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.uploader.view',
		$name:		'Main',
		$extends:	'strappy.mvc.View'
	}
)
(
	{},
	{
		templates:
		{
			
		},
		onReady: function()
		{
			
			
		},
		bindDOMEvents: function()
		{
			this.bindDOMEvent
			(
				'click',
				'#'+this.getState('upload_upload_button'),
				'controller:Main',
				'uploadFiles'
			);
		},
		syncView: function()
		{
			this.getContainer().html('')
				.append(this.getState('html'));
		}
	}
);