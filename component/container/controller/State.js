$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'State',
		$extends:	strappy.mvc.stateful.Controller
	}
)
(
	{},
	{
		layouts:	['auto','html','card'],
		init: function()
		{
			this.init.$parent();
			this.getView('Default')	.observe('onReady',	this.onViewReady.bind(this));
			this.stateStore.set('activeCard',this.getConfig('activeCard'));
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
			return this.layouts.inArray(this.getConfig('layout'));
		}
	}
);