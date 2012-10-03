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
			if (this.getConfig('layout') === 'html')
			{
				var view = this.getView('Default');
				view.getContainer().append(this.getConfig('html'));
				view.show();
			}
		},
		onChangeCard: function(signal)
		{

		}
	}
	);