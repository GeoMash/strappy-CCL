$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'HTMLLayout',
		$extends:	'strappy.mvc.Controller'
	}
)
(
	{},
	{
		onAfterCmpInit: function()
		{
			if (this.getState('layout') === 'html')
			{
				var view = this.getView('Main');
				view.getContainer().append(this.getState('html'));
				view.show();
			}
		},
		onChangeCard: function(signal)
		{
			
		}
	}
);