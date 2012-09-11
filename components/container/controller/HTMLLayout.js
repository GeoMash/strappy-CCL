$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.container.controller',
		$name:		'HTMLLayout',
		$extends:	strappy.mvc.Controller
	}
)
(
	{},
	{
		init: function()
		{
			this.init.$parent();
			if (this.getConfig('layout')=='html')
			{
				
			}
		},
		onChangeCard: function(signal)
		{
			
		}
	}
);