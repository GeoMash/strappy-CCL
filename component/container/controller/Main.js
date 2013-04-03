$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'Main',
		$extends:	'strappy.mvc.Controller'
	}
)
(
	{},
	{
		layouts:	['auto','html','card'],
		onAfterCmpInit: function()
		{
			this.cmp().setReady();
			// this.getView('Main').observe('onReady',this.onViewReady.bind(this));
		},
		onBeforeChange: function(state,key,value)
		{
			return true;
		},
		onViewReady: function(view)
		{
			this.setViewReadyState(view.$reflect('name'));
			
			if (this.hasValidLayout())
			{
				this.setReady();
			}
			else
			{
				console.trace();
				throw new Error('Container has been configured with an invalid layout.');
			}
		},
		hasValidLayout: function()
		{
			return this.layouts.inArray(this.getState('layout'));
		}
	}
);