$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.uploader.controller',
		$name:		'Default',
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
		uploader:	null,
		init: function()
		{
			this.init.$parent();
			this.getController('State').observe('onReadyState',this.onReadyState.bind(this));
		},
		onReadyState: function()
		{
			this.getView('Default').syncView();
		},
		onSignalShow: function()
		{
			this.getView('Default').show();
		},
		onSignalHide: function()
		{
			this.getView('Default').hide();
		}
	}
);