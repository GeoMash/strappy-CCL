$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'AutoLayout',
		$extends:	'strappy.mvc.Controller',
		$uses:
		[
			'strappy.ccl.trait.Containable'
		]
	}
)
(
	{},
	{
		onAfterCmpInit: function()
		{
			if (this.getState('layout')=='auto')
			{
				if (this.getState('autoShow'))
				{
					this.getView('Main').getContainer().show();
				}
				this.initChildren();
			}
		},
		onSignalShow: function()
		{
			this.getView('Main').getContainer().show();
		},
		onSignalHide: function()
		{
			this.getView('Main').getContainer().hide();
		}
		// onSignalShow: function()
		// {
		// 	var view=this.getView('Main');
		// 	if (this.getState('relativeWrapper'))
		// 	{
		// 		view.getContainer().parent().show();
		// 	}
		// 	view.getContainer().show();
		// },
		// onSignalHide: function()
		// {
		// 	var view=this.getView('Main');
		// 	if (this.getState('relativeWrapper'))
		// 	{
		// 		view.getContainer().parent().hide();
		// 	}
		// 	view.getContainer().hide();
		// }
	}
);