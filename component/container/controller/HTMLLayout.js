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
				this.cmp().observe('onStateChange',this.redraw.bind(this));
				this.redraw();
				this.getView('Main').show();
			}
		},
		redraw: function()
		{
			this.getView('Main').getContainer().html('').append(this.getState('html'));
		},
		onChangeCard: function(signal)
		{
			
		}
	}
);