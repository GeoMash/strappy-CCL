$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.view',
		$name:		'Default',
		$extends:	strappy.mvc.View
	}
)
(
	{},
	{
		templates:
		{
			
		},
		// appliedWrapper:	false,
		onReady: function()
		{
			this.getContainer().addClass(this.getConfig('cls'));
			this.getContainer().addClass(this.getConfig('layout'));
			if (this.getConfig('style'))
			{
				this.getContainer().css(this.getConfig('style'));
			}
			// if (this.getConfig('relativeWrapper'))
			// {
			// 	this.getContainer().append($('<div class="relative-wrapper" style="display:none;"></div>'));
			// 	this.appliedWrapper=true;
			// }
		},
		bindDOMEvents: function()
		{
			
		},
		onModelLockChange: function(signal)
		{
			
		},
		syncView: function()
		{
			
		},
		// getContainer: function()
		// {
		// 	if (!this.appliedWrapper || !this.getConfig('relativeWrapper'))
		// 	{
		// 		return $('#'+this.getIID());
		// 	}
		// 	else
		// 	{
		// 		return $('#'+this.getIID()+' .relative-wrapper');
		// 	}
		// },
		getContainerSelector: function()
		{
			return '#'+this.getIID();
			
			// if (!this.appliedWrapper || !this.getConfig('relativeWrapper'))
			// {
			// 	return '#'+this.getIID();
			// }
			// else
			// {
			// 	return '#'+this.getIID()+' .relative-wrapper';
			// }
		}
	}
);