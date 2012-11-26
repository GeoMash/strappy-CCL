$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'AutoLayout',
		$extends:	strappy.mvc.Controller,
		$uses:
		[
			strappy.ccl.trait.Containable
		]
	}
)
(
	{},
	{
		init: function()
		{
			this.init.$parent();
			this.getController('State')	.observe('onReadyState',this.onReadyState.bind(this));
		},
		onReadyState: function()
		{
			if (this.getConfig('layout')=='auto')
			{
				if (this.getConfig('autoShow'))
				{
					this.getView('Default').getContainer().show();
				}
				this.initChildren();
			}
		},
		onSignalShow: function()
		{
			this.getView('Default').getContainer().show();
		},
		onSignalHide: function()
		{
			this.getView('Default').getContainer().hide();
		}
		// onSignalShow: function()
		// {
		// 	var view=this.getView('Default');
		// 	if (this.getConfig('relativeWrapper'))
		// 	{
		// 		view.getContainer().parent().show();
		// 	}
		// 	view.getContainer().show();
		// },
		// onSignalHide: function()
		// {
		// 	var view=this.getView('Default');
		// 	if (this.getConfig('relativeWrapper'))
		// 	{
		// 		view.getContainer().parent().hide();
		// 	}
		// 	view.getContainer().hide();
		// }
	}
);