$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.view',
		$name:		'Main',
		$extends:	'strappy.mvc.View',
		$uses:
		[
			//'strappy.ccl.trait.Scrollable'
		]
	}
)
(
	{},
	{
		templates:
		{
			
		},
		// appliedWrapper:	false,
		onAfterCmpInit: function()
		{
			this.getContainer().addClass(this.getState('cls'));
			this.getContainer().addClass(this.getState('layout'));
			if (this.getState('style'))
			{
				this.getContainer().css(this.getState('style'));
			}
			if (this.getState('scrollable'))
			{
				//this.getContainer().addClass('jspscroll');
			}
			// if (this.getState('relativeWrapper'))
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
		// 	if (!this.appliedWrapper || !this.getState('relativeWrapper'))
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
			
			// if (!this.appliedWrapper || !this.getState('relativeWrapper'))
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