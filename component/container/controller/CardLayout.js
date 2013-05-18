$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'CardLayout',
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
		cards:{},
		onAfterCmpInit: function()
		{
			if (this.getState('layout')=='card')
			{
				if (this.getState('autoShow'))
				{
					this.getView('Main').getContainer().show();
				}
				
				var	children	=this.getState('children'),
					activeCard	=this.getState('activeCard');
					
				this.cmp().observe
				(
					'onChildReady',
					function(childRef)
					{
						var	thisRef	=childRef.split('.').last(),
							cmp		=this.getCmp(thisRef),
							view	=null;
						if (thisRef==activeCard)
						{
							for (view in cmp._views)
							{
								cmp._views[view].getContainer().show();
							}
						}
						else
						{
							for (view in cmp._views)
							{
								cmp._views[view].getContainer().hide();
							}
						}
					}
				);
				this.initChildren();
			}
		},
		onSwitchInstruction: function(signal)
		{
			this.showCard(signal.getBody().card);
		},
		hideAllChildComponents: function()
		{
			var components=this.getParentComponent().components;
			for (var ref in components)
			{
				this.hideChildComponent(ref);
			}
		},
		showCard: function(ref)
		{
			this.setState('activeCard',ref);
			var	view	=null;
			
			this.cmp().eachChildCmp
			(
				function(cmp,thisCardRef)
				{
					if (ref==thisCardRef)
					{
						for (view in cmp._views)
						{
							cmp._views[view].getContainer().show();
						}
					}
					else
					{
						for (view in cmp._views)
						{
							cmp._views[view].getContainer().hide();
						}
					}
				}
			);
		}
	}
);